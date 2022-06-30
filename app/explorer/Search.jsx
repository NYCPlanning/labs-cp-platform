import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
import ga from '../helpers/ga';

const streetName = (street) => {
  if (street.match(/^(.*[a-z]{3})[a-z0-9]+$/i)) return street.toLowerCase().replace(/[^']\b\w/g, l => l.toUpperCase());
  return street;
};

const addressString = s => `${streetName(s.properties.name)}, ${s.properties.borough}`;

function renderSuggestion(s) {
  return (
    <div><i className="fa fa-map-marker" aria-hidden="true" /><span>{addressString(s)}</span></div>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 2;
}

class Search extends React.Component {

  static displayName = 'Search';

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) ||
           !_.isEqual(this.state, nextState);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const apiCall = `https://geosearch.planninglabs.nyc/v2/autocomplete?text=${value}`;

    $.getJSON(apiCall, (data) => { // eslint-disable-line no-undef
      this.setState({
        suggestions: data.features,
      });
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  onChange = (e, obj) => {
    this.setState({
      value: obj.newValue,
    });
  }

  onSuggestionSelected = (e, o) => {
    this.setState({
      value: o.suggestionValue,
    });

    ga.event({
      category: 'search',
      action: 'search-term-selected',
      label: o.suggestion.properties.name,
    });

    // pass up to Jane to create/update Marker
    this.props.onGeocoderSelection(o.suggestion, o.suggestion.properties.name);
  }

  clearInput= () => {
    // tell Jane to hide Marker
    this.props.onClear();

    // set the input field to ''
    this.setState({
      value: '',
    });
  }

  render() {
    const inputProps = {
      placeholder: 'Search for an address',
      value: this.state.value,
      onChange: this.onChange,
    };

    return (
      <div
        className={'search'}
      >
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={addressString}
          renderSuggestion={renderSuggestion}
          shouldRenderSuggestions={shouldRenderSuggestions}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        {this.props.selectionActive ?
          <span className={'fa fa-times'} style={{ cursor: 'pointer' }} onClick={this.clearInput} /> :
          <span className={'fa fa-search'} style={{ cursor: 'pointer' }} />
        }
      </div>
    );
  }
}

Search.propTypes = {
  onGeocoderSelection: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  selectionActive: PropTypes.bool.isRequired,
};

module.exports = Search;
