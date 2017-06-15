// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Jane, JaneLayer } from 'jane-maps';
import CapitalProjectsComponent from './janelayer/Component';
import * as capitalProjectsActions from '../actions/capitalProjects';
import {
  AerialsJaneLayer,
  TransportationJaneLayer,
  FloodHazardsJaneLayer, ZoningJaneLayer,
  AdminBoundariesJaneLayer,
} from '../janelayers';
import SelectedFeaturesPane from '../common/SelectedFeaturesPane';
import CPListItem from './CPListItem';
import SCAListItem from './SCAListItem';
import SCAPlanComponent from './janelayer/SCAPlanComponent';

import appConfig from '../helpers/appConfig';

import './styles.scss';

class CapitalProjectsExplorer extends React.Component {
  clearSelectedFeatures = () => {
    this.props.setSelectedFeatures([]);
  };

  handleMapLayerClick = (features) => {
    // set selectedFeatures to [] will cause the right drawer to animate away,
    // then setting the new data will bring it back
    // TODO move this to the store, or figure out how to implement it with ReactCSSTransitionGroup
    this.props.setSelectedFeatures([]);
    setTimeout(() => this.props.setSelectedFeatures(features), 450);
  };

  render() {
    const { mapboxGLOptions, searchConfig } = appConfig;
    const { selectedFeatures } = this.props;

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

CapitalProjectsExplorer.propTypes = {
  setSelectedFeatures: PropTypes.func.isRequired,
  selectedFeatures: PropTypes.array.isRequired
};

const mapStateToProps = ({ capitalProjects }) => ({
  selectedFeatures: capitalProjects.selectedFeatures,
});

export default connect(mapStateToProps, {
  setSelectedFeatures: capitalProjectsActions.setSelectedFeatures
})(CapitalProjectsExplorer);
