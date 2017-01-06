import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'
import Toggle from 'material-ui/Toggle'

import LayerSelector from './LayerSelector.jsx'

import colors from '../colors.js'

const Pipeline = React.createClass({
  getInitialState() {
    return ({ mode: 'points' })
  },

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
    console.log(this.state)

    if(this.state.mode != prevState.mode) {
      this.state.mode == 'points' ? this.setPointsConfig() : this.setPolygonsConfig()

      const sql= this.state.mode == 'points' ? 
      `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}` :
      `SELECT * FROM dcp_cdboundaries`

      // this.setState({
      //   sql: sql
      // })

      this.updateSQL(sql)
    }

    // return true
  },

  componentWillMount() {
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_units_use_map, dob_permit_address',
      tablename: 'nchatterjee.dob_permits_cofos_hpd_geocode',
      where: '(dcp_pipeline_status = \'Complete\' OR dcp_pipeline_status = \'Partial complete\')'
    }
    

    this.state.mode == 'points' ? this.setPointsConfig() : this.setPolygonsConfig()

    const sql= this.state.mode == 'points' ? 
      `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}` :
      `SELECT * FROM dcp_cdboundaries`

    this.setState({
      sql: sql
    })

    //trigger the initial render of the layer, same method used when updating
    this.updateSQL(sql)

  },

  setPointsConfig() {

    this.config = {
      sources: [
        {
          "type": "vector",
          "id": "pipeline-points"        
        }
      ],
      mapLayers: [
        {
          "id": "pipeline-outline",
          "source": 'pipeline-points',
          "source-layer": "layer0",
          "type": "circle",
          "paint": {
            "circle-radius": {
              property: 'dcp_units_use_map',
              stops: [
                [{zoom: 10, value: -12}, 2],
                [{zoom: 10, value: 1669}, 5],
                [{zoom: 14, value: -12}, 6],
                [{zoom: 14, value: 1669}, 15]
              ]
            },
            "circle-color": "#FFF",
            "circle-opacity": 0.7
          }
        },
        {
          "id": "pipeline-points",
          "source": 'pipeline-points',
          "source-layer": "layer0",
          "type": "circle",
          "paint": {
            "circle-radius": {
              property: 'dcp_units_use_map',
              stops: [
                [{zoom: 10, value: -12}, 1],
                [{zoom: 10, value: 1669}, 4],
                [{zoom: 14, value: -12}, 5],
                [{zoom: 14, value: 1669}, 14]
              ]
            },
            "circle-color": {
              property: 'dcp_pipeline_status',
              type: 'categorical',
              stops: [
                ['Complete', '#136400'],
                ['Partial complete', '#229A00'],
                ['Permit outstanding', '#b2df8a'],
                ['Permit pending', '#5CA2D1'],
                ['Demolition (complete)', '#525252']
              ]
            },
            "circle-opacity": 0.7
          }
        }
      ],
      legend: (
        <div>
          <div className="legend-section">
            <h4>Development Status</h4>
            <div className="legendItem">
              <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Complete')}}></div>
              <div className="legendItemText">Complete</div>
            </div>
            <div className="legendItem">
              <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Partial complete')}}></div>
              <div className="legendItemText">Partial Complete</div>
            </div>
            <div className="legendItem">
              <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Permit outstanding')}}></div>
              <div className="legendItemText">Permit Outstanding</div>
            </div>
            <div className="legendItem">
              <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Permit pending')}}></div>
              <div className="legendItemText">Permit Pending</div>
            </div>
            <div className="legendItem">
              <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Demolition (complete)')}}></div>
              <div className="legendItemText">Demolition (Complete)</div>
            </div>
          </div>
          <div className="legendSection">
            <p>Larger markers represent higher net unit counts</p>
          </div>
        </div>
      )
    }
  },

  setPolygonsConfig() {

    this.config = {
      sources: [
        {
          "type": "vector",
          "id": "pipeline-polygons"
        }
      ],
      mapLayers: [
        {
          "id": "pipeline-polygons",
          "source": 'pipeline-polygons',
          "source-layer": "layer0",
          "type": "fill",
          'paint': {
            'fill-color': 'steelblue',
            'fill-opacity': 0.75,
            'fill-outline-color': '#838763',
            'fill-antialias': true 
          }
        }
      ],
      legend: (
        
        <div className="legend-section">
           Legend 
        </div>
      )
    }
  },

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
      },
      legend: {
        $set: newConfig.legend
      }
    })

    this.updateMapElements(newLayer)
  },

  updateMapElements(layerConfig) {
    this.props.onUpdate(layerConfig)
  },

  handleModeToggle() {
    this.setState({ mode: this.state.mode == 'points' ? 'polygons' : 'points'})
  },

  render() {
    return (
      <Tabs>
        <Tab label="Data">
          <LayerSelector
            updateSQL={this.updateSQL}
            sql={this.state.sql}
            sqlConfig={this.sqlConfig}
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
