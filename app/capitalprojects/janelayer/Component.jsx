import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';

import Filter from '../Filter';
import Download from '../Download';
import content from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';
import * as capitalProjectsActions from '../../actions/capitalProjects';

class CapitalProjects extends React.Component {
  componentDidMount() {
    this.props.fetchTotalPointsCount();
    this.props.fetchTotalPolygonsCount();
    this.props.fetchSelectedCount(this.props.filterDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !_.isEqual(this.props.sql, nextProps.sql) ||
      !_.isEqual(this.props.polygonsSql, nextProps.polygonsSql) ||
      !_.isEqual(this.props.pointsSql, nextProps.pointsSql)
    ) {
      this.props.fetchSelectedCount(nextProps.filterDimensions);
    }
  }

  componentDidUpdate() {
    this.updateMapConfig();
  }

  handleDownload = (label) => {
    ga.event({
      category: 'capitalprojects-explorer',
      action: 'download',
      label,
    });
  }

  updateMapConfig = () => {
    // pass the new config up to Jane
    const { mapConfig } = this.props;
    mapConfig.legend = (
      <div className="legendSection">
        <div className="legendItem">
          <div className="colorBox" style={{ backgroundColor: '#8B8C98' }} />
          <div className="legendItemText">Planned Projects</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{ backgroundColor: '#d98127' }} />
          <div className="legendItemText">Ongoing Projects</div>
        </div>
      </div>
    );
    this.props.onUpdate(mapConfig);
  }

  render() {
    const { pointsSql, polygonsSql, totalCount, selectedCount, filterDimensions } = this.props;

    // necessary for scrolling in tab Content
    const tabTemplateStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
    };

    return (
      <Tabs
        className="sidebar-tabs"
        tabTemplateStyle={tabTemplateStyle}
      >
        <Tab label="Data">
          <Filter
            pointsSql={pointsSql}
            polygonsSql={polygonsSql}
            totalCount={totalCount}
            selectedCount={selectedCount}
            filterDimensions={filterDimensions}
          />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <Download
                pointsSql={this.props.pointsSql}
                polygonsSql={this.props.polygonsSql}
                pointsPrefix="projects-points"
                polygonsPrefix="projects-polygons"
                onDownload={this.handleDownload}
              />
              <SignupPrompt />
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              {content.about}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

CapitalProjects.defaultProps = {
  onUpdate: () => {},
};

CapitalProjects.propTypes = {
  onUpdate: PropTypes.func,
  fetchTotalPointsCount: PropTypes.func.isRequired,
  fetchTotalPolygonsCount: PropTypes.func.isRequired,
  fetchSelectedCount: PropTypes.func.isRequired,
};

const mapStateToProps = ({ capitalProjects }) => ({
  mapConfig: capitalProjects.mapConfig,
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  totalCount: capitalProjects.pointsTotalCount + capitalProjects.polygonsTotalCount,
  selectedCount: capitalProjects.selectedCount,
  filterDimensions: capitalProjects.filterDimensions,
});

export default connect(mapStateToProps, {
  fetchTotalPointsCount: capitalProjectsActions.fetchTotalPointsCount,
  fetchTotalPolygonsCount: capitalProjectsActions.fetchTotalPolygonsCount,
  fetchSelectedCount: capitalProjectsActions.fetchSelectedCount
})(CapitalProjects);
