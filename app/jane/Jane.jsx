import React from 'react'

import GLMap from './GLMap.jsx'
import Search from './Search.jsx'
import PoiMarker from './PoiMarker.jsx'
import Layer from './layer/Layer.jsx'
import GeoJsonSource from './source/GeoJsonSource.jsx'
import VectorSource from './source/VectorSource.jsx'
import Drawer from './Drawer.jsx'

import './styles.scss'


const Jane = React.createClass({

  getInitialState() {
    return({
      poiFeature: null,
      mapLoaded: false,
      loadedSources: {},
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
    this.setState({
      loadedSources: loadedSources
    })
  },

  handleLayerLoaded() {
    this.forceUpdate()
  },

  componentDidMount() {
    //this.map is the GLMap Component, not the map object itself
    this.map = this.refs.map
  },

  componentDidUpdate() {
    //this.map is the GLMap Component, not the map object itself
    //do we actually need to do this again in componentDidUpdate()?
    this.map = this.refs.map
  },

  handleLayerToggle(layerid) {
    const mapConfig=this.state.mapConfig

    const layer = mapConfig.layers.find((layer => layer.id == layerid))
    layer.visible = !layer.visible

    this.setState({
      mapConfig: mapConfig
    })
  },

  render() {
    const self=this
    const mapConfig = this.state.mapConfig
    
    //load all sources for visible layers
    //TODO Source components should check to see if the source already exists before adding
    let sources = []

    if (this.state.mapLoaded) {
      mapConfig.layers.map((layer) => {
        if( layer.visible ) {
          layer.sources.map((source) => {
            if(source.type == 'geojson' ) sources.push(<GeoJsonSource map={self.map} source={source} onLoaded={this.handleSourceLoaded} key={source.id}/>)
            if(source.type == 'vector' ) sources.push(<VectorSource map={self.map} source={source} onLoaded={this.handleSourceLoaded} key={source.id}/>)
          })          
        }
      })
    }

    //check to see if all sources for visible layers are loaded
    let allSourcesLoaded = true

    mapConfig.layers.map((layer, i) => {
      if (layer.visible) {
        layer.mapLayers.map((mapLayer) => {
          if(!this.state.loadedSources.hasOwnProperty(mapLayer.source)) allSourcesLoaded = false
        })
      }
    })

    //create components for each visible layer, but only if all required sources are already loaded
    let layers = []

    if (allSourcesLoaded) {
      this.order=0
      mapConfig.layers.map((layer, i) => {
        //render layers in order 
        if(layer.visible) {
          layers.push(<Layer map={this.map} config={layer} onLoaded={this.handleLayerLoaded} key={layer.id + this.order}/>)
          this.order++
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
        <Drawer 
          mapConfig={this.state.mapConfig} 
          onLayerToggle={this.handleLayerToggle}/>
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