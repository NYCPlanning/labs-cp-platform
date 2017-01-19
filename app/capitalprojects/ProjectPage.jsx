import React, { PropTypes } from 'react';
import Numeral from 'numeral';

import DetailPage from '../common/DetailPage';
import ModalMap from '../common/ModalMap';
import CommitmentExpenditureChart from './CommitmentExpenditureChart';

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

    // // get an array of expenditures data for this project
    // PlanningApi.getCapitalProjectExpenditures(maprojid)
    //   .then(res => self.setState({ expenditures: res.data }));
  },

  renderContent() {
    const d = this.state.feature.properties;

    const formatCost = (number => Numeral(number).format('($ 0.00 a)').toUpperCase());

    return (
      <div className="project-page">
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

            <li className="list-group-item" style={{ paddingBottom: '100px' }}>
              <h4>Commitments & Expenditures</h4>
              <CommitmentExpenditureChart maprojid={this.props.params.id} />

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
