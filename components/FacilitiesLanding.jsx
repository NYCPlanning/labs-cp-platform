import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'


var HomePage = React.createClass({
  componentDidMount: function() {
    document.title = "Capital Planning Platform";
  },

  render() {
    return(
      <div >
        <Nav title='Facilities and Program Sites Explorer' auth={this.props.auth}/>

        <div className="main-content">
            <section className="bg-primary" id="about" style={{'backgroundImage': "url(gif/facilitiesdemo.gif)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 text-center" style={{'background': "#A0A0A0"}}>
                            <h2 className="section-heading">The NYC Facilities Database</h2>
                            <hr className="light"/>
                            <p className="text-faded">A comprehensive dataset that captures the locations and descriptions of public and private facilities ranging from education to health care, social services, recreation, and solid waste management. All the facilities are operated, funded, or licensed by a City, State, or Federal agency.</p>                            
                            <hr className="light"/>
                            <a href="/facilities/all">
                                <h4 style={{'color': '#DC6B27','background': '#D3D3D3','padding': '6px', 'border-radius': '6px'}}>Click here to explore an interactive map of all 34,000 facilities.</h4>
                            </a>
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
                                <div className="service-box" style={{'background': "#D3D3D3"}}>
                                    <i className="fa fa-4x fa-heart wow bounceIn text-primary" ></i>
                                    <h4>Health & Human Services</h4>
                                    <p className="text-muted">Health and social service providers, including hospitals, legal services, and homeless shelters.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/education_child_welfare_and_youth">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-graduation-cap wow bounceIn text-primary" ></i>
                                    <h4>Education, Child Welfare, & Youth</h4>
                                    <p className="text-muted">Providers of children and youth services and all schools, including higher education facilities.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/parks_cultural_institutions_and_other_community_facilities">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-pagelines wow bounceIn text-primary" ></i>
                                    <h4>Parks, Cultural, & Other Community Facilities</h4>
                                    <p className="text-muted">Cultural institutions, historic sites, recreational areas, parks, and nature preserves.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/public_safety_emergency_services_and_administration_of_justice">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-ambulance wow bounceIn text-primary" ></i>
                                    <h4>Public Safety, Emergency Services, & Administration of Justice</h4>
                                    <p className="text-muted">Police services, emergency response, courthouses, and correctional facilities.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/core_infrastructure_and_transportation">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-bus wow bounceIn text-primary" ></i>
                                    <h4>Core Infrastructure & Transportation</h4>
                                    <p className="text-muted">Train and bus yards, parking lots, solid waste processors, and wastewater treatment plants.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/administration_of_government">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
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
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-university wow bounceIn text-primary" ></i>
                                    <h4>Government Owned or Operated</h4>
                                    <p className="text-muted"> All facilities owned or operated by City, State, or Federal agencies.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/subset/community_facilities_ceqr">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-hospital-o wow bounceIn text-primary" ></i>
                                    <h4>Community Facilities for CEQR Analysis</h4>
                                    <p className="text-muted">Public or publicly funded schools, libraries, child care centers, health care facilities, and fire and police protection.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/subset/children_seniors_and_people_with_disabilities">
                                <div className="service-box" style={{'background': '#D3D3D3'}}>
                                    <i className="fa fa-4x fa-child wow bounceIn text-primary" ></i>
                                    <h4>Children, Seniors, & People with Disabilities</h4>
                                    <p className="text-muted">All facilities focused on serving children, seniors, or people with disabilities.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-lg-offset-4 text-center">
                            <a href="mailto:capital@planning.nyc.gov">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-envelope-o wow bounceIn text-primary" ></i>
                                    <h4>Recommend Additional Groupings!</h4>
                                    <p className="text-muted">What other groupings would be useful for you? Send us an email at Capital@planning.nyc.gov</p>
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
      </div>
    );
  }

});

module.exports=HomePage;
