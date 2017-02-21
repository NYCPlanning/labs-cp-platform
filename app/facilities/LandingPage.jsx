// /facilities/FacLanding.jsx - This component builds the landing page for the Facilities Explorer which links to the full database map and the subset views
// Props:
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React from 'react';
import { Link } from 'react-router';

import SplashSelector from './SplashSelector';
import Footer from '../common/Footer';

import content from './content';

import './LandingPage.scss';

const FacilitiesLandingPage = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    document.title = 'Capital Planning Platform';
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this Tool',
      modalContent: content.aboutContent,
      modalCloseText: 'Got it!',
    });
  },

  render() {
    return (
      <div className="facilities-landing">
        <section className="header-area" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#606060', padding: '40px' }}>
                <h2 className="section-heading" style={{ fontSize: '32px' }}>The NYC Facilities Database</h2>
                <hr className="light" />
                <h3 className="section-heading">The most comprehensive dataset available of public and private facilities and program sites that impact the quality of NYC neighborhoods.</h3>

                <p>Read more about this dataset <a href="http://docs.capitalplanning.nyc/facdb/" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'underline' }}>here</a> and help us <a href="https://docs.google.com/forms/d/e/1FAIpQLScP9JxDvfCmMUxzT9l0_MRYBtTgeAep7pHYO5QUtrRCXGxVTw/viewform" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>improve it.</a></p>
                <Link to="/facilities/explorer"> <div className="btn btn-lg dcp-orange">View ALL Facilities <i className="fa fa-arrow-right" aria-hidden="true" /></div></Link>
                <hr className="light" />
                <h3 className="section-heading">Which facilities would you like to explore?</h3>
                <SplashSelector />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  },

});

module.exports = FacilitiesLandingPage;
