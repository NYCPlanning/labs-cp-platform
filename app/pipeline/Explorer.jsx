// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';
import { Jane, JaneLayer } from 'jane-maps';

import appConfig from '../helpers/appConfig';
import supportingLayers from '../janelayers/supportingLayers';
import PipelineComponent from './janelayer/Component';
import ListItem from './janelayer/ListItem';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import PipelineActions from '../actions/PipelineActions';
import PipelineStore from '../stores/PipelineStore';

const PipeLineExplorer = React.createClass({
  getInitialState() {
    return {
      selectedFeatures: [],
    };
  },

  componentDidMount() {
    document.title = 'NYC Housing Development Explorer';

    PipelineStore.on('selectedFeaturesUpdated', () => {
      const selectedFeatures = PipelineStore.selectedFeatures;
      this.setState({ selectedFeatures });
    });
  },

  handleMapLayerClick(features) {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    PipelineActions.setSelectedFeatures([]);
    setTimeout(() => {
      PipelineActions.setSelectedFeatures(features);
    }, 450);
  },

  clearSelectedFeatures() {
    PipelineActions.setSelectedFeatures([]);
  },

  render() {
    const mapInit = appConfig.mapInit;
    const searchConfig = appConfig.searchConfig;

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
      <div className="full-screen">
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
            id="pipeline"
            name="Housing Pipeline"
            icon="building"
            onMapLayerClick={this.handleMapLayerClick}
            selected
            visible
          >
            <PipelineComponent />
          </JaneLayer>
        </Jane>
        { selectedFeaturesPane }
      </div>
    );
  },
});

module.exports = PipeLineExplorer;
