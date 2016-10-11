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
         <Nav title='NYC Capital Planning Platform'/>

        <div className="col-md-12 main-content">
            {/* Photo Credit https://www.flickr.com/photos/jayant81/*/}
            <div className="jumbotron">
              <div className="container">
                <h1>Welcome, Beta Tester!</h1>
                <p>We’re working to foster better, more collaborative capital planning through data and technology. </p>
                <p><a className="btn btn-lg dcp-orange" href="#first-item" role="button">Explore »</a></p>
              </div>
            </div>
            <section className="paragraphs">

            <p>Starting with explorations of where <Link to='/capitalprojects'>our capital budget is rebuilding our infrastructure</Link>, where <Link to='/facilities'>facilities are creating benefits and burdens for communities</Link>, and where <Link to='/pipeline'>new residential developments are reshaping our neighborhoods</Link>, the Capital Planning Platform is home to a new generation of data and map products that are a response to planning priorities across city agencies.</p>

            <p>This platform is a work in progress. As we integrate new data sets and develop new interactive maps and analysis tools, we’re looking to you to inform our priorities. Explore the maps below and <Link to='/capitalprojects'>suggest improvements</Link>, collaborate with us on <Link to='/capitalprojects'>github</Link>, or just share a comment or question via <Link to='/capitalprojects'>email</Link>. Thanks!</p>

            </section>
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
                        <div className="portfolio-image" style={{backgroundImage: "url(http://casestudies.uli.org/wp-content/uploads/sites/98/2014/01/1_ViaV_BrookAveFacade21.jpg)"}}/>
                    </Link>
                    <p>Compiled from DOB Permit data, the housing pipeline is a best-estimate of new housing units coming online throughout the city</p>
                </div>
            </div>

            <section className="paragraphs">

            <h1>See what else we're building...</h1>

            <p>We’re always testing out new technologies that can help meet planners’ needs. Explore some of these tools below and join the <Link to="http://github.com/nycplanning">NYC Planning Organization on github</Link>.</p>

            </section>
            <div className="col-md-4 portfolio-item">
                <h3>
                    <Link to='/https://nycplanning.github.io/travelsheds'>Travelshed Generator</Link>
                </h3>
                <Link to='https://nycplanning.github.io/travelsheds'>
                    <div className="portfolio-image" style={{backgroundImage: "url('img/travelsheds.png')"}}/>
                </Link>
                <p>Use OpenTripPlanner's routing technology to view travel time isochrones for any spot in the city.</p>
            </div>
            <div className="col-md-4 portfolio-item">
                <h3>
                    <Link to='https://nycplanning.github.io/postgis-preview'>PostGIS Preview</Link>
                </h3>
                <Link to='https://nycplanning.github.io/postgis-preview'>
                    <div className="portfolio-image" style={{backgroundImage: "url('https://pbs.twimg.com/media/ChefMyAWgAEIDu1.jpg')"}}/>
                </Link>
                <p>A simple web-map preview tool for your local postGIS database.</p>
            </div>
        </div>


        
        
      </div>
    );
  }

});

module.exports=HomePage;
