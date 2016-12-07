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
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'

import CountWidget from '../common/CountWidget.jsx'

import carto from '../helpers/carto.js'
import config from './config.js'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

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
      totalCount: null,
      selectedCount: null
    })
  },

  componentDidMount() {

    var totalQuery = 'SELECT cartodb_id FROM capeprojectspoints UNION ALL SELECT cartodb_id FROM capeprojectspolygons'

    carto.getCount(totalQuery)
      .then((count) => {
        console.log(count)

        //set both selected and total to the total count since there are no filters applied by default
        this.setState({ 
          selectedCount: count,
          totalCount: count 
        })
      })

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

  getSelectedCount(pointsSql, polygonsSql) {
    var self=this
    //UNION the two queries, get count, update state.selectedCount
    var sql = `${pointsSql} UNION ALL ${polygonsSql}`

    carto.getCount(sql)
      .then((count) => self.setState({ selectedCount: count }))
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
  

    this.getSelectedCount(pointsSql, polygonsSql)
    this.props.updateSQL(pointsSql, polygonsSql)
    //this.getCount(sql)
  },

  render: function(){

    var self=this;
    return(
      <div>
        <Toolbar >
          <ToolbarGroup>
            <ToolbarTitle text="Capital Projects Data Layer" />
          </ToolbarGroup>
        </Toolbar>
        <Tabs>
          <Tab 
            icon={<FontIcon className="fa fa-filter"/>}
            label="Filter"
          >
            <div>
              <List>
                <CountWidget 
                  totalCount={this.state.totalCount} 
                  selectedCount={this.state.selectedCount} 
                  units={'projects'}
                />
                <Subheader>
                  Sponsor Agency 
                  <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency <b>funding</b> the project</Tooltip>}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </Subheader>
                <ListItem 
                  leftIcon={<FontIcon className="fa fa-balance-scale" />} 
                  disabled={true}
                >
                  <Select
                    multi
                    placeholder='Select'
                    value={this.state.filterDimensions.sagency}
                    name="form-field-name"
                    options={config.sponsorAgencies}
                    onChange={this.updateFilterDimension.bind(this, 'sagency')}
                  />
                </ListItem>

                <Divider/>

                <Subheader>
                  Managing Agency 
                  <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency <b>managing</b> the project</Tooltip>}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </Subheader>
                <ListItem 
                  leftIcon={<FontIcon className="fa fa-balance-scale" />} 
                  disabled={true}
                >
                  <Select
                  multi
                  placeholder='Select Agencies'
                  value={this.state.filterDimensions.magency}
                  name="form-field-name"
                  options={config.managingAgencies}
                  onChange={this.updateFilterDimension.bind(this, 'magency')}
                />
                </ListItem>

                <Divider/>

                <Subheader>
                  Source Agency 
                  <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency that <b>provided the raw data</b></Tooltip>}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </Subheader>
                <ListItem 
                  leftIcon={<FontIcon className="fa fa-balance-scale" />} 
                  disabled={true}
                >
                  <Select
                    multi
                    placeholder='Select Agencies'
                    value={this.state.filterDimensions.source}
                    name="form-field-name"
                    options={config.sourceAgencies}
                    onChange={this.updateFilterDimension.bind(this, 'source')}
                  />
                </ListItem>

                <Divider/>

                <Subheader>
                  Status
                  <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The current <b>phase of the project</b></Tooltip>}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </Subheader>
                <ListItem 
                  leftIcon={<FontIcon className="fa fa-balance-scale" />} 
                  disabled={true}
                >
                  <Select
                    multi
                    placeholder='Select Statuses'
                    value={this.state.filterDimensions.cpstatus}
                    name="form-field-name"
                    options={config.statuses}
                    onChange={this.updateFilterDimension.bind(this, 'cpstatus')}
                  />
                </ListItem>

                <Divider/>

                <Subheader>
                  Type 
                  <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The <b>category</b> of the project</Tooltip>}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                </Subheader>
                <ListItem 
                  leftIcon={<FontIcon className="fa fa-balance-scale" />} 
                  disabled={true}
                >
                  <Select
                    multi
                    placeholder='Select Types'
                    value={this.state.filterDimensions.type}
                    name="form-field-name"
                    options={config.types}
                    onChange={this.updateFilterDimension.bind(this, 'type')}
                  />
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

module.exports=CapitalProjectsFilter
