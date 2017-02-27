import React, { PropTypes } from 'react';

import Jane from '../../jane-maps/src';
import JaneLayer from '../../jane-maps/src/JaneLayer';
import content from './content';

import FacilitiesComponent from './janelayer/Component';
import FacilitiesListItem from './janelayer/ListItem';


import appConfig from '../helpers/appConfig';
import carto from '../helpers/carto';

import supportingLayers from '../janelayers/supportingLayers';

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

    // update the map bounds if adminboundaries location state was passed in
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

    const locationState = this.props.location.state;

    const layers = locationState && locationState.layers ?
      this.props.location.state.layers :
      null;

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          fitBounds={this.bounds}
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
            id="facilities"
            name="Facilities and Program Sites"
            icon="university"
            interactivityMapLayers={['facilities-points']}
            visible
            selected
            component={FacilitiesComponent}
            initialState={{ layers }}
            listItem={FacilitiesListItem}
          />
        </Jane>
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
