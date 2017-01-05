// /pipeline/DevelopmentPage.jsx - This component builds an individual page for each facility in the database and compiles its databse lookup details
// Props:
//  params.id - Facility ID being shown based on the route being passed in from carto. Provides row of data.
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import Moment from 'moment'

import ModalMap from '../common/ModalMap.jsx'
import DetailPage from '../common/DetailPage.jsx'

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
    carto.getRow('nchatterjee.dob_permits_cofos_hpd_geocode', 'cartodb_id', parseInt(this.props.params.id))
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
        defaultText='Housing Development Map'
        defaultLink='/pipeline'
      >
        {content}
      </DetailPage>
    )
  },

  renderContent(data) {
    var d = data.properties

    return  (
     <div>

        <div className="col-md-12">
          <h3>{d.dob_permit_address}</h3>
        </div>
        <div className="col-md-6">
          <ModalMap data={this.state.data} label={d.dob_permit_address}/>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h4>General Information</h4>
              <dl className="dl-horizontal">
                <dt>Development Type</dt>
                <dd>{d.dcp_pipeline_category}</dd>

                <dt>Status</dt>
                <dd>{d.dcp_pipeline_status}</dd>

                <dt>Total Net Units</dt>
                <dd>{d.dcp_units_use_map}</dd>

                <dt>Complete Units</dt>
                <dd>{d.dcp_units_complete}</dd>

                <dt>Incomplete Units (permit issued)</dt>
                <dd>{d.dcp_units_outstanding}</dd>

                <dt>Potential Units (permit application)</dt>
                <dd>{d.dcp_units_pending}</dd>

                <dt>BBL</dt>
                <dd>{d.dob_permit_bbl}</dd>

                <dt>Building Id (BIN)</dt>
                <dd>{d.dob_permit_bin}</dd>
              </dl>
            </li>


            <li className="list-group-item">
              <h4>DOB Certificate of Occupancy Details</h4>
              <dl className="dl-horizontal">
                <dt>Earliest CofO (Since 2010)</dt>
                <dd>{Moment(d.dob_cofo_date_first).format('MM/DD/YYYY')}</dd>

                <dt>Most Recent CofO</dt>
                <dd>{Moment(d.dob_cofo_date_last).format('MM/DD/YYYY')}</dd>

                <dt>Most Recent CofO Type</dt>
                <dd>{d.dob_cofo_type_last}</dd>


              </dl>
            </li>

            <li className="list-group-item">
              <h4>HPD Information</h4>
              <dl className="dl-horizontal">
                <dt>Project Name</dt>
                <dd>{d.hpd_project_name}</dd>

                <dt>HPD-Supported Units</dt>
                <dd>{d.hpd_units_supported_total}</dd>

              </dl>
            </li>
          </ul>
        </div>
      </div>
    )
  }

})

module.exports=Component
