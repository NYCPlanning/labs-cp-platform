import React from 'react'
import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'
import FacLayerSelector from './FacLayerSelector.jsx'
import Modal from './Modal.jsx'
import Link from 'react-router'
import FacilitiesLayers from '../config/FacilitiesLayers.js'


var vizJson = {  
   "type":"layergroup",
   "options":{  
      "user_name":"hkates",
      "maps_api_template":"https://reallysimpleopendata.org:443/user/{user}",
      "sql_api_template":"https://reallysimpleopendata.org:443/user/{user}",
      "tiler_protocol":"https",
      "tiler_domain":"reallysimpleopendata.org",
      "tiler_port":"443",
      "sql_api_protocol":"https",
      "sql_api_domain":"reallysimpleopendata.org",
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
                "template":"<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n  <div class='name'>{{facilityname}}</div>\n  <div class='classification'><b>Facility Type:</b></div>\n  <div class='classification'>{{facilitytype}}</div>\n  <div class='classification'><b>Operator:</b></div>\n  <div class='classification'>{{operatorname}}</div>"
               },
               "order":1,
               "visible":true,
               "options":{  
                  "sql":"select * from table_20160930_facilitiesdraft",
                  "layer_name":"table_20160930_facilitiesdraft",
                  "cartocss":"/** this cartoCSS has been processed in order to be compatible with the new cartodb 2.0 */\n\n/** category visualization */#table_20160930_facilitiesdraft {\n     marker-fill-opacity: 0.8;\n     marker-line-color: #012700;\n     marker-line-width: 0.5;\n     marker-line-opacity: 0.9;\n     marker-placement: point;\n     marker-type: ellipse;\n     marker-width: 6;\n     marker-allow-overlap: true;\n}\n#table_20160930_facilitiesdraft[domain=\"Administration of Government\"] {\n     marker-fill: #fb8072;\n}\n#table_20160930_facilitiesdraft[domain=\"Core Infrastructure and Transportation\"] {\n     marker-fill: #ffff36;\n}\n#table_20160930_facilitiesdraft[domain=\"Health and Human Services\"] {\n     marker-fill: #bebada;\n}\n#table_20160930_facilitiesdraft[domain=\"Parks, Cultural, and Other Community Facilities\"] {\n     marker-fill: #8dd3c7;\n}\n#table_20160930_facilitiesdraft[domain=\"Public Safety, Emergency Services, and Administration of Justice\"] {\n     marker-fill: #80b1d3;\n}\n#table_20160930_facilitiesdraft[domain=\"Education, Child Welfare, and Youth\"] {\n     marker-fill: #fdb462;\n}",
                  "cartocss_version":"2.1.1",
                  "interactivity":"cartodb_id,address,addressnumber,agencyclass1,agencyclass2,agencysource,area,areatype,bbl,bin,borough,boroughcode,buildingid,buildingname,capacity,capacitytype,children,city,colpusetype,creator,datatype,dateactive,datecreated,dateedited,dateinactive,datesourcereceived,datesourceupdated,disabilities,domain,dropouts,editor,facilitygroup,facilityname,facilitysubgroup,facilitytype,family,groupquarters,guid,homeless,id,idagency,idold,immigrants,inactivestatus,latitude,linkdata,linkdownload,longitude,notes,operatorabbrev,operatorname,operatortype,oversightabbrev,oversightagency,parkid,processingflag,refreshfrequency,refreshmeans,schoolorganizationlevel,senior,servicearea,sourcedatasetname,streetname,tags,unemployed,utilization,utilizationrate,xcoord,ycoord,youth,zipcode"
               }
            }
         ]
      },
      "attribution":""
   }
}




var FacilitiesExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentWillMount() {
    //default is select *, and show all layers in layer selector
    this.layerStructure = FacilitiesLayers
    this.initialSQL = 'SELECT * FROM table_20160930_facilitiesdraft'

    //logic to modify initial sql and cartoCSS based on route
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

    console.log(vizJson)
  },

  buildCartoCSS(layerStructure) {
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
    document.title = "NYC Facilities Explorer";

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

  handleFeatureClick(e, latlng, pos, data) {
    var d = data
    console.log(d)

    var CapacityUtilization = function() {
      return (
        <div>
          <p className='modal-label'>Capacity & Utilization Details</p>
            <dl className="dl-horizontal">
              <dt>Capacity</dt>
              <dd>{d.capacity ? d.capacity + ' ' + d.capacitytype : 'Unknown'}</dd>
              <dt>Utilization</dt>
              <dd>{d.utilization ? d.utilization + ' ' + d.utilizationtype : 'Unknown'}</dd>
              {d.capacity && d.utilization ? <dt>Utilization Rate</dt> : null}
              {d.capacity && d.utilization ? <dd>{d.utilization/d.capacity}</dd> : null}
              
            </dl>
          <hr/>
        </div>
      ) 
    }

  
  var OperationsAndOversight = function() {
    return(
      <div>
        <p className='modal-label'>Operations and Oversight</p>
          <dl className="dl-horizontal">
            <dt>Operator</dt>
            <dd>{d.operatorabbrev + ' - ' + d.operatorname}</dd>
            <dt>Oversight Agency</dt>
            <dd>{d.oversightabbrev + ' - ' + d.oversightagency}</dd>
            
          </dl>
        <hr/>
      </div>

    )
  }


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

       <CapacityUtilization/>
       <OperationsAndOversight/>

        <p className='modal-label'>Data Source</p>
        <p>Source Dataset: {d.agencysource + ' - ' + d.sourcedatasetname}</p>
        <p>Last Update: {d.datesourceupdated}</p>
      </div>
    )

    this.showModal({
      modalHeading: 'Facility Details',
      modalContent: content,
      modalCloseText: 'Close'
    })


  },

  render() {
    return(
      <div className="full-height">
        <Nav title="NYC Facilities Explorer" auth={this.props.auth}>
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


var aboutContent = (
  <div>
    <h4>What's included?</h4>
            <p>
              The City Planning Facilities Database (FacDB), a data product produced by the New York City (NYC) Department of City Planning (DCP) Capital Planning Division, captures the location, type, and capacity of public and private facilities ranging across six domains:
              <ul type={"disc"}>
                <li>Health Care and Human Services</li>
                <li>Youth, Education, and Child Welfare</li>
                <li>Public Safety, Emergency Services, and Administration of Justice</li>
                <li>Core Infrastructure and Transportation</li>
                <li>Parks, Cultural, and Other Community Facilities</li>
                <li>Administration of Government (See note in Disclaimers)</li>
              </ul>
              Currently, FacDB aggregates and synthesizes data sourced from 42 agencies, recording more than 31,000 facilities throughout NYC. Details on the facility categories, fields in the database, the database update process, and data sources is provided on NYC Planning’s <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database">Capital Planning Docs</a> site.
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
              <b>Admin. of Government.</b> Please note that this domain currently only contains data from NYPD and FDNY in addition to a few DPR properties. After the 2016 version of the <a href="https://www1.nyc.gov/site/planning/about/publications/colp.page">City-Owned and Leased Properties</a> (COLP) database is realeased, all of its contents will also be added to FacDB.
            </p>

            <h4>Feedback</h4>
            <p>
              We are constantly looking for ways to improve and add additional value to the database. Please reach out to the NYC DCP Capital Planning team at capital@planning.nyc.gov with any suggestions.
            </p>
  </div>
)

var splashContent = (
  <div>
    <h4>Welcome, Beta Tester!</h4>
    <a href="/facilities/domain/health_and_human_services"><p>Health and Human Services</p></a>
    <a href="/facilities/domain/education_child_welfare_and_youth"><p>Education, Child Welfare, and Youth</p></a>
    <a href="/facilities/domain/parks_cultural_institutions_and_other_community_facilities"><p>Parks, Cultural Institutions, and Other Community Facilities</p></a>
    <a href="/facilities/domain/public_safety_emergency_services_and_administration_of_justice"><p>Public Safety, Emergency Services, and Administration of Justice</p></a>
    <a href="/facilities/domain/core_infrastructure_and_transportation"><p>Core Infrastructure and Transportation</p></a>
    <a href="/facilities/domain/administration_of_government"><p>Administration of Government</p></a>
    <p>This interactive explorer of the new Facilities dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress. We also encourage you to read more about the data powering this map <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database">here</a>.</p> 
    
    <p>If you're seeing this message, it means we want your help to improve this product. Please email us at capital@planning.nyc.gov.</p>
  </div>
)