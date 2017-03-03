import React from 'react';
import { Link } from 'react-router';

import SplashSelector from './SplashSelector';
import SplashTrio from './SplashTrio';
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
              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#777', padding: '40px', marginBottom: '40px' }}>
                <h1 className="section-heading">NYC Facilities Explorer</h1>
                <p className="subtitle">The most comprehensive dataset of public and private facilities and program sites that shape the quality of New York City neighborhoods</p>
                <p className="learn-more"><Link to="/about">Learn More</Link></p>
                <SplashTrio />
              </div>

              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#777', padding: '40px' }}>
                <h3 className="section-heading">Build a Custom Map</h3>
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
