//AgencySelector.jsx - Implements react-select with appropriate agency abbreviations showing on the chips instead of full names
//Props:
//  updateFilters - function that the array of selected values is passed to when the component changes

import React from 'react'
import Select from 'react-select'

var AgencySelector = React.createClass({

  getInitialState() {
    return {
      value: []
    }
  },

  handleChange(values) {
    //before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component

    var abbreviated = values.map(function(value) {
      return {
        value: value.value,
        label: value.value
      }
    })

    this.setState({
      values: abbreviated
    })

    this.props.updateFilters(values)
  },


  render() {
    return(
      <Select
        multi
        value={this.state.values}
        name="form-field-name"
        options={options}
        onChange={this.handleChange}
        onInputChange={this.changeInput}
      />
    )
  }
})

module.exports=AgencySelector

