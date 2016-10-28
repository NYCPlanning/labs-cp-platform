//AgencySelector should be passed a list of input options and return what is selected,
//All of the logic for filtering the data should happen in this component


import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Numeral from 'numeral'
import Moment from 'moment'
import Select from 'react-select'

import Nav from './Nav.jsx'
import Modal from './Modal.jsx'
import ModalMap from './ModalMap.jsx'
import MapboxGLMap from './MapboxGLMap.jsx'
import Agencies from '../helpers/agencies.js'
import carto from '../helpers/carto.js'
import FilterService from '../helpers/FilterService.js'


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

  buildModalContent(feature) {

    var d = feature.properties

    //pre-process funding to show a discrete value or a range
    var funding 
    if (d.fundamount != null) {
      funding = Numeral(d.fundamount).format('($ 0.0 a)')
    } else {
      funding = Numeral(d.fundmin).format('($ 0.0 a)') + ' - ' + Numeral(d.fundmax).format('($ 0.0 a)')
    }


    return (
        <div className={'row'}> 
          <div className={'col-md-12'}>
            <h3>
              {d.name} - {d.projectid}
            </h3>
              <div className="agencybadges">
                <span 
                  className={'badge'} 
                  style={{'backgroundColor': Agencies.getAgencyColor(d.sagency)}}>{d.sagency}
                </span>
                { d.sagency != d.magency ? 
                  <div className='managedby'> 
                    <div className='managedby-text'>managed by</div>
                    <span 
                      className={'badge'} 
                      style={{'backgroundColor': Agencies.getAgencyColor(d.magency)}}>{d.magency}
                    </span>
                  </div> :
                  null
                } 
              </div>
              <div id="projectdescription">{d.descriptio}</div> 
          </div>

          <div className={'col-md-6'}>
            <ModalMap data = {feature}/>
          </div>
          <div className={'col-md-6'}>
          <ul className="list-group">
            
            <li className="list-group-item">
              <h4>General</h4>
              <dl className="dl-horizontal">
                <dt>CurrentStatus</dt>
                <dd>{d.astatus}</dd>

                <dt>Contact</dt>
                <dd>{d.contact}</dd>

                <dt>MA + Project ID</dt>
                <dd>{d.maprojid}</dd>

                <dt>Contact</dt>
                <dd>{d.contact}</dd>

                <dt>Type</dt>
                <dd>{d.type}</dd>

                <dt>Category</dt>
                <dd>{d.type}</dd>

              </dl> 
            </li>

            <li className="list-group-item">
              <h4>Timeline</h4>
              <dl className="dl-horizontal">
                <dt>Construction Start</dt>
                <dd>{(new Date(d.constart) > new Date(1970, 1, 1)) ? Moment(d.constart).format('MMMM YYYY') : 'Agency does not report'}</dd>  

                <dt>Construction End</dt>
                <dd>{(new Date(d.conend) > new Date(1970, 1, 1)) ? Moment(d.constart).format('MMMM YYYY') : 'Agency does not report'}</dd>
              </dl>              
            </li>

            <li className="list-group-item">
              <h4>Funding</h4>
              <dl className="dl-horizontal">
                <dt>Funding</dt>
                <dd>{funding}</dd>

                <dt>Funding Source</dt>
                <dd>{d.fundsource}</dd> 

                <dt>Funding Status</dt>
                <dd>{d.fundstatus}</dd>  
              </dl>              
            </li>

            <li className="list-group-item">
              <h4>Data Source</h4>
              <dl className="dl-horizontal">
                <dt>Source Agency</dt>
                <dd>{d.source}</dd>

                <dt>Source Dataset</dt>
                <dd>{d.sourcedata}</dd>

                <dt>Source Link</dt>
                <dd>{d.sourcelink}</dd>
              </dl>              
            </li>

          </ul>


          </div>
        </div> 
      ) 
  },

  handleMapClick(feature) {
    var self=this

    var tableName = '(SELECT * FROM adoyle.capeprojectspolygons UNION ALL SELECT * FROM adoyle.capeprojectspoints) a'

   //make an api call to carto to get the full feature, build content from it, show modal
   carto.getRow(tableName, 'projectid', feature.properties.projectid)
    .then(function(data) {
      var feature = data.features[0]

      var modalContent = self.buildModalContent(feature)

      self.showModal({
        modalHeading: 'Capital Project Details',
        modalContent: modalContent,
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
        <Nav title="NYC Capital Projects Map" auth={this.props.auth}>
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
                    <span>Showing all {this.state.totalCount} Projects</span> :
                    <span>Showing {this.state.selectedCount} of {this.state.totalCount} projects</span>
                }
              </div>
              <h5>Show projects where Sponsor Agency includes</h5>
              <Select
                multi
                placeholder='All sponsor agencies'
                value={this.state.filters.sagency}
                name="form-field-name"
                options={sponsorAgencies}
                onChange={this.updateFilter.bind(this, 'sagency')}
              />
              <h5>and Managing Agency includes</h5>
              <Select
                multi
                placeholder='All managing agencies'
                value={this.state.filters.magency}
                name="form-field-name"
                options={managingAgencies}
                onChange={this.updateFilter.bind(this, 'magency')}
              />
              <h5>and Source Agency includes</h5>
              <Select
                multi
                placeholder='All sourcing agencies'
                value={this.state.filters.source}
                name="form-field-name"
                options={sourceAgencies}
                onChange={this.updateFilter.bind(this, 'source')}
              />
              <h5>and Status includes</h5>
              <Select
                multi
                placeholder='All statuses'
                value={this.state.filters.cpstatus}
                name="form-field-name"
                options={statuses}
                onChange={this.updateFilter.bind(this, 'cpstatus')}
              />
              <h5>and Type includes</h5>
              <Select
                multi
                placeholder='All types'
                value={this.state.filters.type}
                name="form-field-name"
                options={types}
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


var CountWidget=React.createClass({

  render() {
    var selected = this.props.group.value();
    var total = this.props.dimension.size();

    var all = (selected == total)

    return(
      <div>
        { all ? 
          'Showing all projects (' + total + '). Click the charts to filter the data.' :
          'Showing ' + selected + ' of ' + total + ' projects.' 
        }

        { all ? 
          null :
          <Button bsSize="xsmall" className="reset-button" onClick={this.props.reset}>Reset All</Button>
        }
        
         
      </div>
    )
  }
})

var splashContent = (
  <div>
    "Welcome Beta Tester!" 
    This interactive explorer of the XYZ dataset is currently under development by the Department of City Planning. 
    You are likely to find some bugs and even some less-than-accurate data. These are works in progress! 
    If you're here, it means we want to improve this data and this map with your help! Please get in touch...
  </div>
)

var aboutContent = (
  <div>About</div>
)

var managingAgencies = [
  {  
    "value":"DOT",
    "label":"Department of Transportation - DOT"
  },
  {  
    "value":"DDC",
    "label":"Department of Design and Construction - DDC"
  },
  {  
    "value":"SCA",
    "label":"School Construction Authority - SCA"
  }
]

var sourceAgencies = [
  {  
    "value":"DOT",
    "label":"Department of Transportation - DOT"
  },
  {  
    "value":"DDC",
    "label":"Department of Design and Construction - DDC"
  },
  {  
    "value":"SCA",
    "label":"School Construction Authority - SCA"
  },
  {  
    "value":"DPR",
    "label":"Department of Parks and Recreation - DPR"
  },
  {  
    "value":"ORR",
    "label":"Office of Resilliency - ORR"
  }
]


var sponsorAgencies = [  
   {  
      "value":"ACS",
      "label":"Administration for Children's Services"
   },
   {  
      "value":"BBPC",
      "label":"Brooklyn Bridge Park Corporation - BBPC"
   },
   {  
      "value":"BNYDC",
      "label":"Brooklyn Navy Yard Development Corportation - BNYDC"
   },
   {  
      "value":"BOE",
      "label":"Board of Elections - BOE"
   },
   {  
      "value":"BPL",
      "label":"Brooklyn Public Library - BPL"
   },
   {  
      "value":"CME",
      "label":"Office of the Chief Medical Examiner - CME"
   },
   {  
      "value":"Courts",
      "label":"New York State Unified Court System - Courts"
   },
   {  
      "value":"CUNY",
      "label":"City University of New York - CUNY"
   },
   {  
      "value":"DCAS",
      "label":"Department of Citywide Administrative Services"
   },
   {  
      "value":"DCLA",
      "label":"Department of Cultural Affairs - DCLA"
   },
   {  
      "value":"DCP",
      "label":"Department of City Planning - DCP"
   },
   {  
      "value":"DDC",
      "label":"Department of Design and Construction - DDC"
   },
   {  
      "value":"DEP",
      "label":"Department of Environmental Protection - DEP"
   },
   {  
      "value":"DFTA",
      "label":"Department for the Aging - DFTA"
   },
   {  
      "value":"DHP",
      "label":"Department of Housing, Preservation, and Development - DHP"
   },
   {  
      "value":"DHS",
      "label":"Department of Homeless Services - DHS"
   },
   {  
      "value":"DJJ",
      "label":"Department of Juvenile Justice - DJJ"
   },
   {  
      "value":"DOC",
      "label":"Department of Corrections - DOC"
   },
   {  
      "value":"DOE",
      "label":"Department of Education - DOE"
   },
   {  
      "value":"DOHMH",
      "label":"Department of Health and Mental Hygiene - DOHMH"
   },
   {  
      "value":"DOI",
      "label":"Department of Investigation - DOI"
   },
   {  
      "value":"DOT",
      "label":"Department of Transportation - DOT"
   },
   {  
      "value":"DPR",
      "label":"Department of Parks and Recreation - DPR"
   },
   {  
      "value":"DSNY",
      "label":"Department of Sanitation - DNSY"
   },
   {  
      "value":"EDC",
      "label":"Economic Development Corportation - EDC"
   },
   {  
      "value":"FDNY",
      "label":"Fire Department - FDNY"
   },
   {  
      "value":"HHC",
      "label":"Health and Hospitals Corporation - HHC"
   },
   {  
      "value":"HRA",
      "label":"Human Resources Administration - HRA"
   },
   {  
      "value":"Miscellaneous",
      "label":1
   },
   {  
      "value":"MO",
      "label":"Mayor's Office - MO"
   },
   {  
      "value":"Non-City",
      "label":"Non-City Agencies"
   },
   {  
      "value":"NYCHA",
      "label":"New York City Housing Authority - NYCHA"
   },
   {  
      "value":"NYPD",
      "label":"Police Department - NYPD"
   },
   {  
      "value":"NYPL",
      "label":"New York Public Library - NYPL"
   },
   {  
      "value":"NYS",
      "label":"New York State - NYS"
   },
   {  
      "value":"ORR",
      "label":"Office of Recovery and Resilliency - ORR"
   },
   {  
      "value":"QBPL",
      "label":"Queens Borough Public Library - QBPL"
   },
   {  
      "value":"SBS",
      "label":"Department of Small Business Services - SBS"
   },
   {  
      "value":"SCA",
      "label":"School Construction Authority - SCA"
   },
   {  
      "value":"TGI",
      "label":"Trust for Governor's Island"
   }
]

var types = [  
      {  
         "label":"Street",
         "value":"Street"
      },
      {  
         "label":"Water",
         "value":"Water"
      },
      {  
         "label":"Neighborhoods",
         "value":"Neighborhoods"
      },
      {  
         "label":"Route",
         "value":"Route"
      },
      {  
         "label":"Street Reconstruction",
         "value":"Street Reconstruction"
      },
      {  
         "label":"Ramp, Ramp, Ramp",
         "value":"Ramp, Ramp, Ramp"
      },
      {  
         "label":"Accessibility Program",
         "value":"Accessibility Program"
      },
      {  
         "label":"Infrastructure",
         "value":"Infrastructure"
      },
      {  
         "label":"Projects Advanced To FY2014",
         "value":"Projects Advanced To FY2014"
      },
      {  
         "label":"Ramp",
         "value":"Ramp"
      },
      {  
         "label":"CapacityProjects - Updated, ReplacementProjects",
         "value":"CapacityProjects - Updated, ReplacementProjects"
      },
      {  
         "label":"Agency does not report",
         "value":"Agency does not report"
      },
      {  
         "label":"ReplacementProjects",
         "value":"ReplacementProjects"
      },
      {  
         "label":"Coastal Defense",
         "value":"Coastal Defense"
      },
      {  
         "label":"Ped Ramps",
         "value":"Ped Ramps"
      },
      {  
         "label":"Renovation",
         "value":"Renovation"
      },
      {  
         "label":"Cancelled Projects",
         "value":"Cancelled Projects"
      },
      {  
         "label":"Added Projects",
         "value":"Added Projects"
      },
      {  
         "label":"Road",
         "value":"Road"
      },
      {  
         "label":"New Construction",
         "value":"New Construction"
      },
      {  
         "label":"Buildings",
         "value":"Buildings"
      },
      {  
         "label":"CapacityInProcess",
         "value":"CapacityInProcess"
      },
      {  
         "label":"Upgrade",
         "value":"Upgrade"
      },
      {  
         "label":"Lighting Fixture Replacements",
         "value":"Lighting Fixture Replacements"
      },
      {  
         "label":"CapacityProjects - Updated",
         "value":"CapacityProjects - Updated"
      },
      {  
         "label":"Sewer",
         "value":"Sewer"
      },
      {  
         "label":"PreKCapacityProjects",
         "value":"PreKCapacityProjects"
      },
      {  
         "label":"Route, Road, Route, Route, Route, Route, Route, Road, Route, Route, Route, Route, Road, Route, Route, Road, Route, Road",
         "value":"Route, Road, Route, Route, Route, Route, Route, Road, Route, Route, Route, Route, Road, Route, Route, Road, Route, Road"
      },
      {  
         "label":"Feasibility Study",
         "value":"Feasibility Study"
      },
      {  
         "label":"Street Resurfacing",
         "value":"Street Resurfacing"
      },
      {  
         "label":"Other",
         "value":"Other"
      },
      {  
         "label":"Student Bathroom Upgrades",
         "value":"Student Bathroom Upgrades"
      },
      {  
         "label":"Sidewalks",
         "value":"Sidewalks"
      },
      {  
         "label":"Science Lab Program",
         "value":"Science Lab Program"
      },
      {  
         "label":"Sandy Storm Replacements",
         "value":"Sandy Storm Replacements"
      }
   ]

var statuses = [  
      {  
         "value":"Design",
         "label":"Design"
      },
      {  
         "value":"Agency does not report",
         "label":"Agency does not report"
      },
      {  
         "value":"Cancelled",
         "label":"Cancelled"
      },
      {  
         "value":"Procurement",
         "label":"Procurement"
      },
      {  
         "value":"Proposed",
         "label":"Proposed"
      },
      {  
         "value":"Construction",
         "label":"Construction"
      },
      {  
         "value":"Complete",
         "label":"Complete"
      },
      {  
         "value":"Other",
         "label":"Other"
      },
      {  
         "value":"Planning",
         "label":"Planning"
      }
   ]