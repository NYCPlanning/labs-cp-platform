import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import HousingDevelopmentSidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';

class HousingDevelopmentJaneLayer extends React.Component {
  render() {
    return (
      <JaneLayer
        id="housing-development"
        name="Housing Development"
        icon="cubes"
        defaultSelected={this.props.defaultSelected}
        defaultDisabled={this.props.defaultDisabled}
        component={<HousingDevelopmentSidebarComponent
          selectedPointType={this.props.selectedPointType}
          selectedPointCoordinates={this.props.selectedPointCoordinates}
        />}
      >
        <Source
          id="pipeline-points"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            carto_user: appConfig.carto_user,
            sql: [this.props.sql],
          }}
        />

        <MapLayer
          id="pipeline-points"
          source="pipeline-points"
          sourceLayer="layer0"
          type="circle"
          onClick={this.props.handleMapLayerClick}
          paint={{
            'circle-radius': {
              property: 'u_net',
              stops: [
                [{ zoom: 10, value: -12 }, 1],
                [{ zoom: 10, value: 1669 }, 2],
                [{ zoom: 10, value: 1669 }, 4],
                [{ zoom: 14, value: -12 }, 5],
                [{ zoom: 14, value: 100 }, 10],
                [{ zoom: 14, value: 1669 }, 20],
              ],
            },
            'circle-color': '#FFF',
            'circle-stroke-color': '#000',
            'circle-stroke-width': {
              stops: [
                [11, 0],
                [12, 1],
              ],
            },
            'circle-stroke-opacity': 0.5,
            'circle-opacity': 0.5,
          }}
        />

        <Legend>
          <div>
            <div className="legendSection">Housing Development</div>
          </div>
        </Legend>
      </JaneLayer>
    );
  }
}

HousingDevelopmentJaneLayer.propTypes = {
  defaultSelected: PropTypes.bool,
  defaultDisabled: PropTypes.bool,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,
  sql: PropTypes.string.isRequired,
};

HousingDevelopmentJaneLayer.defaultProps = {
  defaultSelected: false,
  defaultDisabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default HousingDevelopmentJaneLayer;
