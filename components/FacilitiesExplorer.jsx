import React from 'react'
import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'
import FacLayerSelector from './FacLayerSelector.jsx'
import Modal from './Modal.jsx'
import Link from 'react-router'
import FacilitiesLayers from '../config/FacilitiesLayers.js'
import SimpleMarkerMap from './SimpleMarkerMap.jsx'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

/* CREATING viz.json */
var vizJson = {  
   "type":"layergroup",
   "options":{  
      "user_name":"hkates",
      "maps_api_template":"https://carto.capitalplanning.nyc:443/user/{user}",
      "sql_api_template":"https://carto.capitalplanning.nyc:443/user/{user}",
      "tiler_protocol":"https",
      "tiler_domain":"carto.capitalplanning.nyc",
      "tiler_port":"443",
      "sql_api_protocol":"https",
      "sql_api_domain":"carto.capitalplanning.nyc",
      "sql_api_endpoint":"/api/v2/sql",
      "sql_api_port":443,
      "filter":"mapnik",
      "layer_definition":{  
         "version":"1.0.1",
         "layers":[  
            {  
               "id":"751e70d2-77dc-4db8-b310-824fcb00e27a",
               "type":"CartoDB",
               "tooltip": {
                  "fields":[  
                     {  
                        "position":1.7976931348623157e+308,
                        "name":"facilityname",
                        "title":true
                     },
                     {  
                        "position":1.7976931348623157e+308,
                        "name":"facilitytype",
                        "title":true
                     },
                     {  
                        "position":1.7976931348623157e+308,
                        "name":"operatortype",
                        "title":true
                     }
                    
                  ],
                "template":
                ` <div class=\"cartodb-tooltip-content-wrapper\">
                  <div class=\"cartodb-tooltip-content\">
                  <div class='name'>{{facilityname}}</div>
                  <div class='classification'><b>Facility Type:</b></div>
                  <div class='classification'>{{facilitytype}}</div>
                  <div class='classification'><b>Operator:</b></div>
                  <div class='classification'>{{operatorname}}</div>
                `
               },
               "order":1,
               "visible":true,
               "options":{  
                  "sql":"select * from facilities_data",
                  "layer_name":"facilities_data",
                  "cartocss":
                  `
                  /** this cartoCSS has been processed in order to be compatible with the new cartodb 2.0 */

                  /** category visualization */#facilities_data {
                       marker-fill-opacity: 0.9;
                       marker-line-color: #012700;
                       marker-line-width: 0.5;
                       marker-line-opacity: 0.9;
                       marker-placement: point;
                       marker-type: ellipse;
                       marker-width: 7;
                       marker-allow-overlap: true;
                     }
                  #facilities_data[domain=\"Core Infrastructure and Transportation\"] {
                       marker-fill: #b0dae8;
                     }
                  #facilities_data[domain=\"Administration of Government\"] {
                       marker-fill: #da664f;
                     }
                  #facilities_data[domain=\"Health and Human Services\"] {
                       marker-fill: #b67eb7;
                     }
                  #facilities_data[domain=\"Parks, Cultural, and Other Community Facilities\"] {
                       marker-fill: #6f9568;
                     }
                  #facilities_data[domain=\"Public Safety, Emergency Services, and Administration of Justice\"] {
                       marker-fill: #3182bd;
                     }
                  #facilities_data[domain=\"Education, Child Welfare, and Youth\"] {
                       marker-fill: #f7ca00;
                     }
                  `,
                  "cartocss_version":"2.1.1",
                  "interactivity":"cartodb_id,address,addressnumber,agencyclass1,agencyclass2,agencysource,area,areatype,bbl,bin,borough,boroughcode,buildingid,buildingname,capacity,capacitytype,children,city,colpusetype,creator,datatype,dateactive,datecreated,dateedited,dateinactive,datesourcereceived,datesourceupdated,disabilities,domain,dropouts,editor,facilitygroup,facilityname,facilitysubgroup,facilitytype,family,groupquarters,guid,homeless,id,idagency,idold,immigrants,inactivestatus,latitude,linkdata,linkdownload,longitude,notes,operatorabbrev,operatorname,operatortype,oversightabbrev,oversightagency,parkid,processingflag,refreshfrequency,refreshmeans,schoolorganizationlevel,senior,servicearea,sourcedatasetname,streetname,tags,unemployed,utilization,utilizationrate,xcoord,ycoord,youth,zipcode"
               }
            }
         ]
      },
      "attribution":""
   }
}


/* BUILDING PAGE */

var FacilitiesExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  /* SETTING SQL FOR MAP CONTENTS */

  componentWillMount() {

    //default: select * and show all layers in layer selector
    this.layerStructure = FacilitiesLayers
    this.initialSQL = 'SELECT * FROM facilities_data'

    //logic to modify initial sql and cartoCSS based on route
    /*Domain Subsets*/
    var domain = this.props.params.domain
    if(domain) {
      var firstFive = domain.substr(0,5);

      var layerOptions = vizJson.options.layer_definition.layers[0].options
      this.initialSQL=layerOptions.sql="SELECT * FROM facilities_data WHERE domain ILIKE '" + firstFive + "%'"
      this.layerStructure = FacilitiesLayers.filter(function(layer) {
        return (layer.slug == domain)
      })
      layerOptions.cartocss = this.buildCartoCSS(this.layerStructure)
    }

    /*Custom Subset Queries*/
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

  buildCartoCSS(layerStructure) {
    
    /* DEFINING BASIC SYMBOLOGY */
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

    /* CREATING LAYER STRUCTURE */
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

  componentDidMount() {
    document.title = "Facilities and Program Sites Explorer";

    if(!this.props.params.domain)
    this.showModal({
      modalHeading: 'Welcome!',
      modalContent: splashContent,
      modalCloseText: 'Got it.  Let me in!'
    }) 
  },

  updateSQL(sql) {
    this.refs.map.setSQL(sql)
  },

  /* "ABOUT" MODAL */

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  /* "FACILITIES DETAILS" MODAL */
  /* Creates each section of the modal as a variable, then compiles them in the "content" var */

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },

  handleFeatureClick(e, latlng, pos, data) {
    var d = data

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
        </div>
        <div className="col-md-6">
          <SimpleMarkerMap point={latlng}/>
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

    this.showModal({
      modalHeading: 'Facility Details',
      modalContent: content,
      modalCloseText: 'Close'
    })

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

    return(
      <div className="full-height">
        <Nav title={title} auth={this.props.auth}>
          <li onClick={this.showAbout}><a>About</a></li>
        </Nav>
        <div id="main-container">
          <div id="sidebar">
            <FacLayerSelector
              initialSQL={this.initialSQL}
              layerStructure={this.layerStructure}
              updateSQL={this.updateSQL}
            />
          </div>
          <div id="content">
            <div className="messageOverlay mapOverlay">
              <div className="message">Hover over a facility or click for full details</div>
              <div className="message">Data current as of 09/05/2014 - 10/01/2016</div>
            </div>
            <CartoMap
             vizJson={vizJson}
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

module.exports=FacilitiesExplorer

/* SETTING THE CONTENT OF THE "ABOUT" MODAL IN TOP NAV BAR */

var aboutContent = (
  <div>

    <h4>Product Overview</h4>
    <p>
      The City Planning Facilities Database (FacDB) aggregates information about facilities and program sites that are owned, operated, funded, licensed or certified by a City, State, or Federal agency in the City of New York. These facilities generally impact the quality of the city’s neighborhoods, and they span six domains:
    </p>
    <p>
      <ul type={"disc"}>
        <li>Health Care and Human Services</li>
        <li>Youth, Education, and Child Welfare</li>
        <li>Public Safety, Emergency Services, and Administration of Justice</li>
        <li>Core Infrastructure and Transportation</li>
        <li>Parks, Cultural, and Other Community Facilities</li>
        <li>Administration of Government (See note in Disclaimers)</li>
      </ul>
      This database and interactive map build upon City Planning’s decades-old work on the Selected Facilities and Program Sites Database, which this new product replaces, and capture the location, type, and capacity of public and private facilities in order to inform holistic neighborhood planning, strategic site selection and service delivery planning, opportunities for interagency and public-private partnerships, community outreach activities, and many other functions across City agencies.
    </p>
    <p>
      One goal of this database is to provide a consolidated, authoritative dataset that can serve as a one-stop-shop to planners. More broadly, the intent is to provide the foundation for a more robust data-integration initiative, ensuring interoperability between disparate agencies’ datasets. City Planning has grouped these facilities according to the following six domains, each with a set of groups, subgroups, and facility types that are intended to make the data easy to navigate and more useful for specific planning purposes. Facility types and names are pulled directly from source datasets, wherever possible.
    </p>
    <p>
      Currently, FacDB aggregates and synthesizes data sourced from 42 agencies, recording more than 34,000 facilities throughout NYC. More facilities will be added as the data become available to the Department of City Planning. Special thanks goes to all the agencies who make their data available for this effort, particularly those who publish their data on a routine basis. Details on the facility categories, fields in the database, data sources, and the database update process is provided on the Capital Planning Platform Docs site.Currently, FacDB aggregates and synthesizes data sourced from 42 agencies, recording more than 34,000 facilities throughout NYC. More facilities will be added as the data become available to the Department of City Planning. Special thanks goes to all the agencies who make their data available for this effort, particularly those who publish their data on a routine basis.

    </p>
    

    <h4>Limitations & disclaimers</h4>
    <p>

      Details on the facility categories, fields in the database, data sources, and the database update process is provided on the Capital Planning Platform <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database">Docs</a> site.
    </p>

    <h4>Limitations and Disclaimers</h4>
    <p>
      FacDB is only as good as the source data it aggregates. Currently, FacDB is the most comprehensive, spatial data resource available of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains. Many records could not be geocoded. There are also known to be cases when the address provided in the source data is for a headquarters office rather the facility site location. Unfortunately these could not be systematically verified. We hope to resolve as many of these limitations as possible over time, and seek feedback from the user community on potential approaches to improving the data. For more detailed information on a specific facility please reach out to the respective oversight agency.

    </p>
  <p>
      ***Exclusions:*** The database excludes likely duplicates and projects with no change in units, as determined by DCP.
      <li>Duplicates: In some cases, it appeared that multiple permits were generated for a single development. For example, this could occur if an initial permit had administrative errors that were corrected by issuing a new permit. Since the data does not include permit expiration date (per above), we cannot determine if/which permits are outdated. To avoid double-counting, we identified likely duplicates using the Building Identification Number (BIN) listed in the DOB permit. We have only retained the most recent instance of a given BIN in the database. </li>
     <li>No change in units:  In some cases, alteration permits are required for administrative reasons rather than actual construction. To prevent such permits from skewing analyses, we have excluded any alteration permits that are missing data about existing and/or projected number of units. </li>
    </p>

    <p>
      <b>Analysis Limitations.</b> As a result of these data limitations and inconsistencies, users should be careful in their use of this database not to develop analyses that may be suspect. For example, a comparison of the density or accessibility of facilities across neighborhoods should recognize that some of the facilities included are organizational headquarters rather than service sites, and that this database is not authoritatively comprehensive.
    </p>


 
    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a> with Capital Planning.
    </p>
  </div>
)

var collaborateContent = (
    <div>
        <h3 className="modal-opener">The Capital Planning Platform is about more than fostering interagency collaboration in capital investment planning - it’s about creating a digital platform for collaboration on the technologies that planners seek to do their jobs more effectively.</h3>
        <p>
            The data on this platform is not perfect; it is only as accurate and complete as existing data sources allow. The features of this platform are still in development, and we have a long list of improvements that we plan to make in the weeks and months to come. We are releasing this work-in-progress to our partners in City agencies because we believe that collaboration in platform development is just as important as the collaboration that the platform can engender in planning for a better NYC.
        </p>
        <p>
            We hope you will consider helping out in this effort. If you find data errors or know of better sources or have questions or suggestions about our <a href='docs.capitalplanning.nyc'>metadata</a>, please let us know. If you have ideas about new features that would support your agency’s planning work, we’d be happy to work to build them into the platform. If you can code, we’re building open source and encourage you to join us on <a href='https://github.com/nycplanning'>GitHub</a>.
        </p>
        <p>
            We’re just at the beginning of this journey. Together, we can build a better platform, informing the decisions that build a better city. 
        </p>
        <p>
            Email the team at <a href='mailto:capital@planning.nyc.gov'>capital@planning.nyc.gov</a>.
        </p>
        <div className='modal-logo'></div>
    </div>
)

/* SETTING THE CONTENT OF THE SPLASH "WELCOME" MODAL */

var splashContent = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <p>This interactive explorer of the new Facilities dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress. We also encourage you to <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database">read more about the data</a> powering this map.</p>     
    <p>If you're seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
  </div>
)