import React from 'react'

import GeoJsonSource from './GeoJsonSource.js'
import CartoVectorSource from './CartoVectorSource.js'
import CartoRasterSource from './CartoRasterSource.js'


const Source = React.createClass({

  componentWillUnmount() {
    this.removeSource()
  },

  removeSource() {
    this.props.map.mapObject.removeSource(this.props.source.id)
    //let jane know what sources are still loaded
    this.props.onLoaded(this.props.map.mapObject.getStyle().sources)
  },

  render() {
    const source = this.props.source

    if( source.type=='geojson') return <GeoJsonSource {...this.props}/>
    if( source.type=='cartovector' && source.options) return <CartoVectorSource {...this.props}/>  
    if( source.type=='cartoraster') return <CartoRasterSource {...this.props}/>
  }
})

export default Source