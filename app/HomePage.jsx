//HomePage.jsx - The Homepage for the Capital Planning Plaform, simple content and some info modals
//Props:
//  auth - auth object passed down from App.jsx, includes login information
//  showModal - Global method to show modal 

import React from 'react'
import {Link} from 'react-router'

import Nav from './common/Nav.jsx'
import Footer from './common/Footer.jsx'

import '../stylesheets/HomePage.scss'

var HomePage = React.createClass({
  componentDidMount: function() {
    document.title = "NYC Capital Planning Platform";
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About the Platform',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  showCollaborate() {
    this.refs.nav.showCollaborate()
  },

  render() {
    return(
   

      <div className="col-md-12 fluid-content">
      
        <section className="headline-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 ">
              <h2 className="section-heading">A new resource for better, more collaborative planning through data and technology.</h2>
              <h3>We're just getting started - <a href="#" onClick={this.showAbout}>read more here</a> or <a href="#" onClick={this.showCollaborate}>collaborate with us</a></h3>
              
            </div>
          </div>
        </div>
        </section>
        <section className='section-portfolio'>
          <div className='container portfolio'>
            <Link to="/capitalprojects">
              <div className="col-md-4 portfolio-item"  >
                <div className="portfolio-image" style={{backgroundImage: "url(img/bridge.png)"}}></div>
                <div className="title"><h3>Capital Projects and Plans</h3></div>
                <div className="hover-panel">
                  <h4>We've aggregated agencies' capital maps into a unified web experience - a place to coordinate across agencies and advance neighborhood-based planning</h4>
                  <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                </div>
                 
              </div>
            </Link>
            <Link to="/facilities">
              <div className="col-md-4 portfolio-item" >
                <div className="portfolio-image" style={{backgroundImage: "url(img/kids.png)"}}></div>
                <div className="title"><h3>Facilities And Program Sites</h3></div>
                <div className="hover-panel">
                  <h4>NYC has more than 30k facilities that impact our neighborhoods' services and quality of life - explore them here to consider opportunities to better serve New Yorkers.</h4>
                  <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                </div>
                 
              </div>
            </Link>
            <Link to="pipeline">
              <div className="col-md-4 portfolio-item" >
                <div className="portfolio-image" style={{backgroundImage: "url(img/buildings.png)"}} ></div>
                <div className="title"><h3>New Housing Developments</h3></div>
                <div className="hover-panel">
                  <h4>New residential development is reshaping NYC neighborhoods - explore the map and see how this growth can inform planning and investment priorities.</h4>
                  <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                </div>
              </div>
            </Link>             
          </div>
        </section>
        <section className="bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 text-center">
              <h2 className="section-heading">See what else we're building</h2>
              <hr className="light"/>
              <p className="text-faded">We’re always testing out new technologies that can help meet planners’ needs. See our works in progress below and tell us how new planning technologies and data could help with your workflow.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className='building'>
                <div className="col-md-4">
                  <a href='https://nycplanning.github.io/travelsheds'>
                    <div className="col-md-12 building-item text-left">
                      <h3>
                        Travelshed Generator
                      </h3>
                      
                      <div className="building-image" style={{backgroundImage: "url('img/travelsheds.png')"}}/>
                     
                      <p>Use OpenTripPlanner's routing technology to view graduated travel-time areas (isochrones) from any spot in the city.</p>
                    </div>
                  </a>
                </div>

                <div className="col-md-4">
                  <a href='https://github.com/nycplanning/postgis-preview'>
                    <div className="col-md-12 building-item text-left">
                      <h3>
                        PostGIS Preview
                      </h3>
                      
                      <div className="building-image" style={{backgroundImage: "url('https://pbs.twimg.com/media/ChefMyAWgAEIDu1.jpg')"}}/>
                     
                      <p>A simple web-map preview tool for your local postGIS database.</p>
                    </div>
                  </a>
                </div>

                <div className="col-md-4">
                  <a href='#'>
                    <div className="col-md-12 building-item text-left">
                      <h3>
                        Neighborhood Profiles
                      </h3>
                      <div className='coming-soon'> 
                        <p>Coming Soon</p>
                      </div>
                      <div className="building-image" style={{backgroundImage: "url('http://www1.nyc.gov/assets/planning/images/content/pages/data-maps/maps-geography/city-neighborhoods/mapview.jpg')"}}/>
                     
                      <p>We're working on a tool to allow planners to quickly view metrics about any place in the city.  Let us know how you might use it here.</p>
                    </div>
                  </a>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        </section>
        <Footer/>
      </div>
    )
  }

});

var aboutContent = (
  <div>
  <h3 className="modal-opener">The Capital Planning Platform, currently in beta, is a place for capital planners across city agencies to access interactive maps, data, and analytical tools to inform capital investment planning and priorities.</h3>


  <p>Since we started the Capital Planning team at DCP in 2014, we’ve heard consistently that access to better data and mapping technologies can help improve interagency coordination and neighborhood-based planning. This platform is a work-in-progress that aims to meet these needs.</p>


  <p>We’ve started by mapping capital projects, facilities that impact neighborhoods, and new residential developments. We believe these resources can have a significant impact on strategic planning and investment priorities across city agencies.They complement other data and maps that DCP produces, including <a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a>, <a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a>, the <a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a>, and the <a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a>, among others. </p>


  <p>Now we’re working on more analytical tools that will help integrate data from multiple sources and make it more readily available for mapping and analysis.</p>


  <p>We hope you find this effort useful, and let us know how we can improve this resource here.</p>

  <div className="modal-logo"></div>

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

module.exports=HomePage;
