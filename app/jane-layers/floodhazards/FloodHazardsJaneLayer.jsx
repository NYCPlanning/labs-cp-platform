import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';


class FloodHazardsJaneLayer extends React.Component {
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
        pfirm15: true,
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

  renderPfirm15() {
    if (!this.state.checkboxes.pfirm15) {
      return null;
    }

    const sourceOptions = {
      carto_domain: appConfig.carto_domain,
      sql: ['SELECT the_geom_webmercator, fld_zone FROM support_waterfront_pfirm15 WHERE fld_zone = \'AE\' OR fld_zone = \'0.2 PCT ANNUAL CHANCE FLOOD HAZARD\' OR fld_zone = \'VE\''],
    };

    const mapLayerConfig = {
      sourceLayer: 'layer0',
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
    };

    return [
      <Source id="pfirm15" type="cartovector" options={sourceOptions} />,

      <MapLayer id="pfirm15" source="pfirm15" {...mapLayerConfig} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  render() {
    return (
      <JaneLayer
        id="floodhazards"
        name="Flood Hazards"
        icon="tint"
        selected={this.props.selected}
        enabled={this.props.enabled}
        component={<SidebarComponent checkboxes={this.state.checkboxes} onCheckboxChange={this.onCheckboxChange} />}
      >
        { this.renderPfirm15() }
      </JaneLayer>
    );
  }
}

export default FloodHazardsJaneLayer;
