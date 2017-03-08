import React from 'react';

import BackButton from '../common/BackButton';
import ModalMap from '../common/ModalMap';
import FeedbackForm from '../common/FeedbackForm';

import carto from '../helpers/carto';

const DevelopmentPage = React.createClass({
  propTypes: {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
    }).isRequired,
    location: React.PropTypes.shape().isRequired,
  },

  getInitialState() {
    return ({
      data: null,
    });
  },

  componentDidMount() {
    const self = this;
    // after mount, fetch data and set state
    carto.getFeature('pipeline_projects', 'cartodb_id', parseInt(this.props.params.id))
      .then((data) => { self.setState({ data }); });
  },

  renderContent(data) {
    const d = data.properties;

    return (
      <div className="development-page">
        <div className="col-md-12">
          <div className={'row'}>
            <div
              className="button-container col-md-3 col-md-push-9"
              style={{ textAlign: 'right' }}
            >
              <BackButton
                location={this.props.location}
                defaultText="Development Map"
                defaultLink="/pipeline"
              />
            </div>
            <div className="col-md-9 col-md-pull-3">
              <h3>{d.dob_permit_address}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <ModalMap feature={this.state.data} label={d.dob_permit_address} />
          <FeedbackForm
            displayUnit="Development"
            ref_type="development"
            ref_id={this.props.params.id}
          />
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <h4>General Information</h4>
              <dl className="dl-horizontal">
                <dt>Development Type</dt>
                <dd>{d.dcp_pipeline_category}</dd>

                <dt>Status</dt>
                <dd>{d.dcp_pipeline_status}</dd>

                <dt>Total Net Units</dt>
                <dd>{d.dcp_units_use_map}</dd>

                <dt>Complete Units</dt>
                <dd>{d.dcp_units_complete}</dd>

                <dt>Incomplete Units (permit issued)</dt>
                <dd>{d.dcp_units_outstanding}</dd>

                <dt>Potential Units (permit application)</dt>
                <dd>{d.dcp_units_pending}</dd>

                <dt>BBL</dt>
                <dd>{d.dob_permit_bbl}</dd>

                <dt>Building Id (BIN)</dt>
                <dd>{d.dob_permit_bin}</dd>
              </dl>
            </li>


            <li className="list-group-item">
              <h4>DOB Certificate of Occupancy Details</h4>
              <dl className="dl-horizontal">
                <dt>Earliest CofO (Since 2010)</dt>
                {/* eslint-disable no-undef */}
                <dd>{moment(d.dob_cofo_date_first).format('MM/DD/YYYY')}</dd>

                <dt>Most Recent CofO</dt>
                <dd>{moment(d.dob_cofo_date_last).format('MM/DD/YYYY')}</dd>
                {/* eslint-enable no-undef */}
                <dt>Most Recent CofO Type</dt>
                <dd>{d.dob_cofo_type_last}</dd>


              </dl>
            </li>

            <li className="list-group-item">
              <h4>HPD Information</h4>
              <dl className="dl-horizontal">
                <dt>Project Name</dt>
                <dd>{d.hpd_project_name}</dd>

                <dt>HPD-Supported Units</dt>
                <dd>{d.hpd_units_supported_total}</dd>

              </dl>
            </li>
          </ul>
        </div>
      </div>
    );
  },

  render() {
    const content = this.state.data ? this.renderContent(this.state.data) : null;

    return (
      <div className="fluid-content display-content">
        {content}
      </div>
    );
  },

});

module.exports = DevelopmentPage;
