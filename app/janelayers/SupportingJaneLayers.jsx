import React from 'react';
import JaneLayer from '../../jane-maps/src/JaneLayer';

import appConfig from '../helpers/appConfig';

import TransportationComponent from './transportation/Component';
import AdminBoundariesComponent from './adminboundaries/Component';

const SupportingJaneLayers = [
  <JaneLayer
    id="aerials"
    name="Aerial Imagery"
    icon="camera"
    sources={[
      {
        id: 'nyaerials',
        type: 'raster',
        tiles: `//${appConfig.api_domain}/api/tiles/dhsesorthos/{z}/{y}/{x}`,
      },
    ]}
    mapLayers={[
      {
        id: 'nyaerials',
        type: 'raster',
        source: 'nyaerials',
      },
    ]}
    key="aerials"
  />,

  <JaneLayer
    id="adminboundaries"
    name="Admin. Boundaries"
    icon="flag"
    component={AdminBoundariesComponent}
    key="adminboundaries"
  />,

  <JaneLayer
    id="transportation"
    name="Transportation"
    icon="subway"
    component={TransportationComponent}
    key="transportation"
  />,
];

export default SupportingJaneLayers;