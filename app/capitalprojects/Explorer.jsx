// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';

import Jane from '../../jane-maps/src';
import content from './content';

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries';
import FloodHazardsJaneLayer from '../janelayers/floodhazards';
import ProjectsJaneLayer from './projectsJaneLayer';
import TransportationJaneLayer from '../janelayers/transportation';
import ImageryJaneLayer from '../janelayers/imagery';

import appConfig from '../helpers/appConfig';

import './styles.scss';

const CaptialProjectsExplorer = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      showModal: null,
    };
  },

  componentDidMount() {
    const modalShown = JSON.parse(localStorage.getItem('facilities-splash'));

    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splash,
        modalCloseText: 'Got it.  Let me in!',
      });

      localStorage.setItem('facilities-splash', 'true');
    }
  },

  render() {
    // TODO these can be globally defined for the app
    const mapInit = appConfig.mapInit;
    const searchConfig = appConfig.searchConfig;

    // TODO we need some kind of "stock layers list" that should automatically be added to mapConfig.layers and maintained elsewhere
    const mapConfig = {
      selectedLayer: 'capital-projects',
      layers: [
        ImageryJaneLayer,
        FloodHazardsJaneLayer,
        AdminBoundariesJaneLayer,
        TransportationJaneLayer,
        ProjectsJaneLayer,
      ],
    };

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          mapConfig={mapConfig}
        />
      </div>
    );
  },
});

module.exports = CaptialProjectsExplorer;
