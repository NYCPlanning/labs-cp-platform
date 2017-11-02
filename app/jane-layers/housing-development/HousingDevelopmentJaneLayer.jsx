import React from 'react';
import PropTypes from 'prop-types';

import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import HousingDevelopmentSidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';

class HousingDevelopmentJaneLayer extends React.Component {
  render() {
    const legend = () => {
      if (this.props.symbologyDimension === 'dcp_dev_category') {
        return (
          <Legend>
            <div>
              <div className="legendSection">Housing Development</div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: 'rgba(0, 228, 14, 0.7)' }} />
                <div className="legendItemText">New Building</div>
              </div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: 'rgba(81, 99, 230, 0.77)' }} />
                <div className="legendItemText">Alteration</div>
              </div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: 'rgba(179, 0, 0, 0.77)' }} />
                <div className="legendItemText">Demolition</div>
              </div>
            </div>
          </Legend>
        );
      }

      if (this.props.symbologyDimension === 'dcp_status') {
        return (
          <Legend>
            <div>
              <div className="legendSection">Housing Development</div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: '#edf8e9' }} />
                <div className="legendItemText">Application filed</div>
              </div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: '#bae4b3' }} />
                <div className="legendItemText">Permit issued</div>
              </div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: '#74c476' }} />
                <div className="legendItemText">Partial complete</div>
              </div>
              <div className="legendItem">
                <div className="colorCircle" style={{ backgroundColor: '#238b45' }} />
                <div className="legendItemText">Complete</div>
              </div>
            </div>
          </Legend>
        );
      }

      return null;
    };

    const circleColor = () => {
      if (this.props.symbologyDimension === 'dcp_dev_category') {
        return {
          property: 'dcp_dev_category',
          type: 'categorical',
          stops: [
            ['New Building', 'rgba(0, 228, 14, 0.7)'],
            ['Alteration', 'rgba(81, 99, 230, 0.77)'],
            ['Demolition', 'rgba(179, 0, 0, 0.77)'],
          ],
        };
      }

      if (this.props.symbologyDimension === 'dcp_status') {
        return {
          property: 'dcp_status',
          type: 'categorical',
          stops: [
            ['Application filed', '#edf8e9'],
            ['Permit issued', '#bae4b3'],
            ['Partial complete', '#74c476'],
            ['Complete', '#238b45'],
          ],
        };
      }

      return '#000';
    };

    const pointsLayerPaint = {
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
      'circle-color': circleColor(),
      'circle-stroke-color': '#000',
      'circle-stroke-width': {
        stops: [
          [11, 0],
          [12, 1],
        ],
      },
      'circle-stroke-opacity': 0.5,
      'circle-opacity': 0.5,
    };

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
          id="housing-development"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            carto_user: appConfig.carto_user,
            sql: [this.props.sql],
          }}
        />

        <MapLayer
          id="housing-development-points"
          source="housing-development"
          sourceLayer="layer0"
          type="circle"
          onClick={this.props.handleMapLayerClick}
          paint={pointsLayerPaint}
        />

        { legend() }
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

  symbologyDimension: PropTypes.string.isRequired,
};

HousingDevelopmentJaneLayer.defaultProps = {
  defaultSelected: false,
  defaultDisabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};


export default HousingDevelopmentJaneLayer;
