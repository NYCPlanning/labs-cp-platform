import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import Mustache from 'mustache';

import './Popup.scss';

class Popup extends React.Component {
  static displayName = 'Popup';

  componentDidMount() {
    const { map, mapLayerId } = this.props;

    this.popup = new mapboxgl.Popup({ // eslint-disable-line
      closeButton: false,
      closeOnClick: false,
      anchor: 'left',
      offset: 10,
    });

    map.on('mousemove', mapLayerId, (e) => {
      const view = {
        p: e.features[0].properties,
      };

      this.popup.setLngLat(e.lngLat)
        .setHTML(Mustache.render(this.props.template, view))
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
  template: PropTypes.string.isRequired,
};

Popup.defaultProps = {
  map: {},
  mapLayerId: null,
};

export default Popup;
