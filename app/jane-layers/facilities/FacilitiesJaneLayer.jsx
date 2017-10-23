import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import FacilitiesSidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';
import colors from '../../facilities/colors';

class FacilitiesJaneLayer extends React.Component {
  render() {
    return (
      <JaneLayer
        id="facilities"
        name="Facilities and Program Sites"
        icon="university"
        defaultSelected={this.props.defaultSelected}
        defaultDisabled={this.props.defaultDisabled}
        component={<FacilitiesSidebarComponent
          selectedPointType={this.props.selectedPointType}
          selectedPointCoordinates={this.props.selectedPointCoordinates}
        />}
      >
        <Source
          id="facilities"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            carto_user: appConfig.carto_user,
            sql: [this.props.sql],
          }}
        />

        <MapLayer
          id="facilities-points-outline"
          source="facilities"
          sourceLayer="layer0"
          type="circle"
          paint={{
            'circle-radius': { stops: [[10, 2], [15, 6]] },
            'circle-color': colors.getColorObject(),
            'circle-opacity': 0.7,
          }}
        />

        <MapLayer
          id="facilities-points"
          source="facilities"
          sourceLayer="layer0"
          type="circle"
          paint={{
            'circle-radius': { stops: [[10, 3], [15, 7]] },
            'circle-color': '#012700',
            'circle-opacity': 0.7,
          }}
          onClick={this.props.handleMapLayerClick}
        />

        <Legend>
          <div className="legendSection">
            <p>Facilities Legend</p>
          </div>
        </Legend>
      </JaneLayer>
    );
  }
}

FacilitiesJaneLayer.propTypes = {
  defaultSelected: PropTypes.bool,
  defaultDisabled: PropTypes.bool,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,
  sql: PropTypes.string.isRequired,
};

FacilitiesJaneLayer.defaultProps = {
  defaultSelected: false,
  defaultDisabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default FacilitiesJaneLayer;
