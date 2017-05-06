// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';
import createReactClass from 'create-react-class';

import { Jane, JaneLayer } from 'jane-maps';
import CapitalProjectsComponent from './janelayer/Component';
import CapitalProjectsStore from '../stores/CapitalProjectsStore';
import CapitalProjectsActions from '../actions/CapitalProjectsActions';
import supportingLayers from '../janelayers/supportingLayers';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import ListItem from './janelayer/ListItem';

import { mapInit, searchConfig } from '../helpers/appConfig';

import './styles.scss';

const CapitalProjectsExplorer = createReactClass({

  getInitialState() {
    return {
      selectedFeatures: [],
    };
  },

  componentDidMount() {
    CapitalProjectsStore.on('selectedFeaturesUpdated', () => {
      const selectedFeatures = CapitalProjectsStore.selectedFeatures;
      this.setState({ selectedFeatures });
    });
  },

  handleMapLayerClick(features) {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    CapitalProjectsActions.setSelectedFeatures([]);
    setTimeout(() => {
      CapitalProjectsActions.setSelectedFeatures(features);
    }, 450);
  },

  render() {
    const { selectedFeatures } = this.state;

    const listItems = selectedFeatures.map(feature => (
      <ListItem feature={feature} key={feature.id} />
    ));

    const selectedFeaturesPane = (
      <SelectedFeaturesPane>
        {listItems}
      </SelectedFeaturesPane>
    );

    return (
      <div className="full-screen cp-explorer">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
        >
          {supportingLayers.aerials}
          {supportingLayers.adminboundaries}
          {supportingLayers.transportation}
          <JaneLayer
            id="capital-projects"
            name="Capital Projects"
            icon="usd"
            onMapLayerClick={this.handleMapLayerClick}
            visible
            selected
          >
            <CapitalProjectsComponent />
          </JaneLayer>
        </Jane>
        {selectedFeaturesPane}
      </div>
    );
  },
});


module.exports = CapitalProjectsExplorer;
