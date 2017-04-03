import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from './LayerSelector';
import { LayerConfig, circleColors } from './config';
import Download from '../../common/Download';
import { about } from '../content';
import SignupPrompt from '../../common/SignupPrompt';

import PipelineStore from '../../stores/PipelineStore';
import * as PipelineActions from '../../actions/PipelineActions';

const Pipeline = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      sql: '',
      symbologyDimension: 'dcp_permit_type',
    });
  },

  updateSQL(sql) {
    this.sql = sql;
    this.setState({ sql }, this.updateLayerConfig);
  },

  updateLayerConfig() {
    // use this method to build new mapConfig based on mode

    const { sql, symbologyDimension } = this.state;

    const config = LayerConfig.points;

    const circleColor = (symbologyDimension === 'dcp_permit_type') ?
      circleColors.dcp_permit_type :
      circleColors.dcp_pipeline_status;

    // set the sql for the vector source
    const newConfig = update(config, {
      sources: {
        0: {
          options: {
            sql: {
              $set: [sql],
            },
          },
        },
      },
      mapLayers: {
        0: {
          paint: {
            'circle-color': {
              $set: circleColor,
            },
          },
        },
      },
    });

    // update the layer config
    this.sendNewConfig(newConfig);
  },

  sendNewConfig(newConfig) {
    // pass the new config up to Jane
    this.props.onUpdate('pipeline', {
      sources: newConfig.sources,
      mapLayers: newConfig.mapLayers,
      // legend: newConfig.legend,
    });
  },

  handleSymbologyDimensionChange(symbologyDimension) {
    this.setState({ symbologyDimension }, this.updateLayerConfig);
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
          <LayerSelector
            symbologyDimension={this.state.symbologyDimension}
            onSymbologyDimensionChange={this.handleSymbologyDimensionChange}
            updateSQL={this.updateSQL}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content padded">
            <Download
              sql={this.state.sql}
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
