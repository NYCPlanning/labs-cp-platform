import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from 'jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';


class AerialsJaneLayer extends React.Component {

  static propTypes = {
    defaultSelected: PropTypes.bool,
    defaultDisabled: PropTypes.bool,
  };

  static defaultProps = {
    defaultSelected: false,
    defaultDisabled: false,
  }

  render() {
    return (
      <JaneLayer
        id="aerials"
        name="Aerial Imagery"
        icon="camera"
        defaultSelected={this.props.defaultSelected}
        defaultDisabled={this.props.defaultDisabled}
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
