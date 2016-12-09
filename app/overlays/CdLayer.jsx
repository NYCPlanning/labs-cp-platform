//Community Districts Layer
import React from 'react'
import CartoLayer from './CartoLayer.jsx'

var CdLayer = function(props) {
  var mapConfig = {
    "version": "1.3.0",
    "layers": [{
      "type": "mapnik",
      "options": {
        "cartocss_version": "2.1.1",
        "cartocss": "#dcp_cdboundaries{ polygon-fill: #FF5C00; polygon-opacity: 0; line-color: #000000; line-width: 3; line-opacity: 0.5; line-dasharray: 10, 5; } #dcp_cdboundaries::labels { text-name: [borocd]; text-face-name: 'DejaVu Sans Book'; text-size: 15; text-label-position-tolerance: 10; text-fill: #000; text-halo-fill: #FFF; text-halo-radius: 2.5; text-dy: 0; text-allow-overlap: true; text-placement: point; text-placement-type: simple; }",
        "sql": "select * from dcp_cdboundaries"
      }
    }]
  }

  return (
    <CartoLayer
      map={props.map}
      name='cdboundaries'
      mapConfig={mapConfig}
    />
  )
}

module.exports=CdLayer