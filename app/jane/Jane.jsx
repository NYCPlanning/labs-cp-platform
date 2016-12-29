import React from 'react'

import GLMap from './GLMap.jsx'
import Search from './Search.jsx'
import PoiMarker from './PoiMarker.jsx'


import './styles.scss'

const Jane = React.createClass({

  getInitialState() {
    return({
      poiFeature: null,
      mapLoaded: false,
      allSourcesLoaded: false
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
    this.props.mapConfig.layers.map((layer, i) => {
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

  render() {
    const self=this

    //get all sources
    let sources = []

    if (this.state.mapLoaded) {
      this.props.mapConfig.layers.map((layer) => {
        layer.sources.map((source) => {
          sources.push(<GeoJsonSource map={self.map} source={source} onLoaded={this.handleSourceLoaded} key={source.id}/>)
        })
      })
    }

    let layers = []

    if (this.state.allSourcesLoaded) {
      this.props.mapConfig.layers.map((layer, i) => {
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

  componentWillMount() {

    this.map = this.props.map.mapObject

    this.props.config.mapLayers.map((mapLayer) => {
      this.map.addLayer(mapLayer)
    })

    this.props.onLoaded()
  },

  render() {

    return (
      <div>
       
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

  componentDidUpdate() {
    console.log('source did update')
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
    
    console.log(this.map.getStyle())
    this.props.onLoaded(this.map.getStyle().sources)
  },

  render() {
    return null
  }
})

const LineLayer = React.createClass({
  componentWillMount() {
    console.log(this.props.mapLayer.id + ' mounting')
    this.map = this.props.map.mapObject

    this.map.addLayer(this.props.mapLayer)

  },

  render() {
    return null
  }
})