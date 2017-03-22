import React from 'react';
import update from 'react/lib/update';
import { Tabs, Tab } from 'material-ui/Tabs';

import LayerSelector from './LayerSelector';
import LayerConfig from './LayerConfig';
import Download from '../../common/Download';
import content from '../content';

const Pipeline = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({ sql: '' });
  },

  updateLayerConfig(sql) {
    // use this method to build new mapConfig based on mode
    this.sql = sql;
    this.setState({ sql });

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
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="Download">
          <Download
            sql={this.state.sql}
            filePrefix="developments"
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

export default Pipeline;
