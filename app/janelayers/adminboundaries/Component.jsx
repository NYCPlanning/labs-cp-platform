import React, { PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Tabs, Tab } from 'material-ui/Tabs';


const paint = {
  lines: {
    'line-color': '#717171',
    'line-opacity': 0.7,
    'line-width': {
      stops: [
        [9, 1],
        [14, 4],
      ],
    },
  },
  labels: {
    'text-color': '#626262',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
};

const layout = {
  lines: {
    'line-join': 'round',
    'line-cap': 'round',
  },
};

const defaultLayerConfig = {
  nta: {
    sources: [
      {
        id: 'ntaboundaries',
        type: 'geojson',
        source: '/data/ntaboundaries.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'ntaboundaries',
        source: 'ntaboundaries',
        type: 'line',
        paint: paint.lines,
        layout: layout.lines,
      },
      {
        id: 'ntaboundaries-labels',
        source: 'ntaboundaries',
        type: 'symbol',
        minzoom: 13,
        paint: paint.labels,
        layout: {
          'text-field': '{ntaname}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': {
            stops: [
              [11, 12],
              [14, 16],
            ],
          },
        },
      },
    ],
  },
  cd: {
    sources: [
      {
        id: 'cdboundaries',
        type: 'geojson',
        source: '/data/cdboundaries.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'cdboundaries',
        source: 'cdboundaries',
        type: 'line',
        paint: paint.lines,
        layout: layout.lines,
      },
      {
        id: 'cdboundaries-labels',
        source: 'cdboundaries',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{displaynam}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': {
            stops: [
              [11, 12],
              [14, 16],
            ],
          },
        },
      },
    ],
  },

  schooldistricts: {
    sources: [
      {
        id: 'schooldistricts',
        type: 'geojson',
        source: '/data/schooldistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'schooldistricts',
        source: 'schooldistricts',
        type: 'line',
        paint: paint.lines,
        layout: layout.lines,
      },
      {
        id: 'schooldistricts-labels',
        source: 'schooldistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{SchoolDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': {
            stops: [
              [11, 12],
              [14, 16],
            ],
          },
        },
      },
    ],
  },
};

const AdminBoundaries = React.createClass({
  propTypes: {
    onUpdate: PropTypes.func.isRequired,
    layer: PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      context: null,
    };
  },

  getInitialState() {
    if (this.props.layer.initialState) return this.props.layer.initialState;

    return ({
      value: 'cd',
    });
  },

  componentDidMount() {
    this.updateMapElements(defaultLayerConfig[this.state.value]);
  },

  updateMapElements(layerConfig) {
    this.props.onUpdate('adminboundaries', {
      sources: layerConfig.sources,
      mapLayers: layerConfig.mapLayers,
    });
  },

  handleChange(e, value) {
    this.setState({
      value,
    });

    this.updateMapElements(defaultLayerConfig[value]);
  },

  render() {
    return (
      <div>
        <Tabs className="sidebar-tabs">
          <Tab label="Data">
            <div className="sidebar-tab-content">
              <div className="padded">
                <h4>Choose a Boundary Layer</h4>

                <RadioButtonGroup
                  name="adminboundary"
                  onChange={this.handleChange}
                  valueSelected={this.state.value}
                >
                  <RadioButton
                    value="cd"
                    label="Community Districts"
                  />

                  <RadioButton
                    value="nta"
                    label="Neighborhood Tabulation Areas"
                  />

                  <RadioButton
                    value="schooldistricts"
                    label="School Districts"
                  />

                </RadioButtonGroup>
              </div>
            </div>
          </Tab>
          <Tab label="About">
            <div className="sidebar-tab-content">
              <div className="padded">
                <h4>Administrative Boundaries</h4>
                <p>This data layer contains several Administrative Boundary types relevant to New York City.  Most are available from The Department of City Planning&apos;s <a href="http://www1.nyc.gov/site/planning/data-maps/open-data.page">Bytes of the Big Apple Open Data Site</a>.</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  },
});

export default AdminBoundaries;
