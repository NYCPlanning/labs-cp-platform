//CartoMap.jsx - Creates a Carto Map, for now only works with the first subLayer on the map
//pops up a LocationWidget automatically

//Props
//  vizJson - a viz.json object or URL to be used by cartodb.js' createLayer() method
//  handleFeatureClick - a function to be executed when a feature is clicked on the map

import React from 'react'
import LocationWidget from './LocationWidget.jsx'
import carto from '../helpers/carto.js'

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



    var LocationControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },

      onAdd: function( map ) {
        var container = L.DomUtil.create('div', 'location-control leaflet-bar');
        container.innerHTML = `
          <a href="#"><i class="fa fa-crosshairs" aria-hidden="true"></i></a>
        `

        return container
      }
    })

    map.addControl( new LocationControl() );

    //add a listener to trigger LocationWidget
    $('.location-control').click(function() {
      self.refs.LocationWidget.zoomMap()
    })

    //add an animated loading spinner
    var Spinner = L.Control.extend({
      options: {
        position: 'bottomright'
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

  //expects a geoJSON point feature, sets view to the point location and draws a marker with a label
  setViewToFeature(feature) {
    var latLng = [ feature.geometry.coordinates[1], feature.geometry.coordinates[0] ]

    this.map.setView(
      latLng,
      16,
      {
        animate: true
      }
    )

    if(this.geoLocationMarker) this.map.removeLayer(this.geoLocationMarker)
    this.geoLocationMarker = new L.marker(latLng).addTo(this.map)
    this.geoLocationMarker.bindPopup(feature.properties.name).openPopup();

  },

  showChoropleth(sql) {
    //hide existing carto layer
    this.cartoLayer.hide()

    //if choropleth layer doesn't exist yet, create it
    if (this.choroplethLayer) {
      this.choroplethLayer.addTo(this.map)
    } else {
      this.renderChoropleth(sql, {
        column: 'borocd',
        dataset: 'cpadmin.dcp_cdboundaries'
      }) 
    }
  },

  showInfoWindow(e, layer) {
    var d = e.target.feature.properties
    //populate the content of the infowindow
    $('.choropleth').html(`
      <div class="cartodb-tooltip-content-wrapper">
        <div class="cartodb-tooltip-content">
          <div class="name">${d.borocd}</div>
          <div>Count: ${d.count} </div>
        </div>
      </div>
    `)

    var point = e.containerPoint
    point.x += 10
    point.y += 10
    $('.choropleth').stop().css('top',point.y + 'px').css('left',point.x + 'px').fadeIn(50)
  },

  moveInfoWindow(e) {
    var point = e.containerPoint
    point.x += 10
    point.y += 10
    $('.choropleth').css('top',point.y + 'px').css('left',point.x + 'px')
  },

  hideInfoWindow() {
    $('.choropleth').fadeOut(50)
  },

  renderChoropleth(sql, options) {
    var self=this

    //first get data
    var spatialQuery = `WITH points as (${sql}) 
    SELECT polygons.${options.column}, polygons.the_geom, count(points.*) as count
    FROM ${options.dataset} polygons, points 
    WHERE points.${options.column} = polygons.${options.column}::text 
    GROUP BY polygons.cartodb_id`

    carto.SQL(spatialQuery)
      .then(function(data) {
        console.log(data)

        if (self.choroplethLayer) self.map.removeLayer(self.choroplethLayer)
        self.choroplethLayer = L.choropleth(data, {
            valueProperty: 'count', // which property in the features to use
            scale: ['lightblue', 'darkblue'], // chroma.js scale - include as many as you like
            steps: 8, // number of breaks or steps in range
            mode: 'q', // q for quantile, e for equidistant, k for k-means
            style: {
                color: '#fff', // border color
                weight: 2,
                fillOpacity: 0.8
            },
            onEachFeature: function(feature, layer) {
              layer.on({
                mouseover: self.showInfoWindow,
                mousemove: self.moveInfoWindow,
                mouseout: self.hideInfoWindow
              })
            }
        }).addTo(self.map)
      })
  },

  hideChoropleth() {
    this.map.removeLayer(this.choroplethLayer)
    this.cartoLayer.show()
  },

  render() {
    //LocationWidget is the "zoom to my location" feature that will probably be replaced with a Control

    return(
      <div id="mapContainer">
        <div id="map" ref="map">
        </div> 
        { this.map ? <LocationWidget type='carto' map={this.map} ref='LocationWidget'/> : null }
        <div className="cartodb-tooltip choropleth">
          <div className="cartodb-tooltip-content-wrapper"> 
            <div className="cartodb-tooltip-content">    
              <div className="name">51 WEST 74TH STREET</div>
              <div>Units Complete: </div>
              <div>Units Outstanding: </div>
              <div>Units Pending: -6</div>
              <div>Status: Permit pending</div> 
              <div>Category: Residential-Alteration</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports=CartoMap