import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

const HighlightJaneLayer = props => (
  <JaneLayer
    id="highlight"
    hidden
  >
    { !_.isEmpty(props.coordinates) &&
    <Source
      id="highlighted"
      type="geojson"
      data={{
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: props.coordinates,
            },
          },
        ],
      }}
      nocache
    /> }

    { !_.isEmpty(props.coordinates) &&
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
  </JaneLayer>
);

HighlightJaneLayer.propTypes = {
  coordinates: PropTypes.array,
};

HighlightJaneLayer.defaultProps = {
  coordinates: null,
};

export default HighlightJaneLayer;
