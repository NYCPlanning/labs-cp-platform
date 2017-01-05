import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'

import LayerSelector from './LayerSelector.jsx'

const Pipeline = React.createClass({
  componentWillMount() {
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_units_use_map, dob_permit_address',
      tablename: 'nchatterjee.dob_permits_cofos_hpd_geocode',
      where: '(dcp_pipeline_status = \'Complete\' OR dcp_pipeline_status = \'Partial complete\')'
    }
    const sql=`SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}`

    this.config = {
      sources: [
        {
          "type": "vector",
          "id": "pipeline-points",
          "sql": "SELECT the_geom_webmercator FROM hkates.nchatterjee.dob_permits_cofos_hpd_geocode"
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
          <div className="legendSection">
            <h4>Development Status</h4>
            <div className="legendItem">
              <div className="colorCircle" style={{backgroundColor: this.getStatusColor('Complete')}}></div>
              <div className="legendItemText">Complete</div>
            </div>
            <div className="legendItem">
              <div className="colorCircle" style={{backgroundColor: this.getStatusColor('Partial complete')}}></div>
              <div className="legendItemText">Partial Complete</div>
            </div>
            <div className="legendItem">
              <div className="colorCircle" style={{backgroundColor: this.getStatusColor('Permit outstanding')}}></div>
              <div className="legendItemText">Permit Outstanding</div>
            </div>
            <div className="legendItem">
              <div className="colorCircle" style={{backgroundColor: this.getStatusColor('Permit pending')}}></div>
              <div className="legendItemText">Permit Pending</div>
            </div>
            <div className="legendItem">
              <div className="colorCircle" style={{backgroundColor: this.getStatusColor('Demolition (complete)')}}></div>
              <div className="legendItemText">Demolition (Complete)</div>
            </div>
          </div>
          <div className="legendSection">
            <p>Larger markers represent higher net unit counts</p>
          </div>
        </div>
      )
    }

    this.setState({
      sql: sql
    })

    this.updateSQL(sql)
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

  getStatusColor(status) {
    switch(status) {
      case 'Complete':
          return '#136400'
          break
      case 'Partial complete':
          return '#229A00'
          break
      case 'Permit outstanding':
          return '#b2df8a'
          break
      case 'Permit pending':
          return '#5CA2D1'
          break
      case 'Demolition (complete)':
          return '#525252'
          break
    }
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
        <Tab label="Download">
          Coming Soon
        </Tab>
      </Tabs>
    )
  }
})

export default Pipeline
