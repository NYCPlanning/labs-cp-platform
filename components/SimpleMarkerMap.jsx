// SimpleMarkerMap
// With a lngLat point ([lat,lng]) passed in as a prop, creates a simple leaflet map with light basemap,
// and adds a marker, and sets the viewport to it.

import React from 'react'

var SimpleMarkerMap = React.createClass({

  componentDidMount() {
    var self=this 

    var map = new L.Map(this.refs.map, {
      center: this.props.point,
      zoom: 16,
      maxZoom: 18,
      minZoom: 10
    })

    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' })
      .addTo(map)

    L.marker(this.props.point).addTo(map);
  },

  render() {
    return(
      <div id="modalmap" ref="map"/> 
    )
  }
})

module.exports=SimpleMarkerMap