import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

class Popup extends React.Component {
  static displayName = 'Popup';

  componentDidMount() {
    const { map, mapLayerId } = this.props;

    this.popup = new mapboxgl.Popup({ // eslint-disable-line
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mousemove', mapLayerId, (e) => {
      const f = e.features[0].properties;

      this.popup.setLngLat(e.lngLat)
          .setHTML(this.props.body)
          .addTo(map);
    });

    map.on('mouseleave', mapLayerId, () => {
      this.popup.remove();
    });
  }

  render() {
    return null;
  }
}

Popup.propTypes = {
  map: PropTypes.object,
  mapLayerId: PropTypes.string,
  body: PropTypes.string.isRequired,
};

Popup.defaultProps = {
  map: {},
  mapLayerId: null,
};

export default Popup;
