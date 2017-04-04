import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from './LayerSelector';

import Download from '../../common/Download';
import { about } from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import PipelineStore from '../../stores/PipelineStore';


const Pipeline = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      layerConfig: PipelineStore.getLayerConfig(),
    });
  },

  componentWillMount() {
    // listen for changes to the filter UI
    PipelineStore.on('filterDimensionsChanged', () => {
      this.setState({ layerConfig: PipelineStore.getLayerConfig() }, () => { this.updateLayerConfig(); });
    });

    this.updateLayerConfig();
  },

  updateLayerConfig() {
    // pass the new config up to Jane
    this.props.onUpdate('pipeline', this.state.layerConfig);
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
          <LayerSelector />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content padded">
            <Download
              store={PipelineStore}
              filePrefix="developments"
            />
            <SignupPrompt />
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content padded">
            {about}
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default Pipeline;
