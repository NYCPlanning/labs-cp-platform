import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Download from '../../common/Download';
import ga from '../../helpers/ga';
import LayerSelector from './filter-components/LayerSelector';

class SidebarComponent extends React.Component {
  handleDownload = (label) => {
    ga.event({
      category: 'faciities-explorer',
      action: 'download',
      label,
    });
  };

  render() {
    return (
      <Tabs
        className="sidebar-tabs"
        tabTemplateStyle={{
          position: 'absolute',
          top: 0,
          bottom: 0,
        }}
      >
        <Tab label="Data">
          <LayerSelector
            selectedPointType={this.props.selectedPointType}
            selectedPointCoordinates={this.props.selectedPointCoordinates}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content ">
            <div className="scroll-container padded">
              <Download
                sql={this.props.sql}
                filePrefix="facilities"
                onDownload={this.handleDownload}
              />
            </div>
          </div>
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
  }
}

SidebarComponent.propTypes = {
  sql: PropTypes.string.isRequired,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array.isRequired,
};

SidebarComponent.defaultProps = {
  selectedPointType: null,
};

const mapStateToProps = ({ facilitiesCP }) => ({
  sql: facilitiesCP.sql,
});

export default connect(mapStateToProps)(SidebarComponent);
