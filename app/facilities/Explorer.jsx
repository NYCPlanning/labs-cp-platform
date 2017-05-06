import React from 'react';
import PropTypes from 'prop-types';
import { Jane, JaneLayer } from 'jane-maps';

import appConfig from '../helpers/appConfig';
import carto from '../helpers/carto';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import ListItem from './janelayer/ListItem';
import FacilitiesComponent from './janelayer/Component';
import supportingLayers from '../janelayers/supportingLayers';
import FacilitiesActions from '../actions/FacilitiesActions';
import FacilitiesStore from '../stores/FacilitiesStore';
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

  getInitialState() {
    return {
      selectedFeatures: [],
    };
  },

  componentWillMount() {
    this.bounds = null;
    // update the layers and filterDimensions in the facilities store

    const locationState = this.props.location.state;
    const defaultFilterDimensionsCopy = JSON.parse(JSON.stringify(defaultFilterDimensions));

    const filterDimensions = locationState && locationState.filterDimensions ?
      Object.assign(defaultFilterDimensionsCopy, locationState.filterDimensions) :
      defaultFilterDimensionsCopy;

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

    FacilitiesStore.on('selectedFeaturesUpdated', () => {
      const selectedFeatures = FacilitiesStore.selectedFeatures;
      this.setState({ selectedFeatures });
    });
  },

  handleMapLayerClick(features) {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    FacilitiesActions.setSelectedFeatures([]);
    setTimeout(() => {
      FacilitiesActions.setSelectedFeatures(features);
    }, 450);
  },

  clearSelectedFeatures() {
    FacilitiesActions.setSelectedFeatures([]);
  },

  render() {
    const mapInit = appConfig.mapInit;
    const searchConfig = appConfig.searchConfig;

    const { selectedFeatures } = this.state;

    const listItems = selectedFeatures.map(feature => (
      <ListItem feature={feature} key={feature.id} />
    ));

    const selectedFeaturesPane = (
      <SelectedFeaturesPane>
        {listItems}
      </SelectedFeaturesPane>
    );

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          fitBounds={this.bounds}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
        >
          {supportingLayers.aerials}
          {supportingLayers.adminboundaries}
          {supportingLayers.transportation}
          <JaneLayer
            id="facilities"
            name="Facilities and Program Sites"
            icon="university"
            onMapLayerClick={this.handleMapLayerClick}
            selected
            visible
          >
            <FacilitiesComponent />
          </JaneLayer>
        </Jane>
        { selectedFeaturesPane }
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
