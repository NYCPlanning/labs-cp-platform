import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';

import LayerSelector from '../LayerSelector';
import * as content from '../content';

const SidebarComponent = (props) => {
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
        <LayerSelector
          locationState={props.locationState}
          selectedPointType={props.selectedPointType}
          selectedPointCoordinates={props.selectedPointCoordinates}
        />
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
};

SidebarComponent.propTypes = {
  selectedPointType: PropTypes.string.isRequired,
  locationState: PropTypes.string,
  selectedPointCoordinates: PropTypes.array.isRequired,
};

SidebarComponent.defaultProps = {
  locationState: '',
};

export default SidebarComponent;
