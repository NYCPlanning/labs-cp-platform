import React from 'react';
import PropTypes from 'prop-types';
import circle from '@turf/circle';
import _ from 'lodash';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

class RadiusHighlightJaneLayer extends React.Component {
  radiusActive() {
    return (!_.isEmpty(this.props.coordinates) && this.props.radius);
  }

  render() {
    const radiusCircleGeojson = () => {
      if (this.radiusActive()) return circle(this.props.coordinates, this.props.radius, { steps: 128 });
      return {};
    };

    return (
      <JaneLayer
        id="radius-highlight"
        hidden
      >
        { this.radiusActive() &&
        <Source
          id="radius-highlight"
          type="geojson"
          data={radiusCircleGeojson()}
          nocache
        /> }

        { this.radiusActive() &&
        <MapLayer
          id="radius-highlight"
          source="radius-highlight"
          type="fill"
          paint={{
            'fill-color': '#5f5f5f',
            'fill-opacity': 0.25,
            'fill-antialias': true,
          }}
        /> }
      </JaneLayer>
    );
  }
}

RadiusHighlightJaneLayer.propTypes = {
  coordinates: PropTypes.array,
  radius: PropTypes.number,
};

RadiusHighlightJaneLayer.defaultProps = {
  coordinates: null,
  radius: null,
};

export default RadiusHighlightJaneLayer;
