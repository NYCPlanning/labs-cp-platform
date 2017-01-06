import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'
import Moment from 'moment'

import LayerSelector from './LayerSelector.jsx'
import colors from '../colors.js'
import layerConfig from './layerconfig.js'

import Carto from '../../helpers/carto.js'


const Facilities = React.createClass({

  componentDidMount() {
    this.renderLegend()
  },

  //updates the sql for the map source
  updateLayerConfig(sql) {
    //use this method to build new mapConfig based on mode

    const newLayerConfig = update(layerConfig, {
      sources: {
        0: {
          sql: {
            $set: sql
          }
        }
      }
    })

    this.sendNewConfig(newLayerConfig)
  },

  //sends the new layerConfig up the chain
  sendNewConfig(layerConfig) {

    const newLayerConfig = update(this.props.layer, {
      sources: {
        $set: layerConfig.sources
      },
      mapLayers: {
        $set: layerConfig.mapLayers
      }
    })

    this.props.onUpdate(newLayerConfig)
  },

  //builds a legend with a composed date range, updates layer config,
  //updates the layerconfig and sends it up to Jane
  renderLegend() {
    const self=this
    const sql = `
      SELECT
        min(datesourceupdated)::date AS min,
        max(datesourceupdated)::date AS max
      FROM hkates.facilities_data`

    Carto.SQL(sql, 'json')
      .then((data) => {

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

        this.props.onUpdate(newLayer)
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
            mode={this.props.context.mode}
            updateSQL={this.updateLayerConfig}
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