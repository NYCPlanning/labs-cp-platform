import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import appConfig from '../../helpers/appConfig';

const SCAPlanComponent = createReactClass({
  propTypes: {
    onUpdate: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onUpdate: () => {},
    };
  },

  componentWillMount() {
    this.updateLayerConfig();
  },

  updateLayerConfig() {
    // pass the new config up to Jane
    const layerConfig = {
      sources: [
        {
          id: 'sca-points',
          type: 'cartovector',
          options: {
            carto_user: appConfig.carto_user,
            carto_domain: appConfig.carto_domain,
            sql: ['SELECT * FROM cpdb_sca_pts'],
          },
        },
      ],

      mapLayers: [
        {
          id: 'sca-points',
          source: 'sca-points',
          'source-layer': 'layer0',
          type: 'circle',
          paint: {
            'circle-radius': 5,
            'circle-color': 'steelblue',
            'circle-opacity': 0.8,
          },
        },
      ],
    };

    layerConfig.legend = (
      <div className="legendSection">
        SCA Capital Projects
      </div>
    );
    this.props.onUpdate('scaplan', layerConfig);
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
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              This data is from the SCA
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  },
});

export default SCAPlanComponent;
