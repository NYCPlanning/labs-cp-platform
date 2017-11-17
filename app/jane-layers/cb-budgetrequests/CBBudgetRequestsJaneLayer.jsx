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
          sourceLayer="layer1"
          type="fill"
          onClick={this.props.handleMapLayerClick}
          paint={{
            'fill-color': {
              property: 'budgetcategory',
              type: 'categorical',
              stops: [
                ['Expense', '#a6cee3'],
                ['Capital', '#b2df8a'],
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
            'circle-color': {
              property: 'budgetcategory',
              type: 'categorical',
              stops: [
                ['Expense', '#a6cee3'],
                ['Capital', '#b2df8a'],
              ],
            },
            'circle-opacity': 0.7,
          }}
        />

        <MapLayer
          id="cb-budgetrequests-outline"
          source="cb-budgetrequests"
          sourceLayer="layer0"
          type="circle"
          paint={{
            'circle-radius': {
              stops: [
                [10, 3],
                [15, 7],
              ],
            },
            'circle-color': '#012700',
            'circle-opacity': 0.7,
          }}
        />

        <Legend id="cb-budgetrequests-legend">
          <div>
            <div className="legendSection">CB Budget Requests</div>
            <div className="legendItem">
              <div className="colorCircle" style={{ backgroundColor: '#b2df8a' }} />
              <div className="legendItemText">Capital Request</div>
            </div>
            <div className="legendItem">
              <div className="colorCircle" style={{ backgroundColor: '#a6cee3' }} />
              <div className="legendItemText">Expense Request</div>
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
