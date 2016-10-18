import React from 'react' 
import Autosuggest from 'react-autosuggest';

function getSuggestionValue(suggestion) {
  return suggestion.properties.idfms + ' - ' + suggestion.properties.projectname;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.properties.idfms} - {suggestion.properties.projectname}</span>
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
    var self=this
    const inputValue = value.value.trim().toLowerCase();

    var matches = [];
    var regexp = new RegExp(inputValue, 'gi');

    this.props.data.forEach(function(d) {
      var p = d.properties;
      var match = false;

      //match project name
      if(p.projectname) {
        if (p.projectname.match(regexp)) match=true 
      }

      //match project description
      if(p.idfms) {
        if (p.idfms.match(regexp)) match=true 
      }

      if(match) matches.push(d);
    })

    return matches;

  },

  onSuggestionsFetchRequested(value) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
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
        placeholder: 'Search for FMS ID, Project Name, or Project Description',
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