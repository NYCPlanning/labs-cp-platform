// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Jane, JaneLayer, Source, MapLayer } from '../jane-maps';

import { circleColors } from '../pipeline/config';
import appConfig from '../helpers/appConfig';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer, ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../jane-layers';

import PipelineComponent from './janelayer/Component';
import ListItem from './janelayer/ListItem';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import * as pipelineActions from '../actions/pipeline';

const pointsLayerPaint = {
  'circle-radius': {
    property: 'u_net',
    stops: [
      [{ zoom: 10, value: -12 }, 1],
      [{ zoom: 10, value: 1669 }, 2],
      [{ zoom: 10, value: 1669 }, 4],
      [{ zoom: 14, value: -12 }, 5],
      [{ zoom: 14, value: 100 }, 10],
      [{ zoom: 14, value: 1669 }, 20],
    ],
  },
  'circle-color': '#FFF',
  'circle-stroke-color': '#000',
  'circle-stroke-width': {
    stops: [
      [11, 0],
      [12, 1],
    ],
  },
  'circle-stroke-opacity': 0.5,
  'circle-opacity': 0.5,
};

const highlightPointsPaint = {
  'circle-color': 'rgba(255, 255, 255, 1)',
  'circle-opacity': 0,
  'circle-radius': 15,
  'circle-stroke-width': 3,
  'circle-pitch-scale': 'map',
  'circle-stroke-color': 'rgba(217, 107, 39, 1)',
  'circle-stroke-opacity': 0.8,
};

const { mapboxGLOptions, searchConfig } = appConfig;

class PipeLineExplorer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPointType: '',
      selectedPointCoordinates: [],
    };
  }

  clearSelectedFeatures = () => {
    this.props.setSelectedFeatures([]);
  };

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

    const pointsLayerPaintWithSymbology = _.assign({}, pointsLayerPaint, {
      'circle-color': this.props.symbologyDimension === 'dcp_dev_category'
        ? circleColors.dcp_dev_category
        : circleColors.dcp_status,
    });

    return (
      <div className="full-screen">
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
          <JaneLayer
            id="pipeline"
            name="Housing Pipeline"
            icon="building"
            defaultSelected
            component={<PipelineComponent
              selectedPointType={this.state.selectedPointType}
              selectedPointCoordinates={this.state.selectedPointCoordinates}
            />}
          >

            <Source id="pipeline-points" type="cartovector" options={sourceOptions} />

            {
              this.props.selectedFeatures.length > 0 &&
              <Source
                id="highlightPoints"
                type="geojson"
                data={{
                  type: 'Feature',
                  geometry: this.props.selectedFeatures[0].geometry,
                }}
                nocache
              />
            }

            <MapLayer
              id="pipeline-points"
              source="pipeline-points"
              sourceLayer="layer0"
              type="circle"
              onClick={this.handleMapLayerClick}
              paint={pointsLayerPaintWithSymbology}
            />

            {
              this.props.selectedFeatures.length > 0 &&
              <MapLayer
                id="highlightPoints"
                source="highlightPoints"
                type="circle"
                paint={highlightPointsPaint}
              />
            }
          </JaneLayer>
        </Jane>

        <SelectedFeaturesPane>
          {listItems}
        </SelectedFeaturesPane>
      </div>
    );
  }
}

PipeLineExplorer.propTypes = {
  sql: PropTypes.string.isRequired,
  symbologyDimension: PropTypes.string,
  selectedFeatures: PropTypes.array,
  setSelectedFeatures: PropTypes.func.isRequired,
};

const mapStateToProps = ({ pipeline }) => ({
  sql: pipeline.sql,
  symbologyDimension: pipeline.symbologyDimension,
  selectedFeatures: pipeline.selectedFeatures,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: pipelineActions.setSelectedFeatures,
})(PipeLineExplorer);
