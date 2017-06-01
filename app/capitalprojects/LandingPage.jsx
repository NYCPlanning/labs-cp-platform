import React from 'react';
import { Link } from 'react-router';

import Footer from '../common/Footer';

import './LandingPage.scss';

class LandingPage extends React.Component {
  componentDidMount() {
    document.title = 'Capital Planning Platform';
  }

  render() {
    return (
      <div className="capitalprojects-landing">
        <section className="header-area" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#777', padding: '40px' }}>
                <h1 className="section-heading">NYC Capital Projects Explorer</h1>
                <p className="subtitle">A new way to explore NYC&apos;s Capital Commitment Plan and Capital Spending</p>
                <p className="learn-more"><Link to="/about/capitalprojects">Learn More</Link></p>
                <div className="splash-button-section">
                  <div className="box all-link">
                    <Link
                      to="/capitalprojects/table"
                      className="btn btn-default"
                    >
                      <div className="vertical-align">Search the <br /> Capital Commitment Plan</div>
                    </Link>
                    <div className="blurb">
                      Raw data for all capital projects within the most recent Capital Commitment Plan published by the Mayor’s Office of Management and Budget.
                    </div>
                  </div>

                  <div className="box or-text">
                    <div className="vertical-align">or</div>
                  </div>

                  <div className="box all-link">
                    <Link
                      to="/capitalprojects/explorer"
                      className="btn btn-default"
                    >
                      <div className="vertical-align">Explore <br /> Capital Projects on a Map</div>
                    </Link>
                    <div className="blurb">
                      Capital projects within the Capital Commitment Plan that NYC Planning has worked with agencies to map - a subset of total planned spending.
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
  }
}

module.exports = LandingPage;
