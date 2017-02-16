import React from 'react';

import appConfig from '../../helpers/appConfig';
import Agencies from '../agencies';

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
        'circle-color': Agencies.mapboxGLStyle,
        'circle-opacity': 0.7,
      },
    },
    {
      id: 'capital-projects-polygons',
      source: 'capital-projects',
      'source-layer': 'layer1',
      type: 'fill',
      paint: {
        'fill-color': Agencies.mapboxGLStyle,
        'fill-opacity': 0.75,
        'fill-antialias': true,
      },
    },
  ],

  legend: (
    <div className="legendSection">
      <h4>Sponsor Agency</h4>
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: 'rgb(51, 160, 44)' }} />
        <div className="legendItemText">Dept. of Parks and Recreation - (DPR)</div>
      </div>
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: 'rgb(202, 178, 214)' }} />
        <div className="legendItemText">Dept. of Transportation - (DOT)</div>
      </div>
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: 'rgb(31, 120, 180)' }} />
        <div className="legendItemText">Dept. of Environmental Protection - (DEP)</div>
      </div>
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: 'rgb(255, 127, 0)' }} />
        <div className="legendItemText">School Construction Authority - (SCA)</div>
      </div>
      <div className="legendItem">
        <div className="colorBox" style={{ backgroundColor: 'rgb(255, 204, 0)' }} />
        <div className="legendItemText">All other agencies</div>
      </div>
    </div>
  ),
};

export default layerConfig;
