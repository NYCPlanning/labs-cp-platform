import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';

import LayerSelector from '../LayerSelector';

import Download from '../../common/Download';
import { about } from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';
import * as pipelineActions from '../../actions/pipeline';

class Pipeline extends React.Component {
  componentDidMount() {
    this.props.fetchTotalCount();
    this.props.fetchSelectedCount(this.props.filterDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      this.props.fetchSelectedCount(nextProps.filterDimensions);
    }
  }

  handleDownload = (label) => {
    ga.event({
      category: 'pipeline-explorer',
      action: 'download',
      label,
    });
  };

  render() {
    const {
      totalCount,
      selectedCount,
      filterDimensions,
      symbologyDimension,
    } = this.props;

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
          <LayerSelector
            totalCount={totalCount}
            selectedCount={selectedCount}
            filterDimensions={filterDimensions}
            symbologyDimension={symbologyDimension}
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
              <SignupPrompt />
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="scroll-container padded">
              {about}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

Pipeline.propTypes = {
  fetchTotalCount: PropTypes.func.isRequired,
  fetchSelectedCount: PropTypes.func.isRequired,
};

const mapStateToProps = ({ pipeline }) => ({
  sql: pipeline.sql,
  totalCount: pipeline.totalCount,
  selectedCount: pipeline.selectedCount,
  filterDimensions: pipeline.filterDimensions,
  symbologyDimension: pipeline.symbologyDimension,
});

export default connect(mapStateToProps, {
  fetchTotalCount: pipelineActions.fetchTotalCount,
  fetchSelectedCount: pipelineActions.fetchSelectedCount,
})(Pipeline);
