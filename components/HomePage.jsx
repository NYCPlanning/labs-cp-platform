import React from 'react'
import {Link} from 'react-router'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import Modal from './Modal.jsx'

var HomePage = React.createClass({

  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentDidMount: function() {
    document.title = "NYC Capital Planning Platform";
  },

  showAbout() {
    this.showModal({
      modalHeading: 'About the Platform',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  showCollaborate() {
    this.showModal({
      modalHeading: 'Collaborate with Us!',
      modalContent: collaborateContent,
      modalCloseText: 'Close'
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },
 
  render() {
    return(
      <div>
        <Nav title='NYC Capital Planning Platform' auth={this.props.auth}>
            <li onClick={this.showAbout}><a> About</a></li>
            <li onClick={this.showCollaborate}><a> Collaborate</a></li>
        </Nav>

        <div className="col-md-12 main-content">
        
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
                    <a href="capitalprojects">
                        <div className="col-md-4 portfolio-item"  >
                            <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(img/bridge.png)"}}></div>
                            <div className="title"><h3>Capital Projects and Plans</h3></div>
                            <div className="hover-panel">
                                <h4>We've aggregated agencies' capital maps into a unified web experience - a place to coordinate across agencies and advance neighborhood-based planning</h4>
                                <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                            </div>
                           
                        </div>
                    </a>
                    <a href="facilities">
                        <div className="col-md-4 portfolio-item" >
                            <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(img/kids.png)"}}></div>
                            <div className="title"><h3>Facilities And Program Sites</h3></div>
                            <div className="hover-panel">
                                <h4>NYC has more than 30k facilities that impact our neighborhoods' services and quality of life - explore them here to consider opportunities to better serve New Yorkers.</h4>
                                <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                            </div>
                           
                        </div>
                    </a>
                    <a href="pipeline">
                        <div className="col-md-4 portfolio-item" >
                            <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(img/buildings.png)"}} ></div>
                            <div className="title"><h3>New Housing Developments</h3></div>
                            <div className="hover-panel">
                                <h4>New residential development is reshaping NYC neighborhoods - explore the map and see how this growth can inform planning and investment priorities.</h4>
                                <h4 className="hover-panel-explore">Explore  <i className="fa fa-angle-right" aria-hidden="true"></i></h4>
                            </div>
                        </div>
                    </a>
                    {/*
                    <div className="col-md-4 portfolio-item" >
                        <div className="portfolio-image" style={{filter: 'grayscale(100%)', backgroundImage: "url(img/buildings.png)"}} ></div>
                        <div className="title"><h3>Neighborhood Profiles</h3></div>
                        <div className="coming-soon">
                          <h1>Coming Soon</h1>
                        </div>
                        <div className="hover-panel">
                            <h4>Automated spatial data exploration and analysis for NYC's NTAs and Community Districts - Coming soon!</h4>
                            
                        </div>
                    </div>

                    <div className="col-md-8 portfolio-item portfolio-item-quote text-center" >
                        <div className="blockquote">
                            <i className="fa fa-quote-left fa-6" aria-hidden="true"></i><h1>Make no little plans</h1>
                        </div>
                    </div> 
                    */}                  
                   
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
                                <a href='https://nycplanning.github.io/travelsheds'>
                                    <div className="col-md-12 building-item text-left">
                                        <h3>
                                            Neighborhood Profiles
                                        </h3>
                                        <div className='coming-soon'> 
                                            <p>Coming Soon</p>
                                        </div>
                                        <div className="building-image" style={{backgroundImage: "url('img/travelsheds.png')"}}/>
                                   
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

module.exports=HomePage;


var aboutContent = (
  <div>
    <p>The Capital Planning Platform, currently in beta, is a place for capital planners across city agencies to access interactive maps, data, and analytical tools to inform capital investment planning and priorities.</p>


    <p>Since we started the Capital Planning team at DCP in 2014, we’ve heard consistently that access to better data and mapping technologies can help improve interagency coordination and neighborhood-based planning. This platform is a work-in-progress that aims to meet these needs.</p>


    <p>We’ve started by mapping capital projects, facilities that impact neighborhoods, and new residential developments. We believe these resources can have a significant impact on strategic planning and investment priorities across city agencies.They complement other data and maps that DCP produces, including <a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a>, <a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a>, the <a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a>, and the <a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a>, among others. </p>


    <p>Now we’re working on more analytical tools that will help integrate data from multiple sources and make it more readily available for mapping and analysis.</p>


    <p>We hope you find this effort useful, and let us know how we can improve this resource here.</p>

    <div className='modal-logo'></div>

  </div>
)

var collaborateContent = (
  <div>
    <p>The Capital Planning Platform is about more than fostering interagency collaboration in capital investment planning - it’s about creating a digital platform for collaboration on the technologies that planners seek to do their jobs more effectively.</p>


    <p>Indeed, as with most complex data products and new web tools, the data and maps on this site aren’t perfect. What’s important is that we make them as authoritative as possible, pulling from the best available data sources, that everyone understands the methodologies and the limitations of this work, and that we encourage users of this platform - a burgeoning community of planning professionals - to report any errors and suggest improvements.</p>


    <p>More broadly, while we have a long list of improvements that we’re working on, we want to know what data and analysis tools would best serve your needs as we prioritize new features and functions… just drop us a line. And if you can code, we’re building open source, so contributing is easy! <a href="https://github.com/nycplanning">Join us on github</a>.</p>


    <p>Together, we can build a better platform, informing the decisions that build a better city.</p>

    <div className='modal-logo'></div>

  </div>
)
