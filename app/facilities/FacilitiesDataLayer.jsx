// PipelineDataLayer - A Data Layer Component for the housing pipeline, to be added as a child of MapComponent
// Includes custom filtering UI for this dataset, creates/updates a mapboxGL source and layer for the current filters

//Props:
//  map: the mapboxGL map object to add the source and layer to
//  mode: which mode the data layer shoud be in all, domain-[domainname], etc
import React from 'react'

import FacLayerSelector from './FacLayerSelector.jsx'
import ModalContent from './ModalContent.jsx'

import facilitiesLayers from './facilitiesLayers.js'
import Carto from '../helpers/carto.js'

var FacilitiesDataLayer = React.createClass({

  componentWillMount() {
    var self=this
    //update initial state and the layer structure based on mode
    if (this.props.mode != 'all') {
      this.initialSQL="SELECT cartodb_id, the_geom_webmercator, domain, facilitygroup FROM hkates.facilities_data WHERE domain ILIKE '" + this.props.mode.substr(0,4) + "%'"
      
      this.layerStructure = facilitiesLayers.filter(function(layer) {
        return (layer.slug == self.props.mode)
      })
    } else {
      //if map mode is 'all', initialSQL has no WHERE, and layerStructure is unchanged
      this.initialSQL="SELECT cartodb_id, the_geom_webmercator, domain, facilitygroup FROM hkates.facilities_data"
      this.layerStructure=facilitiesLayers
    }

    this.setState({
      sql: this.initialSQL
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
    
    //generate a categorical color object based on mode
    if(this.props.mode=='all') {
      var colorObject = {
        property: 'domain',
        type: 'categorical',
        stops: this.layerStructure.map(function(layer) {
          return [
            layer.name,
            layer.color
          ]
        })
      }
    } else {
      console.log(this.layerStructure)
      var colorObject = {
        property: 'facilitygroup',
        type: 'categorical',
        stops: this.layerStructure[0].children.map(function(layer) {
          return [
            layer.name,
            layer.color
          ]
        })
      }
      console.log(colorObject)
    }


    //add a mapboxGL source for this vector tile template and associated layer(s)
    var map = this.props.map.map 

    map.addSource('facilities-points', {
      'type': 'vector',
      "tiles": [
        template
      ]
    })

    map.addLayer({
      "id": "facilities-points-outline",
      "source": 'facilities-points',
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
    })

    map.addLayer({
      "id": "facilities-points",
      "source": 'facilities-points',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
        "circle-radius": {
          "stops": [
            [10,2],
            [15,6]
          ]
        },
        "circle-color": colorObject,
        "circle-opacity": 0.7
      }
    })

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['facilities-points'] });
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    }) 

    //popup on click
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['facilities-points'] });

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
      (feature) => {
        const d = feature.properties
        return (
          <div 
            className="popupRow" 
            onClick={self.showModal.bind(self, feature)}
          >
            { d.cartodb_id }
          </div>
        )
      }
    )

    this.props.map.showPopup(lngLat, content)
  },

  showModal(feature) {
    //builds content for the modal and sends it to the global modal service
    var self=this

    var tableName = 'hkates.facilities_data'

   //make an api call to carto to get the full feature, build content from it, show modal
   Carto.getRow(tableName, 'cartodb_id', feature.properties.cartodb_id)
    .then(function(data) {
      self.props.showModal({
        modalHeading: 'Facility Details',
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
      map.removeLayer('facilities-points')
      map.removeLayer('facilities-points-outline')
      map.removeSource('facilities-points')
      self.instantiateVectorTiles()      
    })
  },

  render() {
    return(
      <FacLayerSelector 
        updateSQL={this.updateSQL}
        initialSQL={this.initialSQL}
        facilitiesLayers={this.layerStructure}
      />
    )
  }
})

module.exports = FacilitiesDataLayer