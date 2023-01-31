import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer, Popup } from '../../jane-maps';

import SidebarComponent from './SidebarComponent';
import mapLayers from './config';

class AdminBoundariesJaneLayer extends React.Component {
  static propTypes = {
    selected: PropTypes.bool,
    enabled: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    enabled: false,
  };

  constructor() {
    super();
    this.state = { selected: 'cd' };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange(value) {
    this.setState({ selected: value });
  }

  renderNTA() {
    if (this.state.selected !== 'nta2020') {
      return null;
    }

    return [
      <Source id="nta2020" type="geojson" data="/data/ntaboundaries.geojson" />,
      <MapLayer id="ntaboundaries" source="nta2020" {...mapLayers.ntaboundaries} />,
      <MapLayer id="ntaboundaries_labels" source="nta2020" {...mapLayers.ntaboundaries_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCensusTracts() {
    if (this.state.selected !== 'censustracts') {
      return null;
    }

    return [
      <Source id="censustracts" type="geojson" data="/data/CensusTracts.geojson" />,
      <MapLayer id="censustracts" source="censustracts" {...mapLayers.censustracts} />,
      <MapLayer id="censustracts_labels" source="censustracts" {...mapLayers.censustracts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderPUMA() {
    if (this.state.selected !== 'puma') {
      return null;
    }

    return [
      <Source id="puma" type="geojson" data="/data/puma.geojson" />,
      <MapLayer id="puma" source="puma" {...mapLayers.puma} />,
      <MapLayer id="puma_labels" source="puma" {...mapLayers.puma_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderTAZ() {
    if (this.state.selected !== 'taz') {
      return null;
    }

    return [
      <Source id="taz" type="geojson" data="/data/TrafficAnalysisZones.geojson" />,
      <MapLayer id="taz" source="taz" {...mapLayers.taz} />,
      <MapLayer id="taz_labels" source="taz" {...mapLayers.taz_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCD() {
    if (this.state.selected !== 'cd') {
      return null;
    }

    return [
      <Source id="cd" type="geojson" data="/data/cdboundaries.geojson" />,
      <MapLayer id="cd" source="cd" {...mapLayers.cd} />,
      <MapLayer id="cd_labels" source="cd" {...mapLayers.cd_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderSchoolDistricts() {
    if (this.state.selected !== 'schooldistricts') {
      return null;
    }

    return [
      <Source id="schooldistricts" type="geojson" data="/data/schooldistricts.geojson" />,
      <MapLayer id="schooldistricts" source="schooldistricts" {...mapLayers.schooldistricts} />,
      <MapLayer id="schooldistricts_labels" source="schooldistricts" {...mapLayers.schooldistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderSchoolZonesES() {
    if (this.state.selected !== 'schoolzones-es') {
      return null;
    }

    return [
      <Source id="schoolzones_es" type="geojson" data="/data/schoolzones-es.geojson" />,
      <MapLayer id="schoolzones_es" source="schoolzones_es" {...mapLayers.schoolzones_es} />,
      <MapLayer id="schoolzones_es_fill" source="schoolzones_es" type="fill" paint={{ 'fill-opacity': 0 }} />,
      <Popup
        mapLayerId="schoolzones_es_fill"
        template={`
          <h1>School Zone (Elementary)</h1>
          <div>{{p.DBN}}</div>
          <div>{{p.REMARKS}}</div>
        `}
      />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderSchoolZonesMS() {
    if (this.state.selected !== 'schoolzones-ms') {
      return null;
    }

    return [
      <Source id="schoolzones_ms" type="geojson" data="/data/schoolzones-ms.geojson" />,
      <MapLayer id="schoolzones_ms" source="schoolzones_ms" {...mapLayers.schoolzones_ms} />,
      <MapLayer id="schoolzones_ms_fill" source="schoolzones_ms" type="fill" paint={{ 'fill-opacity': 0 }} />,
      <Popup
        mapLayerId="schoolzones_ms_fill"
        template={`
          <h1>School Zone (Middle School)</h1>
          <div>{{p.DBN}}</div>
          <div>{{p.REMARKS}}</div>
        `}
      />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderSchoolZonesHS() {
    if (this.state.selected !== 'schoolzones-hs') {
      return null;
    }

    return [
      <Source id="schoolzones_hs" type="geojson" data="/data/schoolzones-hs.geojson" />,
      <MapLayer id="schoolzones_hs" source="schoolzones_hs" {...mapLayers.schoolzones_hs} />,
      <MapLayer id="schoolzones_hs_fill" source="schoolzones_hs" type="fill" paint={{ 'fill-opacity': 0 }} />,
      <Popup
        mapLayerId="schoolzones_hs_fill"
        template={`
          <h1>School Zone (High School)</h1>
          <div>{{p.DBN}}</div>
          <div>{{p.Remarks}}</div>
        `}
      />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderBoroughBoundaries() {
    if (this.state.selected !== 'boroughboundaries') {
      return null;
    }

    return [
      <Source id="boroughboundaries" type="geojson" data="/data/BoroughBoundaries.geojson" />,
      <MapLayer id="boroughboundaries" source="boroughboundaries" {...mapLayers.boroughboundaries} />,
      <MapLayer id="boroughboundaries_labels" source="boroughboundaries" {...mapLayers.boroughboundaries_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCityCouncilDistricts() {
    if (this.state.selected !== 'citycouncildistricts') {
      return null;
    }

    return [
      <Source id="citycouncildistricts" type="geojson" data="/data/CityCouncilDistricts.geojson" />,
      <MapLayer id="citycouncildistricts" source="citycouncildistricts" {...mapLayers.citycouncildistricts} />,
      <MapLayer id="citycouncildistricts_labels" source="citycouncildistricts" {...mapLayers.citycouncildistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderMunicipalCourtDistricts() {
    if (this.state.selected !== 'municipalcourtdistricts') {
      return null;
    }

    return [
      <Source id="municipalcourtdistricts" type="geojson" data="/data/MunicipalCourtDistricts.geojson" />,
      <MapLayer id="municipalcourtdistricts" source="municipalcourtdistricts" {...mapLayers.municipalcourtdistricts} />,
      <MapLayer id="municipalcourtdistricts_labels" source="municipalcourtdistricts" {...mapLayers.municipalcourtdistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderFireBattalions() {
    if (this.state.selected !== 'firebattalions') {
      return null;
    }

    return [
      <Source id="firebattalions" type="geojson" data="/data/FireBattalions.geojson" />,
      <MapLayer id="firebattalions" source="firebattalions" {...mapLayers.firebattalions} />,
      <MapLayer id="firebattalions_labels" source="firebattalions" {...mapLayers.firebattalions_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderFireCompanies() {
    if (this.state.selected !== 'firecompanies') {
      return null;
    }

    return [
      <Source id="firecompanies" type="geojson" data="/data/FireCompanies.geojson" />,
      <MapLayer id="firecompanies" source="firecompanies" {...mapLayers.firecompanies} />,
      <MapLayer id="firecompanies_labels" source="firecompanies" {...mapLayers.firecompanies_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderFireDivisions() {
    if (this.state.selected !== 'firedivisions') {
      return null;
    }

    return [
      <Source id="firedivisions" type="geojson" data="/data/FireDivisions.geojson" />,
      <MapLayer id="firedivisions" source="firedivisions" {...mapLayers.firedivisions} />,
      <MapLayer id="firedivisions_labels" source="firedivisions" {...mapLayers.firedivisions_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderPolicePrecincts() {
    if (this.state.selected !== 'policeprecincts') {
      return null;
    }

    return [
      <Source id="policeprecincts" type="geojson" data="/data/PolicePrecincts.geojson" />,
      <MapLayer id="policeprecincts" source="policeprecincts" {...mapLayers.policeprecincts} />,
      <MapLayer id="policeprecincts_labels" source="policeprecincts" {...mapLayers.policeprecincts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderStateAssemblyDistricts() {
    if (this.state.selected !== 'stateassemblydistricts') {
      return null;
    }

    return [
      <Source id="stateassemblydistricts" type="geojson" data="/data/StateAssemblyDistricts.geojson" />,
      <MapLayer id="stateassemblydistricts" source="stateassemblydistricts" {...mapLayers.stateassemblydistricts} />,
      <MapLayer id="stateassemblydistricts_labels" source="stateassemblydistricts" {...mapLayers.stateassemblydistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderStateSenateDistricts() {
    if (this.state.selected !== 'statesenatedistricts') {
      return null;
    }

    return [
      <Source id="statesenatedistricts" type="geojson" data="/data/StateSenateDistricts.geojson" />,
      <MapLayer id="statesenatedistricts" source="statesenatedistricts" {...mapLayers.statesenatedistricts} />,
      <MapLayer id="statesenatedistricts_labels" source="statesenatedistricts" {...mapLayers.statesenatedistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderUSCongressionalDistricts() {
    if (this.state.selected !== 'uscongressionaldistricts') {
      return null;
    }

    return [
      <Source id="uscongressionaldistricts" type="geojson" data="/data/USCongressionalDistricts.geojson" />,
      <MapLayer id="uscongressionaldistricts" source="uscongressionaldistricts" {...mapLayers.uscongressionaldistricts} />,
      <MapLayer id="uscongressionaldistricts_labels" source="uscongressionaldistricts" {...mapLayers.uscongressionaldistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  render() {
    return (
      <JaneLayer
        id="admin_boundaries"
        name="Admin Boundaries"
        icon="flag"
        selected={this.props.selected}
        enabled={this.props.enabled}
        component={<SidebarComponent selected={this.state.selected} onRadioChange={this.onRadioChange} />}
      >
        { this.renderNTA() }
        { this.renderCensusTracts() }
        { this.renderPUMA() }
        { this.renderTAZ() }

        { this.renderBoroughBoundaries() }
        { this.renderCD() }
        { this.renderCityCouncilDistricts() }
        { this.renderMunicipalCourtDistricts() }
        { this.renderStateAssemblyDistricts() }
        { this.renderStateSenateDistricts() }
        { this.renderUSCongressionalDistricts() }

        { this.renderFireDivisions() }
        { this.renderFireBattalions() }
        { this.renderFireCompanies() }
        { this.renderPolicePrecincts() }

        { this.renderSchoolDistricts() }
        { this.renderSchoolZonesES() }
        { this.renderSchoolZonesMS() }
        { this.renderSchoolZonesHS() }
      </JaneLayer>
    );
  }
}

export default AdminBoundariesJaneLayer;
