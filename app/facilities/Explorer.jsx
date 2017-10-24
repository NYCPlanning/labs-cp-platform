import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jane, JaneLayer, Source, MapLayer, Legend } from '../jane-maps';

import appConfig from '../helpers/appConfig';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import ListItem from './janelayer/ListItem';
import FacilitiesSidebarComponent from './janelayer/SidebarComponent';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer,
  ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../jane-layers';

import * as facilitiesActions from '../actions/facilities';
import colors from './colors';

const { mapboxGLOptions, searchConfig } = appConfig;

class FacilitiesExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
    };
  }

  componentDidMount() {
    // update the layers and filterDimensions in the facilities store
    const locationState = this.props.location.state;

    if (locationState && locationState.adminboundaries) {
      this.props.fetchNYCBounds(locationState.adminboundaries.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      this.props.setSelectedFeatures([]);
    }
  }

  setAddressSearchCoordinates = (payload) => {
    if (payload.action === 'set') {
      this.setState({
        selectedPointType: 'address',
        selectedPointCoordinates: payload.coordinates,
      });
    }

    if (payload.action === 'clear' && this.state.selectedPointType === 'address') {
      this.setState({
        selectedPointType: '',
        selectedPointCoordinates: [],
      });
    }
  };

  clearSelectedFeatures = () => {
    this.props.setSelectedFeatures([]);
    if (this.state.selectedPointType !== 'address') {
      this.setState({
        selectedPointType: '',
        selectedPointCoordinates: [],
      });
    }
  };

  handleMapLayerClick = (features) => {
    if (features[0].geometry.type === 'Point') {
      this.setState({
        selectedPointType: 'point',
        selectedPointCoordinates: features[0].geometry.coordinates,
      });
    }
    this.props.setSelectedFeatures(features);
  };

  highlightedSourceOptions = () => ({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: this.props.selectedFeatures[0].geometry,
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
          fitBounds={this.props.mapBounds}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
          onLayerToggle={this.clearSelectedFeatures}
          onSearchTrigger={this.setAddressSearchCoordinates}
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
            component={<FacilitiesSidebarComponent
              locationState={this.props.location.state}
              selectedPointType={this.state.selectedPointType}
              selectedPointCoordinates={this.state.selectedPointCoordinates}
            />}
          >
            <Source id="facilities" type="cartovector" options={sourceOptions} />

            { !!this.props.selectedFeatures.length &&
              <Source id="highlighted" type="geojson" data={this.highlightedSourceOptions()} nocache /> }

            { !!this.props.selectedFeatures.length &&
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
              <div>
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
  mapBounds: PropTypes.array,
  sql: PropTypes.string,
  location: PropTypes.object,
  selectedFeatures: PropTypes.array,
  setSelectedFeatures: PropTypes.func.isRequired,
  fetchNYCBounds: PropTypes.func.isRequired,
};

const mapStateToProps = ({ facilities }) => ({
  mapBounds: facilities.mapBounds,
  filterDimensions: facilities.filterDimensions,
  selectedFeatures: facilities.selectedFeatures,
  sql: facilities.sql,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: facilitiesActions.setSelectedFeatures,
  fetchNYCBounds: facilitiesActions.fetchNYCBounds,
})(FacilitiesExplorer);
