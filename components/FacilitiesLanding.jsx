import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import Modal from './Modal.jsx'

var aboutContent = 'About'

var collaborateContent = "Collaborate"


var FacilitiesLandingPage = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
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
      modalHeading: 'About this Tool',
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
      <div >
        <Nav title='Facilities and Program Sites Explorer' auth={this.props.auth}>
            <li onClick={this.showAbout}><a> About</a></li>
            <li onClick={this.showCollaborate}><a> Collaborate</a></li>
        </Nav>

        <div className="main-content">
            <section className="bg-primary" id="about" style={{'backgroundImage': "url(/img/facilities_landing_background.png)", 'padding': '60px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1 text-center" style={{'background': "#606060", 'opacity':'0.9', 'padding': '40px'}}>
                            <h2 className="section-heading" style={{'font-size': '32px'}}>The NYC Facilities Database</h2>
                            <hr className="light"/>
                            <h3 className="section-heading" style={{'padding-bottom': '30px', 'font-size': '28px'}}>The most comprehensive dataset available of public and private facilities and program sites that impact the quality of NYC neighborhoods.</h3>                            
                            
                            <p className="text-muted">Read more about this dataset <a href="https://nycplanning.github.io/cpdocs/facdb/#city-planning-facilities-database" style={{'text-decoration': 'underline'}}>here</a> and help us <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform" style={{'text-decoration': 'underline'}}>improve it.</a></p>
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
                        <div className="col-md-12 text-center">
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

module.exports=FacilitiesLandingPage;
