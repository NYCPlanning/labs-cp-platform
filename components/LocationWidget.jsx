import React from 'react'

var LocationWidget = React.createClass({

  getInitialState() {
    return({
      visible:false,
      lngLat: null
    })
  },

  componentDidMount() {
    var self=this



    this.props.map.on('move', function(e) {
      self.forceUpdate()
    })

    navigator.geolocation.getCurrentPosition(function(position) {
      self.onPosition(
        self.props.type == 'mapboxGL' ? 
          [position.coords.longitude, position.coords.latitude] : 
          [position.coords.latitude, position.coords.longitude]
      )
    })
  },

  onPosition(coords) {
    this.setState({
      visible: true,
      coords: coords
    })
  },

  hide() {
    this.setState({
      visible: false
    })
  },

  zoomMap() {
    this.setState({
      visible: false
    })


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
          <div className="popover right in" style={{
            display: 'block',
            width: '159px',
            top: '-39px',
            left: '47px'
          }}>
            <div className="arrow" style={{top:'50%'}}></div>
            <h3 className="popover-title">We found you! <i className="fa fa-times pull-right" aria-hidden="true" onClick={this.hide}></i></h3>
            <div className="popover-content">
              <div className="btn btn-xs btn-success dcp-orange" onClick={this.zoomMap}>Zoom to my Location</div>
            </div>
          </div>
        </div>
      )      
    } else {
      return <div></div>
    }
  }

})

module.exports=LocationWidget

