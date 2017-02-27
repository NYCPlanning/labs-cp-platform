// /facilities/FacLanding.jsx - This component builds the landing page for the Facilities Explorer which links to the full database map and the subset views
// Props:
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import $ from 'jquery';

import SplashSelector from './SplashSelector';
import SplashFilterShortcuts from './SplashFilterShortcuts';
import Footer from '../common/Footer';

import content from './content';

import './LandingPage.scss';

const FacilitiesLandingPage = React.createClass({
  propTypes: {
    showModal: React.PropTypes.func.isRequired,
  },

  getInitialState: () => ({
    selectedGeography: null,
    ntaSelectionValues: [],
  }),

  componentDidMount() {
    document.title = 'Capital Planning Platform';

    $.getJSON('/data/ntas.json', (data) => {
      this.setState({ ntaSelectionValues: data });
    });
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this Tool',
      modalContent: content.aboutContent,
      modalCloseText: 'Got it!',
    });
  },

  handleGeographySelection(selected) {
    this.setState({ selectedGeography: selected.value });
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

                <div className="row">
                  <div className="col-md-6">
                    <h3 className="section-heading">Jump directly to your neighborhood</h3>
                  </div>
                  <div className="col-md-6 select-container">
                    <Select
                      multi={false}
                      placeholder="Choose a Neighborhood"
                      value={this.state.selectedGeography}
                      name="form-field-name"
                      options={this.state.ntaSelectionValues}
                      onChange={this.handleGeographySelection}
                    />
                    <Link
                      to={{
                        pathname: '/facilities/explorer',
                        state: {
                          adminboundaries: {
                            type: 'nta',
                            value: this.state.selectedGeography,
                          },
                        },
                      }}
                    >
                      <div className={`btn btn-md dcp-orange ${this.state.selectedGeography === null ? 'disabled' : null}`}>
                        <i className="fa fa-arrow-right" aria-hidden="true" />
                      </div>
                    </Link>
                  </div>
                </div>

                <hr className="light" />
                <SplashFilterShortcuts />
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
