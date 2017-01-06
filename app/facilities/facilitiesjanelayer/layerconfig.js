import colors from '../colors.js'

const layerConfig = {
  sources: [
    {
      "type": 'vector',
      "id": 'facilities',
      "sql": 'SELECT the_geom_webmercator FROM hkates.facilities_data'
    }
  ],
  mapLayers: [
    {
      "id": "facilities-points-outline",
      "source": 'facilities',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
        "circle-radius": {
          "stops": [
            [10,3],
            [15,7]
          ]
        },
        "circle-color": "#012700",
        "circle-opacity": 0.7
      }
    },
    {
      "id": "facilities-points",
      "source": 'facilities',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
        "circle-radius": {
          "stops": [
            [10,2],
            [15,6]
          ]
        },
        "circle-color": colors.getColorObject(),
        "circle-opacity": 0.7
      }
    }
  ]
}

export default layerConfig