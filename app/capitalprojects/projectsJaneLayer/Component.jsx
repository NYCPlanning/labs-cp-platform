import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

import Filter from './Filter';
import Download from '../../common/Download';
import content from '../content';
import defaultlayerConfig from './defaultLayerConfig';

const CapitalProjects = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      pointsSql: '',
      polygonsSql: '',
    });
  },

  // updates the sql for the map source
  updateLayerConfig(pointsSql, polygonsSql) {
    this.setState({
      pointsSql,
      polygonsSql,
    });

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
          <h4 style={{ paddingLeft: '16px' }}>Points</h4>
          <Download
            sql={this.state.pointsSql}
            filePrefix="projects-points"
          />
          <Divider />
          <h4 style={{ paddingLeft: '16px' }}>Polygons</h4>
          <Download
            sql={this.state.polygonsSql}
            filePrefix="projects-polygons"
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

export default CapitalProjects;
