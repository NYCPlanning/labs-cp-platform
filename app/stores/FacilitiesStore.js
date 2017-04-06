import EventsEmitter from 'events';
import update from 'react/lib/update';

import dispatcher from '../dispatcher';
import devTables from '../helpers/devTables';
import carto from '../helpers/carto';
import SqlBuilder from '../helpers/SqlBuilder';
import { defaultFilterDimensions, layerConfig } from '../facilities/janelayer/config';

class FacilitiesStore extends EventsEmitter {
  constructor() {
    super();

    this.filterDimensions = defaultFilterDimensions;
    this.sqlChunks = {};
    this.sqlConfig = {
      columns: 'uid, the_geom_webmercator, facdomain, facname, address, factype, opname',
      tablename: devTables('facdb_facilities'),
    };
    this.sqlBuilder = new SqlBuilder(this.sqlConfig.columns, this.sqlConfig.tablename);
    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);

    // get the totalCount
    carto.getCount(this.sql).then((count) => {
      this.totalCount = count;
      this.selectedCount = count;
      this.emit('facilitiesUpdated');
    });
  }

  // builds a new LayerConfig based on sql
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

  // updates a single filterDimension, emits an event when everything is updated
  handleFilterDimensionChange(filterDimension, values) {
    this.filterDimensions[filterDimension].values = values;

    // disable dimension if nothing is selected in the multiselects
    if (filterDimension === 'overabbrev' || 'filterDimension === optype' || 'filterDimension === proptype') {
      if (values.filter(value => value.checked === true).length > 0) {
        this.filterDimensions[filterDimension].disabled = false;
      } else {
        this.filterDimensions[filterDimension].disabled = true;
      }
    }

    this.sql = this.sqlBuilder.buildSql(this.filterDimensions);
    //
    carto.getCount(this.sql).then((count) => {
      this.selectedCount = count;
      this.emit('facilitiesUpdated');
    });
  }

  // // updates symbologyDimension, emits an event when done
  // handleSymbologyDimensionChange(symbologyDimension) {
  //   this.symbologyDimension = symbologyDimension;
  //   this.emit('pipelineUpdated');
  // }
  //
  // getFilterDimensions() {
  //   return this.filterDimensions;
  // }
  //
  // getSymbologyDimension() {
  //   return this.symbologyDimension;
  // }
  //
  // getSql() {
  //   return this.sql;
  // }
  //
  // getDetailData() {
  //   return this.detailData;
  // }
  //
  // fetchDetailData(cartodb_id) {
  //   carto.getFeature(devTables(this.sqlConfig.tablename), 'cartodb_id', cartodb_id)
  //     .then((data) => {
  //       this.detailData = data;
  //       this.emit('detailDataAvailable');
  //     });
  // }

  // do things when certain events arrive from the dispatcher
  handleActions(action) {
    switch (action.type) {
      case 'FACILITIES_FILTERDIMENSION_CHANGE': {
        this.handleFilterDimensionChange(action.filterDimension, action.values);
        break;
      }

      default:
    }
  }
}

const facilitiesStore = new FacilitiesStore();
window.facilitiesStore = facilitiesStore;

dispatcher.register(facilitiesStore.handleActions.bind(facilitiesStore));

export default facilitiesStore;
