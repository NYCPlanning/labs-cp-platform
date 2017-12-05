// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Jane, JaneLayer, Source, MapLayer, Legend } from '../jane-maps';
import CapitalProjectsComponent from './janelayer/Component';
import * as capitalProjectsActions from '../actions/capitalProjects';
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
} from '../jane-layers';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';

import CPListItem from './list-items/CPListItem';
import SCAListItem from './list-items/SCAListItem';
import FacilitiesListItem from './list-items/FacilitiesListItem';
import HousingDevelopmentListItem from './list-items/HousingDevelopmentListItem';
import BudgetRequestLineItem from './list-items/BudgetRequestListItem';

import appConfig from '../helpers/appConfig';

import './styles.scss';

const { mapboxGLOptions, searchConfig } = appConfig;

class CapitalProjectsExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
    };
    this.selectedFeaturesCache = [];
  }

  componentWillMount() {
    console.log(this.props.params.layer);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pointsSql !== nextProps.pointsSql ||
        this.props.polygonsSql !== nextProps.polygonsSql) {
      this.props.setSelectedFeatures([]);
    }
  }

  setSelectedFeatures = _.debounce(() => {
    this.props.setSelectedFeatures(this.selectedFeaturesCache);
    this.selectedFeaturesCache = [];
  }, 50);

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
  };

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
    this.setSelectedFeatures();
  };

  render() {
    const { selectedFeatures } = this.props;

    const listItems = selectedFeatures.map((feature) => {
      switch (feature.layer.source) {
        case 'capital-projects':
          return <CPListItem feature={feature} key={`cp${feature.id}`} />;
        case 'sca-points':
          return <SCAListItem feature={feature} key={`sca${feature.id}`} />;
        case 'facilities-cp':
          return <FacilitiesListItem feature={feature} key={`fac${feature.properties.uid}`} />;
        case 'housing-development':
          return <HousingDevelopmentListItem feature={feature} key={`dev${feature.properties.cartodb_id}`} />;
        case 'cb-budgetrequests':
          return <BudgetRequestLineItem feature={feature} key={`cbbr${feature.properties.cartodb_id}`} />;
        default:
          return null;
      }
    });

    return (
      <div className="full-screen cp-explorer">
        <Jane
          mapboxGLOptions={mapboxGLOptions}
          search
          searchConfig={searchConfig}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
          onLayerToggle={this.clearSelectedFeatures}
          onSearchTrigger={this.setAddressSearchCoordinates}
        >
          <HighlightJaneLayer
            selectedFeatures={selectedFeatures}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
          />
          <AerialsJaneLayer defaultDisabled />
          <TransportationJaneLayer defaultDisabled />
          <FloodHazardsJaneLayer defaultDisabled />
          <AdminBoundariesJaneLayer defaultDisabled />
          <ZoningJaneLayer defaultDisabled />
          <InclusionaryHousingJaneLayer defaultDisabled />

          <FacilitiesJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            sql={this.props.facilitiesSql}
            defaultDisabled
          />

          <HousingDevelopmentJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            sql={this.props.housingDevelopmentSql}
            symbologyDimension={this.props.housingDevelopmentSymbology}
            defaultDisabled
          />

          <SCAJaneLayer
            handleMapLayerClick={this.handleMapLayerClick}
            defaultDisabled
          />

          <CBBudgetRequestsJaneLayer
            selectedPointType={this.state.selectedPointType}
            selectedPointCoordinates={this.state.selectedPointCoordinates}
            handleMapLayerClick={this.handleMapLayerClick}
            pointsSql={this.props.cbBudgetRequestsPointsSql}
            polygonsSql={this.props.cbBudgetRequestsPolygonSql}
            defaultDisabled
          />

          <JaneLayer
            id="capital-projects"
            name="Capital Projects"
            icon="usd"
            component={<CapitalProjectsComponent
              selectedPointType={this.state.selectedPointType}
              selectedPointCoordinates={this.state.selectedPointCoordinates}
            />}
            defaultSelected
          >

            <Source
              id="capital-projects"
              type="cartovector"
              options={{
                carto_user: appConfig.carto_user,
                carto_domain: appConfig.carto_domain,
                sql: [this.props.pointsSql, this.props.polygonsSql],
              }}
            />

            <MapLayer
              id="capital-projects-polygons"
              source="capital-projects"
              sourceLayer="layer1"
              onClick={this.handleMapLayerClick}
              type="fill"
              paint={{
                'fill-color': {
                  property: 'totalspend',
                  stops: [
                    [0, '#8B8C98'],
                    [1, '#d98127'],
                  ],
                },
                'fill-opacity': 0.75,
                'fill-antialias': true,
              }}
            />

            <MapLayer
              id="capital-projects-points"
              source="capital-projects"
              sourceLayer="layer0"
              onClick={this.handleMapLayerClick}
              type="circle"
              paint={{
                'circle-radius': {
                  stops: [
                    [10, 2],
                    [15, 6],
                  ],
                },
                'circle-color': {
                  property: 'totalspend',
                  stops: [
                    [0, '#8B8C98'],
                    [1, '#d98127'],
                  ],
                },
                'circle-opacity': 0.7,
              }}
            />

            <MapLayer
              id="capital-projects-points-outline"
              source="capital-projects"
              sourceLayer="layer0"
              type="circle"
              paint={{
                'circle-radius': {
                  stops: [
                    [10, 3],
                    [15, 7],
                  ],
                },
                'circle-color': '#012700',
                'circle-opacity': 0.7,
              }}
            />

            <Legend id="capital-projects-legend">
              <div>
                <div className="legendSection">Capital Projects</div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: '#8B8C98' }} />
                  <div className="legendItemText">Planned Projects</div>
                </div>
                <div className="legendItem">
                  <div className="colorCircle" style={{ backgroundColor: '#d98127' }} />
                  <div className="legendItemText">Ongoing Projects</div>
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

CapitalProjectsExplorer.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  facilitiesSql: PropTypes.string.isRequired,
  housingDevelopmentSql: PropTypes.string.isRequired,
  housingDevelopmentSymbology: PropTypes.string.isRequired,
  cbBudgetRequestsPointsSql: PropTypes.string.isRequired,
  cbBudgetRequestsPolygonSql: PropTypes.string.isRequired,

  selectedFeatures: PropTypes.array.isRequired,
  setSelectedFeatures: PropTypes.func.isRequired,

  params: PropTypes.shape({
    layer: PropTypes.string,
  }),
};

CapitalProjectsExplorer.defaultProps = {
  params: {
    layer: null,
  },
};

const mapStateToProps = ({ capitalProjects, facilitiesCP, housingDevelopment, cbBudgetRequests }) => ({
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  facilitiesSql: facilitiesCP.sql,
  housingDevelopmentSql: housingDevelopment.sql,
  housingDevelopmentSymbology: housingDevelopment.symbologyDimension,
  cbBudgetRequestsPointsSql: cbBudgetRequests.pointsSql,
  cbBudgetRequestsPolygonSql: cbBudgetRequests.polygonsSql,

  selectedFeatures: capitalProjects.selectedFeatures,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: capitalProjectsActions.setSelectedFeatures,
})(CapitalProjectsExplorer);
