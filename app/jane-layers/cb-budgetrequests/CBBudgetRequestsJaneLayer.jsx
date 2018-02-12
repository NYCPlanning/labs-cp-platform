import React from 'react';
import PropTypes from 'prop-types';

import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import CBBudgetRequestsSidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';

const CBBudgetRequestsJaneLayer = props => (
  <JaneLayer
    id="cb-budgetrequests"
    name="Community Board Budget Requests"
    icon="book"
    selected={props.selected}
    enabled={props.enabled}
    component={<CBBudgetRequestsSidebarComponent
      selectedPointType={props.selectedPointType}
      selectedPointCoordinates={props.selectedPointCoordinates}
    />}
  >
    <Source
      id="cb-budgetrequests"
      type="cartovector"
      options={{
        carto_domain: appConfig.carto_domain,
        carto_user: appConfig.carto_user,
        sql: [props.pointsSql, props.polygonsSql],
      }}
    />

    <MapLayer
      id="cb-budgetrequests-polygons"
      source="cb-budgetrequests"
      sourceLayer="layer1"
      type="fill"
      onClick={props.handleMapLayerClick}
      paint={{
        'fill-color': {
          property: 'budgetcategory',
          type: 'categorical',
          stops: [
            ['Expense', '#a6cee3'],
            ['Capital', '#b2df8a'],
          ],
        },
        'fill-opacity': 0.7,
        'fill-antialias': true,
        'fill-outline-color': '#012700',
      }}
    />

    <MapLayer
      id="cb-budgetrequests-points"
      source="cb-budgetrequests"
      sourceLayer="layer0"
      type="circle"
      onClick={props.handleMapLayerClick}
      paint={{
        'circle-radius': {
          stops: [
            [10, 2],
            [15, 6],
          ],
        },
        'circle-color': [
          'case',
          // Capital except Top 10
          ['all', ['==', 'Capital', ['string', ['get', 'budgetcategory']]], [
            'any',
            ['!', ['has', 'priority']],
            ['<', 10, ['number', ['get', 'priority']]],
          ]],
          '#b2df8a',

          // Expense except Top 10
          ['all', ['==', 'Expense', ['string', ['get', 'budgetcategory']]], [
            'any',
            ['!', ['has', 'priority']],
            ['<', 10, ['number', ['get', 'priority']]],
          ]],
          '#a6cee3',

          // Top 10 Capital
          ['all', ['==', 'Capital', ['string', ['get', 'budgetcategory']]], ['>=', 10, ['number', ['get', 'priority']]]],
          '#33a02c',
          // Top 10 Expense
          ['all', ['==', 'Expense', ['string', ['get', 'budgetcategory']]], ['>=', 10, ['number', ['get', 'priority']]]],
          '#1f78b4',

          // Default
          '#012700',
        ],
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
        <div className="legendSection">Budget Request</div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: '#33a02c' }} />
          <div className="legendItemText">Capital (Top 10)</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: '#b2df8a' }} />
          <div className="legendItemText">Capital</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: '#1f78b4' }} />
          <div className="legendItemText">Expense (Top 10)</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: '#a6cee3' }} />
          <div className="legendItemText">Expense</div>
        </div>
      </div>
    </Legend>
  </JaneLayer>
);

CBBudgetRequestsJaneLayer.propTypes = {
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,

  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
};

CBBudgetRequestsJaneLayer.defaultProps = {
  selected: false,
  enabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default CBBudgetRequestsJaneLayer;
