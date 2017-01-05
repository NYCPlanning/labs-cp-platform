import React from 'react'
import ReactDOMServer from 'react-dom/server'

var GLMap = React.createClass({

  componentDidMount() {
    this.initializeMap()
  },

  initializeMap() {
    const self=this;

    mapboxgl.accessToken = this.props.mapbox_accessToken

    const map = this.mapObject = new mapboxgl.Map({
        container: 'gl-map',
        style: this.props.mapStyle,
        zoom: this.props.zoom,
        minZoom: this.props.minZoom,
        center: this.props.center,
        pitch: this.props.pitch,
        hash: this.props.hash
    });

    this.mapObject.on('load', function () {
      self.props.onLoad(self.mapObject.getStyle())
    })

    if( this.props.navigationControl ) map.addControl(new mapboxgl.NavigationControl({position: this.props.navigationControlPosition}));  
    
  },

  componentDidUpdate() {
    //TODO this is a hack to get the GL map to resize to its container after changing the container size.  Need to find a less hacky way to do this
    setTimeout(() => {
      this.mapObject && this.mapObject.resize()
    }, 500)
  },

  flyMap(feature, zoom = 15) {
    this.mapObject.flyTo({
      center: feature.geometry.coordinates,
      zoom: zoom
    })
  },

  render() {
    //figure out which drawers are open so we know where the left edge of the map div should be

    return(
      <div 
        id='gl-map' 
        ref='map'
      >
      </div>
    )
  }
})

GLMap.defaultProps = {
  mapStyle: 'mapbox://styles/mapbox/light-v9',
  center: [0,0],
  zoom: 2,
  minZoom: null,
  maxZoom: null,
  pitch: 0,
  hash: false,
  navigationControl: true,
  navigationControlPosition: 'top-right'
}

export default GLMap;


