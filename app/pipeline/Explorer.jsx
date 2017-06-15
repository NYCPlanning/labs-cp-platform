// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react';
import PropTypes from 'prop-types';
import { Jane, JaneLayer } from 'jane-maps';
import { connect } from 'react-redux';

import appConfig from '../helpers/appConfig';

import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer, ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../janelayers';

import PipelineComponent from './janelayer/Component';
import ListItem from './janelayer/ListItem';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import * as pipelineActions from '../actions/pipeline';

class PipeLineExplorer extends React.Component {
  handleMapLayerClick = (features) => {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    this.props.setSelectedFeatures([]);
    setTimeout(() => this.props.setSelectedFeatures(features), 450);
  };

  clearSelectedFeatures = () => {
    this.props.setSelectedFeatures([]);
  };

  render() {
    const mapboxGLOptions = appConfig.mapboxGLOptions;
    const searchConfig = appConfig.searchConfig;

    const listItems = this.props.selectedFeatures.map(feature => (
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
          mapboxGLOptions={mapboxGLOptions}
          search
          searchConfig={searchConfig}
          onDragEnd={this.clearSelectedFeatures}
          onZoomEnd={this.clearSelectedFeatures}
        >
          <AerialsJaneLayer defaultDisabled />
          <TransportationJaneLayer defaultDisabled />
          <FloodHazardsJaneLayer defaultDisabled />
          <AdminBoundariesJaneLayer defaultDisabled />
          <ZoningJaneLayer defaultDisabled />

          <JaneLayer
            id="pipeline"
            name="Housing Pipeline"
            icon="building"
            defaultSelected={true}
            onMapLayerClick={this.handleMapLayerClick}
            component={<PipelineComponent />}
          />
        </Jane>
        { selectedFeaturesPane }
      </div>
    );
  }
}

PipeLineExplorer.propTypes = {
  selectedFeatures: PropTypes.array,
  setSelectedFeatures: PropTypes.func.isRequired,
};

const mapStateToProps = ({ pipeline }) => ({
  selectedFeatures: pipeline.selectedFeatures,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: pipelineActions.setSelectedFeatures,
})(PipeLineExplorer);
