import React from 'react';

import BackButton from '../common/BackButton';
import ModalMap from '../common/ModalMap';
import FeedbackForm from '../common/FeedbackForm';

import { getColor } from './config';
import NycGeom from '../helpers/NycGeom';

import PipelineStore from '../stores/PipelineStore';
import PipelineActions from '../actions/PipelineActions';

import './DetailPage.scss';

const DevelopmentPage = React.createClass({
  propTypes: {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
    }).isRequired,
    location: React.PropTypes.shape().isRequired,
  },

  getInitialState() {
    return { data: null };
  },

  componentWillMount() {
    PipelineStore.on('detailDataAvailable', () => {
      this.setState({
        data: PipelineStore.detailData,
      });
    });

    PipelineActions.fetchDetailData(parseInt(this.props.params.id));
  },

  renderContent(data) {
    function addSign(value) {
      if (value >= 0) {
        return `+${value}`;
      } else if (value <= 0) {
        return `${value}`;
      }
      return value;
    }

    function getNetUnitsStyle(value) {
      if (value >= 0) {
        return { color: '#38c338' };
      } else if (value <= 0) {
        return { color: 'red' };
      }
      return { color: '#000' };
    }

    const d = data.properties;
    const biswebJobLink = `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${d.dob_job_number}&passdocnumber=&go10=+GO+&requestid=0`;
    const biswebBinLink = `http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?bin=${d.dob_permit_bin}&go4=+GO+&requestid=0`;
    const netUnits = d.dob_permit_proposed_units - d.dob_permit_exist_units;
    const netUnitsDisplay = addSign(netUnits);
    const unitsComplete = d.dcp_units_complete ? d.dcp_units_complete : 0;

    function getUnitChange() {
      if (netUnits > 0) {
        return `${unitsComplete} of ${netUnits}`;
      } else if (netUnits <= 0) {
        return `${Math.abs(unitsComplete)} of ${Math.abs(netUnits)}`;
      }

      return '';
    }

    const netUnitsStyle = getNetUnitsStyle(netUnits);
    const unitChange = getUnitChange();

    /* eslint-disable */
    const permitDate = (date) => {
      if (date) return moment(date).format('MM/DD/YYYY');
      return 'Not Issued';
    };
    /* eslint-enable */

    const unitPipeline = () => {
      if (d.dcp_permit_type === 'Alteration') {
        return (
          <div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3>{d.dob_permit_exist_units}</h3>
                <h4>Existing Units</h4>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3>{d.dob_permit_proposed_units}</h3>
                <h4>Proposed Units</h4>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3 style={netUnitsStyle}>{netUnitsDisplay}</h3>
                <h4>Net Units</h4>
              </div>
            </div>
          </div>
        );
      } else if (d.dcp_permit_type === 'New Building') {
        return (
          <div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3>0</h3>
                <h4>Existing Units</h4>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3>{d.dob_permit_proposed_units}</h3>
                <h4>Proposed Units</h4>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3 style={netUnitsStyle}>{netUnitsDisplay}</h3>
                <h4>Net Units</h4>
              </div>
            </div>
          </div>
        );
      } else if (d.dcp_permit_type === 'Demolition') {
        return (
          <div>
            <div className={'col-md-6'}>
              <div className="dev-pipeline">
                <h3>{d.dob_permit_exist_units}</h3>
                <h4>Existing Units</h4>
              </div>
            </div>
            <div className={'col-md-6'}>
              <div className="dev-pipeline">
                <h3 style={netUnitsStyle}>{netUnitsDisplay}</h3>
                <h4>Net Units</h4>
              </div>
            </div>
          </div>
        );
      }
      return '';
    };

    const backgroundColor = getColor('dcp_permit_type', d.dcp_permit_type);

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
                  DOB Job <a target="_blank" rel="noopener noreferrer" href={biswebJobLink}>#{d.dob_job_number}</a> |
                  BIN: <a target="_blank" rel="noopener noreferrer" href={biswebBinLink}>{d.dob_permit_bin}</a> |
                  BBL: {d.dob_permit_bbl}
                </small>
              </h3>
              <h1>{d.dob_permit_address}, {NycGeom.getBoroughNameFromId(d.dob_permit_borough)}</h1>
              <span className={'badge'} style={{ backgroundColor }}>{d.dcp_permit_type}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_development_type}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_pipeline_status}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading">Unit Counts</div>
                <div className="panel-body">
                  {unitPipeline()}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading">Development Milestones</div>
                <div className="panel-body">
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Permit Issued</h4>
                      <h3>{permitDate(d.dob_qdate)}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Initial CofO*</h4>
                      <h3>{permitDate(d.dob_cofo_date_first)}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Latest CofO</h4>
                      <h3>{permitDate(d.dob_cofo_date_last)}</h3>
                      <p className="subtext">{d.dob_cofo_type_last}</p>
                    </div>
                  </div>
                  {
                    d.dcp_pipeline_status === 'Partial complete' && (
                      <div className={'col-md-12'}>
                        <div className="dev-status">
                          <h4>Net Units Completed</h4>
                          <h3 style={netUnitsStyle}>{unitChange}</h3>
                        </div>
                      </div>
                    )
                  }
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
