import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';

import Download from '../../common/DownloadPolyPoint';
import ga from '../../helpers/ga';
import BudgetRequestFilter from './filter/BudgetRequestFilter';

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
          <BudgetRequestFilter />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <Download
                pointsSql={this.props.pointsSql}
                polygonsSql={this.props.polygonsSql}
                pointsPrefix="budget-request-points"
                polygonsPrefix="budget-request-polygons"
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

SidebarComponent.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
};

const mapStateToProps = ({ cbBudgetRequests }) => ({
  pointsSql: cbBudgetRequests.pointsSql,
  polygonsSql: cbBudgetRequests.polygonsSql,
});

export default connect(mapStateToProps)(SidebarComponent);
