import React from 'react';
import PropTypes from 'prop-types';

class Popup extends React.Component {
  componentDidMount() {
    const { map, mapLayerId } = this.props;
    console.log('did mount');
    window.map = map;

    this.popup = new mapboxgl.Popup({ // eslint-disable-line
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mouseenter', mapLayerId, (e) => {
      console.log('mouse enter');
      this.popup.setLngLat(e.features[0].geometry.coordinates)
          .setHTML(this.props.body)
          .addTo(map);
    });

    map.on('mouseleave', mapLayerId, () => {
      console.log('mouse leave')
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
