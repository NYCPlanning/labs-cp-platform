import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';

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
        <Tab label="Filters">
          Filters
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <Download
                sql="SELECT * FROM cb_budgetrequests_20171108"
                filePrefix="cb-budgetrequests"
                onDownload={this.handleDownload}
              />
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <div>
                <h4>Community Board Budget Requests</h4>
                <p>
                  ....content
                </p>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default SidebarComponent;
