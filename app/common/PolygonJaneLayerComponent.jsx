import React from 'react';
import PropTypes from 'prop-types';

class PolygonJaneLayerComponent extends React.Component {
  componentDidUpdate() {
    this.props.onUpdate({
      sources: [
        {
          id: 'feature',
          type: 'geojson',
          data: this.props.feature,
        },
      ],
      mapLayers: [
        {
          id: 'feature',
          source: 'feature',
          type: 'fill',
          paint: {
            'fill-color': 'steelblue',
            'fill-opacity': 0.75,
            'fill-antialias': true,
          },
        },
      ],
    });
  }

  render() {
    return null;
  }
}

PolygonJaneLayerComponent.propTypes = {
  onUpdate: PropTypes.func,
  feature: PropTypes.object.isRequired,
};

PolygonJaneLayerComponent.defaultProps = {
  onUpdate: () => {},
};

export default PolygonJaneLayerComponent;
