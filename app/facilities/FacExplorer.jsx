// /facilities/FacExplorer.jsx - This component builds the Facilities Explorer map interface, establishes the connection with Carto, and dynamically changes content depending on what is being shown based on the query results
// Props:
//  params.domain - Domain being shown based on the route being passed in from react-router. Provides text indicating what subset is being shown on the map. Gets used in dynamic titles.
//  params.subset - Subset being shown based on the route being passed in from react-router. Provides text indicating what subset is being shown on the map. Gets used in dynamic titles.
//  auth - User's email login info based on auth0 login. Gets included in nav bar.


import React from 'react'
import Link from 'react-router'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import Nav from '../common/Nav.jsx'
import CartoMap from '../common/CartoMap.jsx'
import FacLayerSelector from './FacLayerSelector.jsx'
import ModalContent from './ModalContent.jsx'
import SearchFilterToolbar from '../common/SearchFilterToolbar.jsx'

import content from './content.jsx'
import facilitiesLayers from './facilitiesLayers.js'
import vizJson from './vizjson.js'

import '../../stylesheets/common/Nav.scss'


var FacilitiesExplorer = React.createClass({

  getInitialState() {
    return({
      drawerOpen: true,
    })
  },

  componentWillMount() {
    // SETTING SQL FOR MAP CONTENTS 
    //default: select * and show all layers in layer selector
    this.layerStructure = facilitiesLayers
    this.initialSQL = 'SELECT * FROM facilities_data'

    //logic to modify initial sql and cartoCSS based on route
    //Domain Subsets
    var domain = this.props.params.domain
    if(domain) {
      var firstFive = domain.substr(0,5);

      var layerOptions = vizJson.options.layer_definition.layers[0].options
      this.initialSQL=layerOptions.sql="SELECT * FROM facilities_data WHERE domain ILIKE '" + firstFive + "%'"
      this.layerStructure = this.layerStructure.filter(function(layer) {
        return (layer.slug == domain)
      })
      layerOptions.cartocss = this.buildCartoCSS(this.layerStructure)
    }

    //Custom Subset Queries
    var subset = this.props.params.subset
    if(subset) {
      var config = {
        government_owned_or_operated: {
          sql: "SELECT * FROM facilities_data WHERE operatortype='Public'"
        },
        community_facilities_ceqr: {
          sql:
          `
          SELECT * FROM facilities_data
          WHERE facilitysubgroup = 'Public Schools'
          OR facilitysubgroup = 'Public Libraries'
          OR agencysource = 'NYCACS'
          OR facilitygroup = 'Health Care'
          OR facilitytype = 'Firehouse'
          OR facilitytype = 'Police Station'
          OR facilitytype = 'NYCHA Police Services'
          `
        },
        children_seniors_and_people_with_disabilities: {
          sql: 
          `
          SELECT * FROM facilities_data
          WHERE facilitygroup = 'Camps'
          OR facilitygroup = 'Child Welfare'
          OR facilitygroup = 'Childcare'
          OR facilitygroup = 'Childrens Services'
          OR facilitysubgroup = 'Non-public Schools'
          OR facilitysubgroup = 'Other Schools Serving Students with Disabilities'
          OR facilitysubgroup = 'Preschools'
          OR facilitysubgroup = 'Public Schools'
          OR facilitysubgroup = 'Senior Services'
          OR facilitysubgroup = 'Programs for People with Disabilities'
          OR children = 't'
          OR senior = 't'
          OR disabilities = 't'
          `
        }
      }
      var layerOptions = vizJson.options.layer_definition.layers[0].options
      this.initialSQL=layerOptions.sql=config[subset].sql
    }

  },

  componentDidMount() {
    document.title = "Facilities and Program Sites Explorer";

    if(!this.props.params.domain)
    this.props.showModal({
      modalHeading: 'Welcome!',
      modalContent: content.splash,
      modalCloseText: 'Got it.  Let me in!'
    }) 
  },

  buildCartoCSS(layerStructure) {
    
    // DEFINING BASIC SYMBOLOGY 
    var cartocss = 
      `#facilities_data {
         marker-fill-opacity: 0.8;
         marker-line-color: #012700;
         marker-line-width: 0.5;
         marker-line-opacity: 0.9;
         marker-placement: point;
         marker-type: ellipse;
         marker-width: 6;
         marker-allow-overlap: true;
      }`

    // CREATING LAYER STRUCTURE 
    layerStructure[0].children.map(function(group, i) {
      var groupRuleTemplate =
        `
        #facilities_data[facilitygroup="{{name}}"] {
           marker-fill: {{color}};
        }
        `

      var groupRule = Mustache.render(groupRuleTemplate, {
        name: group.name,
        color: group.color
      })

      cartocss += groupRule + '\n'
    })

    return cartocss
  },

  updateSQL(sql) {
    this.refs.map.setSQL(sql)
  },

  // "ABOUT" MODAL 

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this Tool',
      modalContent: content.about,
      modalCloseText: 'Close'
    })
  },

  handleFeatureClick(e, latlng, pos, data) {
    var content = <ModalContent data={data} latlng={latlng}/>

    this.props.showModal({
      modalHeading: 'Facility Details',
      modalContent: content,
      modalCloseText: 'Close'
    })
  },

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  },

  handleGeocoderSelection(feature) {
    this.refs.map.setViewToFeature(feature)
  },

  render() {

    //dynamic title based on route
    var titleMap = {
      health_and_human_services: 'Health and Human Services Facilities',
      education_child_welfare_and_youth: 'Education, Child Welfare, and Youth Facilities',
      parks_cultural_institutions_and_other_community_facilities: 'Parks, Cultural, and Other Facilities',
      public_safety_emergency_services_and_administration_of_justice: 'Public Safety, Emergency, and Justice Facilities',
      core_infrastructure_and_transportation: 'Core Infrastructure and Transportation Facilities',
      administration_of_government: 'Government Administration Facilities'
    }

    var title = this.props.params.domain ? titleMap[this.props.params.domain] : 'Facilities and Program Sites Explorer'

    return (
      <div className="full-height">
        <Nav title={title} auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a>About</a></li>
        </Nav>
        <div id="main-container">
          <div id="content">
            <SearchFilterToolbar 
              onFilter={this.toggleDrawer}
              onSelection={this.handleGeocoderSelection}/>
            {/*<div className="messageOverlay mapOverlay">
              <div className="message">Hover over a facility or click for full details</div>
              <div className="message">Data current as of 09/05/2014 - 10/01/2016</div>
            </div>*/}
            <CartoMap
             vizJson={vizJson}
             handleFeatureClick={this.handleFeatureClick}
             ref="map"/>
            <Drawer className="mapDrawer"
              open={this.state.drawerOpen}
              docked={true}
              width={409}
              style={{
                zIndex: 999,
                position: 'absolute'
              }}>
              <Toolbar noGutter={true}>
                <ToolbarGroup>
                  <ToolbarTitle text="Filter Facilties" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconButton tooltip="Close Filters">
                    <FontIcon className="fa fa-times" onTouchTap={this.toggleDrawer}/>
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
              <FacLayerSelector
                initialSQL={this.initialSQL}
                layerStructure={this.layerStructure}
                updateSQL={this.updateSQL}
              />
            </Drawer>
          </div>
        </div>
      </div>
    )      

  }
})


module.exports=FacilitiesExplorer