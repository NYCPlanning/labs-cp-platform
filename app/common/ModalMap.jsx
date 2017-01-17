// ModalMap.jsx - A simple mapboxGL map for the capital projects modals
// Props:
//  feature: a geojson feature whose geometry will be rendered on the map
// TODO: This is similar to SimplePointMap.jsx, maybe combine with that, or combine with a more generic MapboxGLMap.jsx

import React from 'react';
import centroid from 'turf-centroid';
import Jane from '../../jane-maps/src';

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries';
import TransportationJaneLayer from '../janelayers/transportation';
import ImageryJaneLayer from '../janelayers/imagery';


import appConfig from '../helpers/appConfig';

const ModalMap = React.createClass({
  propTypes: {
    feature: React.PropTypes.object,
    label: React.PropTypes.string,
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

    let center;
    if (feature.geometry.type === 'Point') {
      center = feature.geometry.coordinates;
    } else {
      center = centroid(feature).geometry.coordinates;
    }

    const mapInit = {
      mapbox_accessToken: appConfig.mapbox_accessToken,
      center,
      zoom: 12,
      minZoom: null,
      maxZoom: null,
      pitch: 60,
      hash: true,
      navigationControlPosition: 'bottom-right',
    };

    const mapConfig = {
      layers: [
        ImageryJaneLayer,
        AdminBoundariesJaneLayer,
        TransportationJaneLayer,
      ],
    };

    if (this.props.feature.geometry.type !== 'Point') {
      mapConfig.layers.push({
        id: 'feature',
        name: 'Feature',
        visible: true,
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

    return (
      <div id="modalmap" style={{ height: 450 }}>
        <Jane
          mapInit={mapInit}
          mapConfig={mapConfig}
          poiFeature={this.props.feature.geometry.type === 'Point' ? this.props.feature : null}
          poiLabel={this.props.feature.geometry.type === 'Point' ? this.props.label : null}
        />
      </div>
    );
  },
});

module.exports = ModalMap;
