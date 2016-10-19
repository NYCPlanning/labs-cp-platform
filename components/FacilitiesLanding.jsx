import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'


var HomePage = React.createClass({
  componentDidMount: function() {
    document.title = "NYC Capital Planning Platform";
  },

  render() {
    return(
      <div >
        <Nav title='NYC Capital Planning Platform' auth={this.props.auth}/>

        <div className="main-content">
            <section className="bg-primary" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 text-center">
                            <h2 className="section-heading">The NYC Facilities Database</h2>
                            <hr className="light"/>
                            <p className="text-faded">The facilities database is a comprehensive dataset of government-run or funded community facilites and programs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus. </p>
                            
                        </div>
                    </div>
                </div>
            </section>
            <section className="content-selection">
                <div className="container">
                    <div className="row">
                        <h3 className="section-heading">Explore a Facility Category</h3>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/health_and_human_services">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-heart wow bounceIn text-primary" ></i>
                                    <h4>Health & Human Services</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/education_child_welfare_and_youth">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-graduation-cap wow bounceIn text-primary" ></i>
                                    <h4>Education, Child Welfare, & Youth</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/parks_cultural_institutions_and_other_community_facilities">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-pagelines wow bounceIn text-primary" ></i>
                                    <h4>Parks, Cultural, & Other Community Facilities</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/public_safety_emergency_services_and_administration_of_justice">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-ambulance wow bounceIn text-primary" ></i>
                                    <h4>Public Safety, Emergency Services, & Administration of Justice</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/core_infrastructure_and_transportation">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-train wow bounceIn text-primary" ></i>
                                    <h4>Core Infrastructure & Transportation</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 text-center">
                            <a href="/facilities/domain/administration_of_government">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-bar-chart wow bounceIn text-primary" ></i>
                                    <h4>Administration of Government</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="section-heading">See it all!</h3> 
                 
                        <div className="col-sm-4 text-center" >
                            <a href="/facilities/all">
                                <div className="service-box">
                                    <i className="fa fa-4x fa-building wow bounceIn text-primary" ></i>
                                    <h4>All Facilities</h4>
                                    <p className="text-muted">View an interactive map of all 34,000 facilities in the database.  Toggle Groups and Sub-groups to see only the data that's relevant to you.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="section-heading">Explore Customized Facility Groups</h3>
                        <div className="col-md-12 text-center">
                            <div className="btn btn-lg dcp-orange">Coming Soon!</div>
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
