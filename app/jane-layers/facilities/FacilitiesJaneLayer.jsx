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
            sql: ['SELECT * FROM facdb_170522'], // this.props.sql
          }}
        />

        {
        // { !!this.props.selectedFeatures.length &&
        //   <Source id="highlighted" type="geojson" data={this.highlightedSourceOptions()} nocache /> }
        //
        // { !!this.props.selectedFeatures.length &&
        //   <MapLayer
        //     id="facilities-points-highlight"
        //     source="highlighted"
        //     type="circle"
        //     paint={{
        //       'circle-color': 'rgba(255, 255, 255, 1)',
        //       'circle-opacity': 0,
        //       'circle-radius': 15,
        //       'circle-stroke-width': 3,
        //       'circle-pitch-scale': 'map',
        //       'circle-stroke-color': 'rgba(217, 107, 39, 1)',
        //       'circle-stroke-opacity': 0.8,
        //     }}
        //   /> }
        }

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
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,
};

FacilitiesJaneLayer.defaultProps = {
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default FacilitiesJaneLayer;
