import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import _ from 'underscore';

import LayerSelector from './LayerSelector';
import LayerConfig from './LayerConfig';
import Download from '../../common/Download';
import content from '../content';

import Carto from '../../helpers/carto';
import choropleth from '../../helpers/choropleth';
import InfoIcon from '../../common/InfoIcon';

const Pipeline = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({ mode: 'points', sql: '' });
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.mode !== prevState.mode) {
      this.updateLayerConfig(this.sql);
    }
  },

  updateLayerConfig(sql) {
    // use this method to build new mapConfig based on mode
    const self = this;
    this.sql = sql;
    this.setState({ sql });

    if (this.state.mode === 'points') {
      const config = LayerConfig.points;

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
      });

      // update the layer config
      this.sendNewConfig(newConfig);
    }

    if (this.state.mode === 'polygons') {
      // we need all the data client-side to figure out styling/breaks so a vector tile source will not work

      // get geojson

      const groupSQL = `
        WITH data as (SELECT a.the_geom, a.borocd, a.dcp_units_use_map FROM nchatterjee.dob_permits_cofos_hpd_geocode a RIGHT JOIN (${sql}) b ON a.cartodb_id = b.cartodb_id)

        SELECT a.the_geom, a.the_geom_webmercator, a.borocd, b.delta
        FROM dcp_cdboundaries a
        LEFT JOIN (
          SELECT borocd, SUM(dcp_units_use_map) as delta FROM data
            GROUP BY borocd
        ) b
        ON a.borocd::text = b.borocd
      `;

      Carto.SQL(groupSQL)
        .then((data) => {
          const paint = _.extend({
            'fill-outline-color': 'white',
            'fill-opacity': 0.75,

          }, choropleth(data, {
            valueProperty: 'delta',
            scale: ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'],
            steps: 5,
            mode: 'q',
          }));


          const newConfig = {
            sources: [
              {
                id: 'pipeline-polygons',
                type: 'geojson',
                data,
              },
            ],
            mapLayers: [
              {
                id: 'pipeline-polygons',
                source: 'pipeline-polygons',
                type: 'fill',
                paint,
              },
            ],
            legend: (
              <div className="legend-section">
                Legend
              </div>
            ),
          };

          self.sendNewConfig(newConfig);
        });
    }
  },

  sendNewConfig(newConfig) {
    // pass the new config up to Jane
    this.props.onUpdate('pipeline', {
      sources: newConfig.sources,
      mapLayers: newConfig.mapLayers,
      legend: newConfig.legend,
    });
  },

  render() {
    const self = this;

    function toggleMode(event, index, value) {
      self.setState({ mode: value });
    }

    return (
      <Tabs className="sidebar-tabs">
        <Tab label="Data">
          <Subheader
            style={{
              lineHeight: '30px',
              paddingTop: '12px',
            }}
          >
            Mode
            <InfoIcon text="Toggles the map view between point data representing individual projects and area bins colored by unit totals." />
          </Subheader>
          <DropDownMenu
            value={this.state.mode}
            onChange={toggleMode}
            style={{
              marginBottom: '16px',
              marginLeft: '16px',
              marginTop: '-8px',
            }}
            iconStyle={{
              fill: '#999',
            }}
          >
            <MenuItem value={'points'} primaryText="Point Data" />
            <MenuItem value={'polygons'} primaryText="Aggregate Data" />
          </DropDownMenu>
          <Divider />
          <LayerSelector
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="Download">
          <Download
            sql={this.state.sql}
            filePrefix="developments"
          />
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            {content.about}
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default Pipeline;