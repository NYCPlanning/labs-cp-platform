//ModalContent.jsx - Builds Modal Content for a single pipeline project
//Props: 
//  data - data object for this project

import React from 'react' 
import moment from 'moment'

import ModalMap from '../common/ModalMap.jsx'

var ModalContent = React.createClass({ //Component Variable should match the file name
  render() {
    var d = this.props.data.properties
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>{d.dob_permit_address}</h3>
        </div>
        <div className="col-md-6">
          <ModalMap data={this.props.data}/>
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
                <dd>{moment(d.dob_cofo_date_first).format('MM/DD/YYYY')}</dd>

                <dt>Most Recent CofO</dt>
                <dd>{moment(d.dob_cofo_date_last).format('MM/DD/YYYY')}</dd>

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


//module.exports should be the last line
module.exports=ModalContent