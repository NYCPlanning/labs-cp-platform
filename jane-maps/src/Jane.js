import React from 'react'
import update from 'react/lib/update'


import GLMap from './GLMap.js'
import LayerContent from './LayerContent.js'
import LayerList from './LayerList.js'
import MapLayer from './MapLayer.js'
import PoiMarker from './PoiMarker.js'
import Search from './Search.js'
import Source from './source/Source.js'
import SelectedFeaturesPane from './SelectedFeaturesPane.js'



//styles should be manually imported from whatever is using Jane for now
//import './styles.scss'

const Jane = React.createClass({

  getInitialState() {

    const defaultMapConfig = {
      layers: []
    }

    return({
      poiFeature: this.props.poiFeature ? this.props.poiFeature : null,
      poiLabel: this.props.poiLabel ? this.props.poiLabel : null,
      mapLoaded: false,
      loadedSources: {},
      mapConfig: this.props.mapConfig ? this.props.mapConfig : defaultMapConfig ,
      layerListExpanded: false,
      layerContentVisible: this.props.layerContentVisible ? this.props.layerContentVisible : null,
      selectedFeatures: []
    })
  },

  componentDidMount() {
    //this.map is the GLMap Component, not the map object itself
    this.map = this.refs.map

    this.map.mapObject.on('zoomend', this.resetSelectedFeatures)
    this.map.mapObject.on('dragend', this.resetSelectedFeatures)

    this.map.mapObject.on('click', this.handleMapLayerClick)
  },

  resetSelectedFeatures() {
    this.setState({
      selectedFeatures: []
    })
  },

  componentDidUpdate() {
    const self=this
    //this.map is the GLMap Component, not the map object itself
    //do we actually need to do this again here?
    this.map = this.refs.map

    // this.map.mapObject.off('click')
    // this.map.mapObject.on('click', (e) => {
    //   const features = this.map.mapObject.queryRenderedFeatures(e.point, { layers: ['facilities-points'] });

    //   console.log(features)
    // })
  },

  showPoiMarker(feature, label) {
    this.setState({ 
      poiFeature: feature,
      poiLabel: label
    })
  },

  hidePoiMarker() {
    this.setState({ 
      poiFeature: null,
      poiLabel: null 
    })
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

    this.setState({ 
      mapConfig: this.state.mapConfig
    })
  },

  handleLayerReorder(layers) {
    this.state.mapConfig.layers = layers
  
    this.setState({ mapConfig: this.state.mapConfig })
  },

  //sets the selected layer
  handleLayerClick(layerid) {
    if(!this.state.layerContentVisible) this.toggleLayerContent()

    if(this.state.mapConfig.selectedLayer == layerid) {
      this.toggleLayerContent()
    } else {
      this.state.mapConfig.selectedLayer = layerid
      this.setState({ mapConfig: this.state.mapConfig })      
    }
  },

  handleMapLayerClick(e) {

    const mapLayers = this.getMapLayers()

    const features = this.map.mapObject.queryRenderedFeatures(e.point, { layers: mapLayers });

    this.setState({
      selectedFeatures: features
    })

    // if(features.length > 0) {
    //   this.highlightFeature({
    //     type: 'Feature',
    //     geometry: features[0].geometry
    //   })  
    // }
  },

  //return an array of all loaded mapLayers
  getMapLayers() {
    const mapLayers = []

    this.state.mapConfig.layers.map((layer) => {
      layer.mapLayers.map((mapLayer) => {
        if(layer.visible) {
          mapLayers.push(mapLayer.id)
        }
      })
    })

    return mapLayers
  },

  highlightFeature(feature) {
    const map = this.map.mapObject
    try {
      map.removeLayer('highlighted')
      map.removeSource('highlighted')
    }
    catch(err) {}

    map.addSource('highlighted', {
      "type": "geojson",
      "data": feature
    })

    map.addLayer({
      "id": "highlighted",
      "type": "circle",
      "source": "highlighted",
      "paint": {
        "circle-radius": 14,
        "circle-color": "steelblue",
        "circle-opacity": 0.5
      }
    })
  },

  toggleLayerContent() {
    this.setState({ 
      layerContentVisible: !this.state.layerContentVisible,
    }, () => {
        if(!this.state.layerContentVisible) {
          const mapConfig=this.state.mapConfig
          mapConfig.selectedLayer=''
          this.setState({ mapConfig: mapConfig })
        } 
    })
  },

  //handles updates to a layer's configuration
  handleLayerUpdate(layerid, updates) {

    console.log('handling layer update', layerid, updates)

    //get the index in mapConfig.layers of the layer to be updated
    const layerIndex = this.state.mapConfig.layers.findIndex((layer) => {
      return layer.id == layerid
    })

    //use setState with callback because multiple <Layer>s may want to update in the same render cycle
    this.setState((prevState) => {
      return {
        mapConfig: update(prevState.mapConfig, {
          layers: {
            [layerIndex]: {
              $merge: updates
            }
          }
        })
      }
    })
  },

  handleToggleExpanded() {
    this.setState({ layerListExpanded: !this.state.layerListExpanded })
  },
 
  render() {
    const self=this
    const mapConfig = this.state.mapConfig
    
    //load all sources for visible layers
    let sources = []


    if (this.state.mapLoaded) {
      mapConfig.layers.map((layer) => {
        if( layer.sources && layer.visible ) {
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
          if(!this.state.loadedSources.hasOwnProperty(mapLayer.source)) { allSourcesLoaded = false}
        })
      }
    })



    //create <MapLayer> components for each visible layer, but only if all required sources are already loaded
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



    //add legendItems for each layer
    let legendItems = []

    mapConfig.layers.map((layer, i) => {
      if(layer.visible && layer.legend) { 
        legendItems.push(<div key={i}>{layer.legend}</div>)
      }
    }) 

    //add selected feature items for each layer
    let selectedFeatureItems = []

    mapConfig.layers.map((layer, i) => {
      console.log(layer)
      if(layer.listItem && layer.visible && layer.interactivityMapLayers) { 

        const SelectedFeatureItem = layer.listItem ? layer.listItem: null
        const layerSelectedFeatures = this.state.selectedFeatures.filter((feature) => {
          return layer.interactivityMapLayers.indexOf(feature.layer.id) > -1
        })

        console.log('layerselectedfeatures!', layerSelectedFeatures)

        layerSelectedFeatures.map((layerSelectedFeature, j) => {
          selectedFeatureItems.push(<SelectedFeatureItem feature={layerSelectedFeature} key={i.toString()+j.toString()}/>)
        })
      }
    })


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
    let leftOffset = 36
    if (this.state.layerListExpanded) leftOffset+=164
    if (this.state.layerContentVisible) leftOffset+=320

    return(
      
      <div className='jane-container' style={this.props.style}>
        <div className='jane-map-container' style={{
          left: leftOffset
        }}>


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

          {
            legendItems.length > 0 &&  (
              <div className='jane-legend'>
                {legendItems}
              </div>
            )
          }

          <GLMap 
            {...this.props.mapInit}
            ref='map'
            onLoad={this.onMapLoad}
          />
          
        </div>

        {
          (this.state.poiFeature && this.map) && (
            <PoiMarker 
              feature={this.state.poiFeature} 
              label={this.state.poiLabel}
              map={this.map} 
            />
          )
        }

        {sources}
        {mapLayers}
        <LayerList 
          expanded={this.state.layerListExpanded}
          layers={this.state.mapConfig.layers}
          selectedLayer={this.state.mapConfig.selectedLayer} 
          onLayerReorder={this.handleLayerReorder}
          onLayerClick={this.handleLayerClick}
          onToggleExpanded={this.handleToggleExpanded}
        />

        <LayerContent 
          offset={this.state.layerListExpanded}
          visible={this.state.layerContentVisible}
          layers={this.state.mapConfig.layers}
          selectedLayer={this.state.mapConfig.selectedLayer} 
          onLayerUpdate={this.handleLayerUpdate}
          onLayerToggle={this.handleLayerToggle}
          onClose={this.toggleLayerContent}
          context={this.props.context}
        />
       
        {(selectedFeatureItems.length>0) && (<SelectedFeaturesPane style={{
          right: (selectedFeatureItems.length>0) ? 0 : -250
        }}>
          {selectedFeatureItems}
        </SelectedFeaturesPane>
        )}
        
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