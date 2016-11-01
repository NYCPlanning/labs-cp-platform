import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import Modal from './Modal.jsx'


var FacilitiesLandingPage = React.createClass({
  getInitialState() {
    return({
      modalHeading: 'About the Facilities and Program Sites Explorer',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  componentDidMount: function() {
    document.title = "Capital Planning Platform";
  },

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent,
      modalCloseText: 'Got it!'
    })
  },

  showCollaborate() {
    this.showModal({
      modalHeading: 'Share',
      modalContent: collaborateContent,
      modalCloseText: 'Got it!'
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },

  render() {
    return(
      <div className="facilities-landing">
        <Nav title='Facilities and Program Sites Explorer' auth={this.props.auth}>
            <li onClick={this.showAbout}><a> About</a></li>
            <li onClick={this.showCollaborate}><a> Collaborate</a></li>
        </Nav>

        <div className="main-content">
            <section className="header-area" id="about" style={{'backgroundImage': "url(/img/facilities_landing_background.png)", 'padding': '60px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1 text-center" style={{'background': "#606060", 'opacity':'0.9', 'padding': '40px'}}>
                            <h2 className="section-heading" style={{'fontSize': '32px'}}>The NYC Facilities Database</h2>
                            <hr className="light"/>
                            <h3 className="section-heading">The most comprehensive dataset available of public and private facilities and program sites that impact the quality of NYC neighborhoods.</h3>                            
                            
                            <p>Read more about this dataset <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database" style={{'textDecoration': 'underline'}}>here</a> and help us <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform" style={{'textDecoration': 'underline'}}>improve it.</a></p>
                            <a href="/facilities/all"> <div className="btn btn-lg dcp-orange">View ALL Facilities <i className="fa fa-arrow-right" aria-hidden="true"></i></div></a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content-selection">
                <div className="container">
                    <div className="row">
                        <h3 className="section-heading">Explore a Facility Domain</h3>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/health_and_human_services">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-heart wow bounceIn text-primary" ></i>
                                    <h4>Health & Human Services</h4>
                                    <p className="text-muted">Health and social service providers, including hospitals, legal services, and homeless shelters.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/education_child_welfare_and_youth">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-graduation-cap wow bounceIn text-primary" ></i>
                                    <h4>Education, Child Welfare, & Youth</h4>
                                    <p className="text-muted">Providers of children and youth services and all schools, including higher education facilities.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/parks_cultural_institutions_and_other_community_facilities">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-pagelines wow bounceIn text-primary" ></i>
                                    <h4>Parks, Cultural, & Other Community Facilities</h4>
                                    <p className="text-muted">Cultural institutions, historic sites, recreational areas, parks, and nature preserves.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/public_safety_emergency_services_and_administration_of_justice">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-ambulance wow bounceIn text-primary" ></i>
                                    <h4>Public Safety, Emergency Services, & Administration of Justice</h4>
                                    <p className="text-muted">Police services, emergency response, courthouses, and correctional facilities.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/core_infrastructure_and_transportation">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-bus wow bounceIn text-primary" ></i>
                                    <h4>Core Infrastructure & Transportation</h4>
                                    <p className="text-muted">Train and bus yards, parking lots, solid waste processors, and wastewater treatment plants.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/administration_of_government">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-bar-chart wow bounceIn text-primary" ></i>
                                    <h4>Administration of Government</h4>
                                    <p className="text-muted">Sites owned or leased by the City for administration, operations, and maintenance.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="section-heading">Explore Customized Facility Groupings</h3>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/subset/government_owned_or_operated">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-university wow bounceIn text-primary" ></i>
                                    <h4>Government Owned or Operated</h4>
                                    <p className="text-muted"> All facilities owned or operated by City, State, or Federal agencies.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/subset/community_facilities_ceqr">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-hospital-o wow bounceIn text-primary" ></i>
                                    <h4>Community Facilities for CEQR Analysis</h4>
                                    <p className="text-muted">Public or publicly funded schools, libraries, child care centers, health care facilities, and fire and police protection.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/subset/children_seniors_and_people_with_disabilities">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-child wow bounceIn text-primary" ></i>
                                    <h4>Children, Seniors, & People with Disabilities</h4>
                                    <p className="text-muted">All facilities focused on serving children, seniors, or people with disabilities.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-lg-offset-4 text-center">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-envelope-o wow bounceIn text-primary" ></i>
                                    <h4>Recommend Additional Groupings</h4>
                                    <p className="text-muted">What other groupings would be useful for you? Please share your suggestions.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="section-heading">Data Downloads</h3>
                        <div className="col-md-12 text-center" style={{'paddingBottom':'40px'}}>
                            <div className="btn btn-lg dcp-orange">Coming Soon!</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <Footer/>
        <Modal
          heading={this.state.modalHeading}
          body={this.state.modalContent}
          closeText={this.state.modalCloseText}
          ref="modal"
        />
      </div>
    );
  }

});

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
      The FacDB is only as good as the source data it aggregates. Currently, FacDB is the most comprehensive, spatial data resource of facilities run by public and non-public entities in NYC, but it does not claim to capture every facility within the specified domains. Many records could not be geocoded. There are also known to be cases when the address provided in the source data is for a headquarters office rather the facility site location. Unfortunately these could not be systematically verified. The descriptions of the different facility types are also limited by what is available in the source data. For more detailed information on a specific facility please reach out to the respective oversight agency.
    </p>
    <p>
      <b>Duplicates.</b> Please be aware that this beta version of the database also includes cases of duplicate records for the same facility. This is because several of the source datasets have content that overlaps with other datasets. We are working to systematically identify these duplicate records and retain the most up-to-date and detailed record.
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

module.exports=FacilitiesLandingPage;
