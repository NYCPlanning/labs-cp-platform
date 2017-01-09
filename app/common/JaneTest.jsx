import React from 'react'
import update from 'react/lib/update';
import Jane from '../../jane-maps'

import appConfig from '../helpers/appConfig.js'

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries'
import FacilitiesJaneLayer from '../facilities/facilitiesjanelayer'

const mapInit = {
  mapbox_accessToken: appConfig.mapbox_accessToken,
  center: [-74.0079, 40.7315],
  zoom: 12,
  minZoom: null,
  maxZoom: null,
  pitch: 0,
  hash: true,
  navigationControlPosition: 'bottom-right'
}

const searchConfig = {
  mapzen_api_key: appConfig.mapzen_api_key,
  bounds: {
    minLon: -74.292297,
    maxLon: -73.618011,
    minLat: 40.477248,
    maxLat: 40.958123
  }
}



const mapConfig = {
  selectedLayer: '311',
  layers: [
    {
      id: '311',
      name: 'Some 311 Data',
      visible: true,
      sources: [
        {
          id: '311',
          type: 'geojson',
          source: 'data/311.geojson'
        }
      ],
      mapLayers: [
        {
          id: '311',
          source: '311',
          "type": "circle",
          "paint": {
            "circle-radius": 4,
            "circle-color": "steelblue",
            "circle-opacity": 0.7
          }
        }
      ]
    },

    {
      id: 'adminboundaries',
      name: 'Admin. Boundaries',
      visible: true,
      component: AdminBoundariesJaneLayer
    },

    FacilitiesJaneLayer
  ]
}

const JaneTest = React.createClass({

  render() {
    return(
      <div style={{
          position: 'absolute',
          top: '100px',
          right: '0',
          bottom: '0',
          left: '0',
          background: 'lightgray'
        }}
      >
        <Jane 
          mapInit={mapInit}
          search={true}
          searchConfig={searchConfig}
          mapConfig={mapConfig}
        />
      </div>
    )
  }
})

export default JaneTest


