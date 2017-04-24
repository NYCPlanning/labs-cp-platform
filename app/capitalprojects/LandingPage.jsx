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
                <p className="subtitle">A new way to explore NYC&apos;s Capital Commitment Plan and Capital Spending</p>
                <p className="learn-more"><Link to="/about">Learn More</Link></p>
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

                <hr className="light" />

                <div className="splash-button-section text-left">
                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-body">

                        <h4>About this tool</h4>
                        <p>
                          The Capital Projects Explorer is a resource provided by DCP primarily created from data published by other City agencies.  The main purpose of this tool is to be a starting point for exploring potential, planned, and ongoing capital projects to better understand and communicate New York City’s capital project portfolio within and across particular agencies. This integrated view provides a broad understanding of what projects are taking place within a certain area, and opportunities for strategic neighborhood planning.
                        </p>

                        <h4>Where the data come from</h4>
                        <p>
                          The majority of data points captured within DCP’s Capital Projects Database are derived from the Capital Commitment Plan published by OMB, which contains planned commitments to ongoing or potential future projects. Supporting data are obtained from Checkbook NYC, a resource provided by the Comptroller.  Spatial data are derived from but not limited to data created and published by DDC, DOT, DPR, ORR, and DCP.
                        </p>

                        <h4>How you can use it</h4>
                        <p>
                          The table view of Capital Projects Database can reliably be used to quickly and easily explore data and learn about ongoing and planned capital projects published in the Capital Commitment Plan and by Checkbook NYC.  The map view of the Capital Projects Database can be used as a starting point for knowing and reporting what capital projects are taking place and where, and identifying any synergies or conflicts among projects.
                        </p>

                        <h4>Limitations</h4>
                        <ul>
                          <li>This is not a project management system, so data on project timeline or budget may be incorrect</li>
                          <li>All monies committed to or spent on a project may not be captured</li>
                          <li>Planned projects that may never come to fruition are captured</li>
                          <li>The spatial data are not 100% reliable, accurate, or exhaustive</li>
                        </ul>

                        <h4>Interested in More?</h4>
                        <p>We’re continuously working to improve the Capital Projects Explorer to make it as valuable of a resource as possible.  Currently, we’re partnering with other City agencies to improve how we map capital projects to increase the reliability of the spatial data.  If you have any ideas on how to improve this resource please share any suggestions with the team, or contact us directly if you’re interested in partnering with us. </p>
                      </div>
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

module.exports = LandingPage;
