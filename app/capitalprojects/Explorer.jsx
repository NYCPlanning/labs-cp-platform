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
} from '../jane-layers';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';

import CPListItem from './list-items/CPListItem';
import SCAListItem from './list-items/SCAListItem';
import FacilitiesListItem from './list-items/FacilitiesListItem';

import SCAPlanComponent from './janelayer/SCAPlanComponent';

import appConfig from '../helpers/appConfig';

import './styles.scss';

const { mapboxGLOptions, searchConfig } = appConfig;

const SCAPointsSourceOptions = {
  carto_user: appConfig.carto_user,
  carto_domain: appConfig.carto_domain,
  sql: ['SELECT * FROM cpdb_sca_pts_170201'],
};

const SCAPointsPaint = {
  'circle-radius': {
    stops: [
      [10, 2],
      [15, 6],
    ],
  },
  'circle-color': '#5C99FF',
  'circle-opacity': 0.7,
};

const SCAOutlinePaint = {
  'circle-radius': {
    stops: [
      [10, 3],
      [15, 7],
    ],
  },
  'circle-color': '#012700',
  'circle-opacity': 0.7,
};

const capitalProjectsPolygonsPaint = {
  'fill-color': {
    property: 'totalspend',
    stops: [
      [0, '#8B8C98'],
      [1, '#d98127'],
    ],
  },
  'fill-opacity': 0.75,
  'fill-antialias': true,
};

const capitalProjectsPointsPaint = {
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
};

const capitalProjectsPointsOutlinePaint = {
  'circle-radius': {
    stops: [
      [10, 3],
      [15, 7],
    ],
  },
  'circle-color': '#012700',
  'circle-opacity': 0.7,
};

class CapitalProjectsExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
    };
    this.selectedFeaturesCache = [];
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
          return <CPListItem feature={feature} key={feature.id} />;
        case 'sca-points':
          return <SCAListItem feature={feature} key={feature.id} />;
        case 'facilities':
          return <FacilitiesListItem feature={feature} key={feature.id} />;
        default:
          return null;
      }
    });

    const capitalProjectsSourceOptions = {
      carto_user: appConfig.carto_user,
      carto_domain: appConfig.carto_domain,
      sql: [this.props.pointsSql, this.props.polygonsSql],
    };

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
            defaultDisabled
          />

          <JaneLayer
            id="scaplan"
            name="SCA Capital Plan"
            icon="graduation-cap"
            component={<SCAPlanComponent />}
          >

            <Source id="sca-points" type="cartovector" options={SCAPointsSourceOptions} />

            <MapLayer
              id="sca-points-points"
              source="sca-points"
              sourceLayer="layer0"
              onClick={this.handleMapLayerClick}
              type="circle"
              paint={SCAPointsPaint}
            />

            <MapLayer
              id="sca-points-outline"
              source="sca-points"
              sourceLayer="layer0"
              type="circle"
              paint={SCAOutlinePaint}
            />

            <Legend>
              <div className="legendSection">
                <div className="legendItem">
                  <div className="colorBox" style={{ backgroundColor: '#5C99FF' }} />
                  <div className="legendItemText">SCA Projects</div>
                </div>
              </div>
            </Legend>
          </JaneLayer>

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

            <Source id="capital-projects" type="cartovector" options={capitalProjectsSourceOptions} />

            <MapLayer
              id="capital-projects-polygons"
              source="capital-projects"
              sourceLayer="layer1"
              onClick={this.handleMapLayerClick}
              type="fill"
              paint={capitalProjectsPolygonsPaint}
            />

            <MapLayer
              id="capital-projects-points"
              source="capital-projects"
              sourceLayer="layer0"
              onClick={this.handleMapLayerClick}
              type="circle"
              paint={capitalProjectsPointsPaint}
            />

            <MapLayer
              id="capital-projects-points-outline"
              source="capital-projects"
              sourceLayer="layer0"
              type="circle"
              paint={capitalProjectsPointsOutlinePaint}
            />

            <Legend>
              <div className="legendSection">
                <div className="legendItem">
                  <div className="colorBox" style={{ backgroundColor: '#8B8C98' }} />
                  <div className="legendItemText">Planned Projects</div>
                </div>
                <div className="legendItem">
                  <div className="colorBox" style={{ backgroundColor: '#d98127' }} />
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
  setSelectedFeatures: PropTypes.func.isRequired,
  selectedFeatures: PropTypes.array.isRequired,
};

const mapStateToProps = ({ capitalProjects }) => ({
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  selectedFeatures: capitalProjects.selectedFeatures,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: capitalProjectsActions.setSelectedFeatures,
})(CapitalProjectsExplorer);
