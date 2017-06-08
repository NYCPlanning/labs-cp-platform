import React from 'react';
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from 'jane-maps';

import SidebarComponent from './SidebarComponent';
import { mapLayers } from './config';

class AdminBoundariesJaneLayer extends React.Component {
  static propTypes = {
    defaultSelected: PropTypes.bool,
    defaultDisabled: PropTypes.bool,
  };

  static defaultProps = {
    defaultSelected: false,
    defaultDisabled: false,
  }

  constructor() {
    super();
    this.state = { selected: 'cd' };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange(value) {
    this.setState({ selected: value });
  }

  renderNTA() {
    if (!this.state.selected.nta) {
      return;
    }

    return [
      <Source id="nta" type="geojson" data="/data/ntaboundaries.geojson" />,
      <MapLayer id="ntaboundaries" source="nta" config={mapLayers.ntaboundaries} />,
      <MapLayer id="ntaboundaries_labels" source="nta" config={mapLayers.ntaboundaries_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCensusTracts() {
    if (!this.state.selected.censustracts) {
      return;
    }

    return [
      <Source id="censustracts" type="geojson" data="/data/CensusTracts.geojson" />,
      <MapLayer id="censustracts" source="censustracts" config={mapLayers.censustracts} />,
      <MapLayer id="censustracts_labels" source="censustracts" config={mapLayers.censustracts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderPUMA() {
    if (!this.state.selected.puma) {
      return;
    }

    return [
      <Source id="puma" type="geojson" data="/data/puma.geojson" />,
      <MapLayer id="puma" source="puma" config={mapLayers.puma} />,
      <MapLayer id="puma_labels" source="puma" config={mapLayers.puma_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderTAZ() {
    if (!this.state.selected.taz) {
      return;
    }

    return [
      <Source id="taz" type="geojson" data="/data/TrafficAnalysisZones.geojson" />,
      <MapLayer id="taz" source="taz" config={mapLayers.taz} />,
      <MapLayer id="taz_labels" source="taz" config={mapLayers.taz_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCD() {
    if (!this.state.selected.cd) {
      return;
    }

    return [
      <Source id="cd" type="geojson" data="/data/cdboundaries.geojson" />,
      <MapLayer id="cd" source="cd" config={mapLayers.cd} />,
      <MapLayer id="cd_labels" source="cd" config={mapLayers.cd_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderSchoolDistricts() {
    if (!this.state.selected.schooldistricts) {
      return;
    }

    return [
      <Source id="schooldistricts" type="geojson" data="/data/schooldistricts.geojson" />,
      <MapLayer id="schooldistricts" source="schooldistricts" config={mapLayers.schooldistricts} />,
      <MapLayer id="schooldistricts_labels" source="schooldistricts" config={mapLayers.schooldistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderBoroughBoundaries() {
    if (!this.state.selected.boroughboundaries) {
      return;
    }

    return [
      <Source id="boroughboundaries" type="geojson" data="/data/BoroughBoundaries.geojson" />,
      <MapLayer id="boroughboundaries" source="boroughboundaries" config={mapLayers.boroughboundaries} />,
      <MapLayer id="boroughboundaries_labels" source="boroughboundaries" config={mapLayers.boroughboundaries_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderCityCouncilDistricts() {
    if (!this.state.selected.citycouncildistricts) {
      return;
    }

    return [
      <Source id="citycouncildistricts" type="geojson" data="/data/CityCouncilDistricts.geojson" />,
      <MapLayer id="citycouncildistricts" source="citycouncildistricts" config={mapLayers.citycouncildistricts} />,
      <MapLayer id="citycouncildistricts_labels" source="citycouncildistricts" config={mapLayers.citycouncildistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderMunicipalCourtDistricts() {
    if (!this.state.selected.municipalcourtdistricts) {
      return;
    }

    return [
      <Source id="municipalcourtdistricts" type="geojson" data="/data/MunicipalCourtDistricts.geojson" />,
      <MapLayer id="municipalcourtdistricts" source="municipalcourtdistricts" config={mapLayers.municipalcourtdistricts} />,
      <MapLayer id="municipalcourtdistricts_labels" source="municipalcourtdistricts" config={mapLayers.municipalcourtdistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderFireBattalions() {
    if (!this.state.selected.firebattalions) {
      return;
    }

    return [
      <Source id="firebattalions" type="geojson" data="/data/FireBattalions.geojson" />,
      <MapLayer id="firebattalions" source="firebattalions" config={mapLayers.firebattalions} />,
      <MapLayer id="firebattalions_labels" source="firebattalions" config={mapLayers.firebattalions_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderFireCompanies() {
    if (!this.state.selected.firecompanies) {
      return;
    }

    return [
      <Source id="firecompanies" type="geojson" data="/data/FireCompanies.geojson" />,
      <MapLayer id="firecompanies" source="firecompanies" config={mapLayers.firecompanies} />,
      <MapLayer id="firecompanies_labels" source="firecompanies" config={mapLayers.firecompanies_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderFireDivisions() {
    if (!this.state.selected.firedivisions) {
      return;
    }

    return [
      <Source id="firedivisions" type="geojson" data="/data/FireDivisions.geojson" />,
      <MapLayer id="firedivisions" source="firedivisions" config={mapLayers.firedivisions} />,
      <MapLayer id="firedivisions_labels" source="firedivisions" config={mapLayers.firedivisions_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderPolicePrecincts() {
    if (!this.state.selected.policeprecincts) {
      return;
    }

    return [
      <Source id="policeprecincts" type="geojson" data="/data/PolicePrecincts.geojson" />,
      <MapLayer id="policeprecincts" source="policeprecincts" config={mapLayers.policeprecincts} />,
      <MapLayer id="policeprecincts_labels" source="policeprecincts" config={mapLayers.policeprecincts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderStateAssemblyDistricts() {
    if (!this.state.selected.stateassemblydistricts) {
      return;
    }

    return [
      <Source id="stateassemblydistricts" type="geojson" data="/data/StateAssemblyDistricts.geojson" />,
      <MapLayer id="stateassemblydistricts" source="stateassemblydistricts" config={mapLayers.stateassemblydistricts} />,
      <MapLayer id="stateassemblydistricts_labels" source="stateassemblydistricts" config={mapLayers.stateassemblydistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderStateSenateDistricts() {
    if (!this.state.selected.statesenatedistricts) {
      return;
    }

    return [
      <Source id="statesenatedistricts" type="geojson" data="/data/StateSenateDistricts.geojson" />,
      <MapLayer id="statesenatedistricts" source="statesenatedistricts" config={mapLayers.statesenatedistricts} />,
      <MapLayer id="statesenatedistricts_labels" source="statesenatedistricts" config={mapLayers.statesenatedistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  renderUSCongressionalDistricts() {
    if (!this.state.selected.uscongressionaldistricts) {
      return;
    }

    return [
      <Source id="uscongressionaldistricts" type="geojson" data="/data/USCongressionalDistricts.geojson" />,
      <MapLayer id="uscongressionaldistricts" source="uscongressionaldistricts" config={mapLayers.uscongressionaldistricts} />,
      <MapLayer id="uscongressionaldistricts_labels" source="uscongressionaldistricts" config={mapLayers.uscongressionaldistricts_labels} />,
    ].map((child, index) => ({ ...child, key: index }));
  }

  render() {
    return (
      <JaneLayer
        id="admin_boundaries"
        name="Admin Boundaries"
        icon="subway"
        defaultSelected={this.props.defaultSelected}
        defaultDisabled={this.props.defaultDisabled}
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

        { this.renderSchoolDistricts() }
        { this.renderFireDivisions() }
        { this.renderFireBattalions() }
        { this.renderFireCompanies() }
        { this.renderPolicePrecincts() }
      </JaneLayer>
    );
  }
}

export default AdminBoundariesJaneLayer;
