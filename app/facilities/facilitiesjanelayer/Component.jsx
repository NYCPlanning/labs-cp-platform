import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'
import Moment from 'moment'

import LayerSelector from './LayerSelector.jsx'
import facilitiesLayers from '../facilitiesLayers.js'
import colors from '../colors.js'

import Carto from '../../helpers/carto.js'


const Facilities = React.createClass({

  componentWillMount() {
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, domain, facilitygroup, facilitysubgroup, facilityname, address, facilitytype',
      tablename: 'hkates.facilities_data'
    }

    const sql=`SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}`

    this.config = {
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

    this.setState({
      sql: sql
    })

    this.updateSQL(sql)

    this.renderLegend()
  },

  handleLayerClick(e) {
  },

  //updates the sql for the map source
  updateSQL(sql) {

    const newConfig = update(this.config, {
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

  //sends the new layerConfig up the chain
  updateMapElements(layerConfig) {
    this.props.onUpdate(layerConfig)
  },

  //builds a legend with a composed date range, updates layer config
  renderLegend() {
    const self=this
    const sql = `
      SELECT
        min(datesourceupdated)::date AS min,
        max(datesourceupdated)::date AS max
      FROM hkates.facilities_data`

    Carto.SQL(sql, 'json')
      .then(function(data) {

        const range = {
          min: Moment(data[0].min).format('MM/DD/YYYY'),
          max: Moment(data[0].max).format('MM/DD/YYYY')
        }

        const legendContent = (
          <div className="legendSection">
            <p>Click on the map for facility details</p>
            <p>Data current as of {range.min} - {range.max}</p>
          </div>
        )

        const newLayer = update(self.props.layer, {
          legend: {
            $set: legendContent
          }
        })

        self.updateMapElements(newLayer)
      })
  },

  render() {

    const tabStyle = {
      height: '30px'
    }

    return (
      <Tabs>
        <Tab label="Data">
          <LayerSelector
            facilitiesLayers={facilitiesLayers}
            updateSQL={this.updateSQL}
            sql={this.state.sql}
            sqlConfig={this.sqlConfig}
          />
        </Tab>
        <Tab label="About">
          About this Data Layer
        </Tab>
        <Tab label="Download">
          Coming Soon
        </Tab>
      </Tabs>  
    )
  }
})

export default Facilities