// MapzenGeocoder.jsx - Autocomplete geocoder component
// Props: 
//   onSelection - function to be called when the user chooses an autocomplete selection
//   The geocoder will pass a geojson feature to onSelection(), which can be used to zoom a map into that location and create a marker

import React from 'react'
import Autosuggest from 'react-autosuggest'

function getSuggestionValue(suggestion) {
  return suggestion.properties.label
}

function renderSuggestion(suggestion) {
  return (
    <div><i className="fa fa-map-marker" aria-hidden="true"></i><span>{suggestion.properties.label}</span></div>
  )
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 2;
}

var MapzenGeocoder = React.createClass({

  getInitialState() {
    return {
      value: '',
      suggestions: []
    }
  },

  onSuggestionsFetchRequested({ value }) {
    var self=this

    var minLon = -74.292297,
      maxLon = -73.618011,
      minLat = 40.477248,
      maxLat = 40.958123

    var apiCall=`https://search.mapzen.com/v1/autocomplete?text=${value}&boundary.rect.min_lon=${minLon}&boundary.rect.max_lon=${maxLon}&boundary.rect.min_lat=${minLat}&boundary.rect.max_lat=${maxLat}&api_key=mapzen-ZyMEp5H`

    $.getJSON(apiCall, function(data) {
      self.setState({
        suggestions: data.features
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
    this.setState({
      value: o.suggestionValue
    })

    this.props.onSelection(o.suggestion)
  },

  render() {
    const inputProps = {
      placeholder: 'Search for an address',
      value: this.state.value,
      onChange: this.onChange
    };

    return(
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected} />
    )
  }
})

module.exports=MapzenGeocoder