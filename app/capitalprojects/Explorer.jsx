// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';

import Jane from 'jane-maps';
import JaneLayer from 'jane-maps/dist/JaneLayer';

import CapitalProjectsComponent from './janelayer/Component';
import CapitalProjectsListItem from './janelayer/ListItem';
import supportingLayers from '../janelayers/supportingLayers';

import appConfig from '../helpers/appConfig';

import './styles.scss';

const mapInit = appConfig.mapInit;
const searchConfig = appConfig.searchConfig;

const CapitalProjectsExplorer = () => (
  <div className="full-screen cp-explorer">
    <Jane
      mapInit={mapInit}
      layerContentVisible
      search
      searchConfig={searchConfig}
    >
      {supportingLayers.aerials}
      {supportingLayers.adminboundaries}
      {supportingLayers.transportation}
      <JaneLayer
        id="capital-projects"
        name="Capital Projects"
        icon="usd"
        interactivityMapLayers={['capital-projects-points', 'capital-projects-polygons']}
        visible
        selected
      >
        <CapitalProjectsComponent />
      </JaneLayer>
    </Jane>
  </div>
);

module.exports = CapitalProjectsExplorer;
