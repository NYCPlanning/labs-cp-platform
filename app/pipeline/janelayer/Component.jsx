import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from '../LayerSelector';

import Download from '../../common/Download';
import { about } from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';
import PipelineStore from '../../stores/PipelineStore';


const Pipeline = createReactClass({
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
      mapConfig: PipelineStore.mapConfig,
      totalCount: PipelineStore.totalCount,
      selectedCount: PipelineStore.selectedCount,
      filterDimensions: PipelineStore.filterDimensions,
      symbologyDimension: PipelineStore.symbologyDimension,
    });
  },

  componentWillMount() {
    // listen for changes to the filter UI
    PipelineStore.on('pipelineUpdated', () => {
      this.setState({
        mapConfig: PipelineStore.mapConfig,
        totalCount: PipelineStore.totalCount,
        selectedCount: PipelineStore.selectedCount,
        filterDimensions: PipelineStore.filterDimensions,
        symbologyDimension: PipelineStore.symbologyDimension,
      });
    });

    PipelineStore.initialize();
  },

  componentWillUnmount() {
    PipelineStore.removeAllListeners('pipelineUpdated');
  },

  componentDidUpdate() {
    this.updateMapConfig();
  },

  handleDownload(label) {
    ga.event({
      category: 'pipeline-explorer',
      action: 'download',
      label,
    });
  },

  updateMapConfig() {
    const { mapConfig } = this.state;
    this.props.onUpdate(mapConfig);
  },

  render() {
    const {
      totalCount,
      selectedCount,
      filterDimensions,
      symbologyDimension,
    } = this.state;

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
          <LayerSelector
            totalCount={totalCount}
            selectedCount={selectedCount}
            filterDimensions={filterDimensions}
            symbologyDimension={symbologyDimension}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <Download
                sql={PipelineStore.sql}
                filePrefix="developments"
                onDownload={this.handleDownload}
              />
              <SignupPrompt />
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              {about}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default Pipeline;
