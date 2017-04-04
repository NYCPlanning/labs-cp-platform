import React from 'react';

import BackButton from '../common/BackButton';
import ModalMap from '../common/ModalMap';
import FeedbackForm from '../common/FeedbackForm';

import { getColor } from './janelayer/config';
import carto from '../helpers/carto';
import NycGeom from '../helpers/NycGeom';
import devTables from '../helpers/devTables';

import PipelineStore from '../stores/PipelineStore';
import * as PipelineActions from '../actions/PipelineActions';

import './DetailPage.scss';

const DevelopmentPage = React.createClass({
  propTypes: {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
    }).isRequired,
    location: React.PropTypes.shape().isRequired,
  },

  componentWillMount() {
    PipelineStore.on('change', () => {
      this.setState({
        data: PipelineStore.createDetailView(),
      });
    });
  },

  componentDidMount() {
    const self = this;
    // after mount, fetch data and set state
    carto.getFeature(devTables('pipeline_projects'), 'cartodb_id', parseInt(this.props.params.id))
      .then((data) => { self.setState({ data }); });
  },

  renderContent(data) {
    const d = data.properties;
    const biswebLink = `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${d.dob_job_number}&passdocnumber=&go10=+GO+&requestid=0`;

    const netChange = d.dob_permit_proposed_units - d.dob_permit_exist_units;
    const unitsComplete = d.dcp_units_complete ? d.dcp_units_complete : 0;

    const unitChange = () => {
      if (d.dcp_pipeline_status !== 'Complete' && d.dcp_pipeline_status !== 'Demolition (complete)') {
        if (netChange > 1) {
          return `+${unitsComplete} of ${netChange}`;
        } else if (netChange <= 0) {
          return `-${Math.abs(unitsComplete)} of ${Math.abs(netChange)}`;
        }
        return '';
      }

      if (netChange > 1) {
        return `+${netChange}`;
      } else if (netChange <= 0) {
        return `${netChange}`;
      }
      return '';
    };

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
                <h3>{unitChange()}</h3>
                <h4>Units</h4>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3>{d.dob_permit_proposed_units}</h3>
                <h4>Total Proposed Units</h4>
              </div>
            </div>
          </div>
        );
      } else if (d.dcp_permit_type === 'New Building') {
        return (
          <div>
            <div className={'col-md-4 col-md-offset-4'}>
              <div className="dev-pipeline">
                <h3>{unitChange()}</h3>
                <h4>Units</h4>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h3>{d.dob_permit_proposed_units}</h3>
                <h4>Total Proposed Units</h4>
              </div>
            </div>
          </div>
        );
      } else if (d.dcp_permit_type === 'Demolition') {
        return (
          <div>
            <div className={'col-md-12'}>
              <div className="dev-pipeline">
                <h3>{unitChange()}</h3>
                <h4>Units</h4>
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
                  DOB Job <a target="_blank" rel="noopener noreferrer" href={biswebLink}>#{d.dob_job_number}</a> |
                  BIN: {d.dob_permit_bbl} |
                  BBL: {d.dob_permit_bin}
                </small>
              </h3>
              <h1>{d.dob_permit_address}, {NycGeom.getBoroughNameFromId(d.dob_permit_borough)}</h1>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_development_type}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_pipeline_status}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading"><span className={'badge'} style={{ backgroundColor }}>{d.dcp_permit_type}</span></div>
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
