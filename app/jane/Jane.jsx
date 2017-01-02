import React from 'react'
import update from 'react/lib/update'

import GLMap from './GLMap.jsx'
import LayerContent from './LayerContent.jsx'
import LayerList from './LayerList.jsx'
import MapLayer from './MapLayer.jsx'
import PoiMarker from './PoiMarker.jsx'
import Search from './Search.jsx'
import Source from './source/Source.jsx'

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

  componentDidMount() {
    //this.map is the GLMap Component, not the map object itself
    this.map = this.refs.map
  },

  componentDidUpdate() {
    //this.map is the GLMap Component, not the map object itself
    //do we actually need to do this again in componentDidUpdate()?
    this.map = this.refs.map
  },

  showPoiMarker(feature) {
    this.setState({ poiFeature: feature })
  },

  hidePoiMarker() {
    this.setState({ poiFeature: null })
  },

  onMapLoad(style) {
    this.setState({ mapLoaded: true })
  },

  //keeps track of loaded sources in state,
  //used to figure out whether layers are ready to be added in render()
  handleSourceLoaded(loadedSources) {
    this.setState({ loadedSources: loadedSources })
  },

  handleLayerToggle(layerid) {
    let layer = this.state.mapConfig.layers.find((layer => layer.id == layerid))
    layer.visible = !layer.visible

    this.setState({ mapConfig: this.state.mapConfig })
  },

  handleLayerReorder(layers) {
    this.state.mapConfig.layers = layers
  
    this.setState({ mapConfig: this.state.mapConfig })
  },

  //sets the selected layer
  handleLayerClick(layerid) {
    this.state.mapConfig.selectedLayer = layerid

    this.setState({ mapConfig: this.state.mapConfig })
  },

  //handles updates to a layer's configuration
  handleLayerUpdate(newLayer) {
    const layerIndex = this.state.mapConfig.layers.findIndex((layer) => {
      return layer.id == newLayer.id
    })

    //use setState with callback because multiple <Layer>s may want to update in the same render cycle
    this.setState((prevState) => {
      return {
        mapConfig: update(prevState.mapConfig, {
          layers: {
            [layerIndex]: {
              $set: newLayer
            }
          }
        })
      }
    })
  },
 
  render() {
    const self=this
    const mapConfig = this.state.mapConfig
    
    //load all sources for visible layers
    let sources = []

    if (this.state.mapLoaded) {
      mapConfig.layers.map((layer) => {
        if( layer.sources ) {
          layer.sources.map((source) => {
            sources.push(
              <Source map={self.map} source={source} onLoaded={this.handleSourceLoaded} key={source.id}/>
            )
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

    //create <Layer> components for each visible layer, but only if all required sources are already loaded
    let mapLayers = []

    if (allSourcesLoaded) {
      this.order=0
      mapConfig.layers.map((layer, i) => {
        //render layers in order 
        if(layer.visible && layer.sources && layer.mapLayers) {
          layer.mapLayers.map((mapLayer) => {
            mapLayers.push(<MapLayer map={this.map} config={mapLayer} key={mapLayer.id + this.order}/>)
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
        <LayerList 
          layers={this.state.mapConfig.layers}
          selectedLayer={this.state.mapConfig.selectedLayer} 
          onLayerToggle={this.handleLayerToggle}
          onLayerReorder={this.handleLayerReorder}
          onLayerClick={this.handleLayerClick}
        />

        <LayerContent 
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