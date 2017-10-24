const config = {
  sources: [
    {
      id: 'travelshed',
      type: 'geojson',
    },
  ],
  mapLayers: [
    {
      id: 'travelshed',
      type: 'fill',
      source: 'travelshed',
      paint: {
        'fill-color': 'steelblue',
        'fill-opacity': 0.3,
        'fill-outline-color': 'gray',
      },
    },
  ],
};

export default config;
