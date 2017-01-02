import React from 'react'

import GeoJsonSource from './GeoJsonSource.jsx'
import CartoVectorSource from './CartoVectorSource.jsx'

const Source = React.createClass({
  render() {

    const source = this.props.source

    if( source.type=='geojson') return <GeoJsonSource {...this.props}/>
    if( source.type=='vector' && source.sql) return <CartoVectorSource {...this.props}/>  
    if( source.type=='vector') return <VectorSource {...this.props}/>
    
  }
})

export default Source