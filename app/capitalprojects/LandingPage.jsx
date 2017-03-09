import React from 'react';
import { Link } from 'react-router';

import Footer from '../common/Footer';

import './LandingPage.scss';

const LandingPage = React.createClass({

  componentDidMount() {
    document.title = 'Capital Planning Platform';
  },

  render() {
    return (
      <div className="capitalprojects-landing">
        <section className="header-area" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#777', padding: '40px' }}>
                <h1 className="section-heading">NYC Capital Projects Explorer</h1>
                <p className="subtitle">Lorem Ipsum Dolor</p>
                <p className="learn-more"><Link to="/about">Learn More</Link></p>
                <div className="box preset-link ">
                  <Link
                    className="btn btn-default"
                    to={{
                      pathname: '/capitalprojects/explorer',
                    }}
                  >
                    View Mapped Projects
                  </Link>
                </div>
                <div className="box preset-link ">
                  <Link
                    className="btn btn-default"
                    to={{
                      pathname: '/capitalprojects/table',
                    }}
                  >
                    Table View
                  </Link>
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

module.exports = LandingPage;
