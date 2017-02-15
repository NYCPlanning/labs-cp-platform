// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';

import appConfig from '../helpers/appConfig';
import content from './content';

import Jane from '../../jane-maps/src';
import PipelineJaneLayer from './pipelinejanelayer';

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries';
import TransportationJaneLayer from '../janelayers/transportation';
import ImageryJaneLayer from '../janelayers/imagery';

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

    const mapConfig = {
      selectedLayer: 'pipeline',
      layers: [
        ImageryJaneLayer,
        AdminBoundariesJaneLayer,
        TransportationJaneLayer,
        PipelineJaneLayer,
      ],
    };

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          mapConfig={mapConfig}
        />
      </div>
    );
  },
});

module.exports = PipeLineExplorer;
