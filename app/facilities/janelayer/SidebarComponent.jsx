import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';

import LayerSelector from '../LayerSelector';
import Download from '../../common/Download';
import * as content from '../content';
import SignupPrompt from '../../common/SignupPrompt';
import ga from '../../helpers/ga';

class SidebarComponent extends React.Component {
  handleDownload = (label) => {
    ga.event({
      category: 'faciities-explorer',
      action: 'download',
      label,
    });
  }

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
          <LayerSelector />
        </Tab>
        <Tab label="Download">
          <div className="sidebar-tab-content ">
            <div className="scroll-container padded">
              <Download
                sql={this.props.sql}
                filePrefix="facilities"
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
              <SignupPrompt />
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ facilities }) => ({
  sql: facilities.sql,
});

export default connect(mapStateToProps)(SidebarComponent);
