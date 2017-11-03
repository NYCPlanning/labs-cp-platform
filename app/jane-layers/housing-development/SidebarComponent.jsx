import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';

import LayerSelector from './filter-components/LayerSelector';

import Download from '../../common/Download';
import ga from '../../helpers/ga';

class SidebarComponent extends React.Component {
  handleDownload = (label) => {
    ga.event({
      category: 'pipeline-explorer',
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
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <Download
                sql={this.props.sql}
                filePrefix="developments"
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
  }
}

SidebarComponent.propTypes = {
  sql: PropTypes.string.isRequired,
  selectedPointType: PropTypes.string.isRequired,
  selectedPointCoordinates: PropTypes.array.isRequired,
};

const mapStateToProps = ({ housingDevelopment }) => ({
  sql: housingDevelopment.sql,
});

export default connect(mapStateToProps)(SidebarComponent);
