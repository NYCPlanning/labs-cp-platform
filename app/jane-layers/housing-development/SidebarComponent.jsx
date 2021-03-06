import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

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
              The Development Pipeline aims to help New York City planners understand changes resulting from building activity,
              across both time and space. It is currently comprised of data from the Department of Buildings (DOB) and the Department
              of Housing Preservation and Development (HPD), and includes the most comprehensive picture of new residential development
              taking place across the five boroughs.
            </p>

            <h4>Limitations & Disclaimers</h4>
            <p>
              There are a number of known limitations to the database and improvements will be made on a continual basis,
              based on internal reviews and user feedback.
            </p>
            <p>
              Please consult <a href="http://docs.capitalplanning.nyc/pipeline/" target="_blank" rel="noreferrer noopener">
              NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
            </p>

            <h4>Feedback</h4>
            <p>
              We are constantly looking for ways to improve this product.
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">
                Please share your feedback and suggestions</a> with Capital Planning.
            </p>
          </div>
        </div>
      </div>
    </Tab>
  </Tabs>
);

SidebarComponent.propTypes = {
  selectedPointType: PropTypes.string.isRequired,
  selectedPointCoordinates: PropTypes.array.isRequired,
  handleRadiusFilter: PropTypes.func.isRequired,
};

export default SidebarComponent;
