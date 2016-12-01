// PipelineDataLayer - A Data Layer Component for the housing pipeline, to be added as a child of MapComponent
// Includes custom filtering UI for this dataset, creates/updates a mapboxGL source and layer for the current filters

//Props:
//  map: the mapboxGL map object to add the source and layer to

import React from 'react'

import PipelineLayerSelector from './PipelineLayerSelector.jsx'
import ModalContent from './ModalContent.jsx'

import Carto from '../helpers/carto.js'

var PipelineDataLayer = React.createClass({

  getInitialState() {
    return({
      mode: 'discrete',
      aggregateGeom: 'cd',
      sql: 'SELECT cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_units_use_map, dob_permit_address FROM nchatterjee.dob_permits_cofos_hpd_geocode WHERE (dcp_pipeline_status = \'Complete\' OR dcp_pipeline_status = \'Partial complete\')'
    })
  },

  componentDidMount() {
    this.instantiateVectorTiles()
  },

  instantiateVectorTiles() {
    // initialize a vector tile layer from our carto server
    // calls this.renderVectorTiles() when done
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

  renderVectorTiles(template) {
    var self=this
    //add a mapboxGL source for this vector tile template and associated layer(s)
    var map = this.props.map.map 

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
            ['Permit pending', '#5CA2D1'],
            ['Demolition (complete)', '#525252']
          ]
        },
        "circle-opacity": 0.7
      }
    })

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['pipeline-points'] });
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    }) 

    //popup on click
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['pipeline-points'] });

        if (!features.length) return
      
        console.log(e)
        self.showPopup(e.lngLat, features)
    })
  },

  showPopup(lngLat, features) {
    var self=this
    //builds content for the popup, sends it to the map
    console.log(lngLat, features)

    var content = features.map(
      (feature, i) => {
        const d = feature.properties
        return (
          <div className="popupRow" key={i} onClick={self.showModal.bind(self, feature)}>
            <span className="badge">{d.dcp_pipeline_status}</span>
            <span className="text">{d.dob_permit_address}</span>
            <span className="badge">Δ {d.dcp_units_use_map}</span>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        )
      }
    )

    this.props.map.showPopup(lngLat, content)
  },

  showModal(feature) {
    //builds content for the modal and sends it to the global modal service
    var self=this

    var tableName = 'nchatterjee.dob_permits_cofos_hpd_geocode'

   //make an api call to carto to get the full feature, build content from it, show modal
   Carto.getRow(tableName, 'cartodb_id', feature.properties.cartodb_id)
    .then(function(data) {
      self.props.showModal({
        modalHeading: 'Development Details',
        modalContent: <ModalContent data={data}/>,
        modalCloseText: 'Close'
      })
    })
  },

  updateSQL(sql) {
    //set this.state.sql to the new sql, remove layers from the map, re-load layers

    var self=this

    this.setState({
      sql: sql
    }, function() {

      var map = self.props.map.map
      map.removeLayer('pipeline-points')
      map.removeLayer('pipeline-outline')
      map.removeSource('pipeline-points')
      self.instantiateVectorTiles()      
    })
  },

  render() {
    return(
      <PipelineLayerSelector 
        updateSQL={this.updateSQL}/>
    )
  }
})

module.exports = PipelineDataLayer