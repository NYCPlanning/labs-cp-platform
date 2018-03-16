import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Popup } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../config/appConfig';
import db_tables from '../../config/db_tables';

class PlanningAreas extends React.Component {
  constructor() {
    super();

    this.state = {
      checkboxes: {
        ih: true,
        mih: true,
        studyareas: false,
      },
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(name) {
    const checkboxes = {
      ...this.state.checkboxes,
      [name]: !this.state.checkboxes[name],
    };

    this.setState({ checkboxes });
  }

  render() {
    return (
      <JaneLayer
        id="planning_areas"
        name="Planning Areas"
        icon="map"
        selected={this.props.selected}
        enabled={this.props.enabled}
        component={<SidebarComponent checkboxes={this.state.checkboxes} onCheckboxChange={this.onCheckboxChange} />}
      >
        <Source
          id="studyareas"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            sql: [`SELECT * FROM ${db_tables.support.dcp_studyareas}`],
          }}
        />
        <MapLayer
          id="studyareas"
          source="studyareas"
          sourceLayer="layer0"
          type="fill"
          layout={{ visibility: this.state.checkboxes.studyareas ? 'visible' : 'none' }}
          paint={{
            'fill-color': '#43a2ca',
            'fill-opacity': 0.6,
            'fill-antialias': true,
            'fill-outline-color': 'rgba(0, 0, 0, 1)',
          }}
        />
        <Popup
          mapLayerId="studyareas"
          template={`
            <h1>{{p.maplabel}}</h1>
            <div>Status: {{p.status}}</div>
          `}
        />

        <Source
          id="ih"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            sql: [`SELECT * FROM ${db_tables.support.ih}`],
          }}
        />
        <MapLayer
          id="ih"
          source="ih"
          sourceLayer="layer0"
          type="fill"
          layout={{ visibility: this.state.checkboxes.ih ? 'visible' : 'none' }}
          paint={{
            'fill-color': '#E57300',
            'fill-opacity': 0.6,
            'fill-antialias': true,
            'fill-outline-color': 'rgba(0, 0, 0, 1)',
          }}
        />
        <Popup
          mapLayerId="ih"
          template={`
            <h1>Inclusionary Housing</h1>
            <div>{{p.projectnam}}</div>
            <div>Status: {{p.status}}</div>
          `}
        />

        <Source
          id="mih"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            sql: [`SELECT * FROM ${db_tables.support.mih}`],
          }}
        />
        <MapLayer
          id="mih"
          source="mih"
          sourceLayer="layer0"
          type="fill"
          layout={{ visibility: this.state.checkboxes.mih ? 'visible' : 'none' }}
          paint={{
            'fill-color': '#CC3D5D',
            'fill-opacity': 0.6,
            'fill-antialias': true,
            'fill-outline-color': 'rgba(0, 0, 0, 1)',
          }}
        />
        <Popup
          mapLayerId="mih"
          template={`
            <h1>Mandatory Inclusionary Housing</h1>
            <div>{{p.projectnam}}</div>
            <div>Status: {{p.status}}</div>
          `}
        />
      </JaneLayer>
    );
  }
}

PlanningAreas.propTypes = {
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
};

PlanningAreas.defaultProps = {
  selected: false,
  enabled: false,
};

export default PlanningAreas;
