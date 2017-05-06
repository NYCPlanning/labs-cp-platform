// ModalMap.jsx - A simple mapboxGL map for the capital projects modals
// Props:
//  feature: a geojson feature whose geometry will be rendered on the map
// TODO: This is similar to SimplePointMap.jsx, maybe combine with that, or combine with a more generic MapboxGLMap.jsx

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import centroid from 'turf-centroid';
import extent from 'turf-extent';
import { Jane, JaneLayer } from 'jane-maps';

import supportingLayers from '../janelayers/supportingLayers';
import appConfig from '../helpers/appConfig';

const ModalMap = createReactClass({
  propTypes: {
    feature: PropTypes.object.isRequired,
    label: PropTypes.string,
  },

  getDefaultProps() {
    return { label: '' };
  },

  componentDidMount() {
    // get the mapbox GL map object
    this.map = this.janeMap.map.mapObject;

    if (this.props.feature.geometry.type !== 'Point') {
      const bounds = extent(this.props.feature.geometry);
      const glBounds = [[bounds[0], bounds[1]], [bounds[2], bounds[3]]];

      this.map.fitBounds(glBounds, { padding: 100 });
    }
  },

  getCenter() {
    const feature = this.props.feature;
    // single points get flyTo(), everything else gets fitBounds()
    if (feature.geometry.type === 'Point') {
      return feature.geometry.coordinates;
    }

    return centroid(feature).geometry.coordinates; // get the centroid
  },

  render() {
    const feature = this.props.feature;
    const geometry = this.props.feature.geometry;

    let center;
    if (geometry.type === 'Point') {
      center = geometry.coordinates;
    } else {
      center = centroid(feature).geometry.coordinates;
    }

    const mapInit = {
      mapbox_accessToken: appConfig.mapbox_accessToken,
      center,
      zoom: 12,
      minZoom: null,
      maxZoom: null,
      pitch: 0,
      hash: false,
      navigationControlPosition: 'bottom-right',
    };

    let PolygonJaneLayer = null;
    if (geometry.type !== 'Point') {
      PolygonJaneLayer = (
        <JaneLayer
          id="feature"
          name="Feature"
          icon="map-marker"
          visible
          sources={[
            {
              id: 'feature',
              type: 'geojson',
              data: this.props.feature,
            },
          ]}
          mapLayers={[
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
          ]}
        />
      );
    }

    return (
      <div id="modalmap" style={{ position: 'relative', height: 450, marginBottom: '20px' }}>
        <Jane
          mapInit={mapInit}
          poiFeature={geometry.type === 'Point' ? this.props.feature : null}
          poiLabel={geometry.type === 'Point' ? this.props.label : null}
          ref={x => (this.janeMap = x)}
        >
          {supportingLayers.aerials}
          {supportingLayers.adminboundaries}
          {supportingLayers.transportation}
          {PolygonJaneLayer}
        </Jane>
      </div>
    );
  },
});

module.exports = ModalMap;
