import React from 'react';
import { JaneLayer } from 'jane-maps';
import appConfig from '../helpers/appConfig';

import TransportationComponent from './transportation/Component';
import AdminBoundariesComponent from './adminboundaries/Component';
import TravelshedComponent from './travelshed/Component';
import AerialsComponent from './aerials/Component';

const janeLayerConfig = {
  transportation: (
    <JaneLayer
      id="transportation"
      name="Transportation"
      icon="subway"
      component={<TransportationComponent />}
    />
  ),

  aerials: (
    <JaneLayer
      id="aerials"
      name="Aerial Imagery"
      icon="camera"
      sources={[
        {
          id: 'nyaerials',
          type: 'raster',
          tileSize: 256,
          tiles: `//${appConfig.api_domain}/tiles/doitt/tms/1.0.0/photo/2016/{z}/{x}/{y}.png`,
        },
      ]}
      mapLayers={[
        {
          id: 'nyaerials',
          type: 'raster',
          source: 'nyaerials',
        },
      ]}
    >
    </JaneLayer>
  ),

  adminboundaries: (
    <JaneLayer
      id="adminboundaries"
      name="Admin. Boundaries"
      icon="flag"
      component={<AdminBoundariesComponent />}
    />
  ),

  travelshed: (
    <JaneLayer
      id="travelshed"
      name="Travelshed"
      icon="road"
    >
      <TravelshedComponent />
    </JaneLayer>
  ),
};


export default janeLayerConfig;
