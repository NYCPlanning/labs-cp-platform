import React from 'react';
import PropTypes from 'prop-types';

import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import CBBudgetRequestsSidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';

class CBBudgetRequestsJaneLayer extends React.Component {
  render() {
    return (
      <JaneLayer
        id="cb-budgetrequests"
        name="Community Board Budget Requests"
        icon="book"
        defaultSelected={this.props.defaultSelected}
        defaultDisabled={this.props.defaultDisabled}
        component={<CBBudgetRequestsSidebarComponent
          selectedPointType={this.props.selectedPointType}
          selectedPointCoordinates={this.props.selectedPointCoordinates}
        />}
      >
        <Source
          id="cb-budgetrequests"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            carto_user: appConfig.carto_user,
            sql: [this.props.pointsSql, this.props.polygonsSql],
          }}
        />

        <MapLayer
          id="cb-budgetrequests-polygons"
          source="cb-budgetrequests"
          sourceLayer="layer0"
          type="fill"
          onClick={this.props.handleMapLayerClick}
          paint={{
            'fill-color': {
              property: 'totalspend',
              stops: [
                [0, '#8B8C98'],
                [1, '#d98127'],
              ],
            },
            'fill-opacity': 0.75,
            'fill-antialias': true,
          }}
        />

        <MapLayer
          id="cb-budgetrequests-points"
          source="cb-budgetrequests"
          sourceLayer="layer0"
          type="circle"
          onClick={this.props.handleMapLayerClick}
          paint={{
            'circle-radius': {
              stops: [
                [10, 2],
                [15, 6],
              ],
            },
            'circle-color': '#5C99FF',
            'circle-opacity': 0.7,
          }}
        />

        <Legend id="cb-budgetrequests-legend">
          <div>
            <div className="legendSection">CB Budget Requests</div>
            <div className="legendItem">
              <div className="colorCircle" style={{ backgroundColor: '#198409' }} />
              <div className="legendItemText">Request</div>
            </div>
          </div>
        </Legend>
      </JaneLayer>
    );
  }
}

CBBudgetRequestsJaneLayer.propTypes = {
  defaultSelected: PropTypes.bool,
  defaultDisabled: PropTypes.bool,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,

  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
};

CBBudgetRequestsJaneLayer.defaultProps = {
  defaultSelected: false,
  defaultDisabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default CBBudgetRequestsJaneLayer;
