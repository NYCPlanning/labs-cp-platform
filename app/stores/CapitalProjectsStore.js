/* eslint-disable  class-methods-use-this */

import EventsEmitter from 'events';
import update from 'react/lib/update';

import dispatcher from '../dispatcher';
import carto from '../helpers/carto';
import CapitalProjectsSqlBuilder from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';
import { defaultFilterDimensions, defaultLayerConfig } from '../capitalprojects/config';


class CapitalProjectsStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = JSON.parse(JSON.stringify(defaultFilterDimensions));
    this.sqlConfig = {
      columns: '*',
      pointsTablename: '(SELECT a.the_geom, a.the_geom_webmercator, magency, magencyacro, description, totalcommit, b.maprojid, totalspend, sagencyacro, maxdate, mindate FROM cpdb_dcpattributes_pts a LEFT JOIN cpdb_projects_combined b ON a.maprojid = b.maprojid) x',
      polygonsTablename: '(SELECT a.the_geom, a.the_geom_webmercator, magency, magencyacro, description, totalcommit, b.maprojid, totalspend, sagencyacro, maxdate, mindate  FROM cpdb_dcpattributes_poly a LEFT JOIN cpdb_projects_combined b ON a.maprojid = b.maprojid) x',
    };
    this.sqlBuilder = new CapitalProjectsSqlBuilder(this.sqlConfig.columns, 'tablenameplaceholder');

    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    this.pointsSql = this.sql.replace('tablenameplaceholder', this.sqlConfig.pointsTablename);
    this.polygonsSql = this.sql.replace('tablenameplaceholder', this.sqlConfig.polygonsTablename);
  }

  initialize() {
    console.log('INITIALIZE CPSTORE')

    const p1 = carto.SQL(`SELECT COUNT(*) FROM ${this.sqlConfig.pointsTablename}`, 'json')
      .then((data) => {
        this.pointsTotal = data[0].count;
      });

    const p2 = carto.SQL(`SELECT COUNT(*) FROM ${this.sqlConfig.polygonsTablename}`, 'json')
      .then((data) => {
        this.polygonsTotal = data[0].count;
      });

    const p3 = carto.getCount(this.unionSQL(this.pointsSql, this.polygonsSql))
      .then((count) => {
        this.selectedCount = count;
      });

    Promise.all([p1, p2, p3]).then(() => {
      this.totalCount = this.pointsTotal + this.polygonsTotal;
      this.emit('capitalProjectsUpdated');
    });
  }

  unionSQL(pointsSql, polygonsSql) {
    return `
      ${pointsSql}
      UNION ALL
      ${polygonsSql}
    `;
  }

  getLayerConfig() {
    const { pointsSql, polygonsSql } = this;

    const newLayerConfig = update(defaultLayerConfig, {
      sources: {
        0: {
          options: {
            sql: {
              $set: [pointsSql, polygonsSql],
            },
          },
        },
      },
    });

    return newLayerConfig;
  }

  fetchDetailData(maprojid) {
    // 3 api calls!

    const combined_table = `(
      SELECT the_geom, magency, magencyacro, magencyname, description, totalcommit, maprojid, totalspend, sagencyacro, maxdate, mindate FROM (
        SELECT magency, magencyacro, magencyname, description, totalcommit, maprojid, totalspend, sagencyacro, maxdate, mindate
        FROM cpdb_projects_combined
      ) a LEFT JOIN (
        SELECT the_geom, maprojid as projid FROM cpdb_dcpattributes_pts
        UNION ALL
        SELECT the_geom, maprojid as projid FROM cpdb_dcpattributes_poly
      ) b ON a.maprojid = b.projid
    )x`;

    const getFeature = carto.getFeature(combined_table, 'maprojid', maprojid);
    const getBudgets = carto.SQL(`SELECT * FROM cpdb_budgets WHERE maprojid = '${maprojid}'`, 'json');
    const getCommitments = carto.SQL(`SELECT * FROM cpdb_commitments WHERE maprojid = '${maprojid}' ORDER BY to_date(plancommdate,'MM/YY')`, 'json');

    Promise.all([
      getFeature,
      getBudgets,
      getCommitments,
    ])
      .then((values) => {
        this.detailData = values[0];
        this.detailBudgets = values[1];
        this.detailCommitments = values[2];
        this.emit('detailDataAvailable');
      });
  }

  // updates a single filterDimension, emits an event when everything is updated
  handleFilterDimensionChange(filterDimension, values) {
    this.filterDimensions[filterDimension].values = values;

    // disable dimension if nothing is selected in the multiselects
    if (filterDimension === 'magencyacro' || filterDimension === 'sagencyacro' || filterDimension === 'projecttype') {
      if (values.filter(value => value.checked === true).length > 0) {
        this.filterDimensions[filterDimension].disabled = false;
      } else {
        this.filterDimensions[filterDimension].disabled = true;
      }
    }

    this.updateSql();
  }

  resetFilter() {
    this.filterDimensions = JSON.parse(JSON.stringify(defaultFilterDimensions));
    this.updateSql();
  }

  setSelectedFeatures(features) {
    this.selectedFeatures = features;
    this.emit('selectedFeaturesUpdated');
  }

  // update the sql, get counts, and emit an event
  updateSql() {
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    this.pointsSql = this.sql.replace('tablenameplaceholder', this.sqlConfig.pointsTablename);
    this.polygonsSql = this.sql.replace('tablenameplaceholder', this.sqlConfig.polygonsTablename);

    carto.getCount(this.unionSQL(this.pointsSql, this.polygonsSql))
      .then((count) => {
        this.selectedCount = count;
        this.emit('capitalProjectsUpdated');
      });
  }

  // call local methods when certain events arrive from the dispatcher
  handleActions(action) {
    switch (action.type) {
      case 'CAPITALPROJECTS_FILTERDIMENSION_CHANGE': {
        this.handleFilterDimensionChange(action.filterDimension, action.values);
        break;
      }

      case 'CAPITALPROJECTS_FETCH_DETAIL_DATA': {
        this.fetchDetailData(action.id);
        break;
      }

      case 'CAPTIALPROJECTS_RESET_FILTER': {
        this.resetFilter();
        break;
      }

      case 'CAPTIALPROJECTS_SET_SELECTED_FEATURES': {
        this.setSelectedFeatures(action.features);
        break;
      }

      default:
    }
  }
}

const capitalProjectsStore = new CapitalProjectsStore();
window.capitalProjectsStore = capitalProjectsStore;

dispatcher.register(capitalProjectsStore.handleActions.bind(capitalProjectsStore));

export default capitalProjectsStore;
