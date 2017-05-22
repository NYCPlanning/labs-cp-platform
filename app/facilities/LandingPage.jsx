import React from 'react';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';

import SplashSelector from './SplashSelector';
import SplashDuo from './SplashDuo';
import Footer from '../common/Footer';
import layersGenerator from './layersGenerator';
import ga from '../helpers/ga';

import './LandingPage.scss';


const FacilitiesLandingPage = createReactClass({

  componentDidMount() {
    document.title = 'Capital Planning Platform';
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
                <p className="learn-more"><Link to="/about/facilities">Learn More</Link></p>

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
                            proptype: {
                              type: 'multiSelect',
                              disabled: false,
                              values: [
                                {
                                  value: 'City Owned',
                                  label: 'City Owned',
                                  checked: true,
                                },
                                {
                                  value: 'City Leased',
                                  label: 'City Leased',
                                  checked: true,
                                },
                                {
                                  value: '',
                                  label: 'Not Owned or Leased by City',
                                  checked: false,
                                },
                              ],
                            },
                          },
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'City Owned and Leased Sites',
                      })}
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
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Community Facilities for CEQR',
                      })}
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
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Children, Seniors, ADA Programs',
                      })}
                    >
                      Children, Seniors, ADA Programs
                    </Link>
                  </div>
                  <div className="box preset-link ">
                    <Link
                      className="btn btn-default"
                      to={{
                        pathname: '/facilities/explorer',
                        state: {
                          layers: layersGenerator.partialChecked({
                            'Parks, Gardens, and Historical Sites': {
                              'Parks and Plazas': {
                                'Privately Owned Public Space': null },
                            },
                          }),
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Privately Owned Public Space',
                      })}
                    >
                      Privately Owned Public Space
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
                              'Health Care': {
                                'Hospitals and Clinics': null,
                                'Mental Health': null,
                                'Residential Health Care': null,
                                'Chemical Dependency': null },
                              'Human Services': null,
                            },
                            'Education, Child Welfare, and Youth': {
                              'Schools (K-12)': { 'Public Schools': null },
                              'Child Care and Pre-Kindergarten': null,
                              'Childrens Services': { 'Foster Care Services and Residential Care': null },
                              'Youth Services': null,
                              Camps: null,
                            },
                            'Libraries and Cultural Programs': {
                              Libraries: { 'Public Libraries': null } },
                            'Public Safety, Emergency Services, and Administration of Justice': {
                              'Public Safety': { 'School-Based Safety Program': null },
                            },
                            'Core Infrastructure and Transportation': { 'Solid Waste': { 'Solid Waste Transfer and Carting': null } },
                          }),
                        },
                      }}
                      onClick={() => ga.event({
                        category: 'facilities-entry',
                        action: 'frequently-used',
                        label: 'Selected Community Resources',
                      })}
                    >
                      Selected Community Resources
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
