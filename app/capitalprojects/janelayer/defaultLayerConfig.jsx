import React from 'react';

import appConfig from '../../helpers/appConfig';

const layerConfig = {
  sources: [
    {
      type: 'cartovector',
      id: 'capital-projects',
      options: {
        carto_user: appConfig.carto_user,
        carto_domain: appConfig.carto_domain,
      },
    },
  ],
  mapLayers: [
    {
      id: 'capital-projects-points-outline',
      source: 'capital-projects',
      'source-layer': 'layer0',
      type: 'circle',
      paint: {
        'circle-radius': {
          stops: [
            [10, 3],
            [15, 7],
          ],
        },
        'circle-color': '#012700',
        'circle-opacity': 0.7,
      },
    },
    {
      id: 'capital-projects-points',
      source: 'capital-projects',
      'source-layer': 'layer0',
      type: 'circle',
      paint: {
        'circle-radius': {
          stops: [
            [10, 2],
            [15, 6],
          ],
        },
        'circle-color': {
          property: 'totalspend',
          stops: [
            [0, '#999'],
            [1, '#FFCC00'],
          ],
        },
        'circle-opacity': 0.7,
      },
    },
    {
      id: 'capital-projects-polygons',
      source: 'capital-projects',
      'source-layer': 'layer1',
      type: 'fill',
      paint: {
        'fill-color': {
          property: 'totalspend',
          stops: [
            [0, '#999'],
            [1, '#FFCC00'],
          ],
        },
        'fill-opacity': 0.75,
        'fill-antialias': true,
      },
    },
  ],

  legend: (
    <div className="legendSection">
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: '#999' }} />
        <div className="legendItemText">Ongoing projects</div>
      </div>
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: '#FFCC00' }} />
        <div className="legendItemText">Planned projects</div>
      </div>

    </div>
  ),
};

export default layerConfig;
