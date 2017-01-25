import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'underscore';

import LayerSelector from './LayerSelector';
import LayerConfig from './LayerConfig';
import Download from '../../common/Download';
import content from '../content';

import Carto from '../../helpers/carto';
import choropleth from '../../helpers/choropleth';

const Pipeline = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func,
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

    const dropdownStyles = {
      paddingLeft: '16px',
    };

    return (
      <Tabs className="sidebar-tabs">
        <Tab label="Data">
          <SelectField
            value={this.state.mode}
            onChange={toggleMode}
            labelStyle={dropdownStyles}
            fullWidth
          >
            <MenuItem value={'points'} primaryText="Points" />
            <MenuItem value={'polygons'} primaryText="Choropleth" />
          </SelectField>
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
