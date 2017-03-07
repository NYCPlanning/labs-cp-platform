import React from 'react';
import { Link } from 'react-router';

import SplashSelector from './SplashSelector';
import SplashDuo from './SplashDuo';
import Footer from '../common/Footer';
import layersGenerator from './layersGenerator';


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
              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#777', padding: '40px' }}>
                <h1 className="section-heading">NYC Facilities Explorer</h1>
                <p className="subtitle">The most comprehensive dataset of public and private facilities and program sites that shape the quality of New York City neighborhoods</p>
                <p className="learn-more"><Link to="/about">Learn More</Link></p>

                <SplashDuo />

                <div className="splash-button-section hide-mobile">
                  <hr className="light" />
                  <h3 className="section-heading">View Frequently-Used Maps</h3>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/facilities/explorer',
                        state: {
                          filterDimensions: {
                            propertytype: [
                              { value: 'City Owned', label: 'City Owned' },
                              { value: 'City Leased', label: 'City Leased' },
                            ],
                          },
                        },
                      }}
                    >
                      City Owned and Leased Sites
                    </Link>
                  </div>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/facilities/explorer',
                        state: {
                          layers: layersGenerator.partialChecked({
                            'Health and Human Services': { 'Health Care': null },
                            'Education, Child Welfare, and Youth': {
                              'Schools (K-12)': { 'Public Schools': null },
                              'Child Care and Pre-Kindergarten': null,
                            },
                            'Libraries and Cultural Programs': { Libraries: { 'Public Libraries': null } },
                            'Public Safety, Emergency Services, and Administration of Justice': {
                              'Emergency Services': { 'Fire Services': null },
                              'Public Safety': { 'Police Services': null },
                            },
                          }),
                        },
                      }}
                    >
                      Community Facilities for CEQR
                    </Link>
                  </div>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/facilities/explorer',
                        state: {
                          layers: layersGenerator.partialChecked({
                            'Health and Human Services': {
                              'Human Services': { 'Senior Services': null, 'Programs for People with Disabilities': null },
                            },
                            'Education, Child Welfare, and Youth': {
                              'Schools (K-12)': null,
                              'Child Care and Pre-Kindergarten': null,
                              'Child Welfare': null,
                              'Youth Services': null,
                              Camps: null,
                            },
                          }),
                        },
                      }}
                    >
                      Children, Seniors, ADA Facilities
                    </Link>
                  </div>

                  <hr className="light" />

                  <h3 className="section-heading">Build a Custom Map</h3>
                  <SplashSelector />
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

module.exports = FacilitiesLandingPage;
