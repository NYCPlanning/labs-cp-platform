import React, { PropTypes } from 'react';
import Numeral from 'numeral';
import Moment from 'moment';
import _ from 'underscore';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import DetailPage from '../common/DetailPage';
import BackButton from '../common/BackButton';
import ModalMap from '../common/ModalMap';
import CommitmentExpenditureChart from './CommitmentExpenditureChart';
import FeedbackForm from '../common/FeedbackForm';

import Carto from '../helpers/carto';

const ProjectPage = React.createClass({

  propTypes: {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  },

  getInitialState() {
    return ({
      feature: null,
      commitments: null,
    });
  },

  componentDidMount() {
    const self = this;
    const maprojid = this.props.params.id;

    const tableName = '(SELECT * FROM commitmentspointsjoined UNION ALL SELECT * FROM commitmentspolygonsjoined) a';

    // go get the project's data as a geojson feature
    Carto.getFeature(tableName, 'maprojid', maprojid)
      .then((feature) => {
        self.setState({ feature });
      });

    Carto.SQL(`SELECT * FROM adoyle.budgetcommitments WHERE maprojid = '${maprojid}'`, 'json')
      .then(budget => this.setState({ budget }));

    Carto.SQL(`SELECT * FROM adoyle.commitscommitments WHERE maprojid = '${maprojid}' ORDER BY to_date(plancommdate,'YY-Mon')`, 'json')
      .then(commitments => this.setState({ commitments }));
  },

  renderContent() {
    const d = this.state.feature.properties;
    const budget = this.state.budget;

    const formatCost = (number => Numeral(number).format('($ 0.00 a)').toUpperCase());

    const getFY = ((date) => {
      const year = Moment(date).year();
      const month = Moment(date).month();

      return month <= 6 ? year : year + 1;
    });

    const project_types = _.uniq(budget.map(b => b.projecttype));

    const CardStyles = {
      zDepth: 1,
      height: '100%',
    };

    const tableRows = this.state.commitments.map(c => (
      <TableRow>
        <TableRowColumn>{c.costdescription}</TableRowColumn>
        <TableRowColumn>{c.budgetline}</TableRowColumn>
        <TableRowColumn>{formatCost(c.totalcost)}</TableRowColumn>
        <TableRowColumn>{Moment(c.plancommdate, 'YY-MMM').format('MMM YYYY')}</TableRowColumn>
      </TableRow>
    ));

    return (
      <div className="project-page">
        <div className="col-md-12">
          <div className={'row'}>
            <div className="col-sm-9">
              <h4><small>{d.maprojid}</small></h4>
              <h1>{d.descriptio}</h1>
              {
                project_types.map(project_type => (
                  <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }}>
                    {project_type}
                  </span>
                ))
              }
            </div>
            <div className="col-sm-3">
              <BackButton
                location={this.props.location}
                defaultText="Capital Projects Map"
                defaultLink="/capitalprojects"
              />
            </div>
          </div>
        </div>

        <div className={'col-md-6'}>
          <div className={'row'} style={{ marginBottom: '15px', marginTop: '15px' }}>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Managed By" />
                <CardText>
                  <h3>{d.agencyname}</h3>
                </CardText>
              </Card>
            </div>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Sponsored By" />
                <CardText>
                  <h3 className={'text-muted'}>Coming Soon</h3>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Total Cost" />
                <CardText className={'text-center'}>
                  <h2>{formatCost(d.totalcommitspend)}</h2>
                  <p className="subtext">{formatCost(d.totalspend)} spent | {formatCost(d.totalcommit)} committed</p>
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
                  <p className="subtext">{Moment(d.mindate).format('MMM YYYY')} thru {Moment(d.maxdate).format('MMM YYYY')}</p>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Costs Over Time" actAsExpander showExpandableButton />
                <CardText expandable>
                  <CommitmentExpenditureChart maprojid={this.props.params.id} />
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
                        <TableHeaderColumn>Cost Description</TableHeaderColumn>
                        <TableHeaderColumn>Budget Line</TableHeaderColumn>
                        <TableHeaderColumn>Total Cost</TableHeaderColumn>
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
        </div>

        <div className={'col-md-6'}>
          <div style={{ marginTop: '15px' }}>
            <ModalMap feature={this.state.feature} label={d.descriptio} />
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
  },

  render() {
    const content = this.state.feature ? this.renderContent() : null;

    return (
      <DetailPage>
        {content}
      </DetailPage>
    );
  },
});

module.exports = ProjectPage;
