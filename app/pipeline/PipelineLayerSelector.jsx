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
import FontIcon from 'material-ui/FontIcon'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import Divider from 'material-ui/Divider'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

import carto from '../helpers/carto.js'

import ContentInbox from 'material-ui/svg-icons/content/inbox';

var filterDimensions = {
  sqlChunks: {},

  dcp_pipeline_status: {
    label: 'Development Status',
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
      },
      {
        label: 'Demolition (complete)',
        value: 'Demolition (complete)'        
      }


    ]
  },
  dcp_pipeline_category: {
    label: 'Development Status',
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
      },
      {
        label: 'Residential-Demolition',
        value: 'Residential-Demolition'
      },
      {
        label: 'Hotel-Demolition',
        value: 'Hotel-Demolition'
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
        dob_cofo_date: [Moment('2010-12-31T19:00:00-05:00').format('X'), Moment().format('X')]
      }
    })
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

    this.sqlChunks[dimension] = `(dcp_units_use_map >= \'${range[0]}\' AND dcp_units_use_map <= \'${range[1]}\')`
  },

  createDateSQLChunk(dimension, range) {
    var dateRangeFormatted = {
      from:Moment(range[0], 'X').format('YYYY-MM-DD'),
      to:Moment(range[1], 'X').format('YYYY-MM-DD')
    }

    if(this.state.dateFilter) {
      this.sqlChunks[dimension] = `NOT (dob_cofo_date_first >= \'${dateRangeFormatted.to}\' OR dob_cofo_date_last <= \'${dateRangeFormatted.from}\')`
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

    var sqlTemplate = `SELECT ${this.props.sqlConfig.columns} FROM ${this.props.sqlConfig.tablename} WHERE `

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
        <Toolbar >
          <ToolbarGroup>
            <ToolbarTitle text="Housing Pipeline Data Layer" />
          </ToolbarGroup>
        </Toolbar>
        <Tabs>
          <Tab 
            icon={<FontIcon className="fa fa-filter"/>}
            label="Filter"
          >
          <div>
            <List>
              <Subheader>
                Development Status
                <InfoIcon text='Categorizes developments based on construction status, determined using DOB Permit and Certificate of Occupancy data'/> 
              </Subheader>
              <ListItem 
                disabled={true}
              >
                <Select
                  multi
                  value={this.state.filterDimensions.dcp_pipeline_status}
                  name="form-field-name"
                  placeholder="No Status Filter Applied"
                  options={filterDimensions['dcp_pipeline_status'].options}
                  onChange={this.handleChange.bind(this, 'dcp_pipeline_status')}
                />
              </ListItem>
              <Divider/>

              <Subheader>
                Category
                <InfoIcon text='Categorizes developments based on the construction and housing types, determined using DOB Permit data'/>
              </Subheader>
              <ListItem 
                disabled={true}
              >
                <Select
                  multi
                  value={this.state.filterDimensions.dcp_pipeline_category}
                  name="form-field-name"
                  placeholder="No Category Filter Applied"
                  options={filterDimensions['dcp_pipeline_category'].options}
                  onChange={this.handleChange.bind(this, 'dcp_pipeline_category')}
                />
              </ListItem>
              <Divider/>

              <Subheader>
                Development Size (Net Units)
                <InfoIcon text='Net change in units resulting from development. Negative values occur from demolitions and/or alterations that reduce the number of units.'/>
              </Subheader>
              <ListItem 
                disabled={true}
              >
                <RangeSlider 
                data={this.state.filterDimensions.dcp_units_use_map}
                type={'double'}
                onChange={this.handleSliderChange.bind(this, 'dcp_units_use_map')}/>
              </ListItem>
              <Divider/>

              <Subheader>
                Completion Date
                <InfoIcon text='Reflects date(s) when developments have received Certificate(s) of Occupancy (CofO). If a development has received multiple CofOs, filter evalutes timeframe between earliest CofO (since 2010) and most recent CofO.'/>
              </Subheader> 
              <ListItem 
                disabled={true}
              >
                <RangeSlider 
                data={this.state.filterDimensions.dob_cofo_date}
                type={'double'}
                onChange={this.handleSliderChange.bind(this, 'dob_cofo_date')}
                disable={!this.state.dateFilter}
                prettify= {function (date) {
                    return Moment(date, 'X').format('MMM YYYY');
                }}/>
              </ListItem>
            </List>
          </div>
          </Tab>
          <Tab 
            icon={<FontIcon className="fa fa-toggle-on"/>}
            label="Mode"
          >
            <div>
              <List>
                <ListItem>
                  Coming Soon
                </ListItem>
              </List>
            </div>
          </Tab>
          <Tab
            icon={<FontIcon className="fa fa-download"/>}
            label="Download"
          >
            <div>
              <List>
                <ListItem>
                  Coming Soon
                </ListItem>
              </List>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
})



module.exports=LayerSelector

function InfoIcon(props) {
  return (
    <OverlayTrigger 
      placement="right" 
      overlay={ 
        <Tooltip id="tooltip">{props.text}</Tooltip>
      }
    >
      <i className="fa fa-info-circle" aria-hidden="true"></i>
    </OverlayTrigger> 

  )
}


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
   
