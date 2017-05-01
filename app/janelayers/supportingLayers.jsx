import React from 'react';
import { JaneLayer } from 'jane-maps';
import appConfig from '../helpers/appConfig';

import TransportationComponent from './transportation/Component';
import AdminBoundariesComponent from './adminboundaries/Component';
import TravelshedComponent from './travelshed/Component';

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
          tiles: `//${appConfig.api_domain}/tiles/dhsesorthos/{z}/{y}/{x}.png`,
        },
      ]}
      mapLayers={[
        {
          id: 'nyaerials',
          type: 'raster',
          source: 'nyaerials',
        },
      ]}
    />
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
