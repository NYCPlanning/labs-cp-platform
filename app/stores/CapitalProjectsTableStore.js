/* eslint-disable  class-methods-use-this */

import EventsEmitter from 'events';

import dispatcher from '../dispatcher';
import carto from '../helpers/carto';
import CapitalProjectsSqlBuilder from '../helpers/sqlbuilder/CapitalProjectsSqlBuilder';
import { defaultTableFilterDimensions } from '../capitalprojects/config';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

class CapitalProjectsTableStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = JSON.parse(JSON.stringify(defaultTableFilterDimensions));
    this.colSortDirs = {
      maprojid: 'DESC',
    };

    this.sqlConfig = {
      columns: 'magency, magencyacro, sagencyacro, maprojid, description, totalcommit, totalspend, projecttype',
      tableName: 'cpdb_projects_combined',
      commitmentsTableName: 'cpdb_commitments',
    };
    // this.sqlBuilder = new CapitalProjectsSqlBuilder(this.sqlConfig.columns, this.sqlConfig.tableName);
    this.sqlBuilder = new CapitalProjectsSqlBuilder(this.sqlConfig.columns, this.sqlConfig.tableName);

    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    this.commitmentsSql = 'SELECT * FROM cpdb_commitments';
  }

  initialize() {
    carto.getCount(this.sql)
      .then((count) => {
        this.totalCount = count;
        this.selectedCount = count;
        this.emit('updated');
      });

    carto.SQL(this.sql, 'json')
      .then((data) => {
        this.data = data;
        this.filterAndSortData();
        this.emit('updatedTableData');
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

  getRawData() {
    carto.SQL(this.sql, 'json')
      .then((data) => {
        this.data = data;
        this.filterAndSortData();
      });
  }

  // update the sql, get counts, and emit an event
  updateSql() {
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    this.commitmentsSql = `SELECT * FROM cpdb_commitments a WHERE a.maprojid IN (SELECT b.maprojid FROM (${this.sql}) b)`;

    this.getRawData();

    carto.getCount(this.sql)
      .then((count) => {
        this.selectedCount = count;
        this.emit('updated');
      });
  }

  handleFilterBy(filterBy) {
    this.filterBy = filterBy;
    this.filterAndSortData();
  }

  handleSortChange(columnKey, sortDir) {
    this.colSortDirs = { [columnKey]: sortDir };
    this.filterAndSortData();
  }

  filterAndSortData() {
    const filteredSortedData = [];

    const { filterBy, data, colSortDirs } = this;


    // filter
    if (filterBy) {
      for (let i = 0; i < data.length; i += 1) {
        const { maprojid, description } = data[i];
        if (
          maprojid.toLowerCase().indexOf(filterBy) !== -1 ||
          description.toLowerCase().indexOf(filterBy) !== -1
        ) {
          filteredSortedData.push(data[i]);
        }
      }
    } else {
      for (let i = 0; i < data.length; i += 1) {
        filteredSortedData.push(data[i]);
      }
    }


    // sort
    const columnKey = Object.keys(colSortDirs)[0];
    const sortDir = this.colSortDirs[columnKey];

    filteredSortedData.sort((a, b) => {
      let sortVal = 0;
      if (a[columnKey] > b[columnKey]) sortVal = 1;
      if (a[columnKey] < b[columnKey]) sortVal = -1;

      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal *= -1;
      }

      return sortVal;
    });

    this.filteredSortedData = filteredSortedData;
    this.emit('updatedTableData');
  }

  resetFilter() {
    this.filterDimensions = JSON.parse(JSON.stringify(defaultTableFilterDimensions));
    this.updateSql();
  }

  // call local methods when certain events arrive from the dispatcher
  handleActions(action) {
    switch (action.type) {
      case 'CAPITALPROJECTS_TABLE_FILTERDIMENSION_CHANGE': {
        this.handleFilterDimensionChange(action.filterDimension, action.values);
        break;
      }

      case 'CAPITALPROJECTS_TABLE_FILTERBY': {
        this.handleFilterBy(action.filterBy);
        break;
      }

      case 'CAPITALPROJECTS_TABLE_SORTCHANGE': {
        this.handleSortChange(action.columnKey, action.sortDir);
        break;
      }

      case 'CAPTIALPROJECTS_TABLE_RESET_FILTER': {
        this.resetFilter();
        break;
      }

      default:
    }
  }
}

const capitalProjectsStore = new CapitalProjectsTableStore();
window.capitalProjectsStore = capitalProjectsStore;

dispatcher.register(capitalProjectsStore.handleActions.bind(capitalProjectsStore));

export default capitalProjectsStore;