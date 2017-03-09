import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

import Filter from './Filter';
import Download from '../../common/Download';
import content from '../content';
import defaultlayerConfig from './defaultLayerConfig';
import SignupPrompt from '../../common/SignupPrompt';

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
            pointsSql={this.state.pointsSql}
            polygonsSql={this.state.polygonsSql}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content padded">
            <h3>Points</h3>
            <Download
              sql={this.state.pointsSql}
              filePrefix="projects-points"
            />
            <Divider />
            <h3>Polygons</h3>
            <Download
              sql={this.state.polygonsSql}
              filePrefix="projects-polygons"
            />
            <SignupPrompt />
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content padded">
            {content.about}
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default CapitalProjects;
