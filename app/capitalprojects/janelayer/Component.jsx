import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

import Filter from '../Filter';
import Download from '../Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';
import CapitalProjectsStore from '../../stores/CapitalProjectsStore';

const CapitalProjects = createReactClass({
  propTypes: {
    onUpdate: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onUpdate: () => {},
    };
  },

  getInitialState() {
    return ({
      mapConfig: CapitalProjectsStore.mapConfig,
      pointsSql: CapitalProjectsStore.pointsSql,
      polygonsSql: CapitalProjectsStore.polygonsSql,
      totalCount: CapitalProjectsStore.totalCount,
      selectedCount: CapitalProjectsStore.selectedCount,
      filterDimensions: CapitalProjectsStore.filterDimensions,
    });
  },

  componentWillMount() {
    // listen for changes to the filter UI
    CapitalProjectsStore.on('capitalProjectsUpdated', () => {
      this.setState({
        mapConfig: CapitalProjectsStore.mapConfig,
        pointsSql: CapitalProjectsStore.pointsSql,
        polygonsSql: CapitalProjectsStore.polygonsSql,
        totalCount: CapitalProjectsStore.totalCount,
        selectedCount: CapitalProjectsStore.selectedCount,
        filterDimensions: CapitalProjectsStore.filterDimensions,
      });
    });

    CapitalProjectsStore.initialize();
  },

  componentWillUnmount() {
    CapitalProjectsStore.removeAllListeners('capitalProjectsUpdated');
  },

  componentDidUpdate() {
    this.updateMapConfig();
  },

  handleDownload(label) {
    ga.event({
      category: 'capitalprojects-explorer',
      action: 'download',
      label,
    });
  },

  updateMapConfig() {
    // pass the new config up to Jane
    const { mapConfig } = this.state;
    mapConfig.legend = (
      <div className="legendSection">
        <div className="legendItem">
          <div className="colorBox" style={{ backgroundColor: '#8B8C98' }} />
          <div className="legendItemText">Planned Projects</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{ backgroundColor: '#d98127' }} />
          <div className="legendItemText">Ongoing Projects</div>
        </div>
      </div>
    );
    this.props.onUpdate(mapConfig);
  },

  render() {
    const { pointsSql, polygonsSql, totalCount, selectedCount, filterDimensions } = this.state;

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
            pointsSql={pointsSql}
            polygonsSql={polygonsSql}
            totalCount={totalCount}
            selectedCount={selectedCount}
            filterDimensions={filterDimensions}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <Download
                pointsSql={CapitalProjectsStore.pointsSql}
                polygonsSql={CapitalProjectsStore.polygonsSql}
                pointsPrefix="projects-points"
                polygonsPrefix="projects-polygons"
                onDownload={this.handleDownload}
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
