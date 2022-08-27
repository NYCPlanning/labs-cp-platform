import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';

import ga from '../helpers/ga';
import * as facilitiesActions from '../actions/facilities';

class SplashDuo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGeography: null,
      ntaSelectionValues: [],
      neighborhoodPlaceholder: 'Explore a Neighborhood',
      dimension: 'nta2020',
    };
  }

  componentDidMount() {
    $.getJSON('/data/ntas.json', (data) => { // eslint-disable-line no-undef
      this.setState({ ntaSelectionValues: data });
    });
  }

  handleGeographySelection = (selected) => {
    this.handleSelectChange(selected.value);

    this.updateFilterDimension(this.state.dimension, this.state.ntaSelectionValues);

    const ntaDimension = this.state.ntaSelectionValues;

    browserHistory.push({
      pathname: '/map/facilities',
      state: {
        adminboundaries: {
          type: 'nta2020',
          value: selected.value,
          ntaDimension: ntaDimension,
        },
      },
    });

    ga.event({
      category: 'facilities-entry',
      action: 'neighborhood',
      label: selected.label,
    });
  }

  handleNeighborhoodBoxClick = () => {
    this.setState({
      neighborhoodPlaceholder: 'Type to search',
    });
  }

updateFilterDimension = (dimension, values) => {
  this.props.setFilterDimension(dimension, values);
};

  handleSelectChange = (ntaSelection) => {
    this.state.ntaSelectionValues.forEach(nta => {
      if (nta.value !== ntaSelection) {
        nta['checked'] = false;
      } else {
        nta['checked'] = true;
      }
    });
  }

  render() {
    return (
      <div className="splash-button-section">
        <div className="box all-link">
          <Link
            to="/map/facilities"
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
            placeholder={this.state.neighborhoodPlaceholder}
            value={this.state.selectedGeography}
            name="form-field-name"
            options={this.state.ntaSelectionValues}
            onChange={this.handleGeographySelection}
          />
        </div>
      </div>
    );
  }
}

SplashDuo.PropTypes = {
  setFilterDimension: PropTypes.func.isRequired,
}

const mapStateToProps = ({ facilities }) => ({
  setFilterDimension: facilities.setFilterDimension,
});

export default connect(mapStateToProps, {
  setFilterDimension: facilitiesActions.setFilterDimension,
})(SplashDuo);

