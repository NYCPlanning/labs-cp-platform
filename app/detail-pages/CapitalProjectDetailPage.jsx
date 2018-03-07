import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import FeedbackForm from '../common/FeedbackForm';
import * as capitalProjectsActions from '../actions/capitalProjects';

import db_info from '../config/db_info';

import '../app.scss';
import './CapitalProjectDetailPage.scss';

class CapitalProjectsDetailPage extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showCommitmentsTable: false,
    };
  }
  
  componentDidMount() {
    this.fetchPageData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchPageData(nextProps.id);
  }

  fetchPageData(id) {
    this.props.fetchDetails(id);
    this.props.fetchBudgets(id);
    this.props.fetchCommitments(id);
  }

  renderContent() {
    const d = this.props.details.properties;
    const { budgets } = this.props;

    const formatCost = (number => Numeral(number).format('($ 0.00 a)').toUpperCase());

    const getFY = ((date) => {
      const year = moment(date).year();  // eslint-disable-line no-undef
      const month = moment(date).month();  // eslint-disable-line no-undef

      return month <= 6 ? year : year + 1;
    });

    const displayFY = () => {
      if (d.mindate === d.maxdate) return `FY${getFY(d.mindate)}`;
      return `FY${getFY(d.mindate)} - FY${getFY(d.maxdate)}`;
    };

    const tooltipFY = () => {
      if (d.mindate === d.maxdate) return moment(d.mindate).format('MMM YYYY');
      return `${moment(d.mindate).format('MMM YYYY')} thru ${moment(d.maxdate).format('MMM YYYY')}`;
    };

    const project_types = _.uniq(budgets.map(b => b.projecttype));
    const sponsorAgencies = _.uniq(budgets.map(b => b.sagencyname)).join(', ');

    const CardStyles = {
      zDepth: 1,
      height: '100%',
      width: '100%',
    };

    const phaseWidth = {
      width: '15%',
    };
    const commitmentDescriptionWidth = {
      width: '25%',
    };

    const tableRows = this.props.commitments.map(c => (
      <tr>
        <td>{(c.commitmentdescription === '' ? '--' : c.commitmentdescription)}</td>
        <td>{c.commitmentcode}</td>
        <td>{c.budgetline}</td>
        <td>{formatCost(c.totalcost)}</td>
        <td>{moment(c.plancommdate, 'MM/YY').format('MMM YYYY')}</td>
      </tr>
    ));

    return (
      <div className="project-page">
        <div className="col-md-12">
          <div className={'row'}>
            <div className="col-md-12">
              <h1>{d.description}</h1>        
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Project Type</Tooltip>}>
                <span style={{ cursor: 'default' }}>
                  {
                  project_types.map(project_type => (
                    <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }} key={project_type}>
                      {project_type}
                    </span>
                  ))
                  }
                </span>
              </OverlayTrigger>
            </div>
          </div>

          <div className={'row equal'} style={{ marginBottom: '15px', marginTop: '15px' }}>
            <div className={'col-md-6'}>
              <div>
                <div>Managed By</div>
                <h3>{d.magencyname}</h3>
              </div>
            </div>

            <div className={'col-md-6'}>
              <div>
                <div>Sponsored By</div>
                <h3>{sponsorAgencies}</h3>
              </div>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-6'}>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip">
                    {tooltipFY()}
                  </Tooltip>
                }
              >
                <div>
                  <div>Years Active</div>
                  <h2>{displayFY()}</h2>
                </div>
              </OverlayTrigger>
            </div>

            <div className={'col-md-6'}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Project ID in FMS, the City's financial management software.</Tooltip>}>
                <div>
                  <div>Project ID</div>
                  <h2>{d.maprojid}</h2>
                </div>
              </OverlayTrigger>
            </div>
          </div>

          <div className={'row'}>            
            <div className={'col-md-12'}>
              <div className="panel panel-default">
                <div className="panel-heading">As of {db_info.cpdb.date}</div>
                <div className="panel-body">
                  <div className={'row'}>
                    <div className={'col-lg-6'}>
                      <div style={{ padding: '7px 0' }}>
                        <div>Spent to Date</div>
                        <h2>{formatCost(d.totalspend)}</h2>
                      </div>
                    </div>

                    <div className={'col-lg-6'}>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">See itemized commitments</Tooltip>}>
                        <div
                          type="button"
                          className={cx('btn', 'btn-default', 'btn-block', { active: this.state.showCommitmentsTable })}
                          style={{ textAlign: 'left' }}
                          onClick={() => this.setState({ showCommitmentsTable: !this.state.showCommitmentsTable })}
                        >
                          <div>Total Future Commitments</div>
                          <h2>{formatCost(d.totalcommit)}</h2>
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>

                  { this.state.showCommitmentsTable &&
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Description</th>
                            <th>Phase</th>
                            <th>Budget Line</th>
                            <th>Planned Commitment</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                      </table>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className={'row'}>
            <div className={'col-md-12'}>
              <FeedbackForm
                ref_type="capitalproject"
                ref_id={this.props.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.details || !this.props.budgets || !this.props.commitments) {
      return null;
    }

    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}

CapitalProjectsDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  fetchDetails: PropTypes.func.isRequired,
  fetchBudgets: PropTypes.func.isRequired,
  fetchCommitments: PropTypes.func.isRequired,
  details: PropTypes.object,
  budgets: PropTypes.array,
  commitments: PropTypes.array,
};

CapitalProjectsDetailPage.defaultProps = {
  details: {},
  budgets: [],
  commitments: [],
};

const mapStateToProps = ({ capitalProjects }) => ({
  details: capitalProjects.capitalProjectDetails,
  budgets: capitalProjects.capitalProjectBudgets,
  commitments: capitalProjects.capitalProjectCommitments,
});

export default connect(mapStateToProps, {
  fetchDetails: capitalProjectsActions.fetchDetails,
  fetchBudgets: capitalProjectsActions.fetchBudgets,
  fetchCommitments: capitalProjectsActions.fetchCommitments,
})(CapitalProjectsDetailPage);
