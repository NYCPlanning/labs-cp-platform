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
      <div>
        <Nav title='NYC Capital Planning Platform' auth={this.props.auth}/>

        <div className="col-md-12 main-content">
        
            <section className="headline-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 ">
                        <h2 className="section-heading">A new resource for better, more collaborative planning through data and technology.</h2>
                        <h3>We're just getting started - <a href="#">read more here</a> or <a href="#">collaborate with us</a></h3>
                        
                    </div>
                </div>
            </div>
            </section>
            <section className='section-portfolio'>
                <div className='container portfolio'>
                    <div className="col-md-4 portfolio-item"  >
                        <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(https://d2r8g4a6gdnaur.cloudfront.net/pages/_pageFullWidthImage2x/2014-10-Governors-Island-Iwan-Baan-2.jpg)"}}></div>
                        <div className="title"><h3>Capital Projects and Plans</h3></div>
                        <div className="hover-panel">
                            <h4>Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor</h4>
                            <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                        </div>
                       
                    </div>
                    <div className="col-md-4 portfolio-item" >
                        <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(http://www1.nyc.gov/html/onenyc/img/initiatives/_thumb/Vision2-Goal3-Init1.jpg)"}}></div>
                        <div className="title"><h3>Facilities And Program Sites</h3></div>
                        <div className="hover-panel">
                            <h4>Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor</h4>
                            <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                        </div>
                       
                    </div>
                    <div className="col-md-4 portfolio-item" >
                        <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(img/pipeline.jpg)"}} ></div>
                        <div className="title"><h3>New Housing Developments</h3></div>
                        <div className="hover-panel">
                            <h4>Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor</h4>
                            <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                        </div>
                    </div>
                   
                </div>
            </section>
            <section className="bg-primary">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 text-center">
                        <h2 className="section-heading">See what else we're building</h2>
                        <hr className="light"/>
                        <p className="text-faded">We’re always testing out new technologies that can help meet planners’ needs. Explore some of these tools below and join the <Link to="http://github.com/nycplanning">NYC Planning Organization on github</Link>.</p>
                        
                    </div>
                </div>
            </div>
            </section>
            <section>
                <div className='container portfolio'>
                    <div className="col-md-4 portfolio-item">
                        <h3>
                            <a href='https://nycplanning.github.io/travelsheds'>Travelshed Generator</a>
                        </h3>
                         <a href='https://nycplanning.github.io/travelsheds'>
                            <div className="portfolio-image" style={{backgroundImage: "url('img/travelsheds.png')"}}/>
                        </a>
                        <p>Use OpenTripPlanner's routing technology to view graduated travel-time areas (isochrones) from any spot in the city.</p>
                    </div>
                    <div className="col-md-4 portfolio-item">
                        <h3>
                             <a href='https://github.com/nycplanning/postgis-preview'>PostGIS Preview</a>
                        </h3>
                         <a href='https://github.com/nycplanning/postgis-preview'>
                            <div className="portfolio-image" style={{backgroundImage: "url('https://pbs.twimg.com/media/ChefMyAWgAEIDu1.jpg')"}}/>
                        </a>
                        <p>A simple web-map preview tool for your local postGIS database.</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>


        
        
      </div>
    );
  }

});

module.exports=HomePage;
