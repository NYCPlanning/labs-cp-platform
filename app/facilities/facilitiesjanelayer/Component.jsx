import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';
import Moment from 'moment';

import LayerSelector from './LayerSelector';
import Download from '../../common/Download';
import content from '../content';

import defaultLayerConfig from './defaultlayerconfig';

import Carto from '../../helpers/carto';

const Facilities = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func,
    context: React.PropTypes.shape({
      mode: React.PropTypes.string,
    }),
  },

  getInitialState() {
    return { sql: '' };
  },

  componentDidMount() {
    this.renderLegend();
  },

  // updates the sql for the map source
  updateLayerConfig(sql) {
    this.setState({ sql });

    const newLayerConfig = update(defaultLayerConfig, {
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

    this.sendNewConfig(newLayerConfig);
  },

  // sends the new layerConfig up the chain
  sendNewConfig(layerConfig) {
    this.props.onUpdate('facilities', {
      sources: layerConfig.sources,
      mapLayers: layerConfig.mapLayers,
    });
  },

  // builds a legend with a composed date range, updates layer config,
  // updates the layerconfig and sends it up to Jane
  renderLegend() {
    const self = this;
    const sql = `
      WITH temp AS (
        SELECT
        unnest(string_to_array(datesourceupdated,',')) as date
        FROM hkates.facilities_data
        WHERE datesourceupdated NOT LIKE '%NULL%'
      )

      SELECT
      min(date::date) as min,
      max(date::date) as max
      FROM temp
    `;

    Carto.SQL(sql, 'json')
      .then((data) => {
        const range = {
          min: Moment(data[0].min).format('MM/DD/YYYY'),
          max: Moment(data[0].max).format('MM/DD/YYYY'),
        };

        const legendContent = (
          <div className="legendSection">
            <p>Click on the map for facility details</p>
            <p>Data current as of {range.min} - {range.max}</p>
          </div>
        );

        const newLayer = update(self.props.layer, {
          legend: {
            $set: legendContent,
          },
        });

        this.props.onUpdate('facilities', newLayer);
      });
  },

  render() {
    return (
      <Tabs className="sidebar-tabs">
        <Tab label="Data">
          <LayerSelector
            mode={this.props.context.mode}
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="Download">
          <Download
            sql={this.state.sql}
            filePrefix="facilities"
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

export default Facilities;
