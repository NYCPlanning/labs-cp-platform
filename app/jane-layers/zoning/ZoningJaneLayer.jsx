import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';


const paint = {
  labels: {
    'text-color': '#626262',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
  co_labels: {
    'text-color': 'rgba(255, 0, 0, 1)',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
};

class ZoningJaneLayer extends React.Component {

  static propTypes = {
    selected: PropTypes.bool,
    enabled: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    enabled: false,
  }

  constructor() {
    super();

    this.state = {
      checkboxes: {
        zd: true,
        co: false,
      },
    };

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(name) {
    const checkboxes = {
      ...this.state.checkboxes,
      [name]: !this.state.checkboxes[name],
    };

    this.setState({ checkboxes });
  }

  renderZd() {
    if (!this.state.checkboxes.zd) {
      return null;
    }

    const sourceOptions = {
      carto_domain: appConfig.carto_domain,
      sql: ['SELECT *, LEFT(zonedist, 2) as primaryzone FROM support_zoning_zd'],
    };

    const zdConfig = {
      id: 'zd',
      type: 'fill',
      source: 'zd',
      sourceLayer: 'layer0',
      paint: {
        'fill-color': {
          property: 'primaryzone',
          type: 'categorical',
          stops: [
            ['BP', '#EEEEEE'],
            ['C1', '#FDBDBB'],
            ['C2', '#FDBDBB'],
            ['C3', '#FDBDBB'],
            ['C4', '#FDBDBB'],
            ['C5', '#FDBDBB'],
            ['C6', '#FDBDBB'],
            ['C7', '#FDBDBB'],
            ['C8', '#FDBDBB'],
            ['M1', '#B7D6FD'],
            ['M2', '#EDB7FD'],
            ['M3', '#EDB7FD'],
            ['PA', '#E7FDDC'],
            ['R1', '#FDFDDC'],
            ['R2', '#FDFDDC'],
            ['R3', '#FDFDDC'],
            ['R4', '#FDFDDC'],
            ['R5', '#FDFDDC'],
            ['R6', '#FDE7BD'],
            ['R7', '#FDE7BD'],
            ['R8', '#FDE7BD'],
            ['R9', '#FDE7BD'],
          ],
        },
        'fill-opacity': 0.6,
        'fill-antialias': true,
        'fill-outline-color': 'rgba(0, 0, 0, 1)',
      },
    };

    const zdLabelConfig = {
      id: 'zd_labels',
      source: 'zd',
      type: 'symbol',
      sourceLayer: 'layer0',
      paint: paint.labels,
      layout: {
        'symbol-placement': 'point',
        'text-field': '{zonedist}',
      },
      minzoom: 14,
    };

    return [
      <Source id="zd" type="cartovector" options={sourceOptions} />,

      <MapLayer id="zd_labels" source="zd" {...zdLabelConfig} />,
      <MapLayer id="zd" source="zd" {...zdConfig} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCo() {
    if (!this.state.checkboxes.co) {
      return null;
    }

    const sourceOptions = {
      carto_domain: appConfig.carto_domain,
      sql: ['SELECT * FROM support_zoning_co'],
    };

    const coConfig = {
      id: 'co',
      type: 'fill',
      source: 'co',
      sourceLayer: 'layer0',
      paint: {
        'fill-opacity': 1,
        'fill-color': 'rgba(158, 0, 0, 0)',
        'fill-antialias': true,
        'fill-outline-color': 'rgba(255, 0, 0, 1)',
      },
    };

    const coLabelConfig = {
      id: 'co_labels',
      source: 'co',
      type: 'symbol',
      sourceLayer: 'layer0',
      paint: paint.co_labels,
      layout: {
        'symbol-placement': 'point',
        'text-field': '{overlay}',
      },
      minzoom: 14,
    };

    return [
      <Source id="co" type="cartovector" options={sourceOptions} />,

      <MapLayer id="co" source="co" {...coConfig} />,
      <MapLayer id="co_labels" source="co" {...coLabelConfig} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  render() {
    return (
      <JaneLayer
        id="zoning"
        name="Zoning"
        icon="building"
        selected={this.props.selected}
        enabled={this.props.enabled}
        component={<SidebarComponent checkboxes={this.state.checkboxes} onCheckboxChange={this.onCheckboxChange} />}
      >
        { this.renderZd() }
        { this.renderCo() }
      </JaneLayer>
    );
  }
}

export default ZoningJaneLayer;
