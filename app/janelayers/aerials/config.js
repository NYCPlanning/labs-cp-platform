import appConfig from '../../helpers/appConfig';

const config = {
  sources: [
    {
      id: 'nyaerials',
      type: 'raster',
      tileSize: 256,
      tiles: `//${appConfig.api_domain}/tiles/doitt/tms/1.0.0/photo/2016/{z}/{x}/{y}.png`,
    },
  ],
  mapLayers: [
    {
      id: 'nyaerials',
      type: 'raster',
      source: 'nyaerials',
    },
  ],
};

export default config;
