import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import Filter from '../Filter';
import Download from '../Download';
import * as content from '../content';
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
      this.props.polygonsSql !== nextProps.polygonsSql ||
      this.props.pointsSql !== nextProps.pointsSql
    ) {
      this.props.fetchSelectedCount(nextProps.filterDimensions);
    }
  }

  handleDownload = (label) => {
    ga.event({
      category: 'capitalprojects-explorer',
      action: 'download',
      label,
    });
  };

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
            selectedPointType={this.props.selectedPointType}
            selectedPointCoordinates={this.props.selectedPointCoordinates}
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

CapitalProjects.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,
  filterDimensions: PropTypes.number.isRequired,

  fetchTotalPointsCount: PropTypes.func.isRequired,
  fetchTotalPolygonsCount: PropTypes.func.isRequired,
  fetchSelectedCount: PropTypes.func.isRequired,
  selectedPointType: PropTypes.string.isRequired,
  selectedPointCoordinates: PropTypes.array.isRequired,
};

CapitalProjects.defaultProps = {
  totalCount: 0,
  selectedCount: 0,
};

const mapStateToProps = ({ capitalProjects }) => ({
  pointsSql: capitalProjects.pointsSql,
  polygonsSql: capitalProjects.polygonsSql,
  totalCount: capitalProjects.pointsTotalCount + capitalProjects.polygonsTotalCount,
  selectedCount: capitalProjects.selectedCount,
  filterDimensions: capitalProjects.filterDimensions,
});

export default connect(mapStateToProps, {
  fetchTotalPointsCount: capitalProjectsActions.fetchTotalPointsCount,
  fetchTotalPolygonsCount: capitalProjectsActions.fetchTotalPolygonsCount,
  fetchSelectedCount: capitalProjectsActions.fetchSelectedCount,
})(CapitalProjects);
