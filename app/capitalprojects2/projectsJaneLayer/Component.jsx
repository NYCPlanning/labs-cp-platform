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



const CapitalProjects = React.createClass({

  componentDidMount() {
    this.renderLegend()
  },

  //updates the sql for the map source
  updateLayerConfig(sql) {
    //use this method to build new mapConfig based on mode
    console.log('updatingLayerConfig')

    const newLayerConfig = update(layerConfig, {
      sources: {
        0: {
          options: {
            sql: {
              $set: sql
            }
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


    console.log('newLayerConfig', newLayerConfig)
    this.props.onUpdate(newLayerConfig)
  },

  //builds a legend with a composed date range, updates layer config,
  //updates the layerconfig and sends it up to Jane
  renderLegend() {

    const legendContent = (
      <div className="legendSection">
        <p>This is the new capital projects map</p>
      </div>
    )

    const newLayer = update(this.props.layer, {
      legend: {
        $set: legendContent
      }
    })

    //this.props.onUpdate(newLayer)
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

export default CapitalProjects