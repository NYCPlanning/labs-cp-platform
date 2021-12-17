import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import appConfig from '../../config/appConfig';
import CapitalProjectsSidebar from './CapitalProjectsSidebar';

const CapitalProjectsJaneLayer = props => (
  <JaneLayer
    id="capital-projects"
    name="Capital Projects"
    icon="usd"
    component={<CapitalProjectsSidebar
      selectedPointType={props.selectedPointType}
      selectedPointCoordinates={props.selectedPointCoordinates}
      handleRadiusFilter={props.handleRadiusFilter}
    />}
    selected={props.selected}
    enabled={props.enabled}
  >

    <Source
      id="capital-projects"
      type="cartovector"
      options={{
        carto_domain: appConfig.carto_domain,
        sql: [props.pointsSql, props.polygonsSql],
      }}
    />

    <MapLayer
      id="capital-projects-polygons"
      source="capital-projects"
      sourceLayer="layer1"
      onClick={props.handleMapLayerClick}
      type="fill"
      paint={{
        'fill-color': '#d98127',
        'fill-opacity': 0.75,
        'fill-antialias': true,
      }}
    />

    <MapLayer
      id="capital-projects-points"
      source="capital-projects"
      sourceLayer="layer0"
      onClick={props.handleMapLayerClick}
      type="circle"
      paint={{
        'circle-radius': {
          stops: [
            [10, 2],
            [15, 6],
          ],
        },
        'circle-color': '#d98127',
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
  </JaneLayer>
);

CapitalProjectsJaneLayer.propTypes = {
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,
  handleRadiusFilter: PropTypes.func.isRequired,

  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
};

CapitalProjectsJaneLayer.defaultProps = {
  selected: false,
  enabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default CapitalProjectsJaneLayer;
