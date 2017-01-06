import React from 'react'

import GeoJsonSource from './GeoJsonSource.jsx'
import CartoVectorSource from './CartoVectorSource.jsx'
import CartoRasterSource from './CartoRasterSource.jsx'

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
    if( source.type=='vector' && source.sql) return <CartoVectorSource {...this.props}/>  
    if( source.type=='cartoraster') return <CartoRasterSource {...this.props}/>
  }
})

export default Source