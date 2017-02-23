// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';

import appConfig from '../helpers/appConfig';
import content from './content';

import Jane from '../../jane-maps/src';
import JaneLayer from '../../jane-maps/src/JaneLayer';

import supportingLayers from '../janelayers/supportingLayers';

import PipelineComponent from './janelayer/Component';
import PipelineListItem from './janelayer/ListItem';

const PipeLineExplorer = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      showModal: null,
    };
  },

  componentDidMount() {
    document.title = 'NYC Housing Development Explorer';

    const modalShown = JSON.parse(localStorage.getItem('pipeline-splash'));
    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splash,
        modalCloseText: 'Got it.  Let me in!',
      });

      localStorage.setItem('pipeline-splash', 'true');
    }
  },

  render() {
    const mapInit = appConfig.mapInit;
    const searchConfig = appConfig.searchConfig;

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
        >
          <JaneLayer
            {...supportingLayers.aerials}
          />
          <JaneLayer
            {...supportingLayers.adminboundaries}
          />
          <JaneLayer
            {...supportingLayers.transportation}
          />
          <JaneLayer
            id="pipeline"
            name="Housing Pipeline"
            icon="building"
            interactivityMapLayers={['pipeline-points']}
            visible
            selected
            component={PipelineComponent}
            listItem={PipelineListItem}
          />
        </Jane>
      </div>
    );
  },
});

module.exports = PipeLineExplorer;
