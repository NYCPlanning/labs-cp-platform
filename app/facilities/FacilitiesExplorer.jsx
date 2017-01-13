// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';

import Jane from '../../jane-maps/src';
import content from './content';

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries';
import FacilitiesJaneLayer from './facilitiesjanelayer';
import TransportationJaneLayer from '../janelayers/transportation';
import ImageryJaneLayer from '../janelayers/imagery';
import GrayOutsideNyc from '../janelayers/grayoutsidenyc';


import appConfig from '../helpers/appConfig';

const FacilitiesExplorer = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func,
    params: React.PropTypes.shape({
      domain: React.PropTypes.string,
    }),
  },

  componentDidMount() {
    const modalShown = JSON.parse(localStorage.getItem('facilities-splash'));

    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splash,
        modalCloseText: 'Got it.  Let me in!',
      });

      localStorage.setItem('facilities-splash', 'true');
    }
  },

  render() {
    // TODO these can be globally defined for the app
    const mapInit = {
      mapbox_accessToken: appConfig.mapbox_accessToken,
      center: [-74.0079, 40.7315],
      zoom: 12,
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

    // TODO we need some kind of "stock layers list" that should automatically be added to mapConfig.layers and maintained elsewhere
    const mapConfig = {
      selectedLayer: 'facilities',
      layers: [
        ImageryJaneLayer,
        AdminBoundariesJaneLayer,
        TransportationJaneLayer,
        GrayOutsideNyc,
        FacilitiesJaneLayer,
      ],
    };

    // Facilities Data Layer is composable, and will show different data/filters based on the route
    const mode = this.props.params.domain ? this.props.params.domain : 'all';

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          search
          searchConfig={searchConfig}
          mapConfig={mapConfig}
          context={{
            mode,
          }}
        />
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
