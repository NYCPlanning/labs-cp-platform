import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { Tabs, Tab } from 'material-ui/Tabs';

const LegendItem = props => (
  <div>
    <div
      style={{
        height: '14px',
        width: '14px',
        background: props.color,
        float: 'left',
        margin: '1px 10px 0 39px',
      }}
    />
    <p>{props.label}</p>
  </div>
);

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const SidebarComponent = props => (
  <div>
    <Tabs className="sidebar-tabs">
      <Tab label="Data">
        <div className="sidebar-tab-content">
          <div className="padded">
            <h4>Flood Hazard Layers</h4>

            <Checkbox
              label="Preliminary Flood Insurance Rate Maps"
              checked={props.checkboxes.pfirm15}
              onCheck={() => props.onCheckboxChange('pfirm15')}
            />
            <LegendItem color={'#70b5c8'} label={'V Zone'} />
            <LegendItem color={'#7dd3f2'} label={'A Zone'} />
            <LegendItem color={'#7bfdde'} label={'Shaded X Zone'} />
          </div>
        </div>
      </Tab>
      <Tab label="About">
        <div className="sidebar-tab-content">
          <h4>Flood Hazard Layers</h4>
          <p>The 2015 PFIRMs are produced by FEMA and may be viewed at their authoritative source <a href="http://www.region2coastal.com/">here</a>.</p>
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
