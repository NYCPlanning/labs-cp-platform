import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Legend } from '../../jane-maps';

import FacilitiesSidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';
import colors from '../../facilities/colors';

const FacilitiesJaneLayer = props => (
  <JaneLayer
    id="facilities-cp"
    name="Facilities and Program Sites"
    icon="university"
    selected={props.selected}
    enabled={props.enabled}
    component={<FacilitiesSidebarComponent
      selectedPointType={props.selectedPointType}
      selectedPointCoordinates={props.selectedPointCoordinates}
    />}
  >
    <Source
      id="facilities-cp"
      type="cartovector"
      options={{
        carto_domain: appConfig.carto_domain,
        sql: [props.sql],
      }}
    />

    <MapLayer
      id="facilities-cp-points-outline"
      source="facilities-cp"
      sourceLayer="layer0"
      type="circle"
      paint={{
        'circle-radius': { stops: [[10, 2], [15, 6]] },
        'circle-color': colors.getColorObject(),
        'circle-opacity': 0.7,
      }}
    />

    <MapLayer
      id="facilities-cp-points"
      source="facilities-cp"
      sourceLayer="layer0"
      type="circle"
      paint={{
        'circle-radius': { stops: [[10, 3], [15, 7]] },
        'circle-color': '#012700',
        'circle-opacity': 0.7,
      }}
      onClick={props.handleMapLayerClick}
    />

    <Legend id="facilities-cp-legend">
      <div>
        <div className="legendSection">Facilities and Program Sites</div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(247, 202, 0)' }} />
          <div className="legendItemText">Education, Child Welfare, and Youth</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(76, 175, 80)' }} />
          <div className="legendItemText">Parks, Gardens, and Historical Sites</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(115, 229, 244)' }} />
          <div className="legendItemText">Libraries and Cultural Programs</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(41, 121, 255)' }} />
          <div className="legendItemText">Public Safety, Emergency Serivces, and Administrative Justice</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(186, 104, 200)' }} />
          <div className="legendItemText">Health and Human Services</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(141, 142, 170)' }} />
          <div className="legendItemText">Core Infrastructure and Transportation</div>
        </div>
        <div className="legendItem">
          <div className="colorCircle" style={{ backgroundColor: 'rgb(203, 203, 214)' }} />
          <div className="legendItemText">Admintration of Government</div>
        </div>
      </div>
    </Legend>
  </JaneLayer>
);

FacilitiesJaneLayer.propTypes = {
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleMapLayerClick: PropTypes.func.isRequired,
  sql: PropTypes.string.isRequired,
};

FacilitiesJaneLayer.defaultProps = {
  selected: false,
  enabled: false,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

export default FacilitiesJaneLayer;
