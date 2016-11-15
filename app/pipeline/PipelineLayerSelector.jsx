// /facilities/PipelineLayerSelector.jsx - This component builds the layer selector which is used in the explorer
// Props:
//  updateSQL - String containing updates to SQL query based on checked layers
//  value - Value associated with checkbox
//  checked - Checked status associated with value in checkbox
//  onChange - Action related to status change in checkbox


import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'
import Select from 'react-select'

import carto from '../helpers/carto.js'

var filterDimensions = {
  sqlChunks: {},

  dcp_pipeline_status: {
    label: 'Project Status',
    options: [  
      {
        label: 'Complete',
        value: 'Complete'
      },
      {
        label: 'Partial complete',
        value: 'Partial complete'
      },
      {
        label: 'Permit outstanding',
        value: 'Permit outstanding'
      },
      {
        label: 'Permit pending',
        value: 'Permit pending'
      }
    ]
  },
  dcp_pipeline_category: {
    label: 'Project Status',
    options: [  
      {
        label: 'Residential-New',
        value: 'Residential-New'
      },
      {
        label: 'Hotel-New',
        value: 'Hotel-New'
      },
      {
        label: 'Residential-Alteration',
        value: 'Residential-Alteration'
      },
      {
        label: 'Hotel-Alteration',
        value: 'Hotel-Alteration'
      }
    ]
  }
}


var LayerSelector = React.createClass({
  sqlChunks: {},

  getInitialState: function() {
    return ({
      selectedCount: '__',
      totalCount:'__',
      dateFilter: true,
      filterDimensions: {
        dcp_pipeline_status: [
          {
            label: 'Complete',
            value: 'Complete'
          },
          {
            label: 'Partial complete',
            value: 'Partial complete'
          }
        ],
        dcp_pipeline_category: filterDimensions['dcp_pipeline_category'].options,
        dcp_units_use_map: [-310,1670],
        dob_cofo_date: [Moment('2011-1-1').format('X'), Moment().format('X')]
      }
    })
  },

  componentDidMount() {

  },

  handleChange(dimension, values) {
    //before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    this.state.filterDimensions[dimension] = values

    //if dimension is status, check which items are included and disable/reset date slider accordingly
    if(dimension == 'dcp_pipeline_status') {
      var invalidValues = values.filter(function(value) {
        if(value.value == 'Permit outstanding' || value.value == 'Permit pending') return value.value
      })

      if (invalidValues.length > 0 || values.length == 0 ) {
        console.log('disabling dateFilter')
        this.state.filterDimensions.dob_cofo_date = [Moment('2011-1-1').format('X'), Moment().format('X')]
        this.state.dateFilter = false
      } else {
        this.state.dateFilter = true
      }
    }

    this.forceUpdate()
    this.buildSQL()
  },

  handleSliderChange(dimension, data) { 
    //expects the data output from the ionRangeSlider 
    //updates state with an array of the filter range
    this.state.filterDimensions[dimension] = [ data.from, data.to ]
    this.buildSQL()
  },

  createSQLChunks() {
    this.sqlChunks = {}
    //generate SQL WHERE partials for each filter dimension
    this.createMultiSelectSQLChunk('dcp_pipeline_status', this.state.filterDimensions.dcp_pipeline_status)
    this.createMultiSelectSQLChunk('dcp_pipeline_category', this.state.filterDimensions.dcp_pipeline_category)
    this.createUnitsSQLChunk('dcp_units_use_map', this.state.filterDimensions.dcp_units_use_map)
    
    if(this.state.dateFilter) {
      this.createDateSQLChunk('dob_cofo_date', this.state.filterDimensions.dob_cofo_date)
    }
  },

  createUnitsSQLChunk(dimension, range) {
    this.sqlChunks[dimension] = Mustache.render('(dcp_units_use_map >= \'{{from}}\' AND dcp_units_use_map <= \'{{to}}\')', {
      from: range[0],
      to: range[1]
    })
  },

  createDateSQLChunk(dimension, range) {
    var dateRangeFormatted = {
      from:Moment(range[0], 'X').format('YYYY-MM-DD'),
      to:Moment(range[1], 'X').format('YYYY-MM-DD')
    }

    if(this.state.dateFilter) {
      this.sqlChunks[dimension] = Mustache.render(
      'NOT (dob_cofo_date_first >= \'{{to}}\' OR dob_cofo_date_last <= \'{{from}}\')', dateRangeFormatted
      )
    } 
  },

  createMultiSelectSQLChunk(dimension, values) {
    //for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    //like ( dimension = 'value1' OR dimension = 'value2')
    var subChunks = values.map(function(value) {
      return dimension + ' = \'' + value.value + '\''
    })

    if(subChunks.length > 0) { //don't set sqlChunks if nothing is selected
      var chunk = '(' + subChunks.join(' OR ') + ')'

      this.sqlChunks[dimension] = chunk      
    }


  },

  buildSQL() {

    //assemble sql chunks based on the current state
    this.createSQLChunks()

    var sqlTemplate = 'SELECT * FROM nchatterjee.dob_permits_cofos_hpd_geocode WHERE '

    var chunksArray = []
    for (var key in this.sqlChunks) {
      chunksArray.push(this.sqlChunks[key])
    }


    var chunksString = chunksArray.join(' AND ')


    var sql = sqlTemplate + chunksString
    this.props.updateSQL(sql)
    //this.getCount(sql)
  },

  render: function(){

    var self=this;
    return(
      <div>
        <div className="col-md-12">
            <h4>Project Status</h4>  
            <Select
              multi
              value={this.state.filterDimensions.dcp_pipeline_status}
              name="form-field-name"
              placeholder="No Status Filter Applied"
              options={filterDimensions['dcp_pipeline_status'].options}
              onChange={this.handleChange.bind(this, 'dcp_pipeline_status')}
            />
            <h4>Category</h4>  
            <Select
              multi
              value={this.state.filterDimensions.dcp_pipeline_category}
              name="form-field-name"
              placeholder="No Category Filter Applied"
              options={filterDimensions['dcp_pipeline_category'].options}
              onChange={this.handleChange.bind(this, 'dcp_pipeline_category')}
            />

            <h4>Net Units</h4> 
            <RangeSlider 
              data={this.state.filterDimensions.dcp_units_use_map}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dcp_units_use_map')}/>

            <h4>Completion Date</h4>  
            <RangeSlider 
              data={this.state.filterDimensions.dob_cofo_date}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dob_cofo_date')}
              disable={!this.state.dateFilter}
              prettify= {function (date) {
                  return Moment(date, 'X').format('MMM YYYY');
              }}/>
        </div>
      </div>
    )
  }
})



module.exports=LayerSelector

var RangeSlider = React.createClass({
  //Props: 
  //  data - array with min and max

  componentDidMount() {
    var self=this
    $(this.refs.sliderEl).ionRangeSlider({
      type: self.props.type,
      min: self.props.data[0],
      max: self.props.data[1],
      from: self.props.data[0],
      to: self.props.data[1],
      step: self.props.step,
      disable: self.props.disable ? self.props.disable : false,
      onFinish: self.props.onChange,
      prettify: self.props.prettify
    });

    this.slider = $(this.refs.sliderEl).data("ionRangeSlider");
  },

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    if(nextProps.disable) {
      this.slider.update({
        min: nextProps.data[0],
        max: nextProps.data[1],
        from: nextProps.data[0],
        to: nextProps.data[1],
        disable: true
      })      
    } else {
      this.slider.update({
        disable: false
      }) 
    }
  },

  render: function() {
    return(
      <input type="text" ref="sliderEl" value=""/>
    )
  }
})
   
