import React from 'react'
import update from 'react/lib/update'

import GLMap from './GLMap.jsx'
import Search from './Search.jsx'
import PoiMarker from './PoiMarker.jsx'
import Layer from './layer/Layer.jsx'
import GeoJsonSource from './source/GeoJsonSource.jsx'
import VectorSource from './source/VectorSource.jsx'
import Drawer from './Drawer.jsx'

import './styles.scss'


import FontIcon from 'material-ui/FontIcon'

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
    // this.forceUpdate()
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

    let layer = mapConfig.layers.find((layer => layer.id == layerid))
    layer.visible = !layer.visible


    this.setState({
      mapConfig: mapConfig
    })
  },

  handleLayerChange(layers) {
    let mapConfig = this.state.mapConfig
    mapConfig.layers = layers

    this.setState({
      mapConfig: mapConfig
    })
  },

  handleLayerClick(layerid) {
    let mapConfig = this.state.mapConfig
    mapConfig.selectedLayer = layerid

    this.setState({
      mapConfig: mapConfig
    })
  },

  handleLayerUpdate(newLayer) {

    // console.log('handling Layer Update', newLayer)
    // const mapConfig=this.state.mapConfig

    const layerIndex = this.state.mapConfig.layers.findIndex((layer) => {
      return layer.id == newLayer.id
    })

    // mapConfig.layers[layerIndex] = newLayer 

    // this.forceUpdate()

    this.setState({
      mapConfig: update(this.state.mapConfig, {
        layers: {
          [layerIndex]: {
            $set: newLayer
          }
        }
      })
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
        if( layer.visible && layer.sources ) {
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
      if (layer.visible && layer.sources && layer.mapLayers) {
        layer.mapLayers.map((mapLayer) => {
          if(!this.state.loadedSources.hasOwnProperty(mapLayer.source)) allSourcesLoaded = false
        })
      }
    })


    //create components for each visible layer, but only if all required sources are already loaded
    let mapLayers = []

    if (allSourcesLoaded) {
      this.order=0
      mapConfig.layers.map((layer, i) => {
        //render layers in order 
        if(layer.visible && layer.sources && layer.mapLayers) {
          layer.mapLayers.map((mapLayer) => {
            mapLayers.push(<Layer map={this.map} config={mapLayer} onLoaded={this.handleLayerLoaded} key={mapLayer.id + this.order}/>)
          })
          
          this.order++
        }
      })      
    }

    //add hover
    // if (this.map) {
    //   const map = this.map.mapObject
    //   map.off('mousemove')
    //   map.on('mousemove', (e) => {
    //     const features = map.queryRenderedFeatures(e.point, { layers: [this.state.mapConfig.selectedLayer] });
    //     console.log(features)
    //     map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    //   })   
    // }

    //if(this.props.debug && this.map) console.log('debug', this.map.mapObject.getStyle())

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
        {mapLayers}
        <Drawer 
          layers={this.state.mapConfig.layers}
          selectedLayer={this.state.mapConfig.selectedLayer} 
          onLayerToggle={this.handleLayerToggle}
          onLayerChange={this.handleLayerChange}
          onLayerClick={this.handleLayerClick}
        />

        <SecondDrawer 
          layers={this.state.mapConfig.layers}
          selectedLayer={this.state.mapConfig.selectedLayer} 
          onLayerUpdate={this.handleLayerUpdate}
        />

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

const SecondDrawer = React.createClass({
  render() {
    const { layers, selectedLayer } = this.props

    const activeLayer = layers.filter((layer) => {
      return layer.id == selectedLayer
    })[0]

    const style = {
      fontIcon: {
        fontSize: '18px',
        margin: '8px',
        height: '18px',
        width: '18px',
        left: 0
      }
    }

    //if the layer has a component, mount it
    const components = layers.map((layer) => {
      if (layer.component) {
        return (
          <div
            style={{
              display: layer.id == selectedLayer ? 'inline' : 'none'
            }}
            key={layer.id}
          >
            <layer.component
              layer={layer}
              onUpdate={this.props.onLayerUpdate}
            />
          </div>
        )
      }
    })
    

    return (
      <div className='second-drawer'>
        <div className='second-drawer-header' >
          <FontIcon className="fa fa-home" style={style.fontIcon}/> 
          {activeLayer.name}
        </div>

        {components}
      </div>
    )
  }
})

