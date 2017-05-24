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
    >
      <TransportationComponent />
    </JaneLayer>
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
          // tiles: `//${appConfig.api_domain}/tiles/doitt/tms/1.0.0/photo/2016/{z}/{x}/{y}.png`,
          tiles: 'https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8',
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
      <AerialsComponent />
    </JaneLayer>
  ),

  adminboundaries: (
    <JaneLayer
      id="adminboundaries"
      name="Admin. Boundaries"
      icon="flag"
    >
      <AdminBoundariesComponent />
    </JaneLayer>
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
