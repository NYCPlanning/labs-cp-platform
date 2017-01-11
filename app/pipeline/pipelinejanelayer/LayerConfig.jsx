import React from 'react'

import colors from '../colors.js'
import appConfig from '../../helpers/appConfig.js'

const LayerConfig = {
  points: {
    sources: [
      {
        "type": "cartovector",
        "id": "pipeline-points",
        "options": {
          "carto_user": appConfig.carto_user,
          "carto_domain": appConfig.carto_domain
        }        
      }
    ],
    mapLayers: [
      {
        "id": "pipeline-outline",
        "source": 'pipeline-points',
        "source-layer": "layer0",
        "type": "circle",
        "paint": {
          "circle-radius": {
            property: 'dcp_units_use_map',
            stops: [
              [{zoom: 10, value: -12}, 2],
              [{zoom: 10, value: 1669}, 5],
              [{zoom: 14, value: -12}, 6],
              [{zoom: 14, value: 1669}, 15]
            ]
          },
          "circle-color": "#FFF",
          "circle-opacity": 0.7
        }
      },
      {
        "id": "pipeline-points",
        "source": 'pipeline-points',
        "source-layer": "layer0",
        "type": "circle",
        "paint": {
          "circle-radius": {
            property: 'dcp_units_use_map',
            stops: [
              [{zoom: 10, value: -12}, 1],
              [{zoom: 10, value: 1669}, 4],
              [{zoom: 14, value: -12}, 5],
              [{zoom: 14, value: 1669}, 14]
            ]
          },
          "circle-color": {
            property: 'dcp_pipeline_status',
            type: 'categorical',
            stops: [
              ['Complete', '#136400'],
              ['Partial complete', '#229A00'],
              ['Permit outstanding', '#b2df8a'],
              ['Permit pending', '#5CA2D1'],
              ['Demolition (complete)', '#525252']
            ]
          },
          "circle-opacity": 0.7
        }
      }
    ],
    legend: (
      <div>
        <div className="legend-section">
          <h4>Development Status</h4>
          <div className="legendItem">
            <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Complete')}}></div>
            <div className="legendItemText">Complete</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Partial complete')}}></div>
            <div className="legendItemText">Partial Complete</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Permit outstanding')}}></div>
            <div className="legendItemText">Permit Outstanding</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Permit pending')}}></div>
            <div className="legendItemText">Permit Pending</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{backgroundColor: colors.getStatusColor('Demolition (complete)')}}></div>
            <div className="legendItemText">Demolition (Complete)</div>
          </div>
        </div>
        <div className="legendSection">
          <p>Larger markers represent higher net unit counts</p>
        </div>
      </div>
    )
  },

  polygons: {
    sources: [
      {
        "type": "cartovector",
        "id": "pipeline-polygons",
        "options": {
          "carto_user": appConfig.carto_user,
          "carto_domain": appConfig.carto_domain
        }
      }
    ],
    mapLayers: [
      {
        "id": "pipeline-polygons",
        "source": 'pipeline-polygons',
        "source-layer": "layer0",
        "type": "fill",
        'paint': {
          'fill-color': 'steelblue',
          'fill-opacity': 0.75,
          'fill-outline-color': '#838763',
          'fill-antialias': true 
        }
      }
    ],
    legend: (
      
      <div className="legend-section">
         Legend 
      </div>
    )
  }
}

export default LayerConfig