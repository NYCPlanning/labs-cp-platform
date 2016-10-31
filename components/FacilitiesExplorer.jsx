import React from 'react'
import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'
import FacLayerSelector from './FacLayerSelector.jsx'
import Modal from './Modal.jsx'
import Link from 'react-router'
import FacilitiesLayers from '../config/FacilitiesLayers.js'
import SimpleMarkerMap from './SimpleMarkerMap.jsx'

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
                  "sql":"select * from table_20160930_facilitiesdraft",
                  "layer_name":"table_20160930_facilitiesdraft",
                  "cartocss":
                  `
                  /** this cartoCSS has been processed in order to be compatible with the new cartodb 2.0 */

                  /** category visualization */#table_20160930_facilitiesdraft {
                       marker-fill-opacity: 0.9;
                       marker-line-color: #012700;
                       marker-line-width: 0.5;
                       marker-line-opacity: 0.9;
                       marker-placement: point;
                       marker-type: ellipse;
                       marker-width: 7;
                       marker-allow-overlap: true;
                     }
                  #table_20160930_facilitiesdraft[domain=\"Core Infrastructure and Transportation\"] {
                       marker-fill: #b0dae8;
                     }
                  #table_20160930_facilitiesdraft[domain=\"Administration of Government\"] {
                       marker-fill: #da664f;
                     }
                  #table_20160930_facilitiesdraft[domain=\"Health and Human Services\"] {
                       marker-fill: #b67eb7;
                     }
                  #table_20160930_facilitiesdraft[domain=\"Parks, Cultural, and Other Community Facilities\"] {
                       marker-fill: #6f9568;
                     }
                  #table_20160930_facilitiesdraft[domain=\"Public Safety, Emergency Services, and Administration of Justice\"] {
                       marker-fill: #3182bd;
                     }
                  #table_20160930_facilitiesdraft[domain=\"Education, Child Welfare, and Youth\"] {
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
    this.initialSQL = 'SELECT * FROM table_20160930_facilitiesdraft'

    //logic to modify initial sql and cartoCSS based on route
    /*Domain Subsets*/
    var domain = this.props.params.domain
    if(domain) {
      var firstFive = domain.substr(0,5);

      var layerOptions = vizJson.options.layer_definition.layers[0].options
      this.initialSQL=layerOptions.sql="SELECT * FROM table_20160930_facilitiesdraft WHERE domain ILIKE '" + firstFive + "%'"
      this.layerStructure = FacilitiesLayers.filter(function(layer) {
        console.log(layer.slug, domain)
        return (layer.slug == domain)
      })
      layerOptions.cartocss = this.buildCartoCSS(this.layerStructure)
    }

    /*Custom Subset Queries*/
    var subset = this.props.params.subset
    if(subset) {
      var config = {
        government_owned_or_operated: {
          sql: "SELECT * FROM table_20160930_facilitiesdraft WHERE operatortype='Public'"
        },
        community_facilities_ceqr: {
          sql:
          `
          SELECT * FROM table_20160930_facilitiesdraft
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
          SELECT * FROM table_20160930_facilitiesdraft
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

    console.log(vizJson)
  },

  buildCartoCSS(layerStructure) {
    
    /* DEFINING BASIC SYMBOLOGY */
    var cartocss = 
      `#table_20160930_facilitiesdraft {
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
        #table_20160930_facilitiesdraft[facilitygroup="{{name}}"] {
           marker-fill: {{color}};
        }
        `

      var groupRule = Mustache.render(groupRuleTemplate, {
        name: group.name,
        color: group.color
      })

      cartocss += groupRule + '\n'
    })

    console.log(cartocss)
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
    console.log(d)

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
            <dt>Type</dt>
            <dd>{d.facilitytype}</dd>           
          </dl>
        </div>
      )
    }

    var CapacityUtilization = function() {
      return (
        <div>
          <h4>Capacity & Utilization Details</h4>
          <dl className="dl-horizontal">
            <dt>Capacity</dt>
            <dd>{d.capacity ? d.capacity + ' ' + d.capacitytype : 'Unknown'}</dd>
            <dt>Utilization</dt>
            <dd>{d.utilization ? d.utilization + ' ' + d.utilizationtype : 'Unknown'}</dd>
            {d.capacity && d.utilization ? <dt>Utilization Rate</dt> : null}
            {d.capacity && d.utilization ? <dd>{d.utilization/d.capacity}</dd> : null}              
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
          <p>{d.address}</p>
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
          <li onClick={this.showAbout}><a><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About</a></li>
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
    <h4>What's included?</h4>
    <p>
      The City Planning Facilities Database (FacDB) is produced by the New York City Department of City Planning (NYC Planning) Capital Planning Division. The database captures the location, type, and capacity of public and private facilities ranging across six domains:
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
      Currently, FacDB aggregates and synthesizes data sourced from 42 agencies, recording more than 31,000 facilities throughout NYC. Details on the facility categories, fields in the database, data sources, and the database update process is provided on NYC Planning’s <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database">Capital Planning Docs</a> site.
    </p>

    <h4>How is this useful?</h4>
    <p>
      This data resource provides agencies and communities with easy access to data and neighborhood context needed for site planning, assessing service delivery, preparing neighborhood plans, or informing capital investment decisions. The facilities and program sites are generally operated, funded, licensed, or certified by a City, State, or Federal government agency.
    </p>
    <p>
      The facilities which are included are valuable for planning purposes because of the social services they provide and their role in land use typology which impacts activity in the neighborhood. For example parking lots and garages (including commerical garages) are captured in the database, both because they are an asset that residents and visitors use and because they could indicate increased vehicular traffic in the area.
    </p>

    <h4>Limitations and Disclaimers</h4>
    <p>
      The FacDB is only as good as the source data it aggregates. Currently, FacDB is the most comprehensive, spatial data resource of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains. Many records could not be geocoded. There are also known to be cases when the address provided in the source data is for a headquarters office rather the facility site location. Unfortunately these could not be systematically verified. For more detailed information on a specific facility please reach out to the respective oversight agency.
    </p>
    <p>
      <b>Duplicates.</b> Please be aware that this beta version of the database also includes cases of duplicate records for the same facility. This is because several of the source datasets have content that overlaps with other datasets. We are working to systematically identify these duplicate records and retain the most up-to-date and detailed record.
    </p>
    <p>
      <b>Admin. of Government.</b> Please note that this domain currently only contains data from NYPD and FDNY in addition to a few DPR properties. After the 2016 version of the <a href="https://www1.nyc.gov/site/planning/about/publications/colp.page">City-Owned and Leased Properties</a> (COLP) database is released, all of its contents will also be added to FacDB.
    </p>

    <h4>Feedback</h4>
    <p>
      We are constantly looking for ways to improve this product. <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a> with Capital Planning.
    </p>
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