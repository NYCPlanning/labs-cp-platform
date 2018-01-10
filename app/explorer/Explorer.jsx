import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Jane } from '../jane-maps';

import * as selectedActions from '../actions/selected';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer,
  ZoningJaneLayer,
  AdminBoundariesJaneLayer,
  InclusionaryHousingJaneLayer,
  FacilitiesJaneLayer,
  HighlightJaneLayer,
  HousingDevelopmentJaneLayer,
  CBBudgetRequestsJaneLayer,
  SCAJaneLayer,
  CapitalProjectsJaneLayer,
} from '../jane-layers';

import appConfig from '../helpers/appConfig';

const { mapboxGLOptions, searchConfig } = appConfig;

class Explorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
      bottomOffset: 0,
    };
    this.selectedFeaturesCache = [];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pointsSql !== nextProps.pointsSql ||
        this.props.polygonsSql !== nextProps.polygonsSql) {
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

  // Nasty debounces cause I suck at async
  setSelectedFeatures = _.debounce(() => {
    this.props.setSelectedFeatures(this.selectedFeaturesCache);
    this.selectedFeaturesCache = [];
  }, 50);

  setBottomOffset = bottomOffset => this.setState({ bottomOffset });

  handleMapLayerClick = (features, event) => {
    if (features[0].geometry.type === 'Point') {
      this.setState({
        selectedPointType: 'point',
        selectedPointCoordinates: features[0].geometry.coordinates,
      });
    }

    if (features[0].geometry.type === 'Polygon') {
      this.setState({
        selectedPointType: 'point',
        selectedPointCoordinates: [event.lngLat.lng, event.lngLat.lat],
      });
    }

    this.selectedFeaturesCache.push(...features);
    this.props.router.push(this.featureRoute(this.selectedFeaturesCache[0]));
    this.setSelectedFeatures();
    // this.centerMap(event);
  };

  clearSelectedFeatures = () => {
    this.props.resetSelectedFeatures();
  };

  closeLowerPane = () => {
    this.props.resetSelectedFeatures();
    this.props.router.push('/map');
  }

  featureRoute = (feature) => {
    switch (feature.layer.source) {
      case 'capital-projects':
        return `/capitalproject/${feature.properties.maprojid}`;
      case 'cb-budgetrequests':
        return `/budgetrequest/${feature.properties.regid}`;
      case 'housing-development':
        return `/development/${feature.properties.dob_job_number}`;
      case 'facilities-cp':
        return `/facility/${feature.properties.uid}`;
      case 'sca-points':
        return `/sca/${feature.properties.cartodb_id}`;
      default:
        return null;
    }
  }

  centerMap = _.debounce((event) => {
    this.Jane.GLMap.map.easeTo({
      center: [event.lngLat.lng, event.lngLat.lat],
      offset: [160, -(this.state.bottomOffset / 2)],
      duration: 1,
    });
  }, 50);

  render() {
    const setStartingLayer = () => {
      if (!this.props.isLoggedIn) { return 'facilities'; }

      if (this.props.children) {
        switch (this.props.children.props.route.type) {
          case 'capitalproject': return 'capitalprojects';
          case 'facility': return 'facilities';
          case 'pops': return 'pops';
          case 'development': return 'housing';
          case 'sca': return 'sca';
          case 'budgetrequest': return 'budgetrequests';
          default:
            return this.props.params.layer || 'capitalprojects';
        }
      }
      return this.props.params.layer || 'capitalprojects';
    };

    const { selectedFeatures } = this.props;
    const startingLayer = setStartingLayer();

    return (
      <div className="full-screen cp-explorer">
        <Jane
          mapboxGLOptions={mapboxGLOptions}
          search
          searchConfig={searchConfig}
          onLayerToggle={this.clearSelectedFeatures}
          closeLowerPane={this.closeLowerPane}
          onSearchTrigger={this.setAddressSearchCoordinates}
          detailPage={this.props.children}
          detailPageType={this.props.location.type}
          selectedFeatures={selectedFeatures}
          setBottomOffset={this.setBottomOffset}
          ref={(jane) => { this.Jane = jane; }}
        >
          <HighlightJaneLayer
            selectedFeatures={selectedFeatures}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
          />
          <AerialsJaneLayer />
          <TransportationJaneLayer />
          <FloodHazardsJaneLayer />
          <AdminBoundariesJaneLayer />
          <ZoningJaneLayer />
          <InclusionaryHousingJaneLayer />

          <FacilitiesJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            sql={this.props.facilitiesSql}
            enabled={startingLayer === 'facilities'}
            selected={startingLayer === 'facilities'}
            locationState={this.props.location.state}
          />

          { this.props.isLoggedIn &&
            <HousingDevelopmentJaneLayer
              selectedPointType={this.state.selectedPointType}
              selectedPointCoordinates={this.state.selectedPointCoordinates}
              handleMapLayerClick={this.handleMapLayerClick}
              sql={this.props.housingDevelopmentSql}
              symbologyDimension={this.props.housingDevelopmentSymbology}
              enabled={startingLayer === 'housing'}
              selected={startingLayer === 'housing'}
            />
          }

          { this.props.isLoggedIn &&
            <SCAJaneLayer
              handleMapLayerClick={this.handleMapLayerClick}
              enabled={startingLayer === 'sca'}
              selected={startingLayer === 'sca'}
            />
          }

          { this.props.isLoggedIn &&
            <CBBudgetRequestsJaneLayer
              selectedPointType={this.state.selectedPointType}
              selectedPointCoordinates={this.state.selectedPointCoordinates}
              handleMapLayerClick={this.handleMapLayerClick}
              pointsSql={this.props.cbBudgetRequestsPointsSql}
              polygonsSql={this.props.cbBudgetRequestsPolygonSql}
              enabled={startingLayer === 'budgetrequests'}
              selected={startingLayer === 'budgetrequests'}
            />
          }

          { this.props.isLoggedIn &&
            <CapitalProjectsJaneLayer
              selectedPointType={this.state.selectedPointType}
              selectedPointCoordinates={this.state.selectedPointCoordinates}
              handleMapLayerClick={this.handleMapLayerClick}
              pointsSql={this.props.pointsSql}
              polygonsSql={this.props.polygonsSql}
              enabled={startingLayer === 'capitalprojects'}
              selected={startingLayer === 'capitalprojects'}
            />
          }
        </Jane>
      </div>
    );
  }
}

Explorer.propTypes = {
  children: PropTypes.object,

  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  facilitiesSql: PropTypes.string.isRequired,
  housingDevelopmentSql: PropTypes.string.isRequired,
  housingDevelopmentSymbology: PropTypes.string.isRequired,
  cbBudgetRequestsPointsSql: PropTypes.string.isRequired,
  cbBudgetRequestsPolygonSql: PropTypes.string.isRequired,

  selectedFeatures: PropTypes.array.isRequired,
  setSelectedFeatures: PropTypes.func.isRequired,
  resetSelectedFeatures: PropTypes.func.isRequired,

  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object,

  router: PropTypes.object.isRequired,
  params: PropTypes.shape({
    layer: PropTypes.string,
  }),
};

Explorer.defaultProps = {
  location: null,
  children: null,
  params: {
    layer: null,
  },
};

const mapStateToProps = ({ capitalProjects, facilities, housingDevelopment, cbBudgetRequests, selected, currentUser }) => ({
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  facilitiesSql: facilities.sql,
  housingDevelopmentSql: housingDevelopment.sql,
  housingDevelopmentSymbology: housingDevelopment.symbologyDimension,
  cbBudgetRequestsPointsSql: cbBudgetRequests.pointsSql,
  cbBudgetRequestsPolygonSql: cbBudgetRequests.polygonsSql,

  selectedFeatures: selected.features,

  isLoggedIn: currentUser.isLoggedIn,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: selectedActions.setSelectedFeatures,
  resetSelectedFeatures: selectedActions.resetSelectedFeatures,
})(Explorer);
