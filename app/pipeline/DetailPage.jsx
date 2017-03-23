import React from 'react';

import BackButton from '../common/BackButton';
import ModalMap from '../common/ModalMap';
import FeedbackForm from '../common/FeedbackForm';

import carto from '../helpers/carto';
import NycGeom from '../helpers/NycGeom';

import './DetailPage.scss';

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
    carto.getFeature('pipeline_projects_dev', 'cartodb_id', parseInt(this.props.params.id))
      .then((data) => { self.setState({ data }); });
  },

  renderContent(data) {
    const d = data.properties;
    const biswebLink = `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${d.dob_job_number}&passdocnumber=&go10=+GO+&requestid=0`;

    return (
      <div className="pipeline-page detail-page">
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
              <h3 className="id-top-line">
                <small>
                  DOB Job <a target="_blank" rel="noopener noreferrer" href={biswebLink}>#{d.dob_job_number}</a> |
                  BIN: {d.dob_permit_bbl} |
                  BBL: {d.dob_permit_bin}
                </small>
              </h3>
              <h1>{d.dob_permit_address}, {NycGeom.getBoroughNameFromId(d.dob_permit_borough)}</h1>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_type_1}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_type_2}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row equal">
            <div className={'col-md-6'}>
              <div className="panel panel-default">
                <div className="panel-heading">Total Existing Units</div>
                <div className="panel-body">
                  {<h3>{d.dob_permit_exist_units ? d.dob_permit_exist_units : 'N/A'}</h3>}
                </div>
              </div>
            </div>
            <div className={'col-md-6'}>
              <div className="panel panel-default">
                <div className="panel-heading">Total Proposed Units</div>
                <div className="panel-body">
                  <h3>{d.dob_permit_proposed_units ? d.dob_permit_proposed_units : 'N/A'}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row equal">
            <div className={'col-md-6'}>
              <div className="panel panel-default">
                <div className="panel-heading">Proposed Unit Change</div>
                <div className="panel-body">
                  {<h3>{d.dob_permit_proposed_units - d.dob_permit_exist_units}</h3>}
                </div>
              </div>
            </div>
            <div className={'col-md-6'}>
              <div className="panel panel-default">
                <div className="panel-heading">Completed Units (Net)</div>
                <div className="panel-body">
                  <h3>{d.dcp_units_complete ? d.dcp_units_complete : 'N/A'}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading">Development Status</div>
                <div className="panel-body">
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Permit Issued</h4>
                      <h3>{moment(d.dob_pdate).format('MM/DD/YYYY')}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Initial CofO*</h4>
                      <h3>{moment(d.dob_cofo_date_first).format('MM/DD/YYYY')}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Latest CofO</h4>
                      <h3>{moment(d.dob_cofo_date_last).format('MM/DD/YYYY')}</h3>
                      <p className="subtext">{d.dob_cofo_type_last}</p>
                    </div>
                  </div>
                </div>
              </div>
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
