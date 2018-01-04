import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import FeedbackForm from '../common/FeedbackForm';
import * as capitalProjectsActions from '../actions/capitalProjects';

import '../app.scss';
import './CapitalProjectDetailPage.scss';

class CapitalProjectsDetailPage extends React.Component {
  componentDidMount() {
    this.fetchPageData(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) this.fetchPageData(nextProps.params.id);
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

      <TableRow key={c.cartodb_id}>
        <TableRowColumn style={commitmentDescriptionWidth}>{(c.commitmentdescription === '' ? '--' : c.commitmentdescription)}</TableRowColumn>
        <TableRowColumn style={phaseWidth}>{c.commitmentcode}</TableRowColumn>
        <TableRowColumn>{c.budgetline}</TableRowColumn>
        <TableRowColumn>{formatCost(c.totalcost)}</TableRowColumn>
        {/* eslint-disable no-undef */}
        <TableRowColumn>{moment(c.plancommdate, 'MM/YY').format('MMM YYYY')}</TableRowColumn>
        {/* eslint-enable no-undef */}
      </TableRow>
    ));

    return (
      <div className="project-page">
        <div className="col-md-12">
          <div className={'row'}>
            <div className="col-md-12">
              <h4><small>{d.maprojid}</small></h4>
              <h1>{d.description}</h1>
              Project Type(s): {
                project_types.map(project_type => (
                  <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }} key={project_type}>
                    {project_type}
                  </span>
                ))
              }
            </div>
          </div>

          <div className={'row equal'} style={{ marginBottom: '15px', marginTop: '15px' }}>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Managed By" />
                <CardText>
                  <h3>{d.magencyname}</h3>
                </CardText>
              </Card>
            </div>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Sponsored By" />
                <CardText>
                  <h3>{sponsorAgencies}</h3>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Spent to Date" />
                <CardText className={'text-center'}>
                  <h2>{formatCost(d.totalspend)}</h2>
                  <p className="subtext">spent to date</p>
                </CardText>
              </Card>
            </div>

            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Planned Commitment" />
                <CardText className={'text-center'}>
                  <h2>{formatCost(d.totalcommit)}</h2>
                  <p className="subtext">committed as of April 2017</p>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Years Active" />
                <CardText className={'text-center'}>
                  <h2>FY{getFY(d.mindate)} - FY{getFY(d.maxdate)}</h2>
                  {/* eslint-disable no-undef */}
                  <p className="subtext">{moment(d.mindate).format('MMM YYYY')} thru {moment(d.maxdate).format('MMM YYYY')}</p>
                  {/* eslint-enable no-undef */}
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Commitment Details" actAsExpander showExpandableButton />
                <CardText expandable>
                  <Table selectable={false}>
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                    >
                      <TableRow>
                        <TableHeaderColumn style={commitmentDescriptionWidth}>Description</TableHeaderColumn>
                        <TableHeaderColumn style={phaseWidth}>Phase</TableHeaderColumn>
                        <TableHeaderColumn>Budget Line</TableHeaderColumn>
                        <TableHeaderColumn>Planned <br /> Commitment</TableHeaderColumn>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {tableRows}
                    </TableBody>
                  </Table>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px', padding: '15px' }}>
            <FeedbackForm
              ref_type="capitalproject"
              ref_id={this.props.params.id}
            />
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
  params: PropTypes.object.isRequired,
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
