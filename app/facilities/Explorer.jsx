import React from 'react';
import PropTypes from 'prop-types';
import { Jane, JaneLayer, Source, MapLayer, Legend } from 'jane-maps';
import { connect } from 'react-redux';

import appConfig from '../helpers/appConfig';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import ListItem from './janelayer/ListItem';
import FacilitiesSidebarComponent from './janelayer/SidebarComponent';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer, ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../janelayers';

import * as facilitiesActions from '../actions/facilities';
import { defaultFilterDimensions } from './config';
import colors from './colors';

const { mapboxGLOptions, searchConfig } = appConfig;

class FacilitiesExplorer extends React.Component {
  constructor() {
    super();

    this.state = {
      highlightedPoint: null,
    };
  }

  componentDidMount() {
    // update the layers and filterDimensions in the facilities store
    const locationState = this.props.location.state;
    const defaultFilterDimensionsCopy = JSON.parse(JSON.stringify(defaultFilterDimensions));

    const filterDimensions = locationState && locationState.filterDimensions ?
      Object.assign(defaultFilterDimensionsCopy, locationState.filterDimensions) :
      defaultFilterDimensionsCopy;

    if (locationState && locationState.layers) {
      filterDimensions.facsubgrp.values = this.props.location.state.layers;
    }

    this.props.setFilters(filterDimensions);

    // update the map bounds if adminboundaries location state was passed in
    // if (this.props.location.state && this.props.location.state.adminboundaries) {
    //   this.props.fetchNYCBounds(this.props.location.state.adminboundaries.value);
    // }
  }

  handleMapLayerClick = (features) => {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup

    this.setState({
      highlightedPoint: features.length ? features[0].geometry : null
    });

    this.props.setSelectedFeatures([]);
    setTimeout(() => this.props.setSelectedFeatures(features), 450);
  };

  clearSelectedFeatures = () => {
    this.props.setSelectedFeatures([]);
  };

  highlightedSourceOptions = () => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: this.state.highlightedPoint,
      },
    ],
  });

  render() {
    const listItems = this.props.selectedFeatures.map(feature => (
      <ListItem feature={feature} key={feature.id} />
    ));

    const sourceOptions = {
      carto_domain: appConfig.carto_domain,
      carto_user: appConfig.carto_user,
      sql: [this.props.sql],
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
            defaultSelected
            component={<FacilitiesSidebarComponent />}
          >
            <Source id="facilities" type="cartovector" options={sourceOptions} />

            { this.state.highlightedPoint &&
              <Source id="highlighted" type="geojson" data={this.highlightedSourceOptions()} /> }

            { this.state.highlightedPoint &&
              <MapLayer
                id="facilities-points-highlight"
                source="highlighted"
                type="circle"
                paint={{
                  'circle-color': 'rgba(255, 255, 255, 1)',
                  'circle-opacity': 0,
                  'circle-radius': 15,
                  'circle-stroke-width': 3,
                  'circle-pitch-scale': 'map',
                  'circle-stroke-color': 'rgba(217, 107, 39, 1)',
                  'circle-stroke-opacity': 0.8,
                }}
              /> }

              <MapLayer
                id="facilities-points-outline"
                source="facilities"
                sourceLayer="layer0"
                type="circle"
                paint={{
                  'circle-radius': { stops: [[10, 2], [15, 6]] },
                  'circle-color': colors.getColorObject(),
                  'circle-opacity': 0.7,
                }}
              />

            <MapLayer
              id="facilities-points"
              source="facilities"
              sourceLayer="layer0"
              type="circle"
              paint={{
                'circle-radius': { stops: [[10, 3], [15, 7]] },
                'circle-color': '#012700',
                'circle-opacity': 0.7,
              }}
              onClick={this.handleMapLayerClick}
            />

            <Legend>
              <div className="legendSection">
                <p>Disclaimer: This map aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. Not all sites are service locations, among other limitations. <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers">Read more</a>.</p>
              </div>
            </Legend>
          </JaneLayer>
        </Jane>

        <SelectedFeaturesPane>
          {listItems}
        </SelectedFeaturesPane>
      </div>
    );
  }
}

FacilitiesExplorer.defaultProps = {
  location: null,
};

FacilitiesExplorer.propTypes = {
  sql: PropTypes.string,
  location: PropTypes.object,
  selectedFeatures: PropTypes.array,
  setSelectedFeatures: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const mapStateToProps = ({ facilities }) => ({
  selectedFeatures: facilities.selectedFeatures,
  sql: facilities.sql,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: facilitiesActions.setSelectedFeatures,
  setFilters: facilitiesActions.setFilters,
})(FacilitiesExplorer);
