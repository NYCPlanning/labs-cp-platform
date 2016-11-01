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
    console.log(sql)
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
          <li onClick={this.showAbout}><a> About</a></li>
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
             vizJson="http://carto.capitalplanning.nyc/user/nchatterjee/api/v2/viz/27f505b4-9fab-11e6-ab61-0242ac110002/viz.json"
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
    <h4>Product overview</h4>
    <p>
     The Development Pipeline aims to help New York City planners understand changes resulting from building activity, across both time and space. It is currently comprised of data from the Department of Buildings (DOB) and the Department of Housing Preservation and Development (HPD), and includes the most comprehensive picture of new residential development taking place across the five boroughs. DCP will be working over the months to come to add other, non-residential developments to this pipeline, and to integrate other data sources.
    </p>
    <p>
    This product includes recently-completed residential development activity (last 5+ years), as well data on developments that are at various stages in the permitting process.  Completed or “partially complete” projects have received Certificates of Occupancy for at least a portion of their permitted units. Permitted sites are those that have received building permits; although not all of these sites will necessarily be built and completed over the next few years, this category is the City’s best predictor of where new housing will be built in the near future. Sites identified in the “permit pending” category demonstrate where developers have completed applications for new building (NB) permits or major alterations (A1) permits that will change the number of residential units in a building; these sites may give a general direction of where developers are seeking to deliver new housing units, but since they have not yet received permits, the certainty of their development cannot be assured.  In addition to the information derived from permits and Certificates of Occupancy, some records are appended with HPD data regarding the number of affordable housing units. 
    </p>
    <p>
    Special thanks goes to the NYC Department of Buildings and the Department of Housing Preservation and Development who make their data available for this map.
    </p>
    

    <h4>Limitations & Disclaimers</h4>
    <p>
      There are a number of known limitations to the database and improvements will be made on a continual basis, based on internal reviews and user feedback. We encourage users to read the full documentation of this dataset on the <a href='http://docs.capitalplanning.nyc'>metadata</a>
    </p>

      <h5>Geocoding and geospatial integration</h5>
      <p>
        95% DOB permits were successfully geocoding using BBL or address. Geocoding ‘rejects’ were researched by DCP but not every site could be verified. ~75% of HPD records were matched with their corresponding DOB permit using the BBL listed in each dataset. We assume that all HPD projects should have a corresponding DOB permit, and manual research confirms that most un-matched HPD projects list an outdated BBL. Going forward, DCP will work with HPD to improve and integrate this data.
      </p>
  
      <h5>Expired permits</h5>
      <p>These data include permit filings from 2010 through Q3 2016. Some “outstanding” permits (those without Certificate of Occupancy) may have since expired, however, this information not available in current datasets. Going forward, we will seek to identify and exclude expired permits.
    </p>
  
      <h5>Exclusions</h5> 
      <p>The database excludes likely duplicates and projects with no change in units, as determined by DCP.
      <p><strong>Duplicates</strong> - In some cases, it appeared that multiple permits were generated for a single development. For example, this could occur if an initial permit had administrative errors that were corrected by issuing a new permit. Since the data does not include permit expiration date (per above), we cannot determine if/which permits are outdated. To avoid double-counting, we identified likely duplicates using the Building Identification Number (BIN) listed in the DOB permit. We have only retained the most recent instance of a given BIN in the database. </p>
     <p><strong>No change in units</strong> - In some cases, alteration permits are required for administrative reasons rather than actual construction. To prevent such permits from skewing analyses, we have excluded any alteration permits that are missing data about existing and/or projected number of units. </p>
    </p>
 
      <h5>Other data sources:</h5> 
      <p>For some analyses, it may be appropriate to include likely developments that have not yet received permits (e.g., projects where DCP has approved a land use change, or permits that have been filed but not approved). Due to the uncertainty of such developments, they are not included in this version of the Residential Pipeline
    </p>


 
    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a> with Capital Planning.
    </p>
  </div>
)

var splashContent = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <p>This interactive explorer of the new Housing Pipeline Dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress.</p>
    <p>If you're seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
  </div>
)
