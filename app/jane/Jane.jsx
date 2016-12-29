import React from 'react'

import GLMap from './GLMap.jsx'
import Search from './Search.jsx'
import PoiMarker from './PoiMarker.jsx'
import Layer from './Layer.jsx'
import GeoJsonSource from './GeoJsonSource.jsx'
import VectorSource from './VectorSource.jsx'

import './styles.scss'

const Jane = React.createClass({

  getInitialState() {
    return({
      poiFeature: null,
      mapLoaded: false,
      allSourcesLoaded: false,
      mapConfig: this.props.mapConfig
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

  handleSourceLoaded(loadedSources) {
    console.log('source loaded', loadedSources)

    //check the map's sources and see if all of the current config sources are loaded
    let allSourcesLoaded = true
    this.state.mapConfig.layers.map((layer, i) => {
        layer.sources.map((source, j) => {
          if (!loadedSources.hasOwnProperty(source.id)) allSourcesLoaded = false
        })
      })

    if(allSourcesLoaded) {
      this.setState({
        allSourcesLoaded: true
      })
    }
  },

  handleLayerLoaded() {
    this.forceUpdate()
  },

  componentDidMount() {
    //this.map is the GLMap Component, not the map object itself
    this.map = this.refs.map
    console.log('didMount')
  },

  componentDidUpdate() {
    //this.map is the GLMap Component, not the map object itself
    this.map = this.refs.map
    console.log('didUpdate')
  },

  rearrange() {
    console.log('mutating config')

    let mapConfig = this.state.mapConfig

    const layer = mapConfig.layers.shift()
    mapConfig.layers.push(layer)
    this.setState({
      allSourcesLoaded: false, 
      mapConfig: mapConfig
    }, () => {
      this.handleSourceLoaded(this.map.mapObject.getStyle().sources)
    })


  },

  render() {
    const self=this

    //get all sources
    let sources = []

    if (this.state.mapLoaded) {
      this.state.mapConfig.layers.map((layer) => {
        layer.sources.map((source) => {
          if(source.type == 'geojson') sources.push(<GeoJsonSource map={self.map} source={source} onLoaded={this.handleSourceLoaded} key={source.id}/>)
          if(source.type == 'vector') sources.push(<VectorSource map={self.map} source={source} onLoaded={this.handleSourceLoaded} key={source.id}/>)
        })
      })
    }

    let layers = []

    if (this.state.allSourcesLoaded) {
      this.state.mapConfig.layers.map((layer, i) => {
        //render components in order
        if((i == 0) || (i <= this.lastLayerLoaded + 1)) {
          layers.push(<Layer map={this.map} config={layer} onLoaded={this.handleLayerLoaded} key={layer.id}/>)
          this.lastLayerLoaded = i
        } 
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
            <PoiMarker feature={this.state.poiFeature} map={this.map} />
          )
        }



        {sources}
        {layers}
        <Drawer mapConfig={this.state.mapConfig} rearrange={this.rearrange}/>
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

const Drawer = React.createClass({

  render() {
    let layers = this.props.mapConfig.layers.map((layer) => {
      return (<p key={layer.id}>{layer.id}</p>)
    })

    //reverse them so the list reflects the map
    layers = layers.slice().reverse()

    return(
      <div className='jane-drawer'>
        {layers}
        <button onClick={this.props.rearrange}>Rearrange</button>
      </div>
    )
  }
})