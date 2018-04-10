import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';

import LayerSelector from './filter-components/LayerSelector';

const SidebarComponent = props => (
  <Tabs
    className="sidebar-tabs"
    tabTemplateStyle={{
      position: 'absolute',
      top: 0,
      bottom: 0,
    }}
  >
    <Tab label="Filters">
      <LayerSelector
        locationState={props.locationState}
        selectedPointType={props.selectedPointType}
        selectedPointCoordinates={props.selectedPointCoordinates}
        handleRadiusFilter={props.handleRadiusFilter}
      />
    </Tab>
    <Tab label="About">
      <div className="sidebar-tab-content">
        <div className="scroll-container padded">
          <div>
            <h4>Product Overview</h4>
            <p>
              The City Planning Facilities Database (FacDB) aggregates information about facilities that impact NYC neighborhood quality and are owned, operated, funded, licensed, or certified by a City, State, or Federal agency. They span seven domains:
            </p>

            <ul type={'disc'}>
              <li>Health and Human Services</li>
              <li>Education, Child Welfare, and Youth</li>
              <li>Parks, Gardens, and Historical Sites</li>
              <li>Libraries and Cultural Programs</li>
              <li>Public Safety, Emergency Services, and Administration of Justice</li>
              <li>Core Infrastructure and Transportation</li>
              <li>Administration of Government</li>
            </ul>

            <h4>Limitations and Disclaimers</h4>
            <p>
              FacDB aggregates data from multiple public sources, and DCP cannot verify the accuracy of all records. It does not claim to capture every facility within the specified domains. The are also known to be cases of duplicate records and administrative locations instead of service locations.
            </p>
            <p>
              Please consult <a href="http://docs.capitalplanning.nyc/facdb/#iii-limitations-and-disclaimers" target="_blank" rel="noreferrer noopener">NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
            </p>

            <h4>Feedback</h4>
            <p>
              We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLScP9JxDvfCmMUxzT9l0_MRYBtTgeAep7pHYO5QUtrRCXGxVTw/viewform" target="_blank" rel="noopener noreferrer">Please share your feedback and suggestions</a> with Capital Planning.
            </p>
          </div>
        </div>
      </div>
    </Tab>
  </Tabs>
);

SidebarComponent.propTypes = {
  locationState: PropTypes.object,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array.isRequired,
  handleRadiusFilter: PropTypes.func.isRequired,
};

SidebarComponent.defaultProps = {
  locationState: null,
  selectedPointType: null,
};

export default SidebarComponent;
