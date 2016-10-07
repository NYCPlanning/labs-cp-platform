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
                <h1>Welcome beta tester!</h1>
                <p>At DCP we've been hard at work creating the next generation of data and map products for New York City.  Click the links below to explore.</p>
                <p><a className="btn btn-lg dcp-orange" href="#first-item" role="button">Explore »</a></p>
              </div>
            </div>
            <div className="col-md-4 portfolio-item" id="first-item">
                <Link to='/capitalprojects'>
                    <img className="img-responsive" src="img/cpdb.png" alt=""/>
                </Link>
                <h3>
                    <Link to='/capitalprojects'>Capital Projects</Link>
                </h3>
                <p>View citywide capital projects compiled from 15 different agencies, including funding, timeline, and location</p>
            </div>
            <div className="col-md-4 portfolio-item">
                <Link to='/facilities'>
                    <img className="img-responsive" src="img/facilities.png" alt=""/>
                </Link>
                <h3>
                    <Link to='/facilities'>Facilities</Link>
                </h3>
                <p>Check out this comprehensive map and dataset of all public facilities, including nonprofits and other entities who receive government funding</p>
            </div>
            <div className="col-md-4 portfolio-item">
                <Link to='/pipeline'>
                    <img className="img-responsive" src="img/pipeline.png" alt=""/>
                </Link>
                <h3>
                    <Link to='/pipeline'>Housing Pipeline</Link>
                </h3>
                <p>Compiled from DOB Permit data, the housing pipeline is a best-estimate of new housing units coming online throughout the city</p>
            </div>
            <div className="col-md-4 portfolio-item">
                <Link to='https://nycplanning.github.io/travelsheds'>
                    <img className="img-responsive" src="img/travelsheds.png" alt=""/>
                </Link>
                <h3>
                    <Link to='/https://nycplanning.github.io/travelsheds'>Travelshed Generator</Link>
                </h3>
                <p>Use OpenTripPlanner's routing technology to view travel time isochrones for any spot in the city.</p>
            </div>
        </div>


        
        
      </div>
    );
  }

});

module.exports=HomePage;
