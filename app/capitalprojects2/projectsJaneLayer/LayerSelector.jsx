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

import CountWidget from '../../common/CountWidget.jsx'

import facilitiesLayers from '../facilitiesLayers.js'
import Carto from '../../helpers/carto.js'

import '../../../stylesheets/facilities/FacLayerSelector.scss'

const LayerSelector = React.createClass({

  getInitialState() {
    return ({
      layers: [],
      selectedCount: null,
      totalCount: null,
      checked: 'all' //all, none, or null
    })
  },

  /*checks to see if there is only one domain.*/
  /*if it's a domain subset page (only one domain), expands all and then requests that count be updated*/
  componentWillMount() {
    const self=this
    
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, agency',
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

  buildSQL() {
    //the main event!  This method is called whenever any change is detected in the UI,
    //and ultimately ends up passing a new layerconfig to jane
    
    let pointsSql, polygonsSql

    pointsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.pointsTablename}`
    polygonsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.polygonsTablename}`



    //if(this.state.totalCount == null) this.getTotalCount(sql)

    this.props.updateSQL(pointsSql, polygonsSql)
    //this.getSelectedCount(pointsSql, polygonsSql)
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
        Layer UI!
      </div>
    )
  }
})



module.exports=LayerSelector