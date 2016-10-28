import React from 'react' 
import Autosuggest from 'react-autosuggest';

import carto from '../helpers/carto.js'

function getSuggestionValue(suggestion) {
  return suggestion.properties.projectid + ' - ' + suggestion.properties.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.properties.projectid} - {suggestion.properties.name}</span>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 2;
}


var Search = React.createClass({

  getInitialState() {
    return {
      value: '',
      suggestions: []
    }
  },

  getSuggestions(value) {
    // returns a promise
    return carto.autoComplete(value.value)
  },

  onSuggestionsFetchRequested(value) {
    var self=this
    this.getSuggestions(value)
      .then(function(res) {
        var suggestions = res.features


        self.setState({
          suggestions: suggestions
        });   
      })


  },

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  },

  onChange(e, obj) {
    this.setState({
      value: obj.newValue
    });
  },

  onSuggestionSelected(e,o) {
    this.props.onSuggestionSelected(e,o)
    this.setState({
      value: ''
    })
  },

  render() {

      // Autosuggest will pass through all these props to the input field.
      const inputProps = {
        placeholder: 'Search for FMS ID or Project Name',
        value: this.state.value,
        onChange: this.onChange
      };

      // Finally, render it!
      return (
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          shouldRenderSuggestions={shouldRenderSuggestions}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected} />
      );
    }
  });

module.exports=Search;