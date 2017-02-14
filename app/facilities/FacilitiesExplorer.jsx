import React, { PropTypes } from 'react';

import Jane from '../../jane-maps/src';
import content from './content';

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries';
import FacilitiesJaneLayer from './facilitiesjanelayer';
import TransportationJaneLayer from '../janelayers/transportation';
import ImageryJaneLayer from '../janelayers/imagery';

import appConfig from '../helpers/appConfig';

const FacilitiesExplorer = React.createClass({
  propTypes: {
    showModal: PropTypes.func,
    location: PropTypes.object,
  },

  getDefaultProps() {
    return {
      showModal: null,
      location: null,
    };
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
    const mapInit = appConfig.mapInit;
    const searchConfig = appConfig.searchConfig;

    // TODO we need some kind of "stock layers list" that should automatically be added to mapConfig.layers and maintained elsewhere
    const mapConfig = {
      selectedLayer: 'facilities',
      layers: [
        ImageryJaneLayer,
        AdminBoundariesJaneLayer,
        TransportationJaneLayer,
        FacilitiesJaneLayer,
      ],
    };

    // Facilities Data Layer is composable, and will show different data/filters based on the route
    // const mode = this.props.params.domain ? this.props.params.domain : 'all';

    const layers = this.props.location.state ? this.props.location.state.layers : null;

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          mapConfig={mapConfig}
          context={{ layers }}
        />
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
