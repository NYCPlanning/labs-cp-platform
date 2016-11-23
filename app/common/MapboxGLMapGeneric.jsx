//MapboxGLMap.jsx - MapboxGL Map Component specific to capital projects explorer
//TODO - Make this a generic MapboxGL Map Component and move cpdb-specific logic to the explorer Component
//Props:
//  data - 
//  handleClick() - function to be called when the user clicks on the map

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'


import '../../stylesheets/common/MapboxGLMap.scss'

var MapboxGLMap = React.createClass({
  getInitialState() {
    return {
      basemap: 'light',
      poiCoords: [0,0]
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
        minZoom: 10,
        center: [-74.024849,40.705628],
        pitch: 0
    });

    map.addControl(new mapboxgl.NavigationControl({position: 'bottom-right'}));
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