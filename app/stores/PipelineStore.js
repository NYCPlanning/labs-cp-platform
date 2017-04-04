import EventsEmitter from 'events';
import update from 'react/lib/update';

import dispatcher from '../dispatcher';
import devTables from '../helpers/devTables';
import { defaultFilterDimensions, LayerConfig, circleColors } from '../pipeline/janelayer/config';

class PipelineStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = defaultFilterDimensions;
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_permit_type, dcp_units_use_map, dob_permit_address',
      tablename: devTables('pipeline_projects'),
    };
    this.symbologyDimension = 'dcp_permit_type';
    this.sql = this.buildSQL();
  }

  // builds a new LayerConfig based on sql and symbologyDimension
  getLayerConfig() {
    const { sql, symbologyDimension } = this;

    const config = LayerConfig.points;

    const circleColor = (symbologyDimension === 'dcp_permit_type') ?
      circleColors.dcp_permit_type :
      circleColors.dcp_pipeline_status;

    // set the sql for the vector source
    const newConfig = update(config, {
      sources: {
        0: {
          options: {
            sql: {
              $set: [sql],
            },
          },
        },
      },
      mapLayers: {
        0: {
          paint: {
            'circle-color': {
              $set: circleColor,
            },
          },
        },
      },
    });

    return newConfig;
  }

  // returns boolean, depends on which status is selected
  // this is used by this store to reset values, AND by the view layer to disable sliders
  issueDateFilterDisabled() {
    const values = this.filterDimensions.dcp_pipeline_status;

    let invalid = false;
    values.forEach((value) => {
      if (value.checked) {
        if (value.value === 'Application filed') {
          invalid = true;
        }
      }
    });

    return invalid;
  }

  // returns boolean, depends on which status is selected
  // this is used by this store to reset values, AND by the view layer to disable sliders
  completionDateFilterDisabled() {
    const values = this.filterDimensions.dcp_pipeline_status;

    let invalid = false;
    values.forEach((value) => {
      if (value.checked) {
        if (value.value === 'Permit issued' || value.value === 'Application filed') {
          invalid = true;
        }
      }
    });

    return invalid;
  }

  // updates a single filterDimension, emits an event when everything is updated
  handleFilterDimensionChange(filterDimension, values) {
    this.filterDimensions[filterDimension] = values;

    // if dimension is status, check which items are included and disable/reset date dimensions accordingly
    if (filterDimension === 'dcp_pipeline_status') {
      // Completion Slider
      if (this.completionDateFilterDisabled()) {
        this.filterDimensions.dob_cofo_date = [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')]; // eslint-disable-line
      }
      // issued slider
      if (this.issueDateFilterDisabled()) {
        this.filterDimensions.dob_qdate = [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')]; // eslint-disable-line
      }
    }

    this.sql = this.buildSQL();

    this.emit('filterDimensionsChanged');
  }

  // updates symbologyDimension, emits an event when done
  handleSymbologyDimensionChange(symbologyDimension) {
    this.symbologyDimension = symbologyDimension;
    this.emit('filterDimensionsChanged');
  }

  // returns new sql based on the current filterDimensions
  buildSQL() {
    this.createSQLChunks();

    const sqlTemplate = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE `;

    const chunksArray = [];

    // convert chunks object to array
    Object.keys(this.sqlChunks).forEach(key => chunksArray.push(this.sqlChunks[key]));

    const chunksString = chunksArray.join(' AND ');

    const sql = sqlTemplate + chunksString;

    return sql;
  }

  // generate SQL WHERE partials for each filter dimension
  createSQLChunks() {
    this.sqlChunks = {};

    this.createCheckboxSQLChunk('dcp_pipeline_status', this.filterDimensions.dcp_pipeline_status);
    this.createCheckboxSQLChunk('dcp_permit_type', this.filterDimensions.dcp_permit_type);
    this.createCheckboxSQLChunk('dcp_development_type', this.filterDimensions.dcp_development_type);
    this.createUnitsSQLChunk('dcp_units_use_map', this.filterDimensions.dcp_units_use_map);

    this.createDateSQLChunk('dob_qdate', this.filterDimensions.dob_qdate);

    if (!this.completionDateFilterDisabled()) {
      this.createDateSQLChunk('dob_cofo_date', this.filterDimensions.dob_cofo_date);
    }

    if (!this.issueDateFilterDisabled()) {
      this.createDateSQLChunk('dob_qdate', this.filterDimensions.dob_qdate);
    }
  }

  // SQL WHERE partial builder for Checkboxes
  createCheckboxSQLChunk(dimension, values) {
    // inject some additional values to handle the demolition use className
    // demolitions where permit is issues should also show up under searches for complete.
    const demolitionIsSelected = this.filterDimensions.dcp_permit_type.filter(d => d.value === 'Demolition').length > 0;
    const completeIsSelected = values.filter(d => d.value === 'Complete').length > 0;
    const permitIssuedIsSelected = values.filter(d => d.value === 'Permit issued').length > 0;

    const checkedValues = values.filter(value => value.checked === true);

    const subChunks = checkedValues.map(value => `${dimension} = '${value.value}'`);

    if (dimension === 'dcp_pipeline_status' && demolitionIsSelected && (completeIsSelected || permitIssuedIsSelected)) {
      subChunks.push('dcp_pipeline_status = \'Demolition (complete)\'');
    }

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      this.sqlChunks[dimension] = chunk;
    } else {
      this.sqlChunks[dimension] = 'FALSE'; // if no options are cheked, make the resulting SQL return no rows
    }
  }

  // SQL WHERE partial builder for Date Range Sliders
  createDateSQLChunk(dimension, range) {
    const dateRangeFormatted = {
      from: moment(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    if (dimension === 'dob_cofo_date') {
      this.sqlChunks[dimension] = `NOT (dob_cofo_date_first >= '${dateRangeFormatted.to}' OR dob_cofo_date_last <= '${dateRangeFormatted.from}')`;
    }

    if (dimension === 'dob_qdate') {
      this.sqlChunks[dimension] = `(dob_qdate >= '${dateRangeFormatted.from}' AND dob_qdate <= '${dateRangeFormatted.to}')`;
    }
  }

  // SQL WHERE partial builder for Unit Count Slider
  createUnitsSQLChunk(dimension, range) {
    this.sqlChunks[dimension] = `(dcp_units_use_map >= '${range[0]}' AND dcp_units_use_map <= '${range[1]}')`;
  }

  getFilterDimensions() {
    return this.filterDimensions;
  }

  getSymbologyDimension() {
    return this.symbologyDimension;
  }

  getSql() {
    return this.sql;
  }

  // do things when certain events arrive from the dispatcher
  handleActions(action) {
    switch (action.type) {
      case 'PIPELINE_FILTERDIMENSION_CHANGE': {
        this.handleFilterDimensionChange(action.filterDimension, action.values);
        break;
      }

      case 'PIPELINE_SYMBOLOGYDIMENSION_CHANGE': {
        this.handleSymbologyDimensionChange(action.symbologyDimension);
        break;
      }

      default:
    }
  }
}

const pipelineStore = new PipelineStore();
window.pipelineStore = pipelineStore;

dispatcher.register(pipelineStore.handleActions.bind(pipelineStore));

export default pipelineStore;
