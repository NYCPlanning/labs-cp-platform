import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import config from './config';

const tabTemplateStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
};

class AerialsComponent extends React.Component {
  componentDidUpdate() {
    this.updateMapConfig();
  }

  updateMapConfig = () => {
    const mapConfig = config;
    this.props.onUpdate(mapConfig);
  }

  render() {
    return (
      <div>
        <Tabs
          className="sidebar-tabs"
          tabTemplateStyle={tabTemplateStyle}
        >
          <Tab label="About">
            <div className="sidebar-tab-content">
              <div className="padded">
                <h4>2016 Aerial Imagery</h4>
                <p>This tile layer is published by the NYC DoITT GIS Team</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default AerialsComponent;
