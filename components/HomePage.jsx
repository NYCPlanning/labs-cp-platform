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
            {/* Photo Credit https://www.flickr.com/photos/jayant81/*/}
            <div className="jumbotron">
              <div className="container text-center">
                <h1>Welcome, Beta Testers!</h1>
                <hr className="light"/>
                <p>We’re working to foster better, more collaborative capital planning through data and technology. </p>
               
              </div>
            </div>
            <section className="bg-primary">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 text-center">
                            <p>Starting with explorations of where <Link to='/capitalprojects'>our capital budget is rebuilding our infrastructure</Link>, where <Link to='/facilities'>facilities are creating benefits and burdens for communities</Link>, and where <Link to='/pipeline'>new residential developments are reshaping our neighborhoods</Link>, the Capital Planning Platform is home to a new generation of data and map products that are a response to planning priorities across city agencies.</p>
                            <hr className="light"/>
                            <p>This platform is a work in progress. As we integrate new data sets and develop new interactive maps and analysis tools, we’re looking to you to inform our priorities. Explore the maps below and <Link to='/capitalprojects'>suggest improvements</Link>, collaborate with us on <Link to='/capitalprojects'>github</Link>, or just share a comment or question via <Link to='/capitalprojects'>email</Link>. Thanks!</p>

                    </div>
                </div>
            </div>

            </section>
            <section>
                <div className='container portfolio'>
                    <div className="col-md-4 portfolio-item" id="first-item">
                        <h3>
                            <Link to='/capitalprojects'>Capital Projects + Plans</Link>
                        </h3>
                        <Link to='/capitalprojects'>
                            <div className="portfolio-image" style={{backgroundImage: "url(https://d2r8g4a6gdnaur.cloudfront.net/pages/_pageFullWidthImage2x/2014-10-Governors-Island-Iwan-Baan-2.jpg)"}}/>
                        </Link>
                        <p>View citywide capital projects compiled from 15 different agencies, including funding, timeline, and location</p>
                    </div>
                    <div className="col-md-4 portfolio-item">
                        <h3>
                            <Link to='/facilities'>Facilities</Link>
                        </h3>
                        <Link to='/facilities'>
                            <div className="portfolio-image" style={{backgroundImage: "url(http://www1.nyc.gov/html/onenyc/img/initiatives/_thumb/Vision2-Goal3-Init1.jpg)"}}/>
                        </Link>
                        <p>Check out this comprehensive map and dataset of all public facilities, including nonprofits and other entities who receive government funding</p>
                    </div>
                    <div className="col-md-4 portfolio-item">
                        <h3>
                            <Link to='/pipeline'>New Housing developments</Link>
                        </h3>
                        <Link to='/pipeline'>
                            <div className="portfolio-image" style={{backgroundImage: "url(img/pipeline.jpg)"}}/>
                        </Link>
                        <p>Compiled from DOB Permit data, the housing pipeline is a best-estimate of new housing units coming online throughout the city</p>
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
