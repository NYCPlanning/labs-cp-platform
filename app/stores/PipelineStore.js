import EventsEmitter from 'events';
import update from 'react/lib/update';

import dispatcher from '../dispatcher';
import devTables from '../helpers/devTables';
import { defaultFilterDimensions, LayerConfig, circleColors } from '../pipeline/config';
import carto from '../helpers/carto';

import PipelineSqlBuilder from '../helpers/sqlbuilder/PipelineSqlBuilder';

const initialLoadSql = `SELECT max(dcp_units_use_map) AS max_total_units, min(dcp_units_use_map) AS min_total_units, count(*)
                        FROM pipeline_projects
                        WHERE dcp_pipeline_status NOT IN ('Disapproved or Suspended', 'Application pre-filed')`;

class PipelineStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = defaultFilterDimensions;
    this.sqlChunks = {};
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_permit_type, dcp_units_use_map, dob_permit_address',
      tablename: devTables('pipeline_projects'),
    };
    this.sqlBuilder = new PipelineSqlBuilder(this.sqlConfig.columns, this.sqlConfig.tablename);
    this.symbologyDimension = 'dcp_permit_type';
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);

    carto.SQL(initialLoadSql, 'json').then((data) => {
      this.totalCount = data[0].count;
      this.selectedCount = data[0].count;
      this.emit('pipelineUpdated');
    });
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
    const values = this.filterDimensions.dcp_pipeline_status.values;

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
    const values = this.filterDimensions.dcp_pipeline_status.values;

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
    this.filterDimensions[filterDimension].values = values;

    // if dimension is status, check which items are included and disable/reset date dimensions accordingly
    if (filterDimension === 'dcp_pipeline_status') {
      // Completion Slider
      if (this.completionDateFilterDisabled()) {
        this.filterDimensions.dob_cofo_date = defaultFilterDimensions.dob_cofo_date;
      } else {
        this.filterDimensions.dob_cofo_date.disabled = false;
      }
      // issued slider
      if (this.issueDateFilterDisabled()) {
        this.filterDimensions.dob_qdate = defaultFilterDimensions.dob_qdate;
      } else {
        this.filterDimensions.dob_qdate.disabled = false;
      }
    }

    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);

    carto.getCount(this.sql).then((count) => {
      this.selectedCount = count;
      this.emit('pipelineUpdated');
    });
  }

  // updates symbologyDimension, emits an event when done
  handleSymbologyDimensionChange(symbologyDimension) {
    this.symbologyDimension = symbologyDimension;
    this.emit('pipelineUpdated');
  }

  fetchDetailData(cartodb_id) {
    carto.getFeature(devTables(this.sqlConfig.tablename), 'cartodb_id', cartodb_id)
      .then((data) => {
        this.detailData = data;
        this.emit('detailDataAvailable');
      });
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

      case 'PIPELINE_FETCH_DETAIL_DATA': {
        this.fetchDetailData(action.cartodb_id);
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
