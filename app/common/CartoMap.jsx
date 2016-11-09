//CartoMap.jsx - Creates a Carto Map, for now only works with the first subLayer on the map
//pops up a LocationWidget automatically

//Props
//  vizJson - a viz.json object or URL to be used by cartodb.js' createLayer() method
//  handleFeatureClick - a function to be executed when a feature is clicked on the map

import React from 'react'
import LocationWidget from './LocationWidget.jsx'

import '../../stylesheets/common/CartoMap.scss'

var CartoMap = React.createClass({
  componentDidMount() { //initialize the map after the component mounts
    var self=this 

    var map = this.map = new L.Map(this.refs.map, {
      center: [40.71,-73.934555],
      zoomControl: false,
      zoom: 11,
      maxZoom: 18,
      minZoom: 10
    })

    // add transparent grey layer outside NYC
    // NOTE: Carto is using an older version of leaflet. When they update their code
    // in the future, this feature may break. The older method we are currently using is 
    // L.geoJson. The new method is L.geoJSON: http://leafletjs.com/examples/geojson/
    $.getJSON('/data/greyOutsideNYC.geojson', function(data) {
      var test = L.geoJson(data, {
        style: {
          color: "black",
          weight: 0,
          opacity: 0.15
        }
      }).addTo(map)
    })

    // add zoom control
    L.control.zoom({
         position:'bottomright'
    }).addTo(map);

    //add an animated loading spinner
    var Spinner = L.Control.extend({
      options: {
        position: 'topright'
      },

      onAdd: function ( map ) {
        var container = L.DomUtil.create('div', 'map-loader');
        container.innerHTML = `
          <div class="spinner-container">
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
          </div>
        `
        return container
      }
    });

    map.addControl( new Spinner() );

    var LocationControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },

      onAdd: function( map ) {
        var container = L.DomUtil.create('div', 'location-control leaflet-bar');
        container.innerHTML = `
          <a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i></a>
        `

        return container
      }
    })

    map.addControl( new LocationControl() );

    //add basemap
    //TODO make this a prop
    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    //create a layer with the vizJson that was passed in
    cartodb.createLayer(map, this.props.vizJson)
      .addTo(map)
      .on('done', function(layer) {
        self.cartoLayer = layer.getSubLayer(0)

        layer
          .on('featureOver', function(e, latlng, pos, data) {
            $('#map').css('cursor','pointer');
          })
          .on('featureOut', function(e, latlng, pos, data) {
            $('#map').css('cursor','-webkit-grab'); 
          })
          .on('featureClick', function(e, latlng, pos, data) {
            self.props.handleFeatureClick(e, latlng, pos, data)
          })

        //show and hide the spinner when leaflet's loading and load events fire
        layer.bind('loading', function() { $('.map-loader').fadeIn() });
        layer.bind('load',  function() { $('.map-loader').fadeOut(); });

      })
      .on('error', function(err) {
        alert("some error occurred: " + err);
      });

      //force component to update so that LocationWidget renders
      this.forceUpdate()
  },

  setSQL(sql) {
    this.cartoLayer.setSQL(sql)
  },

  render() {
    //LocationWidget is the "zoom to my location" feature that will probably be replaced with a Control

    return(
      <div id="mapContainer">
        <div id="map" ref="map">
        </div> 
        { this.map ? <LocationWidget type='carto' map={this.map}/> : null }
      </div>
    )
  }
})

module.exports=CartoMap