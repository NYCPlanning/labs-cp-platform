import React, { PropTypes } from 'react';

import Jane from '../../jane-maps/src';
import content from './content';

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries';
import FacilitiesJaneLayer from './janelayer';
import TransportationJaneLayer from '../janelayers/transportation';
import ImageryJaneLayer from '../janelayers/imagery';

import appConfig from '../helpers/appConfig';
import carto from '../helpers/carto';

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

  componentWillMount() {
    this.bounds = null;

    // alter default config of adminboundaries layer
    if (this.props.location.state && this.props.location.state.adminboundaries) {
      AdminBoundariesJaneLayer.visible = true;
      AdminBoundariesJaneLayer.initialState = {
        value: this.props.location.state.adminboundaries.type,
      };
    }
  },

  componentDidMount() {
    const self = this;
    const modalShown = JSON.parse(localStorage.getItem('facilities-splash'));

    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splash,
        modalCloseText: 'Got it.  Let me in!',
      });

      localStorage.setItem('facilities-splash', 'true');
    }

    if (this.props.location.state && this.props.location.state.adminboundaries) {
      const value = this.props.location.state.adminboundaries.value;

      carto.getNYCBounds('nta', value)
        .then((bounds) => {
          self.bounds = bounds;
          self.forceUpdate();
        });
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

    const layers = this.props.location.state && this.props.location.state.layers ?
      this.props.location.state.layers :
      null;

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          mapConfig={mapConfig}
          context={{
            layers,
          }}
          fitBounds={this.bounds}
        />
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
