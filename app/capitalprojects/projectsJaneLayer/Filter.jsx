// /facilities/FacLayerSelector.jsx - This component builds the layer selector which is used in the explorer
// Props:
//  layerStructure - A json containing the heirachy of domains, groups, and subgroups, and descriptions and colors
//  initialSQL - String containing the initial SQL state set in FacExplorer.jsx
//  updateSQL - String containing updates to SQL query based on checked layers

import React from 'react'
import ReactDOM from 'react-dom' 
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Select from 'react-select'

import CountWidget from '../../common/CountWidget.jsx'

import Carto from '../../helpers/carto.js'
import config from '../config.js'


const Filter = React.createClass({

  getInitialState() {
    return ({
      selectedCount: null,
      totalCount: null,
      filterDimensions: {
        agency: []
      }
    })
  },

  componentWillMount() {
    const self=this
    
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, agency, descriptio, totalcost',
      pointsTablename: 'adoyle.commitmentspoints',
      polygonsTablename: 'adoyle.commitmentspolygons',
    }

    self.buildSQL()
  },

  getTotalCount(sql) {
    const self=this

    Carto.getCount(sql)
      .then((count) => {
        self.setState({
          selectedCount: count,
          totalCount: count
        })
      })
  },

  updateFilterDimension(key, values) {
    const self=this

    //before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    const abbreviated = values.map(function(value) {
      return {
        value: value.value,
        label: value.value
      }
    })

    this.state.filterDimensions[key] = abbreviated

    //this.forceUpdate()
    this.buildSQL()
  },

  createSQLChunks() {
    //create an array of where clause chunks to be joined by 'AND'
    this.sqlChunks = {}

    var f = this.state.filterDimensions
    this.createMultiSelectSQLChunk('agency', f.agency)
  },

  createMultiSelectSQLChunk(dimension, values) {
    //for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    //like ( dimension = 'value1' OR dimension = 'value2')
    var subChunks = values.map(function(value) { 

      //custom handling for label "Unknown" to query for NULL 
      //TODO make this generic to handle nulls in other dimensions
      if (dimension == 'cpstatus' && value.label == 'Unknown') {
        return 'cpstatus IS NULL'
      }

      return dimension + ' = \'' + value.value + '\''
    })

    if(subChunks.length > 0) { //don't set sqlChunks if nothing is selected
      var chunk = '(' + subChunks.join(' OR ') + ')'

      this.sqlChunks[dimension] = chunk      
    }
  },

  buildSQL() {
    //the main event!  This method is called whenever any change is detected in the UI,
    //and ultimately ends up passing a new layerconfig to jane
    
    // let pointsSql, polygonsSql

    // pointsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.pointsTablename}`
    // polygonsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.polygonsTablename}`

    // const sql = this.unionSQL(pointsSql, polygonsSql)

    // if(this.state.totalCount == null) this.getTotalCount(sql)

    // this.props.updateSQL(pointsSql, polygonsSql)
    // this.getSelectedCount(sql)


        //assemble sql chunks based on the current state
    this.createSQLChunks()
 
    var chunksArray = []
    for (var key in this.sqlChunks) {
      chunksArray.push(this.sqlChunks[key])
    }

    //join chunks with AND, or handle empty filters
    var chunksString = chunksArray.length > 0 ? chunksArray.join(' AND ') : 'true'

    const pointsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.pointsTablename} WHERE ${chunksString}` 
    const polygonsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.polygonsTablename} WHERE ${chunksString}`
    const sql = this.unionSQL(pointsSql, polygonsSql)

    if(this.state.totalCount == null) this.getTotalCount(sql)

    this.getSelectedCount(pointsSql, polygonsSql)
    this.props.updateSQL(pointsSql, polygonsSql)


  },

  unionSQL(pointsSql, polygonsSql) {
    return `
      ${pointsSql}
      UNION ALL
      ${polygonsSql}
    `
  },

  getSelectedCount(sql) {
    const self=this
    
    Carto.getCount(sql)
      .then((count) => { self.setState({ selectedCount: count }) })
  },

  render() {
    const self=this;

    return(
      <div>
        <CountWidget 
          totalCount={this.state.totalCount} 
          selectedCount={this.state.selectedCount} 
          units={'projects'}
        />
        <Subheader>
          Agency 
          <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency associated with the project in FMS</Tooltip>}>
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </OverlayTrigger>
        </Subheader>

        <ListItem 
          disabled={true}
        >
          <Select
            multi
            placeholder='Select Agencies'
            value={this.state.filterDimensions.agency}
            name="form-field-name"
            options={config.agencies}
            onChange={this.updateFilterDimension.bind(this, 'agency')}
          />
        </ListItem>
      </div>
    )
  }
})



module.exports=Filter