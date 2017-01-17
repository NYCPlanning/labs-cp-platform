import React, { PropTypes } from 'react';
import Numeral from 'numeral';
// import Moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DetailPage from '../common/DetailPage';

import ModalMap from '../common/ModalMap';

import Agencies from './agencies';
import Carto from '../helpers/carto';

const ProjectPage = React.createClass({

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object,
  },

  getInitialState() {
    return ({ data: null });
  },

  componentDidMount() {
    const self = this;

    const tableName = '(SELECT * FROM adoyle.commitmentspoints UNION ALL SELECT * FROM adoyle.commitmentspolygons) a';

    // go get the project's data as a geojson feature
    Carto.getFeature(tableName, 'maprojid', this.props.params.id)
      .then((data) => {
        self.setState({ data });
      });

    const commitmentsSQL = `SELECT * FROM adoyle.commitscommitments WHERE maprojid = '${this.props.params.id}'`;

    // get an array of commitments data for this project
    Carto.SQL(commitmentsSQL, 'json')
      .then(commitments => this.setState({ commitments }));
  },

  renderContent() {
    const d = this.state.data.properties;

    const formatCost = number => Numeral(number).format('0.00a').toUpperCase();

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
          <ModalMap feature={this.state.data} label={d.descriptio} />
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
                <dd>${formatCost(d.totalcost)}</dd>
              </dl>
            </li>

            <li className="list-group-item">
              <h4>Commitments</h4>
              <BootstrapTable data={this.state.commitments} striped hover>
                <TableHeaderColumn isKey dataField="cartodb_id">Carto ID</TableHeaderColumn>
                <TableHeaderColumn dataField="plancommdate">date</TableHeaderColumn>
                <TableHeaderColumn dataField="budgetline">Budget Line</TableHeaderColumn>
                <TableHeaderColumn dataField="citycost" dataFormat={formatCost}>Cost</TableHeaderColumn>
                <TableHeaderColumn dataField="noncitycost" dataFormat={formatCost}>Cost</TableHeaderColumn>
                <TableHeaderColumn dataField="totalcost" dataFormat={formatCost}>Cost</TableHeaderColumn>
              </BootstrapTable>
            </li>
          </ul>
        </div>
      </div>
    );
  },

  render() {
    const content = this.state.data ? this.renderContent() : null;

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
