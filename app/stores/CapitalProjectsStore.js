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

    this.filterDimensions = defaultFilterDimensions;
    this.sqlConfig = {
      columns: 'the_geom_webmercator, magency, magencyacro, description, totalcommitspend, maprojid, totalspend',
      pointsTablename: 'cpdb_map_pts',
      polygonsTablename: 'cpdb_map_poly',
    };
    this.sqlBuilder = new CapitalProjectsSqlBuilder(this.sqlConfig.columns, 'tablenameplaceholder');

    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    this.pointsSql = this.sql.replace('tablenameplaceholder', this.sqlConfig.pointsTablename);
    this.polygonsSql = this.sql.replace('tablenameplaceholder', this.sqlConfig.polygonsTablename);

    // // get the totalCount
    carto.getCount(this.unionSQL(this.pointsSql, this.polygonsSql))
      .then((count) => {
        this.totalCount = count;
        this.selectedCount = count;
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

  // updates a single filterDimension, emits an event when everything is updated
  handleFilterDimensionChange(filterDimension, values) {
    this.filterDimensions[filterDimension].values = values;

    // disable dimension if nothing is selected in the multiselects
    if (filterDimension === 'magencyacro' || filterDimension === 'projecttype') {
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
      default:
    }
  }
}

const capitalProjectsStore = new CapitalProjectsStore();
window.capitalProjectsStore = capitalProjectsStore;

dispatcher.register(capitalProjectsStore.handleActions.bind(capitalProjectsStore));

export default capitalProjectsStore;
