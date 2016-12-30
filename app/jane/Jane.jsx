import React, {Component, PropTypes} from 'react'

import GLMap from './GLMap.jsx'
import Search from './Search.jsx'
import PoiMarker from './PoiMarker.jsx'
import Layer from './Layer.jsx'
import GeoJsonSource from './GeoJsonSource.jsx'
import VectorSource from './VectorSource.jsx'


import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

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
    // //check the map's sources and see if all of the current config sources are loaded
    // let allSourcesLoaded = true
    // this.state.mapConfig.layers.map((layer, i) => {
    //     layer.sources.map((source, j) => {
    //       if (!loadedSources.hasOwnProperty(source.id)) allSourcesLoaded = false
    //     })
    //   })

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
    this.map = this.refs.map
  },

  rearrange() {
    let mapConfig = this.state.mapConfig

    const layer = mapConfig.layers.shift()
    mapConfig.layers.push(layer)
    this.setState({
      mapConfig: mapConfig
    })
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
    //get all sources
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

    let allSourcesLoaded = true
    console.log(this.state.loadedSources)

    mapConfig.layers.map((layer, i) => {
      if (layer.visible) {
        layer.mapLayers.map((mapLayer) => {
          if(!this.state.loadedSources.hasOwnProperty(mapLayer.source)) allSourcesLoaded = false
        })
      }
    })

    let layers = []

    //layers must be rendered together, so layers [] should stay empty until all sources are available
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

    console.log('layers to be rendered', layers)

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
          rearrange={this.rearrange}
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

const Drawer = React.createClass({

  handleLayerToggle(layerid) {
    this.props.onLayerToggle(layerid)
  },

  render() {
    const listItemStyle = {
      padding: '8px 8px 8px 34px',
      fontSize: '12px'
    }

    const fontIconStyle = {
      fontSize: '18px',
      margin: '8px',
      height: '18px',
      width: '18px',
      left: 0
    }

    const toggleStyle = {
      position: 'absolute',
      display: 'initial',
      width: 'auto',
      right: '8px',
      top: '7px'
    }

    let layers = this.props.mapConfig.layers.map((layer, i) => {
      return (
        <div
          className={this.props.mapConfig.selectedLayer == layer.id ? 'list-item active' : 'list-item'}
          key={layer.id}
        >
          <FontIcon className="fa fa-home" style={fontIconStyle}/> 
          {layer.id}
          <Toggle 
            style={toggleStyle}
            toggled={layer.visible}
            onToggle={this.handleLayerToggle.bind(this, layer.id)}
          />
        </div>
      )
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