import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedbackForm from '../common/FeedbackForm';

import { getColor } from '../filter-configs/housing-config';

import * as housingActions from '../actions/housingDevelopment';

import './HousingDetailPage.scss';

class HousingDetailPage extends React.Component {
  componentWillMount() {
    this.fetchPageData(parseInt(this.props.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchPageData(nextProps.id);
  }

  fetchPageData(id) {
    this.props.fetchDetails(id);
  }

  renderContent = (data) => {
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
    const biswebJobLink = `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${d.job_number}&passdocnumber=&go10=+GO+&requestid=0`;
    // const biswebBinLink = `http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?bin=${d.dob_permit_bin}&go4=+GO+&requestid=0`;

    function unitChange() {
      if (d.units_net > 0) {
        return `${d.units_complete ? d.units_complete : 0} of ${d.units_net}`;
      } else if (d.units_net <= 0) {
        return `${Math.abs(d.units_complete ? d.units_complete : 0)} of ${Math.abs(d.units_net)}`;
      }

      return '';
    }

    const netUnitsStyle = getNetUnitsStyle(d.units_net);

    /* eslint-disable */
    const permitDate = (date) => {
      if (date) return moment(date).utc().format('MM/DD/YYYY');
      return 'Not Issued';
    };
    /* eslint-enable */

    const unitPipeline = () => {
      if (d.job_type === 'Alteration') {
        return (
          <div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Initial Number of Units</h4>
                <h3>{d.units_init != null ? d.units_init : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Proposed Units</h4>
                <h3>{d.units_prop != null ? d.units_prop : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Net Change in Units</h4>
                <h3 style={netUnitsStyle}>{addSign(d.units_net)}</h3>
              </div>
            </div>
          </div>
        );
      } else if (d.job_type === 'New Building') {
        return (
          <div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Initial Number of Units</h4>
                <h3>0</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Proposed Units</h4>
                <h3>{d.units_prop != null ? d.units_prop : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Net Change in Units</h4>
                <h3 style={netUnitsStyle}>{addSign(d.units_net)}</h3>
              </div>
            </div>
          </div>
        );
      } else if (d.job_type === 'Demolition') {
        return (
          <div>
            <div className={'col-md-6'}>
              <div className="dev-pipeline">
                <h4>Initial Number of Units</h4>
                <h3>{d.units_init != null ? d.units_init : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-6'}>
              <div className="dev-pipeline">
                <h4>Net Change in Units</h4>
                <h3 style={netUnitsStyle}>{addSign(d.units_net)}</h3>
              </div>
            </div>
          </div>
        );
      }
      return '';
    };

    const backgroundColor = getColor('job_type', d.job_type);

    return (
      <div className="pipeline-page">
        <div className="col-md-12">
          <div className={'row'}>
            <div className="col-md-12">
              <h1>{d.address}, {d.boro}</h1>
              <span className={'badge'} style={{ backgroundColor }}>{d.job_type}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.occ_category}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.status}</span>
            </div>
          </div>

          <div className="row">
            <div className={'col-md-12'}>
              <div className={'col-md-6'}>
                <div className="dev-status">
                  <h4>DOB Job Number</h4>
                  <h3><a target="_blank" rel="noopener noreferrer" href={biswebJobLink}>{d.job_number}</a></h3>
                </div>
              </div>
              <div className={'col-md-6'}>
                <div className="dev-status">
                  <h4>BBL</h4>
                  <h3><a href={`https://zola.planning.nyc.gov/bbl/${d.geo_bbl}`} target="_blank">{d.geo_bbl}</a></h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading">Proposed Change in Units</div>
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
                      <h3>{permitDate(d.status_q)}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Initial CofO*</h4>
                      <h3>{permitDate(d.co_earliest_effectivedate)}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Latest CofO</h4>
                      <h3>{permitDate(d.co_latest_effectivedate)}</h3>
                      <p className="subtext">{d.co_latest_certtype !== '' ? (`${d.co_latest_certtype},`) : ''} {d.co_latest_units != null ? (`${d.co_latest_units} units`) : ''}</p>
                    </div>
                  </div>
                  {
                    d.status === 'Partial complete' && (
                      <div className={'col-md-12'}>
                        <div className="dev-status">
                          <h4>Net Units Completed</h4>
                          <h3 style={netUnitsStyle}>{unitChange()}</h3>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>

          {
            d.job_description.length && (
              <div className="row">
                <div className={'col-md-12'}>
                  <div className="panel panel-default">
                    <div className="panel-heading">DOB Job Description</div>
                    <div className="panel-body">
                      {d.job_description}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          <FeedbackForm
            displayUnit="Development"
            ref_type="development"
            ref_id={this.props.id}
          />
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.housingDetails) {
      return null;
    }
    return (
      <div>
        {this.renderContent(this.props.housingDetails)}
      </div>
    );
  }
}

HousingDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  housingDetails: PropTypes.object,
  fetchDetails: PropTypes.func.isRequired,
};

HousingDetailPage.defaultProps = {
  housingDetails: {},
};

const mapStateToProps = ({ housingDevelopment }) => ({
  housingDetails: housingDevelopment.housingDetails,
});

export default connect(mapStateToProps, {
  fetchDetails: housingActions.fetchDetails,
})(HousingDetailPage);
