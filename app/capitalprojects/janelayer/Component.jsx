import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

import Filter from '../Filter';
import Download from '../../common/Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import CapitalProjectsStore from '../../stores/CapitalProjectsStore';

const CapitalProjects = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      layerConfig: CapitalProjectsStore.getLayerConfig(),
    });
  },

  componentWillMount() {
    // listen for changes to the filter UI
    CapitalProjectsStore.on('capitalProjectsUpdated', () => {
      this.setState({ layerConfig: CapitalProjectsStore.getLayerConfig() }, () => { this.updateLayerConfig(); });
    });

    this.updateLayerConfig();
  },

  updateLayerConfig() {
    // pass the new config up to Jane
    this.props.onUpdate('capital-projects', this.state.layerConfig);
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
              sql={CapitalProjectsStore.pointsSql}
              filePrefix="projects-points"
            />
            <Divider />
            <h3>Polygons</h3>
            <Download
              sql={CapitalProjectsStore.polygonsSql}
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
