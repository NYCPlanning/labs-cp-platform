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

    //a template for modifying the sql to fit the current geometry
    var sqlMod = `
      WITH x as ({{originalSQL}})
      SELECT x.* FROM x, (
        SELECT the_geom 
        FROM cpadmin.dcp_cdboundaries 
        WHERE borocd='` + this.props.params.borocd + `'
      ) y 
      WHERE ST_Within(x.the_geom, y.the_geom)`

    this.LayerService = new LayerService(this.map, sqlMod)
  },

  onLayerUpdate(layers) {
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
