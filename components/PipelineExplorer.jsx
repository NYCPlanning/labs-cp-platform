import React from 'react'
import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'
import PipelineLayerSelector from './PipelineLayerSelector.jsx'
import Modal from './Modal.jsx'

var PipelineExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentDidMount: function() {
    document.title = "NYC Residential Development Pipeline";

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
    console.log('d',d)

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

    console.log(d)

    var content = (
      <div>
        <h3>{d.dob_address}</h3>

        <hr/>
          <p className='modal-label'>Pipeline Information</p>
          <dl className="dl-horizontal">
            <dt>Number of Units</dt>
            <dd>{d.dcp_pipeline_units}</dd>
            <dt>Category</dt>
            <dd>{d.dcp_pipeline_category}</dd>
            <dt>Status</dt>
            <dd>{d.dcp_pipeline_status}</dd>
            
          </dl>

        <hr/>

          <p className='modal-label'>Site Information</p>
          <dl className="dl-horizontal">
            <dt>BBL</dt>
            <dd>{d.dob_bbl}</dd>
            <dt>Building Id Number (BIN)</dt>
            <dd>{d.dob_bin}</dd>
            
            
          </dl>

        <hr/>

          <p className='modal-label'>Permit Info</p>
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
      </div>
    )

    this.showModal({
      modalHeading: 'Pipeline Details',
      modalContent: content,
      modalCloseText: 'Close'
    })


  },

  render() {
    return(
      <div className="full-height">
        <Nav title='NYC Residential Development Pipeline'>
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
              <div className="message-mini">HPD Projects-5/20/2016</div>
            </div>
            <CartoMap
             vizJson="https://reallysimpleopendata.org/user/nchatterjee/api/v2/viz/02c7c7e4-8be8-11e6-bc56-0242ac110002/viz.json"
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

    The Residential Pipeline is a subset of the broader Development Pipeline, and includes both new construction as well building renovations that impact the housing supply. Currently, it integrates data from the NYC Department of Buildings (DOB) and Housing Preservation and Development (HPD). Going forward, it will encompass new data from these sources, data gathered from DCP’s land use approval procedure (ULURP), and other sources if / as they are identified


    <h4>How is this useful?</h4>

    This data can inform both capital and operational decision-making, by providing insight about where and how the City is developing. For example, changes in residential density may impact the demand for community facilities, transportation, and other resources that are operated, funded, licensed or certified by government agencies. 

    <h4>Limitations and disclaimers</h4>

    There are a number of known limitations to this dataset and improvements will be made on a continual basis, based on internal reviews and user feedback. 

    - Geocoding and geospatial integration:
    o ~99% of DOB permits successfully geocoded using BBL, BIN and address
    o ~90% of HPD projects successfully geocoded using BBL and address
    o ~90% of geocoded HPD projects successfully matched with BBL permit counterpart

    - Exclusions: this dataset excludes likely duplicates and projects with no change in units, as determined by DCP.
    o Duplicates: duplicate permits identified using a concatenate of BBL and BIN, with only the most recent instance retained in the database
    o Projects without change: for some renovations, permits were missing data about existing and/or projected number of units. These have been excluded to avoid skewing analyses. We have also excluded any renovations were the permit description included “No Work”, as these are most likely administrative permits rather than actual construction 

    - Expired permits: data includes permit filings from 2010 through present. Some “outstanding” permits (those without Certificate of Occupancy) may have since expired, however, this is not available in current datasets. Going forward, we will seek to identify and exclude expired permits.  

    - Other data sources: for some analyses, it may be appropriate to include likely developments that have not yet received permits (e.g., projects where DCP has approved a land use change, or permits that have been filed but not approved). Due to the uncertainty of such developments, they are not included in this version of the Residential Pipeline


    <h4>Feedback</h4>

    <p>We are constantly looking for ways to improve and add additional value to the database. Please reach out to the NYC DCP Capital Planning team at CapitalPlanning_DL@planning.nyc.gov with any suggestions.</p>

  </div>
)

var splashContent = (
  <div>
    <h4>Welcome Beta Tester!</h4>
    <p>This interactive explorer of the new Housing Pipeline Dataset is currently under development by the Department of City Planning. 
    You are likely to find some bugs and even some less-than-accurate data. These are works in progress!</p> 
    
    <p>If you're here, it means we want to improve this product, and its underlying data, with your help! Please get use the feedback link in the menu bar to let us know what you think.</p>
  </div>
)
