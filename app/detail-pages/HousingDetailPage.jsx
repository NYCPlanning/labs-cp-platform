import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackButton from '../common/BackButton';
import FeedbackForm from '../common/FeedbackForm';

import { getColor } from '../filter-configs/housing-config';

import * as housingActions from '../actions/housingDevelopment';

import './HousingDetailPage.scss';

class HousingDetailPage extends React.Component {
  componentWillMount() {
    this.props.fetchDetails(parseInt(this.props.params.id));
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
    const biswebJobLink = `http://a810-bisweb.nyc.gov/bisweb/JobsQueryByNumberServlet?passjobnumber=${d.dob_job_number}&passdocnumber=&go10=+GO+&requestid=0`;
    // const biswebBinLink = `http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?bin=${d.dob_permit_bin}&go4=+GO+&requestid=0`;

    function unitChange() {
      if (d.u_net > 0) {
        return `${d.u_net_complete ? d.u_net_complete : 0} of ${d.u_net}`;
      } else if (d.u_net <= 0) {
        return `${Math.abs(d.u_net_complete ? d.u_net_complete : 0)} of ${Math.abs(d.u_net)}`;
      }

      return '';
    }

    const netUnitsStyle = getNetUnitsStyle(d.u_net);

    /* eslint-disable */
    const permitDate = (date) => {
      if (date) return moment(date).utc().format('MM/DD/YYYY');
      return 'Not Issued';
    };
    /* eslint-enable */

    const unitPipeline = () => {
      if (d.dcp_dev_category === 'Alteration') {
        return (
          <div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Initial Number of Units</h4>
                <h3>{d.u_init != null ? d.u_init : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Proposed Units</h4>
                <h3>{d.u_prop != null ? d.u_prop : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Net Change in Units</h4>
                <h3 style={netUnitsStyle}>{addSign(d.u_net)}</h3>
              </div>
            </div>
          </div>
        );
      } else if (d.dcp_dev_category === 'New Building') {
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
                <h3>{d.u_prop != null ? d.u_prop : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className="dev-pipeline">
                <h4>Net Change in Units</h4>
                <h3 style={netUnitsStyle}>{addSign(d.u_net)}</h3>
              </div>
            </div>
          </div>
        );
      } else if (d.dcp_dev_category === 'Demolition') {
        return (
          <div>
            <div className={'col-md-6'}>
              <div className="dev-pipeline">
                <h4>Initial Number of Units</h4>
                <h3>{d.u_init != null ? d.u_init : 'Not reported'}</h3>
              </div>
            </div>
            <div className={'col-md-6'}>
              <div className="dev-pipeline">
                <h4>Net Change in Units</h4>
                <h3 style={netUnitsStyle}>{addSign(d.u_net)}</h3>
              </div>
            </div>
          </div>
        );
      }
      return '';
    };

    const backgroundColor = getColor('dcp_dev_category', d.dcp_dev_category);

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
                defaultLink="/map/housing"
              />
            </div>
            <div className="col-md-9 col-md-pull-3">
              <h1>{d.address}, {d.boro}</h1>
              <span className={'badge'} style={{ backgroundColor }}>{d.dcp_dev_category}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_occ_category}</span>
              <span className={'badge'} style={{ backgroundColor: 'grey' }}>{d.dcp_status}</span>
            </div>
          </div>

          <div className="row">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading">DOB Job Number and Tax Lot</div>
                <div className="panel-body">

                  <div className={'col-md-6'}>
                    <div className="dev-status">
                      <h4>DOB Job Number</h4>
                      <h3><a target="_blank" rel="noopener noreferrer" href={biswebJobLink}>{d.dob_job_number}</a></h3>
                    </div>
                  </div>
                  <div className={'col-md-6'}>
                    <div className="dev-status">
                      <h4>BBL</h4>
                      <h3><a href={`https://zola.planning.nyc.gov/bbl/${d.bbl}`} target="_blank">{d.bbl}</a></h3>
                    </div>
                  </div>

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
                      <h3>{permitDate(d.c_date_earliest)}</h3>
                    </div>
                  </div>
                  <div className={'col-md-4'}>
                    <div className="dev-status">
                      <h4>Latest CofO</h4>
                      <h3>{permitDate(d.c_date_latest)}</h3>
                      <p className="subtext">{d.c_type_latest !== '' ? (`${d.c_type_latest},`) : ''} {d.c_u_latest != null ? (`${d.c_u_latest} units`) : ''}</p>
                    </div>
                  </div>
                  {
                    d.dcp_status === 'Partial complete' && (
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

          <FeedbackForm
            displayUnit="Development"
            ref_type="development"
            ref_id={this.props.params.id}
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
      <div className="fluid-content display-content">
        {this.renderContent(this.props.housingDetails)}
      </div>
    );
  }
}

HousingDetailPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  housingDetails: PropTypes.object,
  location: PropTypes.shape().isRequired,
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
