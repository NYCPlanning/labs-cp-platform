/* eslint-disable  class-methods-use-this */

import EventsEmitter from 'events';

import dispatcher from '../dispatcher';
import carto from '../helpers/carto';
import CapitalProjectsSqlBuilder from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';
import { defaultTableFilterDimensions } from '../capitalprojects/config';


class CapitalProjectsStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = defaultTableFilterDimensions;
    this.sqlConfig = {
      columns: 'magency, magencyacro, maprojid, description, totalcommit, totalspend, projecttype',
      tableName: 'cpdb_map_combined',
    };
    this.sqlBuilder = new CapitalProjectsSqlBuilder(this.sqlConfig.columns, this.sqlConfig.tableName);

    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);

    // get the totalCount
    carto.getCount(this.sql)
      .then((count) => {
        this.totalCount = count;
        this.selectedCount = count;
        this.emit('updated');
      });
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

  getData() {
    return new Promise((resolve, reject) => {
      carto.SQL(this.sql, 'json')
        .then((data) => { resolve(data); })
        .catch((err) => { reject(err); });
    });
  }

  // update the sql, get counts, and emit an event
  updateSql() {
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);

    carto.getCount(this.sql)
      .then((count) => {
        this.selectedCount = count;
        this.emit('updated');
      });
  }

  // call local methods when certain events arrive from the dispatcher
  handleActions(action) {
    switch (action.type) {
      case 'CAPITALPROJECTS_TABLE_FILTERDIMENSION_CHANGE': {
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
