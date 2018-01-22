import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedbackForm from '../common/FeedbackForm';

import fetchDetails from '../actions/sca';

import './SCADetailPage.scss';

class SCADetailPage extends React.Component {
  componentWillMount() {
    this.fetchPageData(parseInt(this.props.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchPageData(nextProps.id);
  }

  fetchPageData(id) {
    this.props.fetchDetails(id);
  }

  render() {
    const d = this.props.scaDetails.properties || {};

    return (
      <div className="sca-page container-fluid">
        <div className={'row'}>
          <div className="col-md-12">
            <h1>{d.schoolname}</h1>
            <div className="project-type">
              Project Type: <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }}>{d.type}</span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className={'col-md-6'}>
            <div className="panel panel-default">
              <div className="panel-heading">School</div>
              <div className="panel-body">
                {d.location && <p>{d.location}</p>}
                {d.district && <p><strong>District:</strong> {d.district}</p>}
              </div>
            </div>
          </div>

          <div className={'col-md-6'}>
            <div className="panel panel-default">
              <div className="panel-heading">Capital Investments</div>
              <div className="panel-body">
                {d.description && <p>{d.description}</p>}
                {d.forecastcapacity && <p><strong>Forecast Capacity:</strong> {d.forecastcapacity}</p>}
                {d.projectid && <p><strong>Project ID:</strong> {d.projectid}</p>}

                {d.designstart && <p><strong>Design Start:</strong> {d.designstart}</p>}
                {(d.constrstart || d.constrstartfy) && <p><strong>Construction Start:</strong> {d.constrstart || d.constrstartfy}</p>}
                {d.actualestcompletion && <p><strong>Construction Est. End:</strong> {d.actualestcompletion}</p>}
              </div>
            </div>
          </div>

        </div>

        <FeedbackForm
          ref_type="sca"
          ref_id={this.props.id}
          location={this.props.location}
          auth={this.props.auth}
        />
      </div>
    );
  }
}

SCADetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.shape().isRequired,
  auth: PropTypes.object,
  scaDetails: PropTypes.object,
  fetchDetails: PropTypes.func.isRequired,
};

SCADetailPage.defaultProps = {
  scaDetails: {},
  auth: null,
};

const mapStateToProps = ({ sca }) => ({
  scaDetails: sca.scaDetails,
});

export default connect(mapStateToProps, { fetchDetails })(SCADetailPage);
