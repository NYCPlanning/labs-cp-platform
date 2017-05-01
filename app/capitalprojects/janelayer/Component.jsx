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
    onUpdate: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      onUpdate: () => {},
    };
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

  componentWillUnmount() {
    CapitalProjectsStore.removeAllListeners('capitalProjectsUpdated');
  },

  updateLayerConfig() {
    // pass the new config up to Jane
    const { layerConfig } = this.state;
    layerConfig.legend = (
      <div className="legendSection">
        <div className="legendItem">
          <div className="colorBox" style={{ backgroundColor: '#999' }} />
          <div className="legendItemText">Planned Projects</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{ backgroundColor: '#FFCC00' }} />
          <div className="legendItemText">Ongoing Projects</div>
        </div>
      </div>
    );
    this.props.onUpdate('capital-projects', layerConfig);
  },

  render() {
    // necessary for scrolling in tab Content
    const tabTemplateStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
    };

    return (
      <Tabs
        className="sidebar-tabs"
        tabTemplateStyle={tabTemplateStyle}
      >
        <Tab label="Data">
          <Filter
            updateSQL={this.updateLayerConfig}
            pointsSql={this.state.pointsSql}
            polygonsSql={this.state.polygonsSql}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
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
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              {content.about}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default CapitalProjects;
