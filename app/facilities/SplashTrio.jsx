import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';

import layersGenerator from './layersGenerator';

const SplashTrio = React.createClass({
  getInitialState: () => ({
    selectedGeography: null,
    ntaSelectionValues: [],
  }),

  componentDidMount() {
    $.getJSON('/data/ntas.json', (data) => { // eslint-disable-line no-undef
      this.setState({ ntaSelectionValues: data });
    });
  },

  handleGeographySelection(selected) {
    browserHistory.push({
      pathname: '/facilities/explorer',
      state: {
        adminboundaries: {
          type: 'nta',
          value: selected.value,
        },
      },
    });
  },

  render() {
    return (
      <div className="splash-trio">
        <div className="box all-link">
          <Link to="/facilities/explorer" className="btn btn-default">
            <div className="vertical-align">Explore all sites</div>
          </Link>
        </div>

        <div className="box or-text">
          <div className="vertical-align">or</div>
        </div>

        <div className="box neighborhood-link">
          <Select
            multi={false}
            placeholder="Explore a neighborhood"
            value={this.state.selectedGeography}
            name="form-field-name"
            options={this.state.ntaSelectionValues}
            onChange={this.handleGeographySelection}
          />
        </div>

        <div className="box or-text">
          <div className="vertical-align">or</div>
        </div>

        <div className="box preset-link">
          <Link
            className="btn btn-default"
            to={{
              pathname: '/facilities/explorer',
              state: {
                filterDimensions: {
                  propertytype: [
                    { value: 'City Owned', label: 'City Owned' },
                    { value: 'City Leased', label: 'City Leased' },
                  ],
                },
              },
            }}
          >
            City Owned and Leased Sites
          </Link>

          <Link
            className="btn btn-default"
            to={{
              pathname: '/facilities/explorer',
              state: {
                layers: layersGenerator.partialChecked({
                  'Health and Human Services': { 'Health Care': null },
                  'Education, Child Welfare, and Youth': {
                    'Schools (K-12)': { 'Public Schools': null },
                    'Child Care and Pre-Kindergarten': null,
                  },
                  'Libraries and Cultural Programs': { Libraries: { 'Public Libraries': null } },
                  'Public Safety, Emergency Services, and Administration of Justice': {
                    'Emergency Services': { 'Fire Services': null },
                    'Public Safety': { 'Police Services': null },
                  },
                }),
              },
            }}
          >
            Community Facilities
          </Link>

          <Link
            className="btn btn-default"
            to={{
              pathname: '/facilities/explorer',
              state: {
                layers: layersGenerator.partialChecked({
                  'Health and Human Services': {
                    'Human Services': { 'Senior Services': null, 'Programs for People with Disabilities': null },
                  },
                  'Education, Child Welfare, and Youth': {
                    'Schools (K-12)': null,
                    'Child Care and Pre-Kindergarten': null,
                    'Child Welfare': null,
                    'Youth Services': null,
                    Camps: null,
                  },
                }),
              },
            }}
          >
            Children, Seniors, ADA Facilities
          </Link>
        </div>
      </div>
    );
  },

});

export default SplashTrio;
