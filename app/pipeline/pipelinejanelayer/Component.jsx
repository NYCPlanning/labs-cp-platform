import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'
import Toggle from 'material-ui/Toggle'

import LayerSelector from './LayerSelector.jsx'
import LayerConfig from './LayerConfig.jsx'

const Pipeline = React.createClass({
  getInitialState() {
    return ({ mode: 'points' })
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.state.mode != prevState.mode) {
      this.updateLayerConfig(this.sql)
    }
  },

  updateLayerConfig(sql) {
    //store the current data query in this, used when this method is called on mode change 
    //( it is normally called by the LayerSelector)
    this.sql=sql

    //change the layer config based on mode
    const config = this.state.mode == 'points' ? LayerConfig.points : LayerConfig.polygons

    //update the sql for the map source based on the mode.  For points it is unchanged, for polygons it will be a CTE based on the original data query
    const mapSql= this.state.mode == 'points' ? sql : `SELECT * FROM dcp_cdboundaries`
    
    const newConfig = update(config, {
      sources: {
        0: {
          sql: {
            $set: mapSql
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
      },
      legend: {
        $set: newConfig.legend
      }
    })

    //pass the new config up to Jane
    this.props.onUpdate(newLayer)
  },

  handleModeToggle() {
    this.setState({ mode: this.state.mode == 'points' ? 'polygons' : 'points'})
  },

  render() {
    return (
      <Tabs>
        <Tab label="Data">
          <LayerSelector
            updateSQL={this.updateLayerConfig}
          />
        </Tab>
        <Tab label="About">
          About this Data Layer
        </Tab>
        <Tab label="Choropleth">
          <Toggle 
            toggled={this.state.mode=='polygons'}
            onToggle={this.handleModeToggle}
          />
        </Tab>
        <Tab label="Download">
          Coming Soon
        </Tab>
      </Tabs>
    )
  }
})

export default Pipeline
