import EventsEmitter from 'events';
import update from 'react/lib/update';

import dispatcher from '../dispatcher';
import devTables from '../helpers/devTables';
import { defaultFilterDimensions, LayerConfig, circleColors } from '../pipeline/janelayer/config';
import carto from '../helpers/carto';

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

    carto.getCount(this.sql).then((count) => {
      this.totalCount = count;
      this.selectedCount = count;

      this.emit('filterDimensionsChanged');
    });
  }

  getLayerConfig() {
    // use this method to build new mapConfig based on mode

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

    carto.getCount(this.sql).then((count) => {
      this.selectedCount = count;
      this.emit('filterDimensionsChanged');
    });
  }

  handleSymbologyDimensionChange(symbologyDimension) {
    this.symbologyDimension = symbologyDimension;
    this.emit('filterDimensionsChanged');
  }

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

  createSQLChunks() {
    this.sqlChunks = {};
    // generate SQL WHERE partials for each filter dimension
    this.createCheckboxSQLChunk('dcp_pipeline_status', this.filterDimensions.dcp_pipeline_status);
    this.createCheckboxSQLChunk('dcp_permit_type', this.filterDimensions.dcp_permit_type);
    this.createCheckboxSQLChunk('dcp_development_type', this.filterDimensions.dcp_development_type);
    this.createUnitsSQLChunk('dcp_units_use_map', this.filterDimensions.dcp_units_use_map);

    this.createDateSQLChunk('dob_qdate', this.filterDimensions.dob_qdate);

    // if (!this.state.completionDateFilterDisabled) {
    //   this.createDateSQLChunk('dob_cofo_date', this.filterDimensions.dob_cofo_date);
    // }

    // if (!this.state.issueDateFilterDisabled) {
    //   this.createDateSQLChunk('dob_qdate', this.filterDimensions.dob_qdate);
    // }
  }

  createCheckboxSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')

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

  createUnitsSQLChunk(dimension, range) {
    this.sqlChunks[dimension] = `(dcp_units_use_map >= '${range[0]}' AND dcp_units_use_map <= '${range[1]}')`;
  }

  getFilterDimensions() {
    return this.filterDimensions;
  }

  getSymbologyDimension() {
    return this.symbologyDimension;
  }

  getCount() {
    return carto.getCount(this.sql);
  }

  getSql() {
    return this.sql;
  }

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

    // handle appropriate actions
  }
}

const pipelineStore = new PipelineStore();
dispatcher.register(pipelineStore.handleActions.bind(pipelineStore));

export default pipelineStore;
