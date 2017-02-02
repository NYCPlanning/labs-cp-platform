import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { Tabs, Tab } from 'material-ui/Tabs';

import appConfig from '../../helpers/appConfig';

const defaultLayerConfig = {
  sources: [
    {
      type: 'cartovector',
      id: 'floodhazards',
      options: {
        carto_user: appConfig.carto_user,
        carto_domain: appConfig.carto_domain,
        sql: ['SELECT the_geom_webmercator, fld_zone FROM pfirm15 WHERE fld_zone = \'AE\' OR fld_zone = \'0.2 PCT ANNUAL CHANCE FLOOD HAZARD\' OR fld_zone = \'VE\''],
      },
    },
  ],
  mapLayers: [
    {
      id: 'pfirm15',
      source: 'floodhazards',
      'source-layer': 'layer0',
      type: 'fill',
      paint: {
        'fill-color': {
          property: 'fld_zone',
          type: 'categorical',
          stops: [
            ['VE', '#52ABC4'],
            ['AE', '#52C4EE'],
            ['0.2 PCT ANNUAL CHANCE FLOOD HAZARD', '#52FFD7'],
          ],
        },
        'fill-opacity': 0.75,
        'fill-antialias': true,
      },
    },
  ],
};


const Component = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      activeCheckboxes: ['pfirm15'],
    });
  },

  componentDidMount() {
    this.sendNewConfig(defaultLayerConfig);
  },

  sendNewConfig(layerConfig) {
    this.props.onUpdate('floodhazards', {
      sources: layerConfig.sources,
      mapLayers: layerConfig.mapLayers,
      legend: layerConfig.legend,
    });
  },

  handleCheck(id) {
    const found = this.state.activeCheckboxes.includes(id);
    if (found) {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.filter(x => x !== id),
      }, this.updateMapElements);
    } else {
      this.setState({
        activeCheckboxes: [...this.state.activeCheckboxes, id],
      }, this.updateMapElements);
    }
  },

  render() {
    return (
      <div>
        <Tabs className="sidebar-tabs">
          <Tab label="Data">
            <div className="sidebar-tab-content">
              <h4>Flood Hazard Layers</h4>

              {/*<Checkbox
                label="Limit of Moderate Wave Action (LiMWA)"
                checked={this.state.activeCheckboxes.includes('limwa')}
                onCheck={this.handleCheck.bind(this, 'limwa')}
              />*/}
              <Checkbox
                label="Preliminary Flood Insurance Rate Maps"
                checked={this.state.activeCheckboxes.includes('pfirm15')}
                onCheck={this.handleCheck.bind(this, 'pfirm15')}
              />
            </div>
          </Tab>
          <Tab label="About">
            <div className="sidebar-tab-content">
              <h4>Transportation Layers</h4>
              <p>These layers are provided by the DoITT GIS Team, and are available on their <a href="https://nycdoittpublicdata.carto.com/u/nycpublicdata/">public carto server</a>.</p>
            </div>
          </Tab>
        </Tabs>

      </div>
    );
  },
});

export default Component;
