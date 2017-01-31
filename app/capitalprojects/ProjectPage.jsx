import React, { PropTypes } from 'react';
import Numeral from 'numeral';
import _ from 'underscore';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import DetailPage from '../common/DetailPage';
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
    });
  },

  componentDidMount() {
    const self = this;
    const maprojid = this.props.params.id;

    const tableName = '(SELECT * FROM adoyle.commitmentspoints UNION ALL SELECT * FROM adoyle.commitmentspolygons) a';

    // go get the project's data as a geojson feature
    Carto.getFeature(tableName, 'maprojid', maprojid)
      .then((feature) => {
        self.setState({ feature });
      });

    Carto.SQL(`SELECT * FROM adoyle.budgetcommitments WHERE maprojid = '${maprojid}'`, 'json')
      .then(budget => this.setState({ budget }));

    // const commitmentsSQL = `SELECT * FROM adoyle.commitscommitments WHERE maprojid = '${maprojid}'`;
    //
    // // get an array of commitments data for this project
    // Carto.SQL(commitmentsSQL, 'json')
    //   .then(commitments => this.setState({ commitments }));
  },

  renderContent() {
    const d = this.state.feature.properties;
    const budget = this.state.budget;

    const formatCost = (number => Numeral(number).format('($ 0.00 a)').toUpperCase());
    const project_types = _.uniq(budget.map(b => b.projecttype));

    const CardStyles = {
      zDepth: 1,
      height: '100%',
    };

    return (
      <div className="project-page">
        <div className="col-md-12">
          <h4><small>{d.maprojid}</small></h4>
          <h1>{d.descriptio}</h1>
          { project_types.map((project_type) => {
            return (
              <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }}>
                {project_type}
              </span>
            );
          })}
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
                <CardText>
                  <h2 style={{ textAlign: 'center' }}>{formatCost(d.totalcost)}</h2>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Spending Over Time" actAsExpander showExpandableButton />
                <CardText expandable>
                  <CommitmentExpenditureChart maprojid={this.props.params.id} />
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Spending Details" actAsExpander showExpandableButton />
                <CardText expandable>
                  <Table selectable={false}>
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                    >
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>Randal White</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>Stephanie Sanders</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>4</TableRowColumn>
                        <TableRowColumn>Steve Brown</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Feedback" actAsExpander showExpandableButton />
                <CardText expandable>
                  <FeedbackForm
                    displayUnit="Capital Project"
                    ref_type="capitalproject"
                    ref_id={this.props.params.id}
                  />
                </CardText>
              </Card>
            </div>
          </div>
        </div>

        <div className={'col-md-6'}>
          <div style={{ marginTop: '15px' }}>
            <ModalMap feature={this.state.feature} label={d.descriptio} />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const content = this.state.feature ? this.renderContent() : null;

    return (
      <DetailPage
        location={this.props.location}
        defaultText="Capital Projects Map"
        defaultLink="/capitalprojects"
      >
        {content}
      </DetailPage>
    );
  },
});

module.exports = ProjectPage;
