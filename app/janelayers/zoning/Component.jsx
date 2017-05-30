import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { Tabs, Tab } from 'material-ui/Tabs';
import config from './config';

class Zoning extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeCheckboxes: ['zd'],
    };
  }

  componentDidUpdate() {
    this.updateMapConfig();
  }

  handleCheck = (id) => {
    const { activeCheckboxes } = this.state;
    const i = activeCheckboxes.indexOf(id);

    if (i > -1) {
      activeCheckboxes.splice(i, 1);
    } else {
      activeCheckboxes.push(id);
    }

    // sort array to make sure overlays are on top
    activeCheckboxes.sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });
    console.log(activeCheckboxes);

    this.setState({ activeCheckboxes });
  }

  // build mapConfig based on state, pass it up to Jane
  updateMapConfig() {
    const { activeCheckboxes } = this.state;
    const sources = [];
    const mapLayers = [];

    activeCheckboxes.forEach((id) => {
      config[id].sources.forEach((source) => {
        sources.push(source);
      });

      config[id].mapLayers.forEach((mapLayer) => {
        mapLayers.push(mapLayer);
      });
    });

    const mapConfig = { sources, mapLayers };
    this.props.onUpdate(mapConfig);
  }

  render() {
    return (
      <div>
        <Tabs className="sidebar-tabs">
          <Tab label="Data">
            <div className="sidebar-tab-content">
              <div className="padded">
                <h4>Zoning Layers</h4>
                <p>Zoom in to show labels</p>
                <Checkbox
                  label="Zoning Districts"
                  checked={this.state.activeCheckboxes.includes('zd')}
                  onCheck={this.handleCheck.bind(this, 'zd')}
                />
                <Checkbox
                  label="Commercial Overlays"
                  checked={this.state.activeCheckboxes.includes('co')}
                  onCheck={this.handleCheck.bind(this, 'co')}
                />
              </div>
            </div>
          </Tab>
          <Tab label="About">
            <div className="sidebar-tab-content">
              <div className="padded">
                <h4>Zoning Layers</h4>
                <p>The zoning datasets are provided at NYC Planning's Bytes of the Big Apple Open Data site.</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Zoning.propTypes = {
  onUpdate: PropTypes.func,
};

Zoning.defaultProps = {
  onUpdate: () => {},
};

export default Zoning;
