import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import appConfig from '../../helpers/appConfig.js'

import './MapboxGLMap.scss'

var MapboxGLMap = React.createClass({
  getInitialState() {
    return {
      basemap: 'light',
      poiCoords: [0,0],
      poiLabel: '',
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

    mapboxgl.accessToken = appConfig.mapbox_accessToken

    var map = this.map = new mapboxgl.Map({
        container: 'mapboxGLmap',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 13,
        minZoom: 8,
        center: [-74.0013, 40.7085],
        pitch: 0,
        hash: true
    });

    map.addControl(new mapboxgl.NavigationControl({position: 'bottom-right'}));

    //add geojson layer to gray areas outside of NYC
    $.getJSON('/data/greyOutsideNYC.geojson', function(data) {
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
      poiCoords: feature.geometry.coordinates,
      poiLabel: feature.properties.name
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
        {this.map ? <PoiMarker map={this.map} coords={this.state.poiCoords} label={this.state.poiLabel}/>: null}
      </div>
    )
  },
})

module.exports=MapboxGLMap;


var PoiMarker = React.createClass({
  componentDidMount() {
    var self=this

    var el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = 'url(/img/orange-marker.png)'
      el.style.width = '32px'
      el.style.height = '32px'
      el.style.zIndex = 10

    this.marker = new mapboxgl.Marker(el, {
      offset: [-16,-32]
    })
      .setLngLat(this.props.coords)
      .addTo(this.props.map)

    this.label = new mapboxgl.Popup({
      offset: [0,0],
      anchor: 'left',
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat(this.props.coords)
      .addTo(this.props.map)
  },

  componentWillReceiveProps(nextProps) {
    this.marker.setLngLat(nextProps.coords)
    this.label.setLngLat(nextProps.coords).setHTML("<p>" + nextProps.label + "</p>")
  },

  render() {
      return (
        <div/>
      )
  }
})
