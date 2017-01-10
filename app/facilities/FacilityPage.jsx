// /facilities/FacilityPage.jsx - This component builds an individual page for each facility in the database and compiles its databse lookup details
// Props:
//  params.id - Facility ID being shown based on the route being passed in from carto. Provides row of data.
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import DetailPage from '../common/DetailPage.jsx'
import Jane from '../../jane-maps/src'

import Nav from '../common/Nav.jsx'
import ModalMap from '../common/ModalMap.jsx'

import carto from '../helpers/carto.js'


var Component = React.createClass({

  getInitialState() {
    return({
      data: null
    })
  },

  componentDidMount() {
    var self=this
    // after mount, fetch data and set state
    carto.getRow('hkates.facilities_data', 'cartodb_id', parseInt(this.props.params.id))
      .then(function(data) { 
        self.setState({
          data: data
        })
      })
  },

  render() {

    var content = this.state.data ? this.renderContent(this.state.data) : null

    return(
      <DetailPage
        location={this.props.location}
        defaultText='Facilities Map'
        defaultLink='/facilities/all'
      >
        {content}
      </DetailPage>
    )
  },

  renderContent(data) {
    var d = data.properties
    var coord = data.geometry.coordinates
    var latlng = [coord[1], coord[0]] 

    var Categories = function() {
      return(
        <div>
          <h4>Categories</h4>
          <dl className="dl-horizontal">
            <dt>Domain</dt>
            <dd>{d.domain}</dd>
            <dt>Group</dt>
            <dd>{d.facilitygroup}</dd>
            <dt>Subgroup</dt>
            <dd>{d.facilitysubgroup}</dd>
            <dt>
              <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip"> The facility's Type is derived from the most granular description provided in the source dataset. The categories and descriptions are limited by the information provided.</Tooltip>}>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </OverlayTrigger>
              Type
            </dt>
            <dd>{d.facilitytype}</dd>           
          </dl>
        </div>
      )
    }

    var CapacityUtilization = function() {
      return (
        <div>
          <h4>Capacity Details</h4>
          <dl className="dl-horizontal">
            <dt>Capacity</dt>
            <dd>{d.capacity ? d.capacity + ' ' + d.capacitytype : 'Unknown'}</dd>           
          </dl>
        </div>
      ) 
    }
  
    var OperationsAndOversight = function() {
      return(
        <div>
          <h4>Operations & Oversight</h4>
          <dl className="dl-horizontal">
            <dt>Operator</dt>
            <dd>{d.operatorname}</dd>
            <dt>Operator Type</dt>
            <dd>{d.operatortype}</dd>
            <dt>Oversight Agency</dt>
            <dd>{d.oversightagency.split(',').join(', ')}</dd>            
          </dl>
        </div>
      )
    }

    var DataSource = function() {
      return(
        <div>
          <h4>Data Source</h4>
          <dl className="dl-horizontal">
            <dt>Source Dataset</dt>
            <dd>{d.agencysource + ' - ' + d.sourcedatasetname.split(',').join(', ')}</dd>
            <dt>Last Update</dt>
            <dd>{d.datesourceupdated}</dd> 
            <dt>Facility ID in Source Data</dt>
            <dd>{d.idagency ? d.idagency.split(',').join(', ') : 'None Provided'}</dd>           
          </dl>
        </div>
      )
    }

    return  (
        <div>
          <div className="col-md-12">
            <h3>{d.facilityname}</h3>
            <p>{d.address}</p>
          </div>
          <div className="col-md-6">
            <ModalMap data={data} label={data.properties.facilityname}/>
          </div>
          <div className="col-md-6">
            <ul className="list-group">
              <li className="list-group-item">
                <Categories/>
              </li>
              <li className="list-group-item">
                <CapacityUtilization/>
              </li>
              <li className="list-group-item">
                <OperationsAndOversight/>
              </li>
              <li className="list-group-item">
                <DataSource/>
              </li>
            </ul>
          </div>
        </div>
    )
  }

})

module.exports=Component
