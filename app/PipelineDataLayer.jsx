import React from 'react'
import PipelineLayerSelector from './pipeline/PipelineLayerSelector.jsx'

import Carto from './helpers/carto.js'

var PipelineDataLayer = React.createClass({

  getInitialState() {
    return({
      mode: 'discrete',
      aggregateGeom: 'cd',
      //sql: 'SELECT cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_units_use_map FROM nchatterjee.dob_permits_cofos_hpd_geocode WHERE (dcp_pipeline_status = \'Complete\' OR dcp_pipeline_status = \'Partial complete\') '
      sql: 'SELECT cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_units_use_map FROM nchatterjee.dob_permits_cofos_hpd_geocode WHERE (dcp_pipeline_status = \'Complete\' OR dcp_pipeline_status = \'Partial complete\')'
    })
  },

  componentDidMount() {
    this.instantiateVectorTiles()
  },

  instantiateVectorTiles() {
    // initialize a vector tile layer from our carto server
    var self=this

    var mapConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": "#layer { polygon-fill: #FFF; }",
          "sql": this.state.sql
        }
      }]
    }

    Carto.getVectorTileTemplate(mapConfig)
      .then(function(template) {
        self.renderVectorTiles(template)
      })
  },

  updateSQL(sql) {
    var self=this

    this.setState({
      sql: sql
    }, function() {
      self.props.map.removeLayer('pipeline-points')
      self.props.map.removeLayer('pipeline-outline')
      self.props.map.removeSource('pipeline-points')
      self.instantiateVectorTiles()      
    })


  },

  renderVectorTiles(template) {
    console.log(this.props)
    var map = this.props.map 

    map.addSource('pipeline-points', {
      'type': 'vector',
      "tiles": [
        template
      ]
    })

    map.addLayer({
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
    })

    map.addLayer({
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
            ['Permit pending', '#5CA2D1']
          ]
        },
        "circle-opacity": 0.7
      }
    })




    // map.on('moveend', function() {
    //   var features = map.queryRenderedFeatures({layers:['pipeline-points']});

    //   var existingFeatureKeys = {};

    //   var uniqueFeatures = features.filter(function(el) {
    //     if (existingFeatureKeys[el.properties['cartodb_id']]) {
    //       return false;
    //     } else {
    //       existingFeatureKeys[el.properties['cartodb_id']] = true;
    //       return true;
    //     }
    //   });

    //   console.log(uniqueFeatures.length);
    //   console.log(features.length)
    // });


  },

  render() {
    return(
      <PipelineLayerSelector 
        updateSQL={this.updateSQL}/>
    )
  }
})

module.exports = PipelineDataLayer