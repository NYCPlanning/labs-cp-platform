import React from 'react'
import update from 'react/lib/update'
import FacLayerSelector from './FacLayerSelectorJane.jsx'
import facilitiesLayers from '../facilities/facilitiesLayers.js'

const config = {
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
        "circle-color": getColorObject(),
        "circle-opacity": 0.7
      }
    }
  ]
}

function getColorObject() {
  //generate a mapboxGL style categorical color object based on mode
  //if(this.props.mode=='all') {
    return {
      property: 'domain',
      type: 'categorical',
      stops: facilitiesLayers.map(function(layer) {
        return [
          layer.name,
          layer.color
        ]
      })
    }
  // } else {
  //   return {
  //     property: 'facilitygroup',
  //     type: 'categorical',
  //     stops: this.layerStructure[0].children.map(function(layer) {
  //       return [
  //         layer.name,
  //         layer.color
  //       ]
  //     })
  //   }
  // }
}


const Facilities = React.createClass({

  componentDidMount() {
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, domain, facilitygroup, facilitysubgroup, facilityname, address, facilitytype',
      tablename: 'hkates.facilities_data'
    }

    const sql=`SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}`
    //this.layerStructure=facilitiesLayers

    this.setState({
      sql: sql
    })

    this.updateSQL(sql)
  },

  updateSQL(sql) {

    const newConfig = update(config, {
      sources: {
        0: {
          sql: {
            $set: sql
          }
        }
      }
    })

    const newLayer = update(this.props.layer, {
      sources: {
        $set: newConfig.sources
      },
      mapLayers: {
        $set: newConfig.mapLayers
      }
    })

    this.updateMapElements(newLayer)
  },

  updateMapElements(layerConfig) {
    this.props.onUpdate(layerConfig)
  },

  handleClick() {
    this.updateMapElements(newConfig)
  },

  render() {
    return (
      <FacLayerSelector
        facilitiesLayers={facilitiesLayers}
        updateSQL={this.updateSQL}
        sql={''}
        sqlConfig={this.sqlConfig}
      />
    )
  }
})

export default Facilities