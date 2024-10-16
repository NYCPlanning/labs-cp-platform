import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import SplashSelector from './SplashSelector';
import SplashDuo from './SplashDuo';
import Footer from '../common/Footer';
import getDefaultFilterDimensions from './config';
import ga from '../helpers/ga';
import * as facilitiesActions from '../actions/facilities';

import './LandingPage.scss';

class FacilitiesLandingPage extends React.Component {
  componentWillMount() {
    this.props.resetFilter();
  }

  render() {
    return (
      <div className="facilities-landing">
        <section className="header-area" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 text-center" style={{ background: '#777', padding: '40px' }}>
                <h1 className="section-heading">NYC Facilities</h1>
                <p className="subtitle">The most comprehensive dataset of public and private facilities and program sites that shape the quality of New York City neighborhoods</p>
                <p className="learn-more"><Link to="/about/facilities">Learn More</Link></p>

                <SplashDuo setFilterDimension={this.props.setFilterDimension} />

                <div className="splash-button-section hide-mobile">
                  <hr className="light" />
                  <h3 className="section-heading">View Frequently-Used Maps</h3>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/map/facilities',
                        state: {
                          filterDimensions: getDefaultFilterDimensions({ selected: {
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
                          } }),
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Community Facilities for CEQR',
                      })}
                    >
                      Community Facilities for CEQR <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Community facilities as defined by the City Environmental Quality Review (CEQR) technical manual. Please note, ULURP applicants should continue to coordinate with DCP to get the appropriate datasets for CEQR analyses; this map is provided solely as a planning tool.</Tooltip>}>
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </OverlayTrigger>
                    </Link>
                  </div>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/map/facilities',
                        state: {
                          filterDimensions: getDefaultFilterDimensions({ selected: {
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
                          } }),
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Children, Seniors, ADA Programs',
                      })}
                    >
                      Children, Seniors, ADA Programs <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">All sites that serve children, seniors, and people with disabilities, including day cares, schools, youth programs, senior centers, and programs for adults with disabilities.</Tooltip>}>
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </OverlayTrigger>
                    </Link>
                  </div>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/map/facilities',
                        state: {
                          filterDimensions: getDefaultFilterDimensions({ selected: {
                            'Parks, Gardens, and Historical Sites': {
                              'Parks and Plazas': {
                                'Privately Owned Public Space': null },
                            },
                          } }),
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Privately Owned Public Space',
                      })}
                    >
                      Privately Owned Public Space <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Also known as POPS: Plazas, arcades, and other open space provided for public use by a private office or residential building owner.</Tooltip>}>
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </OverlayTrigger>
                    </Link>
                  </div>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/map/facilities',
                        state: {
                          filterDimensions: getDefaultFilterDimensions({ selected: {
                            'Health and Human Services': {
                              'Health Care': {
                                'Hospitals and Clinics': null,
                                'Mental Health': null,
                                'Residential Health Care': null,
                                'Substance Use Disorder Treatment Programs': null },
                              'Human Services': null,
                            },
                            'Education, Child Welfare, and Youth': {
                              'Schools (K-12)': {
                                'Public K-12 Schools': null,
                                'Charter K-12 Schools': null,
                                'Special Ed and Schools for Students with Disabilities': null },
                              'Child Care and Pre-Kindergarten': null,
                              'Child Services and Welfare': { 'Foster Care Services and Residential Care': null },
                              'Youth Services': null,
                              Camps: null,
                            },
                            'Libraries and Cultural Programs': {
                              Libraries: { 'Public Libraries': null } },
                            'Public Safety, Emergency Services, and Administration of Justice': {
                              'Public Safety': { 'School-Based Safety Program': null },
                            },
                            'Core Infrastructure and Transportation': { 'Solid Waste': { 'Solid Waste Transfer and Carting': null } },
                          } }),
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Selected Community Resources',
                      })}
                    >
                      Selected Community Resources <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Public schools, day cares, youth programs, health and human services, senior services, public libraries, and solid waste transfer sites.</Tooltip>}>
                        <i className="fa fa-info-circle" aria-hidden="true" />
                      </OverlayTrigger>
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
  }
}

FacilitiesLandingPage.propTypes = {
  resetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ facilities }) => ({
  resetFilter: facilitiesActions.resetFilter,
  setFilterDimension: facilitiesActions.setFilterDimension,
});

export default connect(mapStateToProps, {
  resetFilter: facilitiesActions.resetFilter,
  setFilterDimension: facilitiesActions.setFilterDimension,
})(FacilitiesLandingPage);
