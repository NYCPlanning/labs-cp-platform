// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';

import { Jane, JaneLayer } from 'jane-maps';
import CapitalProjectsComponent from './janelayer/Component';
import CapitalProjectsStore from '../stores/CapitalProjectsStore';
import CapitalProjectsActions from '../actions/CapitalProjectsActions';
import supportingLayers from '../janelayers/supportingLayers';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import CPListItem from './CPListItem';
import SCAListItem from './SCAListItem';
import SCAPlanComponent from './janelayer/SCAPlanComponent';

import { mapInit, searchConfig } from '../helpers/appConfig';

import './styles.scss';

class CapitalProjectsExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFeatures: CapitalProjectsStore.selectedFeatures,
    };
  }

  componentWillMount() {
    CapitalProjectsActions.resetFilter();
  }

  componentDidMount() {
    CapitalProjectsStore.on('capitalProjectsUpdated', () => {
      const selectedFeatures = CapitalProjectsStore.selectedFeatures;
      this.setState({ selectedFeatures });
    });
  }

  clearSelectedFeatures = () => {
    CapitalProjectsActions.setSelectedFeatures([]);
  }

  handleMapLayerClick = (features) => {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    CapitalProjectsActions.setSelectedFeatures([]);
    setTimeout(() => {
      CapitalProjectsActions.setSelectedFeatures(features);
    }, 450);
  }

  render() {
    const { selectedFeatures } = this.state;

    const selectedFeaturesSource = selectedFeatures.length > 0 ? selectedFeatures[0].layer.source : null;

    const listItems = selectedFeatures.map((feature) => {
      if (selectedFeaturesSource === 'capital-projects') {
        return <CPListItem feature={feature} key={feature.id} />;
      }

      return <SCAListItem feature={feature} key={feature.id} />;
    });

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
          initialSelectedJaneLayer={'capital-projects'}
          initialDisabledJaneLayers={[
            'transportation',
            'adminboundaries',
            'zoning',
            'aerials',
          ]}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
        >
          {supportingLayers.aerials}
          {supportingLayers.adminboundaries}
          {supportingLayers.zoning}
          {supportingLayers.transportation}
          <JaneLayer
            id="scaplan"
            name="SCA Capital Plan"
            icon="graduation-cap"
            onMapLayerClick={this.handleMapLayerClick}
            component={<SCAPlanComponent />}
          />
          <JaneLayer
            id="capital-projects"
            name="Capital Projects"
            icon="usd"
            onMapLayerClick={this.handleMapLayerClick}
            component={<CapitalProjectsComponent />}
          />
        </Jane>
        {selectedFeaturesPane}
      </div>
    );
  }
}

module.exports = CapitalProjectsExplorer;
