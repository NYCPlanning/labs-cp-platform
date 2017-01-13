
module.exports = {
  id: 'aerials',
  name: 'Aerial Imagery',
  icon: 'camera',
  visible: false,
  sources: [
    {
      id: 'nyaerials',
      type: 'raster',
      tiles: 'https://api.capitalplanning.nyc/api/tiles/dhsesorthos/{z}/{y}/{x}',
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
