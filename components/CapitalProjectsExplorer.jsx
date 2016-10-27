//AgencySelector should be passed a list of input options and return what is selected,
//All of the logic for filtering the data should happen in this component


import React from 'react'
import {Button} from 'react-bootstrap'
import Numeral from 'numeral'
import Moment from 'moment'
import Select from 'react-select'

import Nav from './Nav.jsx'
import Modal from './Modal.jsx'
import ModalMap from './ModalMap.jsx'
import MapboxGLMap from './MapboxGLMap.jsx'
import Agencies from '../helpers/agencies.js'
import carto from '../helpers/carto.js'


var CapitalProjectsExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null,
      filters: {
        sagency: [],
        magency: [],
        source: []
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

    carto.SQL('SELECT count(*) FROM (SELECT * FROM adoyle.capeprojectspoints UNION ALL SELECT * FROM adoyle.capeprojectspolygons) a', 'json')
      .then(function(data) {
        self.setState({
          selectedCount: data[0].count,
          totalCount: data[0].count
        })
      })

  },

  reset() {
    dc.filterAll()
    dc.redrawAll()
  },

  update() {
    this.setState({
      mapData: this.store.everything.top(Number.POSITIVE_INFINITY)
    })
  },

  buildModalContent(feature) {
    console.log(feature)

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
    console.log('handleMapClick', feature)

    var tableName = feature.layer.source == 'pointFeatures' ? 'adoyle.capeprojectspoints' : 'adoyle.capeprojectspolygons'

   //make an api call to carto to get the full feature, build content from it, show modal
   carto.getRow(tableName, feature.properties.cartodb_id)
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
    var self=this
    //filter builder, eventually should be a helper module
    //for now creates mapboxGL filters based on arrays of values
    //can eventually build SQL as well for updating counts

    //get arrays of filterable options from state and assemble mapboxGL filter

    var dimensions = []

    for(var key in this.state.filters) {
      dimensions.push(key)
    }

    var filters = dimensions.map(function(dimension) {



      var values = self.state.filters[dimension],
        filter

      console.log(values)

      if(values.length>0) {
        filter = [
          "in",
          dimension
        ]

        values.map(function(value) {
          filter.push(value.value)
        })
      } else {
        filter = []
      }

      return filter
    })


    //combine all filters
    var allFilters = [
      'all'
    ]

    filters.map(function(filter) {
      if(filter.length>0) allFilters.push(filter)
    })

    console.log(allFilters)

     //takes an array of sponsor agency codes, filters map data by that array
    this.refs.map.applyFilters(allFilters)
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

    console.log(abbreviated)
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
              <div className="row sidebar-content">
                <div className="filter-count">
                {
                  (this.state.selectedCount == this.state.totalCount) ? 
                    <span>Showing all {this.state.totalCount} Projects</span> :
                    <span>Showing {this.state.selectedCount} of {this.state.totalCount} facilities</span>
                }
              </div>
                <div className="col-md-12">
                  <h3>Filter by Sponsor Agency</h3>
                    <Select
                      multi
                      value={this.state.filters.sagency}
                      name="form-field-name"
                      options={sponsorAgencies}
                      onChange={this.updateFilter.bind(this, 'sagency')}
                    />
                </div>
                <div className="col-md-12">
                  <h3>Filter by Managing Agency</h3>
                    <Select
                      multi
                      value={this.state.filters.magency}
                      name="form-field-name"
                      options={managingAgencies}
                      onChange={this.updateFilter.bind(this, 'magency')}
                    />
                </div>
                <div className="col-md-12">
                  <h3>Filter by Source Agency</h3>
                    <Select
                      multi
                      value={this.state.filters.source}
                      name="form-field-name"
                      options={sourceAgencies}
                      onChange={this.updateFilter.bind(this, 'source')}
                    />
                </div>
              </div>
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