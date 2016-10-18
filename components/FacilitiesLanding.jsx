import React from 'react'
import Nav from './Nav.jsx'
import {Link} from 'react-router'

var HomePage = React.createClass({
  componentDidMount: function() {
    document.title = "NYC Capital Planning Platform";
  },

  render() {
    return(
      <div>
        <Nav title='NYC Capital Planning Platform' auth={this.props.auth}/>

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
        <section>
            <div className="container">
                <div className="row">
                    <h3 className='pull-left'>Explore All Facilities</h3> 
             
                    <div className="col-md-12 text-center" >
                        <div className="service-box">
                            <i className="fa fa-4x fa-building wow bounceIn text-primary" ></i>
                            <h4>All Facilities</h4>
                            <p className="text-muted">View an interactive map of all 34,000 facilities in the datbase.  Toggle Groups and Sub-groups to see only the data that's relevant to you.</p>
                        </div>
                    </div>
                 
        
                </div>
                <div className="row">
                    <h3>Explore facilities by Category</h3>
                    <div className="col-sm-2 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-heart wow bounceIn text-primary" ></i>
                            <h4>Health & Human Services</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                        </div>
                    </div>
                    <div className="col-sm-2 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-graduation-cap wow bounceIn text-primary" ></i>
                            <h4>Education, Child Welfare, & Youth</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                        </div>
                    </div>
                    <div className="col-sm-2 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-pagelines wow bounceIn text-primary" ></i>
                            <h4>Parks, Cultural, & Other Community Facilities</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                        </div>
                    </div>
                    <div className="col-sm-2 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-ambulance wow bounceIn text-primary" ></i>
                            <h4>Public Safety, Emergency Services, & Administration of Justice</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                        </div>
                    </div>
                    <div className="col-sm-2 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-train wow bounceIn text-primary" ></i>
                            <h4>Core Infrastructure & Transportation</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                        </div>
                    </div>
                    <div className="col-sm-2 text-center">
                        <div className="service-box">
                            <i className="fa fa-4x fa-bar-chart wow bounceIn text-primary" ></i>
                            <h4>Administration of Government</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id urna fermentum, pellentesque nunc ac, sagittis neque. Aliquam porttitor dapibus ex porta luctus.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3>Explore Customized Facility Groups</h3>
                </div>
            </div>
        </section>


        
        
      </div>
    );
  }

});

module.exports=HomePage;
