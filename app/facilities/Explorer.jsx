import React, { PropTypes } from 'react';

import Jane from '../../jane-maps/src';
import JaneLayer from '../../jane-maps/src/JaneLayer';

import FacilitiesComponent from './janelayer/Component';
import FacilitiesListItem from './janelayer/ListItem';

import appConfig from '../helpers/appConfig';
import carto from '../helpers/carto';

import supportingLayers from '../janelayers/supportingLayers';
import layersGenerator from './layersGenerator';

const FacilitiesExplorer = React.createClass({
  propTypes: {
    location: PropTypes.object,
  },

  getDefaultProps() {
    return {
      location: null,
    };
  },

  componentWillMount() {
    this.bounds = null;
  },

  componentDidMount() {
    const self = this;

    // update the map bounds if adminboundaries location state was passed in
    if (this.props.location.state && this.props.location.state.adminboundaries) {
      const value = this.props.location.state.adminboundaries.value;

      carto.getNYCBounds('nta', value)
        .then((bounds) => {
          self.bounds = bounds;
          self.forceUpdate();
        });
    }
  },

  render() {
    const mapInit = appConfig.mapInit;
    const searchConfig = appConfig.searchConfig;

    const locationState = this.props.location.state;

    const layers = locationState && locationState.layers ?
      this.props.location.state.layers :
      layersGenerator.allChecked();

    const filterDimensions = locationState && locationState.filterDimensions ?
      locationState.filterDimensions :
      null;

    return (
      <div className="full-screen">
        <Jane
          mapInit={mapInit}
          layerContentVisible
          search
          searchConfig={searchConfig}
          fitBounds={this.bounds}
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
            id="facilities"
            name="Facilities and Program Sites"
            icon="university"
            interactivityMapLayers={['facilities-points']}
            highlightPointLayers={['facilities-points']}
            visible
            selected
            component={FacilitiesComponent}
            initialState={{ layers, filterDimensions }}
            listItem={FacilitiesListItem}
          />
        </Jane>
      </div>
    );
  },
});

module.exports = FacilitiesExplorer;
