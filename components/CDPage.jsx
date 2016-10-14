import React from 'react'
import Mustache from 'mustache'

import Nav from './Nav.jsx'
import LeafletMap from './LeafletMap.jsx'
import GlobalLayerSelector from './GlobalLayerSelector.jsx'
import LayerService from './LayerService.jsx'




var CDPage = React.createClass({
  componentDidMount() {
    var self=this
    //get the leaflet map object from the LeafletMap Component
    this.map = this.refs.map.map

    //go get boro geometry and add it to the map client-side
    var apiCall = Mustache.render("https://reallysimpleopendata.org/user/cpadmin/api/v2/sql?q=SELECT * FROM dcp_cdboundaries WHERE borocd = '{{borocd}}'&format=geojson", this.props.params)
    $.getJSON(apiCall, function(data) {
      console.log(data)

      //add to map
      this.cdBoundary = L.geoJson(data, {
        style: {
          "color": "#FF5C00",
          "weight": 1.5,
          "opacity": 1,
          "fillOpacity": 0
        }
      }).addTo(self.map)
      self.map.fitBounds(this.cdBoundary.getBounds())
    })

    this.LayerService = new LayerService(this.map)
  },

  onLayerUpdate(layers) {
    console.log('layerUpdate', layers)
    this.LayerService.update(layers)
  },
  
  render() {
    return(
      <div className="full-height">
        <Nav title={"Community District " + this.props.params.borocd} auth={this.props.auth}>
        </Nav>
          <div id="main-container">
            <div id="sidebar">
              <GlobalLayerSelector onUpdate={this.onLayerUpdate}/>
            </div>
            <div id="content">
              <LeafletMap ref='map'
              />
            </div>
          </div>
      </div>
    )
  }
})

module.exports=CDPage

// addFacilitiesLayer() {
//     var self=this
//     //experimental, see if we can summon a cartodb layer on demand and add it to the map
//     //we want to not use any resources until it is show, and actually destroy it when it is hidden
//     //there may be 100s of potential map layers to toggle, so they can't preload themselves and then hide/show


     // cartodb.createLayer(self.map, 'https://reallysimpleopendata.org/user/nchatterjee/api/v2/viz/02c7c7e4-8be8-11e6-bc56-0242ac110002/viz.json')
     //  .on('done', function(layer) {

     //    self.facilitiesLayer = layer
     //    self.map.addLayer(self.facilitiesLayer)

     //    var template = 
     //      `SELECT a.* 
     //      FROM nchatterjee.residential_pipeline_100416_v1_users a, (
     //        SELECT the_geom 
     //        FROM cpadmin.dcp_cdboundaries 
     //        WHERE borocd='{{borocd}}'
     //      ) b 
     //      WHERE ST_Within(a.the_geom, b.the_geom)`

     //    var sql = Mustache.render(template, self.props.params)

     //    layer.getSubLayer(0).setSQL(sql)

     //    layer
     //      .on('featureOver', function(e, latlng, pos, data) {
     //        $('#map').css('cursor','pointer');
     //      })
     //      .on('featureOut', function(e, latlng, pos, data) {
     //        $('#map').css('cursor','-webkit-grab'); 
     //      })
     //      .on('featureClick', self.props.handleFeatureClick)

     //    layer.bind('loading', function() { $('.map-loader').fadeIn() });
     //    layer.bind('load',  function() { $('.map-loader').fadeOut(); });

     //  })
     //  .on('error', function(err) {
     //    alert("some error occurred: " + err);
     //  });


  // },

//   removeFacilitiesLayer() {
//     console.log(this.facilitiesLayer)
//     this.facilitiesLayer.getSubLayer(0).hide()
//     this.facilitiesLayer.remove()
//   },