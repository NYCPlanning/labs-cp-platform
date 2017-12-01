import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jane, JaneLayer, Source, MapLayer, Legend } from '../jane-maps';

import appConfig from '../helpers/appConfig';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import ListItem from './janelayer/ListItem';
import FacilitiesSidebarComponent from './janelayer/SidebarComponent';
import HighlightJaneLayer from '../jane-layers/highlight/HighlightJaneLayer';

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
          <HighlightJaneLayer
            selectedFeatures={this.props.selectedFeatures}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
          />
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

            <Legend id="facilities-legend">
              <div>
                <div className="legendSection">Facilities and Program Sites</div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(247, 202, 0)' }} />
                  <div className="legendItemText">Education, Child Welfare, and Youth</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(76, 175, 80)' }} />
                  <div className="legendItemText">Parks, Gardens, and Historical Sites</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(115, 229, 244)' }} />
                  <div className="legendItemText">Libraries and Cultural Programs</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(41, 121, 255)' }} />
                  <div className="legendItemText">Public Safety, Emergency Serivces, and Administrative Justice</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(186, 104, 200)' }} />
                  <div className="legendItemText">Health and Human Services</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(141, 142, 170)' }} />
                  <div className="legendItemText">Core Infrastructure and Transportation</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: 'rgb(203, 203, 214)' }} />
                  <div className="legendItemText">Admintration of Government</div>
                </div>
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

FacilitiesExplorer.propTypes = {
  mapBounds: PropTypes.array,
  sql: PropTypes.string.isRequired,
  location: PropTypes.object,
  selectedFeatures: PropTypes.array,
  setSelectedFeatures: PropTypes.func.isRequired,
  fetchNYCBounds: PropTypes.func.isRequired,
};

FacilitiesExplorer.defaultProps = {
  location: null,
  selectedFeatures: null,
  mapBounds: null,
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
