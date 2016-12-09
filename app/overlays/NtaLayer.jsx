import React from 'react'
import GeoJsonLayer from './GeoJsonLayer.jsx'

const NtaLayer = function(props) {
  return (
    <GeoJsonLayer
      map={props.map}
      source='/data/ntaboundaries.geojson'
      name='ntaboundaries'
      layer={{
        'id': 'ntaboundaries',
        'type': 'fill',
        'source': 'ntaboundaries',
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      }}
    />
  )
}

module.exports=NtaLayer