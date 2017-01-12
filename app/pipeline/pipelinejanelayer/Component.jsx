import React from 'react'
import update from 'react/lib/update'
import {Tabs, Tab} from 'material-ui/Tabs'
import Toggle from 'material-ui/Toggle'
import _ from 'underscore'

import LayerSelector from './LayerSelector.jsx'
import LayerConfig from './LayerConfig.jsx'

import Carto from '../../helpers/carto.js'
import choropleth from '../../helpers/choropleth.js'

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
    //use this method to build new mapConfig based on mode
    const self=this
    this.sql=sql

    if (this.state.mode == 'points') {
      const config = LayerConfig.points

      //set the sql for the vector source
      const newConfig = update(config, {
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

      //update the layer config 
      this.sendNewConfig(newConfig)
    }

    if (this.state.mode == 'polygons') {
      //we need all the data client-side to figure out styling/breaks so a vector tile source will not work

      //get geojson

      const groupSQL = `
        WITH data as (SELECT a.the_geom, a.borocd, a.dcp_units_use_map FROM nchatterjee.dob_permits_cofos_hpd_geocode a RIGHT JOIN (${sql}) b ON a.cartodb_id = b.cartodb_id)

        SELECT a.the_geom, a.the_geom_webmercator, a.borocd, b.delta 
        FROM dcp_cdboundaries a 
        LEFT JOIN (
          SELECT borocd, SUM(dcp_units_use_map) as delta FROM data 
            GROUP BY borocd
        ) b 
        ON a.borocd::text = b.borocd
      `

      Carto.SQL(groupSQL)
        .then((data) => {

          const paint = _.extend({
            "fill-outline-color": "white",
            "fill-opacity": 0.75

          }, choropleth(data, {
            valueProperty: 'delta',
            scale: ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'],
            steps: 5,
            mode: 'q'
          }))


          const newConfig = {
              sources: [
                {
                  "id": "pipeline-polygons",
                  "type": "geojson",
                  "data": data
                }
              ],
              mapLayers: [
                {
                  "id": "pipeline-polygons",
                  "source": 'pipeline-polygons',
                  "source-layer": "layer0",
                  "type": "fill",
                  'paint': paint
                }
              ],
              legend: (
                <div className="legend-section">
                   Legend 
                </div>
              )
            }
        
          self.sendNewConfig(newConfig)
        })

    }

  },

  // updateLayerConfigOld(sql) {
  //   //store the current data query in this, used when this method is called on mode change 
  //   //( it is normally called by the LayerSelector)
  //   this.sql=sql

  //   //change the layer config based on mode
  //   const config = this.state.mode == 'points' ? LayerConfig.points : 

  //   //update the sql for the map source based on the mode.  For points it is unchanged, for polygons it will be a CTE based on the original data query
  //   const mapSql= this.state.mode == 'points' ? sql : 
  //     `WITH data as (
  //       SELECT * 
  //       FROM nchatterjee.dob_permits_cofos_hpd_geocode
  //     )

  //     SELECT a.the_geom, a.the_geom_webmercator, a.borocd, b.delta 
  //     FROM dcp_cdboundaries a 
  //     LEFT JOIN (
  //       SELECT borocd, SUM(dcp_units_use_map) as delta FROM data 
  //         GROUP BY borocd
  //     ) b 
  //     ON a.borocd::text = b.borocd`
    
  //   const newConfig = update(config, {
  //     sources: {
  //       0: {
  //         sql: {
  //           $set: mapSql
  //         }
  //       }
  //     }
  //   })


  // },

  sendNewConfig(newConfig) {
    // const newLayer = update(this.props.layer, {
    //   sources: {
    //     $set: newConfig.sources
    //   },
    //   mapLayers: {
    //     $set: newConfig.mapLayers
    //   },
    //   legend: {
    //     $set: newConfig.legend
    //   }
    // })

    //pass the new config up to Jane
    this.props.onUpdate('pipeline', {
      sources: newConfig.sources,
      mapLayers: newConfig.mapLayers,
      legend: newConfig.legend
    })
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
