import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'
import Moment from 'moment'
import Subheader from 'material-ui/Subheader'

import LayerSelector from './LayerSelector.jsx'
import content from '../content.jsx'

import colors from '../colors.js'
import layerConfig from './layerconfig.js'

import Carto from '../../helpers/carto.js'



const Facilities = React.createClass({

  componentDidMount() {
    this.renderLegend()
  },

  //updates the sql for the map source
  updateLayerConfig(sql) {

    const newLayerConfig = update(layerConfig, {
      sources: {
        0: {
          options: {
            sql: {
              $set: [sql]
            }
          } 
        }
      }
    })

    this.sendNewConfig(newLayerConfig)
  },

  //sends the new layerConfig up the chain
  sendNewConfig(layerConfig) {
    this.props.onUpdate('facilities', {
      sources: layerConfig.sources,
      mapLayers: layerConfig.mapLayers
    })
  },

  //builds a legend with a composed date range, updates layer config,
  //updates the layerconfig and sends it up to Jane
  renderLegend() {
    const self=this
    const sql = `
      WITH temp AS (
        SELECT
        unnest(string_to_array(datesourceupdated,',')) as date
        FROM hkates.facilities_data
        WHERE datesourceupdated NOT LIKE '%NULL%'
      )

      SELECT
      min(date::date) as min,
      max(date::date) as max
      FROM temp
    `

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

        //this.props.onUpdate(newLayer)
      })



  },

  render() {

    const tabStyle = {
      height: '30px'
    }

    return (
      <Tabs className='sidebar-tabs'>
        <Tab label="Data">
          <LayerSelector
            mode={this.props.context.mode}
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            {content.about}
          </div>
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <h4>Data Downloads</h4> 
            <p>Custom data downloads are currently in development.  Please check back again soon.</p>
          </div>
        </Tab>
      </Tabs>  
    )
  }
})

export default Facilities