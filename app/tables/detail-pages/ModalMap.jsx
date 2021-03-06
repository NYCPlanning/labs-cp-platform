// ModalMap.jsx - A simple mapboxGL map for the capital projects modals
// Props:
//  feature: a geojson feature whose geometry will be rendered on the map
// TODO: This is similar to SimplePointMap.jsx, maybe combine with that, or combine with a more generic MapboxGLMap.jsx

import React from 'react';
import PropTypes from 'prop-types';
import centroid from 'turf-centroid';
import extent from 'turf-extent';
import { Jane, JaneLayer, Marker, Source, MapLayer } from '../../jane-maps';
import appConfig from '../../config/appConfig';

class ModalMap extends React.Component {
  componentDidMount() {
    // get the mapbox GL map object
    if (this.props.feature.geometry.type !== 'Point') {
      const bounds = extent(this.props.feature.geometry);
      const glBounds = [[bounds[0], bounds[1]], [bounds[2], bounds[3]]];

      this.map.fitBounds(glBounds, { padding: 100 });
    }
  }

  getCenter = () => {
    const { feature } = this.props;
    // single points get flyTo(), everything else gets fitBounds()
    if (feature.geometry.type === 'Point') {
      return feature.geometry.coordinates;
    }

    return centroid(feature).geometry.coordinates; // get the centroid
  };

  render() {
    const { feature, label } = this.props;
    const geometry = feature.geometry;

    let center;
    if (geometry.type === 'Point') {
      center = geometry.coordinates;
    } else {
      center = centroid(feature).geometry.coordinates;
    }

    const mapboxGLOptions = {
      mapbox_accessToken: appConfig.mapbox_accessToken,
      center,
      zoom: 12,
      minZoom: null,
      maxZoom: null,
      pitch: 0,
      hash: false,
      navigationControlPosition: 'bottom-right',
    };

    return (
      <div id="modalmap" style={{ position: 'relative', height: 450, marginBottom: '20px' }}>
        <Jane
          mapboxGLOptions={mapboxGLOptions}
          ref={(node) => { this.map = node && node.GLMap.map; }}
        >
          {
            geometry.type === 'Point' &&
            <JaneLayer
              id="modalMapMarker"
              hidden
            >
              <Marker feature={feature} label={label} flyTo />
            </JaneLayer>
          }
          { geometry.type !== 'Point' &&
            <JaneLayer
              id="feature"
              name="Feature"
              icon="map-marker"
              hidden
            >
              <Source id="feature" type="geojson" data={feature} />
              <MapLayer
                id="feature"
                source="feature"
                type="fill"
                paint={{
                  'fill-color': 'steelblue',
                  'fill-opacity': 0.75,
                  'fill-antialias': true,
                }}
              />
            </JaneLayer>
          }
        </Jane>
      </div>
    );
  }
}

ModalMap.defaultProps = {
  label: '',
};

ModalMap.propTypes = {
  feature: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export default ModalMap;
