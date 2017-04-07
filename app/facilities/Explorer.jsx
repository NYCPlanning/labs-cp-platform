import React, { PropTypes } from 'react';

import Jane from 'jane-maps';
import JaneLayer from 'jane-maps/dist/JaneLayer';

import FacilitiesComponent from './janelayer/Component';
import FacilitiesListItem from './janelayer/ListItem';

import appConfig from '../helpers/appConfig';
import carto from '../helpers/carto';

import supportingLayers from '../janelayers/supportingLayers';

import FacilitiesActions from '../actions/FacilitiesActions';
import { defaultFilterDimensions } from './config';

const FacilitiesExplorer = React.createClass({
  propTypes: {
    location: PropTypes.object,
  },

  getDefaultProps() {
    return {
      location: null,
    };
  },

  componentWillMount() {
    this.bounds = null;
    // update the layers and filterDimensions in the facilities store

    const locationState = this.props.location.state;

    const filterDimensions = locationState && locationState.filterDimensions ?
      locationState.filterDimensions :
      defaultFilterDimensions;

    if (locationState && locationState.layers) {
      filterDimensions.facsubgrp.values = this.props.location.state.layers;
    }

    FacilitiesActions.setInitialFilters(filterDimensions);
  },

  componentDidMount() {
    const self = this;

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
            highlightPointLayers={['facilities-points']}
            visible
            selected
            component={FacilitiesComponent}
            listItem={FacilitiesListItem}
          />
        </Jane>
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
