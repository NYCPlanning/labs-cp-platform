import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Footer from '../common/Footer';
import AdvisoryModal from '../common/AdvisoryModal';

import * as capitalProjectsActions from '../actions/capitalProjects';
import { hideModal } from '../actions/advisoryModalActions';


import './LandingPage.scss';

class LandingPage extends React.Component {
  componentWillMount() {
    this.props.resetFilter();
    document.addEventListener('keydown', this.handleEscKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  handleClose = () => {
    this.props.hideModal();
  };

  handleEscKey = (event) => {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  };

  render() {
    const { showAdvisoryModal } = this.props;

    return (
      <div className="capitalprojects-landing">
        {showAdvisoryModal && <AdvisoryModal handleClose={this.handleClose} />}
        <section className="header-area" id="about">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-10 col-lg-offset-1 text-center"
                style={{ background: '#777', padding: '40px' }}
              >
                <h1 className="section-heading">NYC Capital Projects</h1>
                <p className="subtitle">
                  A new way to explore NYC&apos;s Capital Commitment Plan and
                  Capital Spending
                </p>
                <p className="learn-more">
                  <Link to="/about/capitalprojects">Learn More</Link>
                </p>
                <div className="splash-button-section">
                  <div className="box all-link">
                    <Link
                      to="/capitalprojects/table"
                      className="btn btn-default"
                    >
                      <div className="vertical-align">
                        Search the <br /> Capital Commitment Plan
                      </div>
                    </Link>
                    <div className="blurb">
                      Raw data for all capital projects within the most recent
                      Capital Commitment Plan published by the Mayor&apos;s
                      Office of Management and Budget.
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
                      <div className="vertical-align">
                        Explore <br /> Capital Projects on a Map
                      </div>
                    </Link>
                    <div className="blurb">
                      Capital projects within the Capital Commitment Plan that
                      NYC Planning has worked with agencies to map - a subset of
                      total planned spending.
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

LandingPage.propTypes = {
  resetFilter: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showAdvisoryModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showAdvisoryModal: state.advisoryModal.showAdvisoryModal,
});

const mapDispatchToProps = {
  resetFilter: capitalProjectsActions.resetFilter,
  hideModal,
};


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
