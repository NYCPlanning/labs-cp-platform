//ModalContent.jsx - Builds Modal Content for a single facility
//Props: 
//  

import React from 'react' 

import ModalMap from '../common/ModalMap.jsx'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

var ModalContent = React.createClass({ //Component Variable should match the file name
  render() {
    var d = this.props.data.properties

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

    var content = (
      <div className="row">
        <div className="col-md-12">
          <h3>{d.facilityname}</h3>
          <h4>{d.address}</h4>
          <h4>BBL: {d.bbl}</h4>
        </div>
        <div className="col-md-6">
          <ModalMap data={this.props.data}/>
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

    return content
  }
})


//module.exports should be the last line
module.exports=ModalContent