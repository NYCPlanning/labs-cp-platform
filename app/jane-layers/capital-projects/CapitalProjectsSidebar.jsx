import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';

import Filter from './filter/CapitalProjectsFilter';
import * as capitalProjectsActions from '../../actions/capitalProjects';

class CapitalProjectsSidebar extends React.Component {
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
        <Tab label="Filters">
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
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              <div>
                <h4>Product Overview</h4>
                <p>
                  <b>The Capital Project Map’s</b> main purpose is to be a starting point for exploring potential, planned, and ongoing capital projects to better understand and communicate New York City’s capital project portfolio within and across particular agencies. This integrated view provides a broad understanding of what projects are taking place within a certain area, and opportunities for strategic neighborhood planning.
                </p>

                <h4>Limitations and Disclaimers</h4>
                <p>
                  <li>This is not a project management system, so data on project timeline or budget may be incorrect</li>
                  <li>All monies committed to or spent on a project may not be captured</li>
                  <li>Planned projects that may never come to fruition are captured</li>
                  <li>The spatial data are not 100% reliable, accurate, or exhaustive</li>
                </p>
                <p>
                As a result of these limitations and inconsistencies, the Capital Projects Map is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses, - it is built for planning coordination and information purposes only.  Please consult <a href="http://docs.capitalplanning.nyc/cpdb/" target="_blank" rel="noreferrer noopener">NYC Planning’s Capital Planning Docs</a> for more details about the limitations.
                </p>

                <h4>Feedback</h4>
                <p>
                  We are constantly looking for ways to improve this product.  Please <a href="mailto:capital@planning.nyc.gov">share your feedback and suggestions</a> with Capital Planning.
                </p>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          label={<span>Table <span className={'fa fa-external-link'} /></span>}
          onActive={() => browserHistory.push('/table')}
        />
      </Tabs>
    );
  }
}

CapitalProjectsSidebar.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,
  filterDimensions: PropTypes.object.isRequired,

  fetchTotalPointsCount: PropTypes.func.isRequired,
  fetchTotalPolygonsCount: PropTypes.func.isRequired,
  fetchSelectedCount: PropTypes.func.isRequired,
  selectedPointType: PropTypes.string.isRequired,
  selectedPointCoordinates: PropTypes.array.isRequired,
};

CapitalProjectsSidebar.defaultProps = {
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
})(CapitalProjectsSidebar);
