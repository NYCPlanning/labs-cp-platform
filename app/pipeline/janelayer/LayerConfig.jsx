import React from 'react';

import colors from '../colors';
import appConfig from '../../helpers/appConfig';

const LayerConfig = {
  points: {
    sources: [
      {
        type: 'cartovector',
        id: 'pipeline-points',
        options: {
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
        },
      },
    ],
    mapLayers: [
      {
        id: 'pipeline-points',
        source: 'pipeline-points',
        'source-layer': 'layer0',
        type: 'circle',
        paint: {
          'circle-radius': {
            property: 'dcp_units_use_map',
            stops: [
              [{ zoom: 10, value: -12 }, 1],
              [{ zoom: 10, value: 1669 }, 2],
              [{ zoom: 10, value: 1669 }, 4],
              [{ zoom: 14, value: -12 }, 5],
              [{ zoom: 14, value: 100 }, 10],
              [{ zoom: 14, value: 1669 }, 20],
            ],
          },
          'circle-color': {
            property: 'dcp_permit_type',
            type: 'categorical',
            stops: [
              ['New Building', 'rgba(0, 228, 14, 1)'],
              ['Alteration', 'rgba(81, 99, 230, 1)'],
              ['Demolition', 'rgba(234, 62, 62, 1)'],
            ],
          },
          'circle-stroke-color': '#000',
          'circle-stroke-width': {
            stops: [
              [11, 0],
              [12, 1],
            ],
          },
          'circle-stroke-opacity': 0.5,
          'circle-opacity': 0.5,
        },
      },
    ],
    legend: (
      <div>
        <div className="legend-section">
          <h4>Development Status</h4>
          <div className="legendItem">
            <div className="color-circle" style={{ backgroundColor: colors.getStatusColor('Complete') }} />
            <div className="legendItemText">Complete</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{ backgroundColor: colors.getStatusColor('Partial complete') }} />
            <div className="legendItemText">Partial Complete</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{ backgroundColor: colors.getStatusColor('Permit outstanding') }} />
            <div className="legendItemText">Permit Outstanding</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{ backgroundColor: colors.getStatusColor('Permit pending') }} />
            <div className="legendItemText">Permit Pending</div>
          </div>
          <div className="legendItem">
            <div className="color-circle" style={{ backgroundColor: colors.getStatusColor('Demolition (complete)') }} />
            <div className="legendItemText">Demolition (Complete)</div>
          </div>
        </div>
        <div className="legendSection">
          <p>Larger markers represent higher net unit counts</p>
        </div>
      </div>
    ),
  },

  polygons: {
    sources: [
      {
        type: 'cartovector',
        id: 'pipeline-polygons',
        options: {
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
        },
      },
    ],
    mapLayers: [
      {
        id: 'pipeline-polygons',
        source: 'pipeline-polygons',
        'source-layer': 'layer0',
        type: 'fill',
        paint: {
          'fill-color': 'steelblue',
          'fill-opacity': 0.75,
          'fill-outline-color': '#838763',
          'fill-antialias': true,
        },
      },
    ],
    legend: (

      <div className="legend-section">
         Legend
      </div>
    ),
  },
};

export default LayerConfig;
