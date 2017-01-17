import React, { PropTypes } from 'react';
import Numeral from 'numeral';
// import Moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DetailPage from '../common/DetailPage';

import ModalMap from '../common/ModalMap';
import PlanningApi from '../helpers/PlanningApi';

import Agencies from './agencies';
import Carto from '../helpers/carto';

const ProjectPage = React.createClass({

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object,
  },

  getInitialState() {
    return ({
      feature: null,
      commitments: [],
      expenditures: [],
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

    const commitmentsSQL = `SELECT * FROM adoyle.commitscommitments WHERE maprojid = '${maprojid}'`;

    // get an array of commitments data for this project
    Carto.SQL(commitmentsSQL, 'json')
      .then(commitments => this.setState({ commitments }));

    // get an array of expenditures data for this project
    PlanningApi.getCapitalProjectExpenditures(maprojid)
      .then(res => self.setState({ expenditures: res.data }));
  },

  renderContent() {
    const d = this.state.feature.properties;

    const formatCost = (number => Numeral(number).format('($ 0.00 a)').toUpperCase());

    console.log(this.state)

    const expendituresContent = this.state.expenditures.length > 0 ?
      (
        <BootstrapTable data={this.state.expenditures} keyField="id" striped hover>
          <TableHeaderColumn dataField="issue_date">Issue Date</TableHeaderColumn>
          <TableHeaderColumn dataField="check_amount" dataFormat={formatCost}>Check Amount</TableHeaderColumn>
          <TableHeaderColumn dataField="capital_project">Capital Project</TableHeaderColumn>
          <TableHeaderColumn dataField="contract_ID">Contract ID</TableHeaderColumn>
          <TableHeaderColumn dataField="expense_category" >Expense Category </TableHeaderColumn>
          <TableHeaderColumn dataField="agency" >Agency </TableHeaderColumn>
          <TableHeaderColumn dataField="payee_name" >Payee Name </TableHeaderColumn>
        </BootstrapTable>
      ) :
      (<p>No Expenditures Found</p>);


    return (
      <div>
        <div className="col-md-12">
          <h3>
            {d.descriptio} - {d.maprojid}
          </h3>
          <div className="agencybadges">
            <span
              className={'badge'}
              style={{ backgroundColor: Agencies.getAgencyColor(d.agency) }}
            >
              {d.agencyname}
            </span>
          </div>
        </div>
        <div className={'col-md-6'}>
          <ModalMap feature={this.state.feature} label={d.descriptio} />
        </div>

        <div className={'col-md-6'}>
          <ul className="list-group">
            <li className="list-group-item">
              <h4>General</h4>
              <dl className="dl-horizontal">
                <dt>BBL</dt>
                <dd>{d.bbl}</dd>
                <dt>BIN</dt>
                <dd>{d.bin}</dd>
                <dt>Geometry Source</dt>
                <dd>{d.geomsource}</dd>
                <dt>Project ID</dt>
                <dd>{d.projectid}</dd>

              </dl>
            </li>

            <li className="list-group-item">
              <h4>Cost Data</h4>
              <dl className="dl-horizontal">
                <dt>Sum of All Commitments</dt>
                <dd>{formatCost(d.totalcost)}</dd>
              </dl>
            </li>

            <li className="list-group-item">
              <h4>Commitments</h4>
              <BootstrapTable data={this.state.commitments} keyField="cartodb_id" striped hover>
                <TableHeaderColumn dataField="plancommdate">date</TableHeaderColumn>
                <TableHeaderColumn dataField="budgetline">Budget Line</TableHeaderColumn>
                <TableHeaderColumn dataField="citycost" dataFormat={formatCost}>City Cost</TableHeaderColumn>
                <TableHeaderColumn dataField="noncitycost" dataFormat={formatCost}>Non-City Cost</TableHeaderColumn>
                <TableHeaderColumn dataField="totalcost" dataFormat={formatCost}>Cost</TableHeaderColumn>
              </BootstrapTable>
            </li>

            <li className="list-group-item">
              <h4>Expenditures</h4>
              {expendituresContent}
            </li>
          </ul>
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
