// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';
import Jane from 'jane-maps';
import JaneLayer from 'jane-maps/dist/JaneLayer';

import appConfig from '../helpers/appConfig';
import supportingLayers from '../janelayers/supportingLayers';
import PipelineComponent from './janelayer/Component';
import PipelineListItem from './janelayer/ListItem';

const PipeLineExplorer = React.createClass({
  componentDidMount() {
    document.title = 'NYC Housing Development Explorer';
  },

  render() {
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
            id="pipeline"
            name="Housing Pipeline"
            icon="building"
            interactivityMapLayers={['pipeline-points']}
            highlightPointLayers={['pipeline-points']}
            visible
            selected
            component={PipelineComponent}
            listItem={PipelineListItem}
          />
        </Jane>
      </div>
    );
  },
});

module.exports = PipeLineExplorer;
