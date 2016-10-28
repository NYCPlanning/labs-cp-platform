import React from 'react'
import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'
import PipelineLayerSelector from './PipelineLayerSelector.jsx'
import Modal from './Modal.jsx'
import SimpleMarkerMap from './SimpleMarkerMap.jsx'

var PipelineExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentDidMount: function() {
    document.title = "Housing Development Explorer";

    this.showModal({
      modalHeading: 'Welcome!',
      modalContent: splashContent,
      modalCloseText: 'Got it.  Let me in!'
    }) 
  },

  updateSQL(sql) {
    this.refs.map.setSQL(sql)
  },

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent,
      modalCloseText: 'Got it!'
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },

  handleFeatureClick(e, latlng, pos, data) {
    var d = data
    var content = (
      <div>
        <h3>{d.facilityname}</h3>
        <p>{d.address}</p>

        <hr/>
        <p className='modal-label'>Categories</p>
        <dl className="dl-horizontal">
          <dt>Domain</dt>
          <dd>{d.domain}</dd>
          <dt>Group</dt>
          <dd>{d.facilitygroup}</dd>
          <dt>Subgroup</dt>
          <dd>{d.facilitysubgroup}</dd>
          <dt>Type</dt>
          <dd>{d.facilitytype}</dd>
          
        </dl> 

      
      </div>
    )

    this.showModal({
      modalHeading: 'Facility Details',
      modalContent: content,
      modalCloseText: 'Close'
    })


  },

  handleFeatureClick(e, latlng, pos, data) {
    var d = data


    var modalContent = (
      <div className="row">
        <div className="col-md-12">
          <h3>{d.dob_address} - {d.dcp_pipeline_units} Units</h3>
        </div>
        <div className="col-md-6">
          <SimpleMarkerMap point={latlng}/>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h4>Pipeline Information</h4>
              <dl className="dl-horizontal">
                <dt>Number of Units</dt>
                <dd>{d.dcp_pipeline_units}</dd>
                <dt>Category</dt>
                <dd>{d.dcp_pipeline_category}</dd>
                <dt>Status</dt>
                <dd>{d.dcp_pipeline_status}</dd>
              </dl>
            </li>
          

            <li className="list-group-item">
              <h4>Site Information</h4>
              <dl className="dl-horizontal">
                <dt>BBL</dt>
                <dd>{d.dob_bbl}</dd>
                <dt>Building Id (BIN)</dt>
                <dd>{d.dob_bin}</dd>
              </dl>
            </li>
          
            <li className="list-group-item">
              <h4>Permit Info</h4>
              <dl className="dl-horizontal">
                <dt>Issue Date</dt>
                <dd>{d.dob_issue_date}</dd>
                <dt>Job Number</dt>
                <dd>{d.dob_jobnumber}</dd>
                <dt>Job Type</dt>
                <dd>{d.dob_jobtype}</dd>
                <dt>C of O Date</dt>
                <dd>{d.dob_co_date}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    )

    this.showModal({
      modalHeading: 'Pipeline Details',
      modalContent: modalContent,
      modalCloseText: 'Close'
    })


  },

  render() {
    return(
      <div className="full-height">
        <Nav title='Housing Development Explorer' auth={this.props.auth}>
          <li onClick={this.showAbout}><a><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="sidebar">
            <PipelineLayerSelector
              updateSQL={this.updateSQL}
            />
          </div>
          <div id="content">
            <div className="messageOverlay mapOverlay">
              <div className="message">Hover over a property, or click for full details</div>
              <div className="message">Data Freshness:</div>
              <div className="message-mini">DOB Permits-5/19/2016</div>
              <div className="message-mini">DOB Certificates of Occupancy-8/25/2016</div>
            </div>
            <CartoMap
             vizJson="http://carto.capitalplanning.nyc/user/nchatterjee/api/v2/viz/3ed486e4-8a55-11e6-bc56-0242ac110002/viz.json"
             handleFeatureClick={this.handleFeatureClick}
             ref="map"/>
          </div>
            <Modal
              heading={this.state.modalHeading}
              body={this.state.modalContent}
              closeText={this.state.modalCloseText}
              ref="modal"
            />
        </div>
      </div>
    )
  }
})

module.exports=PipelineExplorer

var aboutContent = (
  <div>
    <h4>What's included?</h4>

 

    The Development Pipeline, a data product produced by the New York City (NYC) Department of City Planning (DCP) Capital Planning division, aims to help City agencies (and the general public) understand land use changes resulting from building activity. The underlying database integrates all City knowledge regarding these developments, enabling citywide analyses of land use over time and space. 

    The Residential Pipeline is a subset of the broader Development Pipeline, and includes both new wtruction as well building renovations that impact the housing supply. Currently, it integrates data from the NYC Department of Buildings (DOB). Going forward, it will encompass data gathered from Housing Preservation and Development (HPD), DCP’s land use approval procedure (ULURP), and other sources if / as they are identified

    <h4>How is this useful?</h4>

    This data can inform both capital and operational decision-making, by providing insight about where and how the City is developing. For example, changes in residential density may impact the demand for community facilities, transportation, and other resources that are operated, funded, licensed or certified by government agencies.

    <h4>Limitations and disclaimers</h4>

    There are a number of known limitations to this dataset and improvements will be made on a continual basis, based on internal reviews and user feedback.

    <li>Geocoding and geospatial integration:
      <ul>
        <li>~99% of DOB permits successfully geocoded using BBL, BIN and address</li>
      </ul>
    </li>

    <li>Exclusions: this dataset excludes likely duplicates and projects with no change in units, as determined by DCP.
      <ul>
      <li>Duplicates: duplicate permits identified using a concatenate of BBL and BIN, with only the most recent instance retained in the database</li>
      <li>Projects without change: for some renovations, permits were missing data about existing and/or projected number of units. These have been excluded to avoid skewing analyses. We have also excluded any renovations were the permit description included “No Work”, as these are most likely administrative permits rather than actual construction. </li>
      </ul>
    </li>

    <li>Expired permits: data includes permit filings from 2010 through present. Some “outstanding” permits (those without Certificate of Occupancy) may have since expired, however, this is not available in current datasets. Going forward, we will seek to identify and exclude expired permits.  </li>

    <li>Other data sources: for some analyses, it may be appropriate to include likely developments that have not yet received permits (e.g., projects where DCP has approved a land use change, or permits that have been filed but not approved). Due to the uncertainty of such developments, they are not included in this version of the Residential Pipeline.</li>


    <h4>Feedback</h4>

    <p>We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a> with Capital Planning.</p>

  </div>
)

var splashContent = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <p>This interactive explorer of the new Housing Pipeline Dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress.</p>
    <p>If you're seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
  </div>
)