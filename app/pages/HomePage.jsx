import React from 'react';
import { Link } from 'react-router';

import Footer from '../common/Footer';

import './HomePage.scss';

const aboutContent = (
  <div>
    <h3 className="modal-opener">The Capital Planning Platform, currently in beta, is a place for capital planners across city agencies to access interactive maps, data, and analytical tools to inform capital investment planning and priorities.</h3>
    <p>Since we started the Capital Planning team at DCP in 2014, we’ve heard consistently that access to better data and mapping technologies can help improve interagency coordination and neighborhood-based planning. This platform is a work-in-progress that aims to meet these needs.</p>
    <p>We’ve started by mapping capital projects, facilities that impact neighborhoods, and new residential developments. We believe these resources can have a significant impact on strategic planning and investment priorities across city agencies.They complement other data and maps that DCP produces, including <a href="http://maps.nyc.gov/census/">NYC Census FactFinder</a>, <a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">PLUTO and MapPLUTO</a>, the <a href="http://maps.nyc.gov/doitt/nycitymap/template?applicationName=ZOLA">Zoning and Land use Application (ZoLA)</a>, and the <a href="http://www1.nyc.gov/site/planning/data-maps/waterfront-access-map.page">Waterfront Access Map</a>, among others. </p>
    <p>Now we’re working on more analytical tools that will help integrate data from multiple sources and make it more readily available for mapping and analysis.</p>
    <p>We hope you find this effort useful, and let us know how we can improve this resource here.</p>
    <div className="modal-logo" />
  </div>
);

const HomePage = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func,
  },

  componentDidMount() {
    document.title = 'NYC Capital Planning Platform';
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About the Platform',
      modalContent: aboutContent,
      modalCloseText: 'Close',
    });
  },

  render() {
    return (
      <div className="col-md-12 fluid-content">
        <section className="headline-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 ">
                <h2 className="section-heading">A new resource for better, more collaborative planning through data and technology.</h2>
                <h3>We&apos;re just getting started - <button onClick={this.showAbout}>read more here</button> or <button onClick={this.showCollaborate}>collaborate with us</button></h3>
              </div>
            </div>
          </div>
        </section>
        <section className="section-portfolio">
          <div className="container portfolio">
            <Link to="/capitalprojects">
              <div className="col-md-4 portfolio-item">
                <div className="portfolio-image" style={{ backgroundImage: 'url(img/bridge.png)' }} />
                <div className="title"><h3>Capital Projects and Plans</h3></div>
                <div className="hover-panel">
                  <h4>We&apos;ve aggregated agencies&apos; capital maps into a unified web experience - a place to coordinate across agencies and advance neighborhood-based planning</h4>
                  <h4 className="hover-panel-explore">Explore <i className="fa fa-angle-right" aria-hidden="true" /></h4>
                </div>
              </div>
            </Link>
            <Link to="/facilities">
              <div className="col-md-4 portfolio-item" >
                <div className="portfolio-image" style={{ backgroundImage: 'url(img/kids.png)' }} />
                <div className="title"><h3>Facilities And Program Sites</h3></div>
                <div className="hover-panel">
                  <h4>NYC has more than 30k facilities that impact our neighborhoods&apos; services and quality of life - explore them here to consider opportunities to better serve New Yorkers.</h4>
                  <h4 className="hover-panel-explore">Explore <i className="fa fa-angle-right" aria-hidden="true" /></h4>
                </div>
              </div>
            </Link>
            <Link to="pipeline">
              <div className="col-md-4 portfolio-item" >
                <div className="portfolio-image" style={{ backgroundImage: 'url(img/buildings.png)' }} />
                <div className="title"><h3>New Housing Developments</h3></div>
                <div className="hover-panel">
                  <h4>New residential development is reshaping NYC neighborhoods - explore the map and see how this growth can inform planning and investment priorities.</h4>
                  <h4 className="hover-panel-explore">Explore <i className="fa fa-angle-right" aria-hidden="true" /></h4>
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section className="bg-primary">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h2 className="section-heading">See what else we&apos;re building</h2>
                <hr className="light" />
                <p className="text-faded">We&apos;re always testing out new technologies that can help meet planners&apos; needs. See our works in progress below and tell us how new planning technologies and data could help with your workflow.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="building">
                  <div className="col-md-4">
                    <a href="https://nycplanning.github.io/travelsheds">
                      <div className="col-md-12 building-item text-left">
                        <h3>
                          Travelshed Generator
                        </h3>
                        <div className="building-image" style={{ backgroundImage: "url('img/travelsheds.png')" }} />
                        <p>Use OpenTripPlanner&apos;s routing technology to view graduated travel-time areas (isochrones) from any spot in the city.</p>
                      </div>
                    </a>
                  </div>

                  <div className="col-md-4">
                    <a href="https://github.com/nycplanning/postgis-preview">
                      <div className="col-md-12 building-item text-left">
                        <h3>
                          PostGIS Preview
                        </h3>
                        <div className="building-image" style={{ backgroundImage: "url('https://pbs.twimg.com/media/ChefMyAWgAEIDu1.jpg')" }} />
                        <p>A simple web-map preview tool for your local postGIS database.</p>
                      </div>
                    </a>
                  </div>

                  <div className="col-md-4">
                    <div className="col-md-12 building-item text-left">
                      <h3>
                        Neighborhood Profiles
                      </h3>
                      <div className="coming-soon">
                        <p>Coming Soon</p>
                      </div>
                      <div className="building-image" style={{ backgroundImage: "url('https://www1.nyc.gov/assets/planning/images/content/pages/data-maps/maps-geography/city-neighborhoods/mapview.jpg')" }} />
                      <p>We&apos;re working on a tool to allow planners to quickly view metrics about any place in the city.  Let us know how you might use it here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  },
});

module.exports = HomePage;