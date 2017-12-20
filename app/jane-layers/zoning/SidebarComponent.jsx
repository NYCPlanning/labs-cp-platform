import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { Tabs, Tab } from 'material-ui/Tabs';

const SidebarComponent = props => (
  <div>
    <Tabs className="sidebar-tabs">
      <Tab label="Filters">
        <div className="sidebar-tab-content">
          <div className="padded">
            <h4>Zoning Layers</h4>
            <p>Zoom in to show labels</p>
            <Checkbox
              label="Zoning Districts"
              checked={props.checkboxes.zd}
              onCheck={() => props.onCheckboxChange('zd')}
            />
            <Checkbox
              label="Commercial Overlays"
              checked={props.checkboxes.co}
              onCheck={() => props.onCheckboxChange('co')}
            />
          </div>
        </div>
      </Tab>
      <Tab label="About">
        <div className="sidebar-tab-content">
          <div className="padded">
            <h4>Zoning Layers</h4>
            <p>The zoning datasets are provided at NYC Planning&#39;s Bytes of the Big Apple Open Data site.</p>
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>
);

SidebarComponent.propTypes = {
  checkboxes: PropTypes.object.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default SidebarComponent;
