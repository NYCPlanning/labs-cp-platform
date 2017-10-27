import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Popup } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../helpers/appConfig';

class InclusionaryHousingJaneLayer extends React.Component {
  constructor() {
    super();

    this.state = {
      checkboxes: {
        ih: true,
        mih: false,
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

  renderIh() {
    if (!this.state.checkboxes.ih) {
      return null;
    }

    return [
      <Source
        id="ih"
        type="cartovector"
        options={{
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
          sql: ['SELECT * FROM support_ih'],
        }}
      />,
      <MapLayer
        id="ih"
        source="ih"
        sourceLayer="layer0"
        type="fill"
        paint={{
          'fill-color': '#E57300',
          'fill-opacity': 0.6,
          'fill-antialias': true,
          'fill-outline-color': 'rgba(0, 0, 0, 1)',
        }}
      />,
      <Popup
        mapLayerId="ih"
        template={`
          <h1>Inclusionary Housing</h1>
          <div>{{p.projectnam}}</div>
          <div>Status: {{p.status}}</div>
        `}
      />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderMih() {
    if (!this.state.checkboxes.mih) {
      return null;
    }

    return [
      <Source
        id="mih"
        type="cartovector"
        options={{
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
          sql: ['SELECT * FROM support_mih'],
        }}
      />,
      <MapLayer
        id="mih"
        source="mih"
        sourceLayer="layer0"
        type="fill"
        paint={{
          'fill-color': '#CC3D5D',
          'fill-opacity': 0.6,
          'fill-antialias': true,
          'fill-outline-color': 'rgba(0, 0, 0, 1)',
        }}
      />,
      <Popup
        mapLayerId="mih"
        template={`
          <h1>Mandatory Inclusionary Housing</h1>
          <div>{{p.projectnam}}</div>
          <div>Status: {{p.status}}</div>
        `}
      />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  render() {
    return (
      <JaneLayer
        id="inclusionary_housing"
        name="Inclusionary Housing"
        icon="home"
        defaultSelected={this.props.defaultSelected}
        defaultDisabled={this.props.defaultDisabled}
        component={<SidebarComponent checkboxes={this.state.checkboxes} onCheckboxChange={this.onCheckboxChange} />}
      >
        { this.renderIh() }
        { this.renderMih() }
      </JaneLayer>
    );
  }
}

InclusionaryHousingJaneLayer.propTypes = {
  defaultSelected: PropTypes.bool,
  defaultDisabled: PropTypes.bool,
};

InclusionaryHousingJaneLayer.defaultProps = {
  defaultSelected: false,
  defaultDisabled: false,
};

export default InclusionaryHousingJaneLayer;
