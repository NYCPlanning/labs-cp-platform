
module.exports = {
  id: 'grayoutsidenyc',
  visible: true,
  inList: false,
  sources: [
    {
      id: 'grayoutsidenyc',
      type: 'geojson',
      source: 'data/grayoutsidenyc.geojson'
    }
  ],
  mapLayers: [
    {
      "id": "grayoutsidenyc",
      "type": "fill",
      "source": "grayoutsidenyc",
      "paint": {
        'fill-color': '#000',
        'fill-opacity': 0.15   
      }
    }
  ]
}
