import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGA4 from 'react-ga4';
import _ from 'lodash';
import centroid from 'turf-centroid';

import getDefaultFilterDimensions from '../facilities/config';
import { Jane } from '../jane-maps';

import * as selectedActions from '../actions/selected';
import { showModal, hideModal } from '../actions/advisoryModalActions';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer,
  ZoningJaneLayer,
  AdminBoundariesJaneLayer,
  PlanningAreasJaneLayer,
  FacilitiesJaneLayer,
  HighlightJaneLayer,
  RadiusHighlightJaneLayer,
  HousingDevelopmentJaneLayer,
  SCAJaneLayer,
  CapitalProjectsJaneLayer,
} from '../jane-layers';

import appConfig from '../config/appConfig';

import AdvisoryModal from '../common/AdvisoryModal';

const { mapbox_accessToken, searchConfig } = appConfig;

const mapboxGLOptions = {
  mapbox_accessToken,
  center: [-74.0807, 40.7128],
  zoom: 10,
  minZoom: 9,
  maxZoom: null,
  pitch: 0,
  hash: true,
  navigationControlPosition: 'bottom-right',
};

class Explorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
      highlightPointCoordinates: [],
      bottomOffset: 0,
      radiusFilter: {
        inKilometers: 0,
        centerPointCoordinates: [],
      },
    };
    this.selectedFeaturesCache = [];
    this.mapClicked = false;
  }

  componentWillMount() {
    this.props.showModal();
    document.addEventListener('keydown', this.handleEscKey);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.mapClicked &&
      this.props.map.centerOnGeometry !== nextProps.map.centerOnGeometry
    ) {
      this.centerFromGeometry(nextProps.map.centerOnGeometry);
      this.setState({
        selectedPointType: 'point',
        selectedPointCoordinates: this.centroidFromGeometry(
          nextProps.map.centerOnGeometry,
        ),
        highlightPointCoordinates: this.centroidFromGeometry(
          nextProps.map.centerOnGeometry,
        ),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  onLayerToggle = (layerId, wasEnabled) => {
    ReactGA4.gtag('event', 'toggle-layer', {
      'action': `toggle-layer-${layerId}`,
      'layer_view_value': !wasEnabled,
    });
    FS.event('capitalPlanningExplorerLayerToggle', {
      layer_id: layerId,
      layer_enabled: !wasEnabled,
    });

    const janeLayerIdsMap = {
      'housing-development': ['housing-development-points'],
      'capital-projects': [
        'capital-projects-polygons',
        'capital-projects-points',
      ],
      scaplan: ['sca-points-points'],
      facilities: ['facilities-points'],
    };

    if (wasEnabled) {
      janeLayerIdsMap[layerId].forEach((id) => {
        if (this.layerIdsInSelectedFeatures().includes(id)) {
          this.closeLowerPane();
          this.handleRadiusFilter(0);
        }
      });
    }
  };

  // Nasty debounces cause I suck at async
  setSelectedFeatures = _.debounce(() => {
    this.props.setSelectedFeatures(this.selectedFeaturesCache);
    this.selectedFeaturesCache = [];
  }, 50);

  setBottomOffset = bottomOffset => this.setState({ bottomOffset });

  setAddressSearchCoordinates = (payload) => {
    if (payload.action === 'set') {
      this.setState({
        selectedPointType: 'address',
        selectedPointCoordinates: payload.coordinates,
      });
    }

    if (
      payload.action === 'clear' &&
      this.state.selectedPointType === 'address'
    ) {
      this.setState({
        selectedPointType: '',
        selectedPointCoordinates: [],
      });
    }
  };

  hasSelectedFeatures() {
    return !_.isEmpty(this.props.selectedFeatures);
  }

  centerFromGeometry(geometry) {
    if (this.mapClicked || this.hasSelectedFeatures()) return;
    this.centerMap(this.centroidFromGeometry(geometry));
  }

  centroidFromGeometry(geometry) {
    if (geometry.type === 'MultiPolygon' || geometry.type === 'Polygon') {
      return centroid(geometry).geometry.coordinates;
    }

    if (geometry.type === 'Point') {
      return geometry.coordinates;
    }
  }

  handleMapLayerClick = (features, event) => {
    this.mapClicked = true;

    if (features[0].geometry.type === 'Point') {
      this.setState({
        selectedPointType: 'point',
        selectedPointCoordinates: features[0].geometry.coordinates,
        highlightPointCoordinates: features[0].geometry.coordinates,
      });
    }

    if (
      features[0].geometry.type === 'Polygon' ||
      features[0].geometry.type === 'MultiPolygon'
    ) {
      this.setState({
        selectedPointType: 'point',
        selectedPointCoordinates: [event.lngLat.lng, event.lngLat.lat],
        highlightPointCoordinates: [event.lngLat.lng, event.lngLat.lat],
      });
    }

    this.selectedFeaturesCache.push(...features);
    this.props.router.push(this.featureRoute(this.selectedFeaturesCache[0]));
    this.setSelectedFeatures();

    this.centerMap([event.lngLat.lng, event.lngLat.lat]);
  };

  handleRadiusFilter = (radiusFilterInKilometers) => {
    this.centerMap(this.state.selectedPointCoordinates);
    this.setState({
      radiusFilter: {
        inKilometers: radiusFilterInKilometers,
        centerPointCoordinates: this.state.selectedPointCoordinates,
      },
    });
  };

  clearSelectedFeatures = () => {
    this.props.resetSelectedFeatures();
  };

  closeLowerPane = () => {
    this.mapClicked = false;

    this.setState({
      selectedPointType: '',
      selectedPointCoordinates: [],
      highlightPointCoordinates: [],
    });

    this.props.resetSelectedFeatures();
    this.props.router.push('/map');
  };

  layerIdsInSelectedFeatures = () =>
    _.uniq(this.props.selectedFeatures.map(f => f.layer.id));

  featureRoute = (feature) => {
    switch (feature.layer.source) {
      case 'capital-projects':
        return `/capitalproject/${feature.properties.maprojid}`;
      case 'housing-development':
        return `/development/${feature.properties.job_number}`;
      case 'facilities': {
        if (feature.properties.factype === 'PRIVATELY OWNED PUBLIC SPACE') {
          return `/pops/${feature.properties.uid}`;
        }
        return `/facility/${feature.properties.uid}`;
      }
      case 'sca-points':
        return `/sca/${feature.properties.cartodb_id}`;
      default:
        return null;
    }
  };

  centerMap = _.debounce((lnglat) => {
    this.Jane.GLMap.map.easeTo({
      center: lnglat,
      offset: [160, -(this.state.bottomOffset / 2)],
      duration: 3,
    });
  }, 50);

  handleClose = () => {
    this.props.hideModal();
  };

  handleEscKey = (event) => {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  };

  render() {
    const setStartingLayer = () => {
      if (this.props.children) {
        switch (this.props.children.props.route.type) {
          case 'capitalproject':
            return 'capitalprojects';
          case 'facility':
            return 'facilities';
          case 'pops':
            return 'pops';
          case 'development':
            return 'housing';
          case 'sca':
            return 'sca';
          case 'budgetrequest':
            return 'budgetrequests';
          default:
            return this.props.params.layer || 'capitalprojects';
        }
      }
      return this.props.params.layer || 'capitalprojects';
    };

    const { selectedFeatures, showAdvisoryModal } = this.props;

    const startingLayer = setStartingLayer();

    const popsLocationState = {
      filterDimensions: getDefaultFilterDimensions({
        selected: {
          'Parks, Gardens, and Historical Sites': {
            'Parks and Plazas': {
              'Privately Owned Public Space': null,
            },
          },
        },
      }),
    };

    return (
      <div className="full-screen cp-explorer">
        {showAdvisoryModal && <AdvisoryModal handleClose={this.handleClose} />}
        <Jane
          mapboxGLOptions={mapboxGLOptions}
          search
          searchConfig={searchConfig}
          closeLowerPane={this.closeLowerPane}
          onSearchTrigger={this.setAddressSearchCoordinates}
          detailPage={this.props.children}
          detailPageType={this.props.location.type}
          selectedFeatures={selectedFeatures}
          setBottomOffset={this.setBottomOffset}
          onLayerToggle={this.onLayerToggle}
          ref={(jane) => {
            this.Jane = jane;
          }}
        >
          <HighlightJaneLayer
            coordinates={this.state.highlightPointCoordinates}
          />
          <RadiusHighlightJaneLayer
            coordinates={this.state.radiusFilter.centerPointCoordinates}
            radius={this.state.radiusFilter.inKilometers}
          />
          <AerialsJaneLayer />
          <TransportationJaneLayer />
          <FloodHazardsJaneLayer />
          <AdminBoundariesJaneLayer />
          <ZoningJaneLayer />
          <PlanningAreasJaneLayer />

          <FacilitiesJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            handleRadiusFilter={this.handleRadiusFilter}
            sql={this.props.facilitiesSql}
            enabled={startingLayer === 'facilities' || startingLayer === 'pops'}
            selected={
              startingLayer === 'facilities' || startingLayer === 'pops'
            }
            locationState={
              startingLayer === 'pops'
                ? popsLocationState
                : this.props.location.state
            }
          />

          <HousingDevelopmentJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            handleRadiusFilter={this.handleRadiusFilter}
            sql={this.props.housingDevelopmentSql}
            symbologyDimension={this.props.housingDevelopmentSymbology}
            enabled={startingLayer === 'housing'}
            selected={startingLayer === 'housing'}
          />

          <SCAJaneLayer
            handleMapLayerClick={this.handleMapLayerClick}
            enabled={startingLayer === 'sca'}
            selected={startingLayer === 'sca'}
          />

          <CapitalProjectsJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            handleRadiusFilter={this.handleRadiusFilter}
            pointsSql={this.props.pointsSql}
            polygonsSql={this.props.polygonsSql}
            enabled={startingLayer === 'capitalprojects'}
            selected={startingLayer === 'capitalprojects'}
          />
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

  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object,

  map: PropTypes.object.isRequired,

  router: PropTypes.object.isRequired,
  params: PropTypes.shape({
    layer: PropTypes.string,
  }),
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showAdvisoryModal: PropTypes.bool.isRequired,
};

Explorer.defaultProps = {
  location: null,
  children: null,
  params: {
    layer: null,
  },
};

const mapStateToProps = ({
  capitalProjects,
  facilities,
  housingDevelopment,
  cbBudgetRequests,
  selected,
  currentUser,
  map,
  advisoryModal,
}) => ({
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  facilitiesSql: facilities.sql,
  housingDevelopmentSql: housingDevelopment.sql,
  housingDevelopmentSymbology: housingDevelopment.symbologyDimension,
  cbBudgetRequestsPointsSql: cbBudgetRequests.pointsSql,
  cbBudgetRequestsPolygonSql: cbBudgetRequests.polygonsSql,

  selectedFeatures: selected.features,
  map,

  currentUser,
  showAdvisoryModal: advisoryModal.showAdvisoryModal,
});

const mapDispatchToProps = {
  showModal,
  hideModal,
  setSelectedFeatures: selectedActions.setSelectedFeatures,
  resetSelectedFeatures: selectedActions.resetSelectedFeatures,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
