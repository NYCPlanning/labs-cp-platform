import React from 'react';
import { Link } from 'react-router';

import Footer from '../common/Footer';

import './HomePage.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className="col-md-12 fluid-content">
        <section className="headline-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 ">
                <h2 className="section-heading">An online resource for better, more collaborative planning through data and technology.</h2>
                <h2 className="section-heading">This is a Beta product. <a href="mailto:capital@planning.nyc.gov">Reach out to us</a> with feedback or suggestions.</h2>
                <h3><Link to="/about">Read more here</Link> or <a href="mailto:capital@planning.nyc.gov">collaborate with us</a>.</h3>
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
            <Link to="/map/housing">
              <div className="col-md-4 portfolio-item" >
                <div className="portfolio-image" style={{ backgroundImage: 'url(img/buildings.png)' }} />
                <div className="title"><h3>New Housing Developments</h3></div>
                <div className="hover-panel">
                  <h4>New residential development is reshaping NYC neighborhoods – explore supplemental housing information on the map and see how this growth can inform planning and investment priorities.</h4>
                  <h4 className="hover-panel-explore">Explore <i className="fa fa-angle-right" aria-hidden="true" /></h4>
                </div>
              </div>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}


export default HomePage;
