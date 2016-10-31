//AgencySelector should be passed a list of input options and return what is selected,
//All of the logic for filtering the data should happen in this component


import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Select from 'react-select'
import Numeral from 'numeral'

import Nav from '../Nav.jsx'
import Modal from '../Modal.jsx'
import ModalContent from './ModalContent.jsx'
import MapboxGLMap from './MapboxGLMap.jsx'
import carto from '../../helpers/carto.js'
import FilterService from '../../helpers/FilterService.js'
import config from './config.js'


var CapitalProjectsExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null,
      filters: {
        sagency: [],
        magency: [],
        source: [],
        cpstatus: [],
        type: []
      }, 
      selectedCount: '__',
      totalCount:'__'
    })
  },

  componentDidMount: function() {
    var self=this
    document.title = "NYC Capital Projects Map";

    this.showModal({
      modalHeading: 'Welcome!',
      modalContent: splashContent,
      modalCloseText: 'Got it.  Let me in!'
    }) 

    //get totalCount of rows
    carto.SQL('SELECT count(*) FROM (SELECT * FROM adoyle.capeprojectspoints UNION ALL SELECT * FROM adoyle.capeprojectspolygons) a', 'json')
      .then(function(data) {
        self.setState({
          selectedCount: data[0].count,
          totalCount: data[0].count
        })
      })

  },

  // reset() {
  //   dc.filterAll()
  //   dc.redrawAll()
  // },

  update() {
    this.setState({
      mapData: this.store.everything.top(Number.POSITIVE_INFINITY)
    })
  },

  handleMapClick(feature) {
    var self=this

    var tableName = '(SELECT * FROM adoyle.capeprojectspolygons UNION ALL SELECT * FROM adoyle.capeprojectspoints) a'

   //make an api call to carto to get the full feature, build content from it, show modal
   carto.getRow(tableName, 'projectid', feature.properties.projectid)
    .then(function(data) {
      var feature = data.features[0]
      self.showModal({
        modalHeading: 'Capital Project Details',
        modalContent: <ModalContent feature={feature}/>,
        modalCloseText: 'Close'
      })

    })
  },

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },

  filterService() {


    var mapboxGLFilters = FilterService.mapboxGL(this.state.filters)
    this.refs.map.applyFilters(mapboxGLFilters)
    

    var sqlFilters = FilterService.SQL(this.state.filters)

  
    
    if(sqlFilters != null) {
      this.updateCount(sqlFilters)
    } else {
      this.setState({
        selectedCount: this.state.totalCount
      })
    }
  },

  updateCount(sqlFilters) {

    carto.SQL('SELECT count(*) FROM (SELECT * FROM adoyle.capeprojectspolygons UNION ALL SELECT * FROM adoyle.capeprojectspoints) a WHERE ' + sqlFilters, 'json')
      .then(function(data) {
        console.log(data)
        this.setState({
          selectedCount: data[0].count
        })
      }.bind(this))
  },


  updateFilter(key, values) {
    var self=this

    //before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    var abbreviated = values.map(function(value) {
      return {
        value: value.value,
        label: value.value
      }
    })

    this.state.filters[key] = abbreviated

    this.setState({
      filters: this.state.filters
    }, function() {
      self.filterService()
    })
  },

  render() {
    var Iframe = 'iframe'

    return(
      <div className="full-height">
        <Nav title="Capital Projects Explorer" auth={this.props.auth}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="sidebar">
            <div className="col-md-12">
              <h3>Explore Capital Projects</h3>
              <p>
                Filter the data by choosing from the following attributes: 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip"> Learn more about the data</Tooltip>}>
                  <a href="https://nycplanning.github.io/cpdocs/cpdb/"> <i className="fa fa-info-circle" aria-hidden="true"></i></a>
                </OverlayTrigger>
              </p>
            </div>
            <div className="col-md-12">
              <div className="filter-count">
                {
                  (this.state.selectedCount == this.state.totalCount) ? 
                    <span>Showing all {Numeral(this.state.totalCount).format('0,0')} Projects</span> :
                    <span>Showing {Numeral(this.state.selectedCount).format('0,0')} of {Numeral(this.state.totalCount).format('0,0')} projects</span>
                }
              </div>
              <h5>
                Show projects where Sponsor Agency includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">Placeholder</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger></h5>
              <Select
                multi
                placeholder='All sponsor agencies'
                value={this.state.filters.sagency}
                name="form-field-name"
                options={config.sponsorAgencies}
                onChange={this.updateFilter.bind(this, 'sagency')}
              />
              <h5>
                and Managing Agency includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">Placeholder</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='All managing agencies'
                value={this.state.filters.magency}
                name="form-field-name"
                options={config.managingAgencies}
                onChange={this.updateFilter.bind(this, 'magency')}
              />
              <h5>
                and Source Agency includes
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">Placeholder</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='All sourcing agencies'
                value={this.state.filters.source}
                name="form-field-name"
                options={config.sourceAgencies}
                onChange={this.updateFilter.bind(this, 'source')}
              />
              <h5>
                and Status includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">Placeholder</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger></h5>
              <Select
                multi
                placeholder='All statuses'
                value={this.state.filters.cpstatus}
                name="form-field-name"
                options={config.statuses}
                onChange={this.updateFilter.bind(this, 'cpstatus')}
              />
              <h5>
                and Type includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">Placeholder</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='All types'
                value={this.state.filters.type}
                name="form-field-name"
                options={config.types}
                onChange={this.updateFilter.bind(this, 'type')}
              />
            </div>
          </div>
          <div id="content">
            <div className={'full-height'}>
              <MapboxGLMap data={this.state.mapData} handleClick={this.handleMapClick} ref='map'/>
            </div>
          </div>
        </div>
        <Modal
          heading={this.state.modalHeading}
          body={this.state.modalContent}
          closeText={this.state.modalCloseText}
          ref="modal"
        />
      </div>
    )
  }
})

module.exports=CapitalProjectsExplorer


var splashContent = (
  <div>
    <h4>Hello, Beta Tester!</h4>
    <p>The Capital Projects Explorer (CAPE) is currently under development by the New York City Department of City Planning Capital Planning Team.</p>
    <p>CAPE’s goal is to act as a starting point for planners exploring what capital projects are taking place within an area, means to identify potential conflicts and synergies among capital projects, and resource for all City agencies learn more about capital projects.  To know about the uses and limitations of CAPE we encourage you to <a href="https://nycplanning.github.io/cpdocs/cape/">read more about the data</a> powering this map.</p>
    <p>Likely, you’ll find some bugs and uncover some less-than-accurate data since this is a work in progress, so we’re soliciting your help improving this product.  <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please get in touch!</a></p>
  </div>
)
var aboutContent = (
  <div>
    <h4>What's included?</h4>
    <p>
    The New York City Department of City Planning (NYC Planning) Capital Planning Team produces the Capital Projects Explorer (CAPE) by integrating dispersed spatial datasets of capital projects published by capital agencies into one database and inclusive data explorer.
    </p>
    <p>
    The source datasets currently feeding into CAPE report over 6,000 capital projects that span over a multitude of sites. <a href="https://nycplanning.github.io/cpdocs/cape/">NYC Planning’s Capital Planning Docs</a> site provides more details on CAPE’s data sources, database fields, and creation and update processes.
    </p>
    <h4>How is this useful?</h4>
    <p>
      CAPE’s primary function is to enable a user to view all of the capital projects with spatial data collected from the various data sources on a one map and explore key data points associated with a capital project.  The explorer facilitates the identification of a capital project and access to more detailed information.
    </p>
    <p>
      CAPE as a data resource and explorer provides Planners, City Hall, and Agencies easy centralized access to high-level information on capital projects in NYC.  It’s a robust starting point for knowing what capital projects are occurring within neighborhoods, which can in turn better inform neighborhood planning and reduce situations where projects conflict and increase opportunities for interagency coordination.
    </p>
    <h4>Limitations and Disclaimers</h4>
    <p>
      CAPE is only as good as the source data it aggregates.  Currently, CAPE is the most comprehensive map of recently completed, active, and future City capital construction sites, but it does not claim to capture every past, present, or planned capital project in NYC.
    </p>
    <p>
      <b>Duplicates.</b> This version of CAPE includes cases of duplicate records for the same capital project because some of the source datasets have overlapping content, but different unique identifiers for a project making it difficult to systematically identify and reconcile duplicate records.
    </p>
    <p>
      <b>Inconsistent data standards.</b> Capital agencies manage their capital projects data separately and have varying data standards that meet their needs; therefore, CAPE make some assumptions to reconcile key common attributes across datasets and integrate the data into one database.
    </p>
    <p>
      <b>What's a project?</b> As a result of inconsistent data standards, capital agencies define capital projects differently, which vary in size, scope, and impact.  The inconsistent definition of a capital project has the potential to skew analyses generated from these data.
    </p>
    <p>
      <b>Completeness.</b> This dataset does not capture the entirety of NYC's Capital Budget.  CAPE is built using records from agencies' project management systems, which do not always maintain a link to budget lines, making it impossible to account for the whole Capital Budget.
    </p>
    <p>
      <b>Different update frequencies.</b> As a result of the different project management systems the data feeding CAPE are updated at various frequencies, ranging from daily updates to unknown.  As a result, the freshness of the data in CAPE varies depending on the data source.
    </p>
    <p>
    As a result of these data limitations and inconsistencies CAPE is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses.  Please consult <a href="https://nycplanning.github.io/cpdocs/cape/">NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
    </p>
    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product.  <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions </a> with Capital Planning.
    </p>
  </div>
)