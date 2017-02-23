import appConfig from '../helpers/appConfig';

import TransportationComponent from './transportation/Component';
import AdminBoundariesComponent from './adminboundaries/Component';

const janeLayerConfig = {
  transportation: {
    id: 'transportation',
    name: 'Transportation',
    icon: 'subway',
    component: TransportationComponent,
  },

  aerials: {
    id: 'aerials',
    name: 'Aerial Imagery',
    icon: 'camera',
    sources: [
      {
        id: 'nyaerials',
        type: 'raster',
        tiles: `//${appConfig.api_domain}/api/tiles/dhsesorthos/{z}/{y}/{x}`,
      },
    ],
    mapLayers: [
      {
        id: 'nyaerials',
        type: 'raster',
        source: 'nyaerials',
      },
    ],
  },

  adminboundaries: {
    id: 'adminboundaries',
    name: 'Admin. Boundaries',
    icon: 'flag',
    component: AdminBoundariesComponent,
  },
};


export default janeLayerConfig;
