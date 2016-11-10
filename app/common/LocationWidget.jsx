//LocationWidget.jsx - Gets the user's location from the browser and allows for quick zooming to location.  Also adds an animated marker
//Can be used with both carto and mapboxGL maps
//Props:
//  map - the carto (leaflet) or mapboxGL map object that the component should work in
//  type - 'carto' or 'mapboxGL', determines which methods to use to pan and zoom the map, translate lat/long to map coordinates, etc

import React from 'react'

import '../../stylesheets/common/LocationWidget.scss'

var LocationWidget = React.createClass({

  getInitialState() {
    return({
      visible:false,
      coords: null
    })
  },

  componentDidMount() {
    var self=this

    this.props.map.on('move', function(e) {
      self.forceUpdate()
    })

    this.getLocation()
  },

  hide() {
    this.setState({
      visible: false
    })
  },

  getLocation() {
    var self=this

    console.log('getting location')
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('got location')
      var coords = self.props.type == 'mapboxGL' ? 
        [position.coords.longitude, position.coords.latitude] : 
        [position.coords.latitude, position.coords.longitude]
    
      console.log('setting state')
      self.setState({
        coords: coords
      })
    })    
  },

  zoomMap() {
    console.log('zooming map')
    if(this.state.coords != null) {
      if(this.props.type=='mapboxGL') {
        this.props.map.flyTo({
          center: this.state.coords,
          zoom: 15,
          speed: 0.5
        })      
      } else {
        this.props.map.setView(this.state.coords, 15, {
          animation: true,
          pan: {
            duration: 3
          }
        })
      } 

      this.setState({
        visible: true
      })    
    } else {
      console.log('You need to allow your browser to share your location...')
    }
  },

  render() {
    if(this.state.coords && this.props.type=='mapboxGL') {
      var point = this.props.map.project(this.state.coords) 
    } else if (this.state.coords && this.props.type=='carto') {
      var point = this.props.map.latLngToContainerPoint(this.state.coords)
    } else {
      var point = {x:0,y:0}
    }
    
    if(this.state.visible) {
      return (
        <div className="location-ring-container" ref="locationContainer" style={{'left': point.x, 'top': point.y}}>
          <div className={'location-ring'} ></div>
        </div>
      )      
    } else {
      return <div></div>
    }
  }
})

module.exports=LocationWidget

