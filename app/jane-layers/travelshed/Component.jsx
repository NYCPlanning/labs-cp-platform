import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

import config from './config';

class Travelshed extends React.Component {

  updateMapConfig = () => {
    const { feature } = this.props;
    const lat = feature.geometry.coordinates[1];
    const lng = feature.geometry.coordinates[0];

    config.sources[0].source = `https://otp.capitalplanning.nyc/otp/routers/default/isochrone?routeId=default&batch=true&fromPlace=${lat},${lng}&date=2016/09/23&time=12:00:00&mode=TRANSIT,WALK&cutoffSec=900&cutoffSec=1800&cutoffSec=2700`;
  };

  render() {
    return (
      <div>
        <Tabs className="sidebar-tabs">
          <Tab label="About">
            <div className="sidebar-tab-content">
              <div className="padded">
                <h4>About This Travelshed</h4>
                <p>This layer shows 15, 30, and 45 minute travel time isochrones generated by DCP&apos;s <a href="http://www.opentripplanner.org/">OpenTripPlanner Server</a>.</p>
                <p>The resulting geometries assume a mid-day weekday departure traveling by walking and NYC subway only. For the best experience, also enable the subway lines in the Transportation pane.</p>
                <p>This is an experimental feature.   Additional configuration options and improved styling will be available soon. In the meantime, you can also explore travelsheds using our beta <a href="https://nycplanning.github.io/travelsheds/">Travelshed Generator</a>.</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Travelshed.propTypes = {
  feature: PropTypes.object.isRequired,
};

export default Travelshed;