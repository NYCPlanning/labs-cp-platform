import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LayerSelector from '../LayerSelector';
import Download from '../../common/Download';
import * as content from '../content';
import ga from '../../helpers/ga';

class SidebarComponent extends React.Component {
  handleDownload = (label) => {
    ga.event({
      category: 'faciities-explorer',
      action: 'download',
      label,
    });
  };

  render() {
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
            locationState={this.props.locationState}
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
              {content.about}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

SidebarComponent.propTypes = {
  sql: PropTypes.string,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array.isRequired,
};

const mapStateToProps = ({ facilities }) => ({
  sql: facilities.sql,
});

export default connect(mapStateToProps)(SidebarComponent);
