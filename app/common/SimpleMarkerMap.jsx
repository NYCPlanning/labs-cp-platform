//SimpleMarkerMap.jsx - With a lngLat point ([lat,lng]) passed in as a prop, creates a simple leaflet 
//map with light basemap, and adds a marker, and sets fits bounds to it
//Props:
// point: A lat/lng array [lat, lng]
// travelshed: boolean - if true, fetches a travelshed, renders it on the map, and fits the bounds to it

import React from 'react'

import TravelShed from '../helpers/TravelShed.js'

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

    this.featureGroup = L.featureGroup().addTo(this.map)

    TravelShed.getSimple(this.props.point)
      .then(function(data) {

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
      <div id="modalmap" ref="map" style={{height: '450px'}}/> 
    )
  }
})

module.exports=SimpleMarkerMap