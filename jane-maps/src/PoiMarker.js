//PoiMarker - Takes a geojson point feature and a map object as props, renders a marker and label at the appropriate location

import React from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

const PoiMarker = React.createClass({
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
      

    this.label = new mapboxgl.Popup({
      offset: [6,0],
      anchor: 'left',
      closeButton: false,
      closeOnClick: false
    })

    this.updateMarker(this.props.feature)
  },

  componentWillUpdate(nextProps) {
    console.log('poimarker will update')

    if(JSON.stringify(nextProps.feature) != JSON.stringify(this.props.feature)) {
      this.updateMarker(nextProps.feature)
    }
  },

  componentWillUnmount() {
    this.marker.remove()
    this.label.remove()
  },

  updateMarker(feature) {
    this.marker
      .setLngLat(feature.geometry.coordinates)
      .addTo(this.props.map.mapObject)
    this.label
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`<p>${this.props.label}</p>`)
      .addTo(this.props.map.mapObject)
  
    this.props.map.flyMap(feature)
  },

  render() {
      return (<div/>)
  }
})

export default PoiMarker