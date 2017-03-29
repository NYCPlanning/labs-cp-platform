import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from './LayerSelector';
import LayerConfig from './LayerConfig';
import Download from '../../common/Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';


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

    let paint;

    if (symbologyDimension === 'dcp_permit_type') {
      paint = {
        property: 'dcp_permit_type',
        type: 'categorical',
        stops: [
          ['New Building', 'rgba(0, 228, 14, 1)'],
          ['Alteration', 'rgba(81, 99, 230, 1)'],
          ['Demolition', 'rgba(234, 62, 62, 1)'],
        ],
      };
    } else {
      paint = {
        property: 'dcp_pipeline_status',
        type: 'categorical',
        stops: [
          ['Application filed', '#edf8e9'],
          ['Permit issued', '#bae4b3'],
          ['Partial complete', '#74c476'],
          ['Complete', '#238b45'],
        ],
      };
    }

    const config = LayerConfig.points;

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
              $set: paint,
            },
          },
        },
      },
    });

    console.log(newConfig)

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
            {content.about}
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default Pipeline;
