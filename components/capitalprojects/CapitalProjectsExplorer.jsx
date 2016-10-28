//AgencySelector should be passed a list of input options and return what is selected,
//All of the logic for filtering the data should happen in this component


import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'

import Select from 'react-select'

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
                options={config.sponsorAgencies}
                onChange={this.updateFilter.bind(this, 'sagency')}
              />
              <h5>and Managing Agency includes</h5>
              <Select
                multi
                placeholder='All managing agencies'
                value={this.state.filters.magency}
                name="form-field-name"
                options={config.managingAgencies}
                onChange={this.updateFilter.bind(this, 'magency')}
              />
              <h5>and Source Agency includes</h5>
              <Select
                multi
                placeholder='All sourcing agencies'
                value={this.state.filters.source}
                name="form-field-name"
                options={config.sourceAgencies}
                onChange={this.updateFilter.bind(this, 'source')}
              />
              <h5>and Status includes</h5>
              <Select
                multi
                placeholder='All statuses'
                value={this.state.filters.cpstatus}
                name="form-field-name"
                options={config.statuses}
                onChange={this.updateFilter.bind(this, 'cpstatus')}
              />
              <h5>and Type includes</h5>
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

