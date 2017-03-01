import React from 'react';
import { Link } from 'react-router';
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
    this.setState({ selectedGeography: selected.value });
  },

  render() {
    return (
      <div className="splash-trio">
        <div className="box all-link">
          <Link to="/facilities/explorer" className="btn btn-default">Explore all sites <i className="fa fa-arrow-right dcp-orange" aria-hidden="true" /></Link>
        </div>
        <div className="box neighborhood-link ">
          <div className="neighborhood-text">
            Explore a neighborhood
          </div>
          <Select
            multi={false}
            placeholder="Select one"
            value={this.state.selectedGeography}
            name="form-field-name"
            options={this.state.ntaSelectionValues}
            onChange={this.handleGeographySelection}
          />
          <Link
            to={{
              pathname: '/facilities/explorer',
              state: {
                adminboundaries: {
                  type: 'nta',
                  value: this.state.selectedGeography,
                },
              },
            }}
          >
            <div className="neighborhood-arrow">
              <i className={`fa fa-arrow-right dcp-orange ${this.state.selectedGeography === null ? 'disabled' : null} `} aria-hidden="true" />
            </div>
          </Link>
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
            City Owned and Leased Sites <i className="fa fa-arrow-right dcp-orange" aria-hidden="true" />
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
            Community Facilities <i className="fa fa-arrow-right dcp-orange" aria-hidden="true" />
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
            Children, Seniors, ADA Facilities <i className="fa fa-arrow-right dcp-orange" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  },

});

export default SplashTrio;
