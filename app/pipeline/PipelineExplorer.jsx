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
    const mapInit = {
      mapbox_accessToken: appConfig.mapbox_accessToken,
      center: [-74.0058, 40.7094],
      zoom: 13.62,
      minZoom: null,
      maxZoom: null,
      pitch: 0,
      hash: true,
      navigationControlPosition: 'bottom-right',
    };

    const searchConfig = {
      mapzen_api_key: appConfig.mapzen_api_key,
      bounds: {
        minLon: -74.292297,
        maxLon: -73.618011,
        minLat: 40.477248,
        maxLat: 40.958123,
      },
    };

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
