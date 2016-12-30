import React from 'react'
import update from 'react/lib/update';
import {Jane} from '../jane'

import appConfig from '../helpers/appConfig.js'

import AdminBoundaries from './AdminBoundaries.jsx'

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

const FacilitiesLayer = React.createClass({

  componentDidMount() {

    const newLayer = update(this.props.layer, {
      sources: {$set: [
        {
          "type": 'vector',
          "id": 'facilities',
          "mapConfig": {
            "version": "1.3.0",
            "layers": [{
              "type": "mapnik",
              "options": {
                "cartocss_version": "2.1.1",
                "cartocss": "#layer { polygon-fill: #FFF; }",
                "sql": 'SELECT the_geom_webmercator FROM hkates.facilities_data'
              }
            }]
          }
        }
      ]},
      mapLayers: {$set: [
        {
          id: 'facilities',
          source: 'facilities',
          "source-layer": "layer0",
          "type": "circle",
          "paint": {
            "circle-radius": 4,
            "circle-color": "green",
            "circle-opacity": 0.7
          }
        }
      ]}
    })

    this.props.onUpdate(newLayer)
  },

  handleClick() {

     const newLayer = update(this.props.layer, {
      mapLayers: {$set: [
        {
          id: 'facilities-orange',
          source: 'facilities',
          "source-layer": "layer0",
          "type": "circle",
          "paint": {
            "circle-radius": 4,
            "circle-color": "orange",
            "circle-opacity": 0.7
          }
        }
      ]}
    })

    this.props.onUpdate(newLayer)
  },

  render() {
    return (
      <div>
        I am the FacilitiesLayer

        <button onClick={this.handleClick}>Click me</button>

      </div>
    )
  }
})

const mapConfig = {
  selectedLayer: '311',
  layers: [
    {
      id: '311',
      visible: false,
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

    // {
    //   id: 'adminboundaries',
    //   visible: true,
    //   sources: [
    //     {
    //       id: 'ntaboundaries',
    //       type: 'geojson',
    //       source: 'data/ntaboundaries.geojson'
    //     }
    //   ],
    //   mapLayers: [
    //     {
    //       id: 'ntaboundaries',
    //       source: 'ntaboundaries',
    //       type: 'line',
    //       "paint": {
    //         "line-color": "#888",
    //         "line-width": 8
    //       }
    //     }
    //   ]
    // },

    {
      id: 'adminboundaries',
      visible: true,
      component: AdminBoundaries
    },

    {
      id: 'facilities',
      visible: false,
      // sources: [
      //   {
      //     "type": 'vector',
      //     "id": 'facilities',
      //     "mapConfig": {
      //       "version": "1.3.0",
      //       "layers": [{
      //         "type": "mapnik",
      //         "options": {
      //           "cartocss_version": "2.1.1",
      //           "cartocss": "#layer { polygon-fill: #FFF; }",
      //           "sql": 'SELECT the_geom_webmercator FROM hkates.facilities_data'
      //         }
      //       }]
      //     }
      //   }
      // ],
      // mapLayers: [
      //   {
      //     id: 'facilities',
      //     source: 'facilities',
      //     "source-layer": "layer0",
      //     "type": "circle",
      //     "paint": {
      //       "circle-radius": 4,
      //       "circle-color": "green",
      //       "circle-opacity": 0.7
      //     }
      //   }
      // ],
      component: FacilitiesLayer
    }
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
          debug={true}
        />
       
      </div>
    )
  }
})

export default JaneTest


