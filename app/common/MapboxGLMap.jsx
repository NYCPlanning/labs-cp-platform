import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'

import Popup from './Popup.jsx'

import '../../stylesheets/common/MapboxGLMap.scss'

// Notes
// This component inserts a mapboxGL map into its parent container, and renders two "floating" divs, one for the address lookup, and another for a map popup

var MapboxGLMap = React.createClass({
  getInitialState() {
    return {
      basemap: 'light',
      poiCoords: [0,0],
      popupLngLat: [0,0],
      popupContent: null
    }
  },

  componentDidMount() {
    this.initializeMap()
  },

  setBasemap(style) {
    this.setState({
      basemap: style
    })
    this.map.setStyle('mapbox://styles/mapbox/' + style + '-v9')
  },

  initializeMap() {
    var self=this;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q';
    var map = this.map = new mapboxgl.Map({
        container: 'mapboxGLmap',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 10,
        minZoom: 8,
        center: [-74.024849,40.705628],
        pitch: 0,
        hash: true
    });

    map.addControl(new mapboxgl.NavigationControl({position: 'bottom-right'}));

    //add geojson layer to gray areas outside of NYC
    $.getJSON('data/greyOutsideNYC.geojson', function(data) {
        map.addSource('grey-outside', {
        type: 'geojson',
        data: data
      })

      map.addLayer({
        "id": "grey-outside",
        "type": "fill",
        "source": "grey-outside",
        "paint": {
          'fill-color': '#000',
          'fill-opacity': 0.15   
        }
      })
    })
  },

  flyMap(feature) {
    this.map.flyTo({
      center: feature.geometry.coordinates,
      zoom: 15
    })
  },

  showPoiMarker(feature) {
    //set the location of the poi marker
    this.setState({
      poiCoords: feature.geometry.coordinates
    })

    //fly to it
    this.flyMap(feature)
  },

  hidePoiMarker() {
    this.setState({
      poiCoords: [0,0]
    })
  },

  showPopup(lngLat, content) {
    console.log(lngLat, content)
    this.setState({
      popupLngLat: lngLat,
      popupContent: content
    })
  },   

  render() {

    //pass map object to all children
    if(this.map) {
      var childrenWithProps = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          map: this.map
        }) 
      )
    } 

    return(
      <div id='mapboxGLmap' ref='map'>
        {childrenWithProps}
        {this.map ? <PoiMarker map={this.map} coords={this.state.poiCoords}/>: null}
        {this.map ? <Popup map={this.map} lngLat={this.state.popupLngLat} content={this.state.popupContent}/>: null}
      </div>
    )
  },
})

module.exports=MapboxGLMap;


//POI Marker Component, pass in lngLat coords and a map object, it will project an animated marker
var PoiMarker = React.createClass({
  componentDidMount() {
    var self=this

    this.props.map.on('move', function(e) {
      self.forceUpdate()
    })
  },

  render() {
      var point = this.props.map.project(this.props.coords) 

      return (
        <div className="location-ring-container" ref="locationContainer" style={{'left': point.x, 'top': point.y}}>
          <div className={'location-ring-animated'}></div>
          <div className={'location-ring-fixed'}></div>
        </div>
      )
  }
})