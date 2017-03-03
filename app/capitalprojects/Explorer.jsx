// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';

import Jane from 'jane-maps';
import JaneLayer from 'jane-maps/dist/JaneLayer';
import content from './content';

import CapitalProjectsComponent from './janelayer/Component';
import CapitalProjectsListItem from './janelayer/ListItem';
import supportingLayers from '../janelayers/supportingLayers';

import appConfig from '../helpers/appConfig';

import './styles.scss';

const CapitalProjectsExplorer = React.createClass({
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


    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
        >
          <JaneLayer
            {...supportingLayers.aerials}
          />
          <JaneLayer
            {...supportingLayers.adminboundaries}
          />
          <JaneLayer
            {...supportingLayers.transportation}
          />
          <JaneLayer
            id="capital-projects"
            name="Capital Projects"
            icon="usd"
            interactivityMapLayers={['capital-projects-points', 'capital-projects-polygons']}
            visible
            selected
            component={CapitalProjectsComponent}
            listItem={CapitalProjectsListItem}
          />
        </Jane>
      </div>
    );
  },
});

module.exports = CapitalProjectsExplorer;
