import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';

import mapboxStyle from './mapbox-style';

class GLMap extends React.Component {

  static displayName = 'GLMap';

  componentDidMount() {
    this.initializeMap();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    // TODO this is a hack to get the GL map to resize to its container after changing the container size.  Need to find a less hacky way to do this
    setTimeout(() => this.map && this.map.resize(), 500);
  }

  componentWillUnmount() {
    this.map.off('mousemove', this.onMouseMove);
  }

  onMouseMove = (event) => {
    const layers = Object.keys(this.map.__INTERNAL__hoverLayers); // eslint-disable-line

    if (!layers.length) {
      return;
    }

    const layerFeatures = this.map.queryRenderedFeatures(event.point, { layers });
    this.map.getCanvas().style.cursor = (layerFeatures && layerFeatures.length > 0) ? 'pointer' : '';
  };

  initializeMap() {
    mapboxgl.accessToken = this.props.mapbox_accessToken;

    this.map = new mapboxgl.Map({
      container: this.container,
      style: this.props.mapStyle,
      zoom: this.props.zoom,
      minZoom: this.props.minZoom,
      center: this.props.center,
      pitch: this.props.pitch,
      hash: this.props.hash,
      logoPosition: 'bottom-right',
    });

    this.map.__INTERNAL__hoverLayers = []; // eslint-disable-line

    this.map.once('load', () => this.props.onLoad(this.map.getStyle()));
    this.map.on('mousemove', this.onMouseMove);

    if (this.props.navigationControl) this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }

  render() {
    return (
      <div
        className="gl-map"
        ref={(node) => { this.container = node; }}
      />
    );
  }
}

GLMap.propTypes = {
  mapbox_accessToken: PropTypes.string.isRequired,
  mapStyle: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number,
  center: PropTypes.array.isRequired,
  pitch: PropTypes.number,
  hash: PropTypes.bool,
  navigationControl: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
};

GLMap.defaultProps = {
  mapStyle: mapboxStyle,
  center: [0, 0],
  zoom: 2,
  minZoom: null,
  maxZoom: null,
  pitch: 0,
  hash: false,
  navigationControl: true,
  navigationControlPosition: 'top-right',
};

export default GLMap;
