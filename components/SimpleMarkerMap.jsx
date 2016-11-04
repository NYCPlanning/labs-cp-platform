// SimpleMarkerMap
// With a lngLat point ([lat,lng]) passed in as a prop, creates a simple leaflet map with light basemap,
// and adds a marker, and sets the viewport to it.

import React from 'react'

var SimpleMarkerMap = React.createClass({

  componentDidMount() {
    var self=this 

    var map = this.map = new L.Map(this.refs.map, {
      center: this.props.point,
      zoom: 16,
      maxZoom: 18,
      minZoom: 10
    })

    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' })
      .addTo(map)

    L.marker(this.props.point).addTo(map);

    //if travelshed prop is true, go get a travelshed
    this.props.travelshed ? this.fetchTravelShed() : null

  },

  fetchTravelShed() {
    //get a 30 minute travelshed for this point and render it on the map
    var self=this

    var travelshedTemplate = 'https://otp.reallysimpleopendata.com/otp/routers/default/isochrone?routeId=default&batch=true&fromPlace={{lat}},{{lon}}&date=2016/09/23&time=12:00:00&mode=TRANSIT,WALK&cutoffSec=900&cutoffSec=1800&cutoffSec=2700'

    var url = Mustache.render(travelshedTemplate, {
      lat: this.props.point[0],
      lon: this.props.point[1]
    })

    this.featureGroup = L.featureGroup().addTo(this.map)

    $.getJSON(url, function(data) {
      
      

      var layer = L.geoJson(data, {
        style: {
          "color":"gray",
          "fillColor": "steelblue",
          "weight": 1,
          "fillopacity": 0.3
        }
      })

      self.featureGroup.addLayer(layer)
      self.map.fitBounds(self.featureGroup.getBounds())

    })
  },


  render() {
    return(
      <div id="modalmap" ref="map"/> 
    )
  }
})

module.exports=SimpleMarkerMap