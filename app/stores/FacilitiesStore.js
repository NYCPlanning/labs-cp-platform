/* eslint-disable  class-methods-use-this */

import EventsEmitter from 'events';
import update from 'react/lib/update';

import dispatcher from '../dispatcher';
import devTables from '../helpers/devTables';
import carto from '../helpers/carto';
import FacilitiesSqlBuilder from '../helpers/sqlbuilder/FacilitiesSqlBuilder';
import { defaultFilterDimensions, layerConfig } from '../facilities/config';
import ga from '../helpers/ga';

class FacilitiesStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = JSON.parse(JSON.stringify(defaultFilterDimensions));
    this.sqlConfig = {
      columns: 'uid, the_geom_webmercator, facdomain, facname, address, factype, opname',
      tablename: devTables('facdb_facilities'),
    };
    this.sqlBuilder = new FacilitiesSqlBuilder(this.sqlConfig.columns, this.sqlConfig.tablename);
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
  }

  initialize() {
    const p1 = carto.SQL(`SELECT COUNT(*) FROM ${this.sqlConfig.tablename}`, 'json')
      .then((data) => {
        this.totalCount = data[0].count;
      });

    const p2 = carto.getCount(this.sql)
      .then((count) => {
        this.selectedCount = count;
      });

    Promise.all([p1, p2]).then(() => this.emit('facilitiesUpdated'));
  }

  // builds a new LayerConfig based on this.sql
  getLayerConfig() {
    const { sql } = this;

    // set the sql for the vector source
    const newConfig = update(layerConfig, {
      sources: {
        0: {
          options: {
            sql: {
              $set: [sql],
            },
          },
        },
      },
    });

    return newConfig;
  }

  // sets initial filterDimensions
  handleSetInitialFilters(filterDimensions) {
    this.filterDimensions = filterDimensions;
    this.updateSql();
  }

  // updates a single filterDimension, emits an event when everything is updated
  handleFilterDimensionChange(filterDimension, values) {
    ga.event({
      category: 'facilities-explorer',
      action: 'set-filter',
    });


    this.filterDimensions[filterDimension].values = values;

    // disable dimension if nothing is selected in the multiselects
    if (filterDimension === 'overabbrev' || filterDimension === 'optype' || filterDimension === 'proptype') {
      if (values.filter(value => value.checked === true).length > 0) {
        this.filterDimensions[filterDimension].disabled = false;
      } else {
        this.filterDimensions[filterDimension].disabled = true;
      }
    }

    this.updateSql();
  }

  // update the sql, get counts, and emit an event
  updateSql() {
    this.processChecked(this.filterDimensions.facsubgrp.values);
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    carto.getCount(this.sql).then((count) => {
      this.selectedCount = count;
      this.emit('facilitiesUpdated');
    });
  }

  fetchDetailData(uid) {
    carto.getFeature(devTables(this.sqlConfig.tablename), 'uid', uid)
      .then((data) => {
        this.detailData = data;
        this.fetchAgencyValues();
      });
  }

  fetchAgencyValues() {
    const d = this.detailData.properties;

    // Assumes a structure to the string given by the database
    const pgTableIds = this.dbStringToArray(d.pgtable);
    const pgTableSQL = pgTableIds.map(pg => `'${pg}'`).join(',');

    const sql = `SELECT * FROM facdb_datasources WHERE pgtable IN (${pgTableSQL})`;

    carto.SQL(sql, 'json')
      .then((sources) => {
        this.sources = sources;
        this.emit('detailDataAvailable');
      });
  }

  // Helper methods for db arrays being stored as strings
  dbStringToArray(string) {
    return string.replace(/[{}"]/g, '').split(';');
  }

  dbStringToObject(string) {
    const array = this.dbStringToArray(string);
    return array.map((a, i) => {
      const label = a.split(': ');
      return {
        agency: label[0],
        value: label[1],
        index: i,
      };
    });
  }

  dbStringAgencyLookup(string, lookup) {
    const object = this.dbStringToObject(string);
    return object.find(o => o.agency === lookup);
  }

  // checks or unchecks all facsubgrp options depending on this.checkStatus
  handleToggleAll() {
    const layers = this.filterDimensions.facsubgrp.values;

    layers.forEach((facdomain) => {
      facdomain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          // if none or some are selected, select all
          if (this.checkStatus !== 'all') {
            (subgroup.checked) = true;
          } else {
            (subgroup.checked) = false;
          }
        });
      });
    });

    this.updateSql();
  }

  resetFilter() {
    // read defaultFilterDimensions, but don't assign because then we would mutate them
    this.filterDimensions = JSON.parse(JSON.stringify(defaultFilterDimensions));
    this.updateSql();
  }

  setSelectedFeatures(features) {
    console.log(features)
    this.selectedFeatures = features;
    this.emit('selectedFeaturesUpdated');
  }

  // call local methods when certain events arrive from the dispatcher
  handleActions(action) {
    switch (action.type) {
      case 'FACILITIES_FILTERDIMENSION_CHANGE': {
        this.handleFilterDimensionChange(action.filterDimension, action.values);
        break;
      }

      case 'FACILITIES_SET_INITIAL_FILTERS': {
        this.handleSetInitialFilters(action.filterDimensions);
        break;
      }

      case 'FACILITIES_TOGGLE_ALL_LAYERS': {
        this.handleToggleAll(action.filterDimensions);
        break;
      }

      case 'FACILITIES_FETCH_DETAIL_DATA': {
        this.fetchDetailData(action.uid);
        break;
      }

      case 'FACILITIES_RESET_FILTER': {
        this.resetFilter();
        break;
      }

      case 'FACILITIES_SET_SELECTED_FEATURES': {
        this.setSelectedFeatures(action.features);
        break;
      }

      default:
    }
  }

  // iterates over all facsubgrp options, sets check/indeterminate status of parents
  // updates this.checkStatus (used to know whether all, none, or some are currently selected)
  processChecked(layers) {
    let allChecked = 0;
    let allIndeterminate = 0;
    // set indeterminate states, start from the bottom and work up
    layers.forEach((facdomain) => {
      let facdomainChecked = 0;
      let facdomainIndeterminate = 0;

      facdomain.children.forEach((group) => {
        let groupChecked = 0;

        group.children.forEach((subgroup) => {
          if (subgroup.checked) groupChecked += 1;
        });

        group.checked = (groupChecked === group.children.length);
        group.indeterminate = !!((groupChecked < group.children.length) && groupChecked > 0);

        if (group.checked) facdomainChecked += 1;
        if (group.indeterminate) facdomainIndeterminate += 1;
      });

      facdomain.checked = (facdomainChecked === facdomain.children.length);
      if (facdomain.checked) allChecked += 1;

      facdomain.indeterminate = (facdomainIndeterminate > 0) || ((facdomainChecked < facdomain.children.length) && facdomainChecked > 0);
      if (facdomain.indeterminate) allIndeterminate += 1;
    });

    let checkStatus;
    // figure out whether all, none, or some are checked
    if (allChecked === layers.length) {
      checkStatus = 'all';
    } else if (allChecked === 0 && allIndeterminate === 0) {
      checkStatus = 'none';
    } else {
      checkStatus = null;
    }

    this.checkStatus = checkStatus;

    return layers;
  }
}

const facilitiesStore = new FacilitiesStore();
window.facilitiesStore = facilitiesStore;

dispatcher.register(facilitiesStore.handleActions.bind(facilitiesStore));

export default facilitiesStore;
