import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

class HighlightJaneLayer extends React.Component {
  highlightedCoordinates() {
    const point = this.props.selectedFeatures.find(f => f.geometry.type === 'Point');
    const polygonPresent = !!this.props.selectedFeatures.find(f => f.geometry.type === 'Polygon' ||
                                                                   f.geometry.type === 'MultiPolygon');

    if (point) { return point.geometry.coordinates; }
    if (polygonPresent) { return this.props.selectedPointCoordinates; }
    return null;
  }

  render() {
    const highlightedCoordinates = this.highlightedCoordinates();

    return (
      <JaneLayer
        id="highlight"
        hidden
      >
        { !!highlightedCoordinates &&
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
                  coordinates: highlightedCoordinates,
                },
              },
            ],
          }}
          nocache
        /> }

        { !!highlightedCoordinates &&
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
  }
}

HighlightJaneLayer.propTypes = {
  selectedFeatures: PropTypes.array,
  selectedPointCoordinates: PropTypes.array,
};

HighlightJaneLayer.defaultProps = {
  selectedFeatures: [],
  selectedPointCoordinates: [],
};

export default HighlightJaneLayer;
