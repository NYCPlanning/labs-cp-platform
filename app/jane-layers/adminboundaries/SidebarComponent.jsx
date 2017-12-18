import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Tabs, Tab } from 'material-ui/Tabs';

const tabTemplateStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
};

const SidebarComponent = props => (
  <div>
    <Tabs
      className="sidebar-tabs"
      tabTemplateStyle={tabTemplateStyle}
    >
      <Tab label="Data">
        <div className="sidebar-tab-content">
          <div className="padded scroll-container">

            <h4>Statistical Areas</h4>
            <RadioButtonGroup
              name="adminboundary"
              onChange={(v) => { props.onRadioChange(v.target.value); }}
              valueSelected={props.selected}
            >
              <RadioButton
                value="nta"
                label="Neighborhood Tabulation Areas"
              />
              <RadioButton
                value="censustracts"
                label="Census Tracts"
              />
              <RadioButton
                value="puma"
                label="Public Use Microdata Areas (PUMA)"
              />
              <RadioButton
                value="taz"
                label="Traffic Analysis Zones"
              />
            </RadioButtonGroup>

            <h4>Municipal Boundaries</h4>
            <RadioButtonGroup
              name="adminboundary"
              onChange={(v) => { props.onRadioChange(v.target.value); }}
              valueSelected={props.selected}
            >
              <RadioButton
                value="boroughboundaries"
                label="Borough Boundaries"
              />

              <RadioButton
                value="cd"
                label="Community Districts"
              />

              <RadioButton
                value="citycouncildistricts"
                label="City Council Districts"
              />

              <RadioButton
                value="municipalcourtdistricts"
                label="Municipal Court Districts"
              />

              <RadioButton
                value="stateassemblydistricts"
                label="State Assembly Districts"
              />

              <RadioButton
                value="statesenatedistricts"
                label="State Senate Districts"
              />

              <RadioButton
                value="uscongressionaldistricts"
                label="US Congressional Districts"
              />
            </RadioButtonGroup>

            <h4>Service Districts</h4>
            <RadioButtonGroup
              name="adminboundary"
              onChange={(v) => { props.onRadioChange(v.target.value); }}
              valueSelected={props.selected}
            >
              <RadioButton
                value="firedivisions"
                label="Fire Divisions"
              />

              <RadioButton
                value="firebattalions"
                label="Fire Battalions"
              />

              <RadioButton
                value="firecompanies"
                label="Fire Companies"
              />

              <RadioButton
                value="policeprecincts"
                label="Police Precincts"
              />
            </RadioButtonGroup>

            <h4>Schools</h4>
            <RadioButtonGroup
              name="adminboundary"
              onChange={(v) => { props.onRadioChange(v.target.value); }}
              valueSelected={props.selected}
            >
              <RadioButton
                value="schooldistricts"
                label="School Districts"
              />

              <RadioButton
                value="schoolzones-es"
                label="School Zones (Elementary)"
              />

              <RadioButton
                value="schoolzones-ms"
                label="School Zones (Middle School)"
              />

              <RadioButton
                value="schoolzones-hs"
                label="School Zones (High School)"
              />
            </RadioButtonGroup>
          </div>
        </div>
      </Tab>
      <Tab label="About">
        <div className="sidebar-tab-content">
          <div className="padded">
            <h4>Administrative Boundaries</h4>
            <p>This data layer contains several Administrative Boundary types relevant to New York City.  Most are available from The Department of City Planning&apos;s <a href="http://www1.nyc.gov/site/planning/data-maps/open-data.page">Bytes of the Big Apple Open Data Site</a>.</p>
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>
);

SidebarComponent.propTypes = {
  onRadioChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default SidebarComponent;
