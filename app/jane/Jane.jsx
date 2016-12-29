import React from 'react'

import GLMap from './GLMap.jsx'
import Search from './Search.jsx'
import PoiMarker from './PoiMarker.jsx'


import './styles.scss'

const Jane = React.createClass({

  getInitialState() {
    return({
      poiFeature: null,
      mapLoaded: false
    })
  },

  showPoiMarker(feature) {
    this.setState({
      poiFeature: feature
    })
  },

  hidePoiMarker() {
    this.setState({
      poiFeature: null
    })
  },

  onMapLoad(style) {
    this.setState({
      mapLoaded: true
    })
  },

  componentDidMount() {
    //this.map is the GLMap Component, not the map object itself
    this.map = this.refs.map
  },

  render() {

    let layers = []

    if(this.state.mapLoaded) {
      this.props.mapConfig.layers.map(( layer, i ) => {
        layers.push(<Layer config={layer} map={this.map} key={i}/>)
      })
    }

    return(
      <div className='jane-container' style={this.props.style}>
        { 
          this.props.search && (
            <Search 
              {...this.props.searchConfig}
              onGeocoderSelection={this.showPoiMarker}
              onClear={this.hidePoiMarker}
              selectionActive={this.state.poiFeature}
            />
          )
        }

        <GLMap 
          {...this.props.mapInit}
          ref='map'
          onLoad={this.onMapLoad}
        />

        {
          this.state.poiFeature && (
            <PoiMarker feature={this.state.poiFeature} map={this.map}/>
          )
        }

        {layers}
      </div>
    )
  }
})

Jane.defaultProps = { 
  style: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  search: false
}

export default Jane

const Layer = React.createClass({
  getInitialState() {
    return({
      sources: {}
    })
  },

  //keep track of loaded sources in state, do not load layer until its source has been loaded
  handleSourceLoaded(sources) {
    this.setState({
      sources: sources
    })
  },

  render() {
    const self=this

    let sources = []

    this.props.config.sources.map((source, i) => {
      if(source.type=='geojson') sources.push(
        <GeoJsonSource map={self.props.map} source={source} onLoaded={self.handleSourceLoaded} key={i}/>
      )
    })

    let mapLayers = []

    this.props.config.mapLayers.map((mapLayer, i) => {
      if(mapLayer.type=='line' && this.state.sources.hasOwnProperty(mapLayer.source)) mapLayers.push(<LineLayer map={self.props.map} mapLayer={mapLayer} key={i}/>)
    })

    return (
      <div>
        {sources}
        {mapLayers}
      </div>
    )
  }
})

const GeoJsonSource = React.createClass({


  componentWillMount() {
    this.map = this.props.map.mapObject
    //fetch data if necessary, add layer to map
    if (!this.props.source.data) {
      this.fetchData()
    } else {
      this.data = this.props.source.data
      this.addSource()
    }
  },

  fetchData() {
    const self=this

    $.getJSON(this.props.source.source)
      .then((data) => {
        self.data = data
        self.addSource()
      })
  },

  addSource() {
    this.map.addSource(this.props.source.id, {
      type: 'geojson',
      data: this.data
    })
    this.props.onLoaded(this.map.getStyle().sources)
  },

  render() {
    return null
  }
})

const LineLayer = React.createClass({
  componentWillMount() {
    console.log('geojsonlayer mounting')
    this.map = this.props.map.mapObject

    this.map.addLayer(this.props.mapLayer)
  },

  render() {
    return null
  }
})