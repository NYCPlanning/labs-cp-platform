import React, { PropTypes } from 'react';
// import Numeral from 'numeral';
// import Moment from 'moment';
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

    // after mount, fetch data and set state
    Carto.getRow(tableName, 'maprojid', this.props.params.id)
      .then((data) => {
        self.setState({ data });
      });
  },

  renderContent() {
    const d = this.state.data.properties;

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
                <dd>{d.totalcost}</dd>
              </dl>
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
