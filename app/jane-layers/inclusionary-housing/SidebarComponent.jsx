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
            <h4>Inclusionary Housing</h4>
            <Checkbox
              label="Inclusionary Housing"
              checked={props.checkboxes.ih}
              onCheck={() => props.onCheckboxChange('ih')}
            />
            <Checkbox
              label="Mandatory Inclusionary Housing"
              checked={props.checkboxes.mih}
              onCheck={() => props.onCheckboxChange('mih')}
            />

            <h4>Study Areas</h4>
            <Checkbox
              label="Study Areas"
              checked={props.checkboxes.studyareas}
              onCheck={() => props.onCheckboxChange('studyareas')}
            />
          </div>
        </div>
      </Tab>
      <Tab label="About">
        <div className="sidebar-tab-content">
          <div className="padded">
            <h4>Inclusionary Housing Layers</h4>
            <p>The Inclusionary Housing data are provided by NYC Planning&#39;s Bytes of the Big Apple Open Data site.</p>
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
