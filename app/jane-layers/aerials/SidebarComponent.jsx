import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

const tabTemplateStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
};

const Aerials = () => (
  <div>
    <Tabs
      className="sidebar-tabs"
      tabTemplateStyle={tabTemplateStyle}
    >
      <Tab label="About">
        <div className="sidebar-tab-content">
          <div className="padded">
            <h4>2016 Aerial Imagery</h4>
            <p>This tile layer is published by the NYC DoITT GIS Team, with data provided by <a href="http://www.dhses.ny.gov/">NYSDHS</a>.</p>
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>
);

export default Aerials;
