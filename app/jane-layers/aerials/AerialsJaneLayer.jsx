import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';


class AerialsJaneLayer extends React.Component {

  static propTypes = {
    selected: PropTypes.bool,
    enabled: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    enabled: false,
  }

  render() {
    return (
      <JaneLayer
        id="aerials"
        name="Aerial Imagery"
        icon="camera"
        selected={this.props.selected}
        enabled={this.props.enabled}
        component={<SidebarComponent />}
      >
        <Source
          id="doitt_aerials"
          type="raster"
          tileSize={256}
          tiles={`//${appConfig.api_domain}/tiles/doitt/tms/1.0.0/photo/2016/{z}/{x}/{y}.png`}
        />
        <MapLayer
          id="doitt_aerials"
          type="raster"
          source="doitt_aerials"
        />
      </JaneLayer>
    );
  }
}

export default AerialsJaneLayer;
