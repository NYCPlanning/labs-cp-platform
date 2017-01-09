import colors from '../colors.js'
import appConfig from '../../helpers/appConfig.js'

const layerConfig = {
  sources: [
    {
      "type": 'cartovector',
      "id": 'facilities',
      "options": {
        "carto_user": appConfig.carto_user,
        "carto_domain": appConfig.carto_domain
      }
      
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