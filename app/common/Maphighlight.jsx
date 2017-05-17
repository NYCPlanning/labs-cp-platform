import React from 'react';
import { JaneLayer } from 'jane-maps';

const MapHighlight = (props) => {
  const { coords } = props;

  const sources = [{
    id: 'highlight',
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
    },
  }];

  const mapLayers = [{
    id: 'highlight',
    type: 'circle',
    source: 'highlight',
    paint: {
      'circle-color': 'rgba(255, 255, 255, 1)',
      'circle-opacity': 0,
      'circle-radius': 10,
      'circle-stroke-width': 3,
      'circle-pitch-scale': 'map',
      'circle-stroke-color': 'rgba(217, 107, 39, 1)',
      'circle-stroke-opacity': 0.8,
    },
  }];

  return (
    <JaneLayer
      id="highlight"
      visible
      sources={sources}
      mapLayers={mapLayers}
    />
  );
};

MapHighlight.defaultProps = {
  coords: React.PropTypes.array.isRequired,
};
MapHighlight.displayName = 'JaneLayer';

export default MapHighlight;
