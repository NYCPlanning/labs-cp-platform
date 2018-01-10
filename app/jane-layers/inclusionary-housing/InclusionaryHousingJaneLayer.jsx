import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Popup } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import appConfig from '../../config/appConfig';
import db_tables from '../../config/db_tables';

class InclusionaryHousingJaneLayer extends React.Component {
  constructor() {
    super();

    this.state = {
      checkboxes: {
        ih: true,
        mih: true,
        studyareas: true,
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

  studyareas = [
    <Source
      id="studyareas"
      type="cartovector"
      options={{
        carto_domain: appConfig.carto_domain,
        sql: ['SELECT * FROM support_dcp_studyareas'],
      }}
    />,
    <MapLayer
      id="studyareas"
      source="studyareas"
      sourceLayer="layer0"
      type="fill"
      paint={{
        'fill-color': '#43a2ca',
        'fill-opacity': 0.6,
        'fill-antialias': true,
        'fill-outline-color': 'rgba(0, 0, 0, 1)',
      }}
    />,
    <Popup
      mapLayerId="studyareas"
      template={`
        <h1>{{p.maplabel}} ({{p.yearadopt}})</h1>
        <div>Status: {{p.status}}</div>
      `}
    />,
  ];

  ih = [
    <Source
      id="ih"
      type="cartovector"
      options={{
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
  ];

  mih = [
    <Source
      id="mih"
      type="cartovector"
      options={{
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
  ];

  renderLayers() {
    let layerArray = [];

    if (this.state.checkboxes.ih) layerArray = layerArray.concat(this.ih);
    if (this.state.checkboxes.mih) layerArray = layerArray.concat(this.mih);
    if (this.state.checkboxes.studyareas) layerArray = layerArray.concat(this.studyareas);

    return layerArray.map((child, index) => ({ ...child, key: index }));
  }

  renderStudyAreas() {
    if (!this.state.checkboxes.studyareas) {
      return null;
    }

    return [
      <MapLayer
        id="studyareas"
        source="studyareas"
        sourceLayer="layer0"
        type="fill"
        paint={{
          'fill-color': '#43a2ca',
          'fill-opacity': 0.6,
          'fill-antialias': true,
          'fill-outline-color': 'rgba(0, 0, 0, 1)',
        }}
      />,
      <Popup
        mapLayerId="studyareas"
        template={`
          <h1>{{p.maplabel}} ({{p.yearadopt}})</h1>
          <div>Status: {{p.status}}</div>
        `}
      />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderIh() {
    if (!this.state.checkboxes.ih) {
      return null;
    }

    return [
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
        name="Planning Areas"
        icon="map"
        selected={this.props.selected}
        enabled={this.props.enabled}
        component={<SidebarComponent checkboxes={this.state.checkboxes} onCheckboxChange={this.onCheckboxChange} />}
      >
        <Source
          id="studyareas"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            sql: ['SELECT * FROM support_dcp_studyareas'],
          }}
        />
        <MapLayer
          id="studyareas"
          source="studyareas"
          sourceLayer="layer0"
          type="fill"
          visibility="none"
          paint={{
            'fill-color': '#43a2ca',
            'fill-opacity': 0.6,
            'fill-antialias': true,
            'fill-outline-color': 'rgba(0, 0, 0, 1)',
          }}
        />
        <Popup
          mapLayerId="studyareas"
          template={`
            <h1>{{p.maplabel}} ({{p.yearadopt}})</h1>
            <div>Status: {{p.status}}</div>
          `}
        />

        <Source
          id="ih"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            sql: ['SELECT * FROM support_ih'],
          }}
        />
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
        />
        <Popup
          mapLayerId="ih"
          template={`
            <h1>Inclusionary Housing</h1>
            <div>{{p.projectnam}}</div>
            <div>Status: {{p.status}}</div>
          `}
        />

        <Source
          id="mih"
          type="cartovector"
          options={{
            carto_domain: appConfig.carto_domain,
            sql: ['SELECT * FROM support_mih'],
          }}
        />
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
        />
        <Popup
          mapLayerId="mih"
          template={`
            <h1>Mandatory Inclusionary Housing</h1>
            <div>{{p.projectnam}}</div>
            <div>Status: {{p.status}}</div>
          `}
        />
      </JaneLayer>
    );
  }
}

InclusionaryHousingJaneLayer.propTypes = {
  selected: PropTypes.bool,
  enabled: PropTypes.bool,
};

InclusionaryHousingJaneLayer.defaultProps = {
  selected: false,
  enabled: false,
};

export default InclusionaryHousingJaneLayer;
