import React from 'react';
import PropTypes from 'prop-types';
import { Jane, JaneLayer, Source, MapLayer, Legend } from 'jane-maps';


import appConfig from '../helpers/appConfig';
import carto from '../helpers/carto';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import ListItem from './janelayer/ListItem';
import FacilitiesSidebarComponent from './janelayer/SidebarComponent';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer, ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../janelayers';

import FacilitiesActions from '../actions/FacilitiesActions';
import FacilitiesStore from '../stores/FacilitiesStore';
import { defaultFilterDimensions, mapLayerConfig } from './config';

class FacilitiesExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedFeatures: FacilitiesStore.selectedFeatures };
  }

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
  }

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

    FacilitiesStore.on('facilitiesUpdated', () => {
      const selectedFeatures = FacilitiesStore.selectedFeatures;
      this.setState({ selectedFeatures });
    });
  }

  handleMapLayerClick = (features) => {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    FacilitiesActions.setSelectedFeatures([]);
    setTimeout(() => {
      FacilitiesActions.setSelectedFeatures(features);
    }, 450);
  }

  clearSelectedFeatures = () => {
    FacilitiesActions.setSelectedFeatures([]);
  }

  render() {
    const { mapboxGLOptions, searchConfig } = appConfig;

    const { selectedFeatures } = this.state;

    const listItems = selectedFeatures.map(feature => (
      <ListItem feature={feature} key={feature.id} />
    ));

    const selectedFeaturesPane = (
      <SelectedFeaturesPane>
        {listItems}
      </SelectedFeaturesPane>
    );

    const sourceOptions = {
      carto_domain: appConfig.carto_domain,
      carto_user: appConfig.carto_user,
      sql: [FacilitiesStore.sql],
    };

    return (
      <div className="full-screen">
        <Jane
          mapboxGLOptions={mapboxGLOptions}
          search
          searchConfig={searchConfig}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
        >
          <AerialsJaneLayer defaultDisabled />
          <TransportationJaneLayer defaultDisabled />
          <FloodHazardsJaneLayer defaultDisabled />
          <AdminBoundariesJaneLayer defaultDisabled />
          <ZoningJaneLayer defaultDisabled />
          <JaneLayer
            id="facilities"
            name="Facilities and Program Sites"
            icon="university"
            onMapLayerClick={this.handleMapLayerClick}
            defaultSelected
            component={<FacilitiesSidebarComponent />}
          >
            <Source id="facilities" type="cartovector" options={sourceOptions} />
            <MapLayer id="facilities-points-outline" source="facilities" config={mapLayerConfig.facilitiesPointsOutline} />
            <MapLayer id="facilities-points" source="facilities" config={mapLayerConfig.facilitiesPoints} />
            <Legend>
              <div className="legendSection">
                <p>Disclaimer: This map aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. Not all sites are service locations, among other limitations. <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers">Read more</a>.</p>
              </div>
            </Legend>
          </JaneLayer>
        </Jane>
        { selectedFeaturesPane }
      </div>
    );
  }
}

FacilitiesExplorer.defaultProps = {
  location: null,
};

FacilitiesExplorer.propTypes = {
  location: PropTypes.object,
};

module.exports = FacilitiesExplorer;
