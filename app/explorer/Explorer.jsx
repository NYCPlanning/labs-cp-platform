import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class CapitalProjectsExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
    };
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

  clearSelectedFeatures = () => {
    this.props.resetSelectedFeatures();
  };

  featureRoute = (feature) => {
    switch (feature.layer.source) {
      case 'capital-projects':
        return `/capitalproject/${feature.properties.maprojid}`;
      case 'cb-budgetrequests':
        return `/budgetrequest/${feature.properties.regid}`;
      case 'housing-development':
        return `/development/${feature.properties.cartodb_id}`;
      case 'facilities-cp':
        return `/facility/${feature.properties.uid}`;
      default:
        return null;
    }
  }

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

    this.props.setSelectedFeatures(features);
    // This is ridiculous
    this.Jane.GLMap.map.panTo([event.lngLat.lng, event.lngLat.lat], {
      offset: [0, 600],
    });
    this.props.router.push(this.featureRoute(features[0]));
  };

  render() {
    const { selectedFeatures } = this.props;
    const startingLayer = this.props.params.layer || 'capitalprojects';

    return (
      <div className="full-screen cp-explorer">
        <Jane
          mapboxGLOptions={mapboxGLOptions}
          search
          searchConfig={searchConfig}
          onLayerToggle={this.clearSelectedFeatures}
          onSearchTrigger={this.setAddressSearchCoordinates}
          detailPage={this.props.children}
          selectedFeatures={selectedFeatures}
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
          />

          <HousingDevelopmentJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
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

          <CBBudgetRequestsJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            pointsSql={this.props.cbBudgetRequestsPointsSql}
            polygonsSql={this.props.cbBudgetRequestsPolygonSql}
            enabled={startingLayer === 'budgetrequests'}
            selected={startingLayer === 'budgetrequests'}
          />

          <CapitalProjectsJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
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

CapitalProjectsExplorer.propTypes = {
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

  router: PropTypes.object.isRequired,
  params: PropTypes.shape({
    layer: PropTypes.string,
  }),
};

CapitalProjectsExplorer.defaultProps = {
  children: null,
  params: {
    layer: null,
  },
};

const mapStateToProps = ({ capitalProjects, facilitiesCP, housingDevelopment, cbBudgetRequests, selected }) => ({
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  facilitiesSql: facilitiesCP.sql,
  housingDevelopmentSql: housingDevelopment.sql,
  housingDevelopmentSymbology: housingDevelopment.symbologyDimension,
  cbBudgetRequestsPointsSql: cbBudgetRequests.pointsSql,
  cbBudgetRequestsPolygonSql: cbBudgetRequests.polygonsSql,

  selectedFeatures: selected.features,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: selectedActions.setSelectedFeatures,
  resetSelectedFeatures: selectedActions.resetSelectedFeatures,
})(CapitalProjectsExplorer);
