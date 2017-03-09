import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from './LayerSelector';
import Download from '../../common/Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';

import defaultLayerConfig from './defaultlayerconfig';

const Facilities = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
    layer: React.PropTypes.object.isRequired,
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

    const legendContent = (
      <div className="legendSection">
        <p>Disclaimer: This map aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. Not all sites are service locations, among other limitations. <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers">Read more</a>.</p>
      </div>
    );

    const newLayer = update(self.props.layer, {
      legend: {
        $set: legendContent,
      },
    });

    this.props.onUpdate('facilities', newLayer);
  },

  render() {
    const tabStyle = {
      backgroundColor: '#b1b1b1',
    };

    const inkBarStyle = {
      backgroundColor: '#D96B27',
    };

    // necessary for scrolling in tab Content
    const tabTemplateStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
    };

    return (
      <Tabs
        className="sidebar-tabs"
        tabItemContainerStyle={tabStyle}
        tabTemplateStyle={tabTemplateStyle}
        inkBarStyle={inkBarStyle}
      >
        <Tab label="Data">
          <LayerSelector
            layers={this.props.layer.initialState && this.props.layer.initialState.layers}
            filterDimensions={this.props.layer.initialState && this.props.layer.initialState.filterDimensions}
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content padded">
            <Download
              sql={this.state.sql}
              filePrefix="facilities"
            />
            <SignupPrompt />
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content padded">
            {content.about}
            <SignupPrompt />
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default Facilities;
