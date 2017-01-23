import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';

import Filter from './Filter';
import content from '../content';
import defaultlayerConfig from './defaultLayerConfig';

const CapitalProjects = React.createClass({

  propTypes: {
    onUpdate: React.PropTypes.func,
  },
  // updates the sql for the map source
  updateLayerConfig(pointsSql, polygonsSql) {
    // use this method to build new mapConfig based on mode

    const newLayerConfig = update(defaultlayerConfig, {
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

    this.sendNewConfig(newLayerConfig);
  },

  // sends the new layerConfig up the chain
  sendNewConfig(layerConfig) {
    this.props.onUpdate('capital-projects', {
      sources: layerConfig.sources,
      mapLayers: layerConfig.mapLayers,
      legend: layerConfig.legend,
    });
  },

  render() {
    return (
      <Tabs className="sidebar-tabs">
        <Tab label="Data">
          <Filter
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <h4>Data Downloads</h4>
            <p>Custom data downloads are currently in development.  Please check back again soon.</p>
          </div>
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

export default CapitalProjects;
