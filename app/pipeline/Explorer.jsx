// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';
import PropTypes from 'prop-types';
import { Jane, JaneLayer, Source, MapLayer } from 'jane-maps';
import { connect } from 'react-redux';
import _ from 'lodash';

import { circleColors } from '../pipeline/config';
import appConfig from '../helpers/appConfig';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer, ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../janelayers';

import PipelineComponent from './janelayer/Component';
import ListItem from './janelayer/ListItem';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import * as pipelineActions from '../actions/pipeline';

const pointsLayerPaint = {
  'circle-radius': {
    property: 'dcp_units_use_map',
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

const polygonsLayerPaint = {
  'fill-color': 'steelblue',
  'fill-opacity': 0.75,
  'fill-outline-color': '#838763',
  'fill-antialias': true,
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
  handleMapLayerClick = (features) => {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    this.props.setSelectedFeatures([]);
    setTimeout(() => this.props.setSelectedFeatures(features), 450);
  };

  clearSelectedFeatures = () => {
    this.props.setSelectedFeatures([]);
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
      ['circle-color']: this.props.symbologyDimension === 'dcp_permit_type'
        ? circleColors.dcp_permit_type
        : circleColors.dcp_pipeline_status
    });

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
            id="pipeline"
            name="Housing Pipeline"
            icon="building"
            defaultSelected={true}
            onMapLayerClick={this.handleMapLayerClick}
            component={<PipelineComponent />}>

            <Source id="pipeline-points" type="cartovector" options={sourceOptions}/>
            <Source id="pipeline-polygons" type="cartovector" options={sourceOptions} />

            {
              this.props.selectedFeatures.length > 0 &&
              <Source id="highlightPoints" type="geojson" data={{
                type: 'Feature',
                geometry: this.props.selectedFeatures[0].geometry
              }} />
            }

            <MapLayer id="pipeline-points"
                      source="pipeline-points"
                      sourceLayer="layer0"
                      type="circle"
                      paint={pointsLayerPaintWithSymbology}/>

            <MapLayer id="pipeline-polygons"
                      source="pipeline-polygons"
                      sourceLayer="layer0"
                      type="fill"
                      paint={polygonsLayerPaint}/>

            {
              this.props.selectedFeatures.length > 0 &&
              <MapLayer id="highlightPoints"
                        source="highlightPoints"
                        type="circle"
                        paint={highlightPointsPaint}/>
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
  sql: PropTypes.string,
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
