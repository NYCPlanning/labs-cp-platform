import React from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';

import ga from '../helpers/ga';

const SplashDuo = React.createClass({
  getInitialState: () => ({
    selectedGeography: null,
    ntaSelectionValues: [],
    neighborhoodPlacholder: 'Explore a Neighborhood',
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

    ga.event({
      category: 'facilities-entry',
      action: 'neighborhood',
      label: selected.label,
    });
  },

  handleNeighborhoodBoxClick() {
    this.setState({
      neighborhoodPlacholder: 'Type to search',
    });
  },

  render() {
    return (
      <div className="splash-button-section">
        <div className="box all-link">
          <Link
            to="/facilities/explorer"
            className="btn btn-default"
            onClick={() => ga.event({
              category: 'facilities-entry',
              action: 'go-to-map',
            })}
          >
            <div className="vertical-align">Go to Map</div>
          </Link>
        </div>

        <div className="box or-text">
          <div className="vertical-align">or</div>
        </div>

        <div className="box neighborhood-link" onClick={this.handleNeighborhoodBoxClick}>
          <Select
            multi={false}
            placeholder={this.state.neighborhoodPlacholder}
            value={this.state.selectedGeography}
            name="form-field-name"
            options={this.state.ntaSelectionValues}
            onChange={this.handleGeographySelection}
          />
        </div>
      </div>
    );
  },
});

export default SplashDuo;
