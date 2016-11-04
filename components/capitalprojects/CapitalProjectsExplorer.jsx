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
    carto.SQL('SELECT count(*) FROM (SELECT * FROM cpadmin.capeprojectspoints UNION ALL SELECT * FROM cpadmin.capeprojectspolygons) a', 'json')
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

    var tableName = '(SELECT * FROM cpadmin.capeprojectspolygons UNION ALL SELECT * FROM cpadmin.capeprojectspoints) a'

   //make an api call to carto to get the full feature, build content from it, show modal
   carto.getRow(tableName, 'projectid', feature.properties.projectid)
    .then(function(data) {
      var feature = data
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

    carto.SQL('SELECT count(*) FROM (SELECT * FROM cpadmin.capeprojectspolygons UNION ALL SELECT * FROM cpadmin.capeprojectspoints) a WHERE ' + sqlFilters, 'json')
      .then(function(data) {
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
                  <a href="http://docs.capitalplanning.nyc/cpdbv1/" target="_blank"> <i className="fa fa-info-circle" aria-hidden="true"></i></a>
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
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency <b>funding</b> the project</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger></h5>
              <Select
                multi
                placeholder='showing all sponsor agencies'
                value={this.state.filters.sagency}
                name="form-field-name"
                options={config.sponsorAgencies}
                onChange={this.updateFilter.bind(this, 'sagency')}
              />
              <h5>
                and Managing Agency includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency <b>managing</b> the project</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='showing all managing agencies'
                value={this.state.filters.magency}
                name="form-field-name"
                options={config.managingAgencies}
                onChange={this.updateFilter.bind(this, 'magency')}
              />
              <h5>
                and Source Agency includes
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The City agency that <b>provided the raw data</b></Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='showing all source agencies'
                value={this.state.filters.source}
                name="form-field-name"
                options={config.sourceAgencies}
                onChange={this.updateFilter.bind(this, 'source')}
              />
              <h5>
                and Status includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The current <b>phase of the project</b></Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger></h5>
              <Select
                multi
                placeholder='showing all project statuses'
                value={this.state.filters.cpstatus}
                name="form-field-name"
                options={config.statuses}
                onChange={this.updateFilter.bind(this, 'cpstatus')}
              />
              <h5>
                and Type includes 
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tooltip">The <b>category</b> of the project</Tooltip>}>
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </OverlayTrigger>
              </h5>
              <Select
                multi
                placeholder='showing all project types'
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
    <p>The Capital Projects Explorer is currently under development by the NYC Department of City Planning Capital Planning Team.</p>
    <p>The Capital Projects Explorer’s goal is to act as a starting point for planners exploring what capital projects are taking place within an area, means to identify potential conflicts and synergies among capital projects, and resource for all City agencies learn more about capital projects.  To know about the uses and limitations of the Capital Projects Explorer we encourage you to <a href="http://docs.capitalplanning.nyc/cpdbv1/">read more about the data</a> powering this map.</p>
    <p>Likely, you’ll find some bugs and uncover some less-than-accurate data since this is a work in progress, so we’re soliciting your help improving this product.  <a href="http://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please get in touch!</a></p>
  </div>
)
var aboutContent = (
  <div>
    <h4>Product Overview</h4>
    <p>
    The Capital Projects Explorer integrates disparate datasets of capital projects published by capital agencies into one database and map-based data explorer.
    </p>
    <p>
    The Capital Projects Explorer’s primary purpose is to provide a common operational picture to capital planners and budget staff across City agencies, which can in turn minimize conflicts among different agencies’ capital projects, maximize opportunities for coordinated capital investment planning and funding alignment, and provide a starting point for integrated neighborhood-based planning.  This is certainly not a complete map of capital construction sites funded by NYC, but the Capital Projects Explorer is currently the best starting point for exploring capital projects in NYC.
    </p>
    <p>
    Special thanks to the NYC Departments of Parks and Recreation, Transportation, Design and Construction, the School Construction Authority, and the Mayor’s Office of Recovery and Resiliency for publishing spatial data on capital projects.
    </p>
    <h4>Limitations and Disclaimers</h4>
    <p>
    The Capital Projects Explorer is only as good as the source data it aggregates.  Currently, there is no data standard for capital project mapping and agencies are not required to map their capital projects; therefore, the Capital Projects Explorer makes some assumptions to aggregate and normalize the data into one data table.  As a result, this data source has some major limitations.
    </p>
    <p>
      <b>Duplicates.</b> This version of the Capital Projects Explorer includes some duplicate records for the same capital project because some of the source datasets have overlapping content, but different unique identifiers for a project, making it difficult to systematically identify and reconcile duplicate records.
    </p>
    <p>
      <b>Inconsistent data standards.</b> Capital agencies manage their capital projects data separately and have varying data standards that meet their needs; therefore, the Capital Projects Explorer makes some assumptions to reconcile key common attributes across datasets and integrate the data into one database.
    </p>
    <p>
      <b>Project definition</b> Capital agencies define capital projects differently; therefore, the projects in this explorer vary in size, scope, and impact.  The inconsistent definition of a capital project has the potential to skew analyses generated from these data - e.g. comparing the number of capital projects in or amount of funding dedicated to a neighborhood to another con produce misleading results.
    </p> 
    <p>
      <b>Completeness.</b> This dataset does not capture the entirety of NYC's Capital Budget.  The Capital Projects Explorer is built using records from agencies' project management systems, which do not always maintain a link to budget lines, making it impossible to account for the whole Capital Budget.
    </p>
    <p>
      <b>Different update frequencies.</b> Data from source agencies are updated at various frequencies, ranging from daily updates to infrequent updates. As a result, the freshness of the data in the Capital Projects Explorer varies depending on the data source.
    </p>
    <p>
    As a result of these data limitations and inconsistencies, the Capital Projects Explorer is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses - it is <b>built for planning coordination purposes only</b>.
    </p>
    <p>
    Please consult <a href="http://docs.capitalplanning.nyc/cpdbv1/">NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
    </p>
    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product.  <a href="http://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions </a> with Capital Planning.
    </p>
  </div>
)
