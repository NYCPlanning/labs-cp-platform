// /facilities/FacilityPage.jsx - This component builds an individual page for each facility in the database and compiles its databse lookup details
// Props:
//  modalHeading - A string to be used in the header
//  modalBody - JSX to be inserted into the body of the modal
//  modalCloseText - A string to be used in the close button
//  aboutContent - Copy used for the about modal
//  collaborateContent - Copy used for the collaborate modal


import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

import Nav from './Nav.jsx'
import SimpleMarkerMap from './SimpleMarkerMap.jsx'

import carto from './helpers/carto.js'


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
      .then(function(data) { console.log(data)
        self.setState({
          data: data
        })
      })


  },

  render() {
    var title="Facility Details Page"


    var content = this.state.data ? this.renderContent(this.state.data) : null

    return(
      <div className="full-height">
        <Nav title={title} auth={this.props.auth}>
          
        </Nav>
        <div id="main-container">
          <h1>Facility Details</h1>
          {content}
        </div>
      </div>
    )
  },

  renderContent(data) {
    var d = data.properties
    var coord = data.geometry.coordinates
    var latlng = [coord[1], coord[0]] 
    console.log(d)

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
            <dd>{d.operatorabbrev + ' - ' + d.operatorname}</dd>
            <dt>Oversight Agency</dt>
            <dd>{d.oversightabbrev + ' - ' + d.oversightagency}</dd>            
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
            <dd>{d.agencysource + ' - ' + d.sourcedatasetname}</dd>
            <dt>Last Update</dt>
            <dd>{d.datesourceupdated}</dd>           
          </dl>
        </div>
      )
    }

    return  (
      <div className="row">
        <div className="col-md-12">
          <h3>{d.facilityname}</h3>
          <h4>{d.address}</h4>
        </div>
        <div className="col-md-6">
          <SimpleMarkerMap point={latlng} travelshed={true}/>
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
