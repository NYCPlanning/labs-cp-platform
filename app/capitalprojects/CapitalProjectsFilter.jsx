import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'
import Select from 'react-select'
import FontIcon from 'material-ui/FontIcon'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Tabs, Tab} from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'
import Divider from 'material-ui/Divider'
import Numeral from 'numeral'
import ContentInbox from 'material-ui/svg-icons/content/inbox';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

import carto from '../helpers/carto.js'
import config from './config.js'

var CapitalProjectsFilter = React.createClass({
  sqlChunks: {},

  getInitialState() {
    return({
      filterDimensions: {
        sagency: [],
        magency: [],
        source: [],
        cpstatus: [],
        type: []
      }, 
      totalCount: 0,
      selectedCount: 0
    })
  },

  componentDidMount() {

  },

  updateFilterDimension(key, values) {
    var self=this

    //before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    var abbreviated = values.map(function(value) {
      return {
        value: value.value,
        label: value.value
      }
    })

    this.state.filterDimensions[key] = abbreviated

    this.forceUpdate()
    this.buildSQL()
  },

  createSQLChunks() {
    //create an array of where clause chunks to be joined by 'AND'
    this.sqlChunks = {}

    var f = this.state.filterDimensions
    this.createMultiSelectSQLChunk('sagency', f.sagency)
    this.createMultiSelectSQLChunk('magency', f.magency)
    this.createMultiSelectSQLChunk('source', f.source)
    this.createMultiSelectSQLChunk('cpstatus', f.cpstatus)
    this.createMultiSelectSQLChunk('type', f.type)
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

    var select = 'SELECT cartodb_id, the_geom_webmercator, sagency, projectid, name FROM '
 
    var chunksArray = []
    for (var key in this.sqlChunks) {
      chunksArray.push(this.sqlChunks[key])
    }

    //join chunks with AND, or handle empty filters
    var chunksString = chunksArray.length > 0 ? chunksArray.join(' AND ') : 'true'

    var pointsSql = select + 'capeprojectspoints WHERE ' + chunksString
    var polygonsSql = select + 'capeprojectspolygons WHERE ' + chunksString
  
    this.props.updateSQL(pointsSql, polygonsSql)
    //this.getCount(sql)
  },

  render: function(){

    var self=this;
    return(
      <Tabs>
        <Tab 
          icon={<FontIcon className="fa fa-filter"/>}
          label="Filter"
        >
          <div className="col-md-12">
              <h3>Explore Capital Projects</h3>
              <p>
                Filter the data by choosing from the following attributes: 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip"> Learn more about the data</Tooltip>}>
                  <a href="http://docs.capitalplanning.nyc/cpdbv1/" target="_blank"> <i className="fa fa-info-circle" aria-hidden="true"></i></a>
                </OverlayTrigger>
              </p>
            </div>
            <div className="col-md-12">
              <div className="filter-count">
                {
                  (this.state.selectedCount == this.state.totalCount) ? 
                    <span>Showing all {Numeral(this.state.totalCount).format('0,0')} Projects</span> :
                    <span>Showing {Numeral(this.state.selectedCount).format('0,0')} of {Numeral(this.state.totalCount).format('0,0')} projects</span>
                }
              </div>
              <h5>
                Show projects where Sponsor Agency includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency <b>funding</b> the project</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger></h5>
              <Select
                multi
                placeholder='showing all sponsor agencies'
                value={this.state.filterDimensions.sagency}
                name="form-field-name"
                options={config.sponsorAgencies}
                onChange={this.updateFilterDimension.bind(this, 'sagency')}
              />
              <h5>
                and Managing Agency includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency <b>managing</b> the project</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='showing all managing agencies'
                value={this.state.filterDimensions.magency}
                name="form-field-name"
                options={config.managingAgencies}
                onChange={this.updateFilterDimension.bind(this, 'magency')}
              />
              <h5>
                and Source Agency includes
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency that <b>provided the raw data</b></Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='showing all source agencies'
                value={this.state.filterDimensions.source}
                name="form-field-name"
                options={config.sourceAgencies}
                onChange={this.updateFilterDimension.bind(this, 'source')}
              />
              <h5>
                and Status includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The current <b>phase of the project</b></Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger></h5>
              <Select
                multi
                placeholder='showing all project statuses'
                value={this.state.filterDimensions.cpstatus}
                name="form-field-name"
                options={config.statuses}
                onChange={this.updateFilterDimension.bind(this, 'cpstatus')}
              />
              <h5>
                and Type includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The <b>category</b> of the project</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='showing all project types'
                value={this.state.filterDimensions.type}
                name="form-field-name"
                options={config.types}
                onChange={this.updateFilterDimension.bind(this, 'type')}
              />
            </div>
        </Tab>
        <Tab 
          icon={<FontIcon className="fa fa-toggle-on"/>}
          label="Mode"
        >
          <div>
            <h2 style={styles.headline}>Tab Two</h2>
            <p>
              This is another example tab.
            </p>
          </div>
        </Tab>
        <Tab
          icon={<FontIcon className="fa fa-download"/>}
          label="Download"
        >
          <div>
            <h2 style={styles.headline}>Tab Three</h2>
            <p>
              This is a third example tab.
            </p>
          </div>
        </Tab>
      </Tabs>
      
    )
  }
})



module.exports=CapitalProjectsFilter
