// /facilities/FacilityPage.jsx - This component builds an individual page for each facility in the database and compiles its databse lookup details
// Props:
//  params.id - Facility ID being shown based on the route being passed in from carto. Provides row of data.
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DetailPage from '../common/DetailPage';

import ModalMap from '../common/ModalMap';
import FeedbackForm from '../common/FeedbackForm';

import carto from '../helpers/carto';


const FacilityPage = React.createClass({

  propTypes: {
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape().isRequired,
  },

  getInitialState() {
    return ({
      data: null,
    });
  },

  componentDidMount() {
    const self = this;
    // after mount, fetch data and set state
    carto.getFeature('facilities', 'uid', this.props.params.id)
      .then((data) => {
        self.setState({ data });
      });
  },

  renderContent(data) {
    const d = data.properties;

    const Categories = () => (
      <div>
        <h4>Categories</h4>
        <dl className="dl-horizontal">
          <dt>Domain</dt>
          <dd>{d.domain}</dd>
          <dt>Group</dt>
          <dd>{d.facilitygroup}</dd>
          <dt>Subgroup</dt>
          <dd>{d.facilitysubgroup}</dd>
          <dt>
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> The facility&apos;s Type is derived from the most granular description provided in the source dataset. The categories and descriptions are limited by the information provided.</Tooltip>}>
              <i className="fa fa-info-circle" aria-hidden="true" />
            </OverlayTrigger>
            Type
          </dt>
          <dd>{d.facilitytype}</dd>
        </dl>
      </div>
    );

    const CapacityUtilization = () => (
      <div>
        <h4>Capacity Details</h4>
        <dl className="dl-horizontal">
          <dt>Capacity</dt>
          <dd>{d.capacity ? `${d.capacity} ${d.capacitytype}` : 'Unknown'}</dd>
        </dl>
      </div>
    );

    const OperationsAndOversight = () => (
      <div>
        <h4>Operations & Oversight</h4>
        <dl className="dl-horizontal">
          <dt>Operator</dt>
          <dd>{d.operatorname}</dd>
          <dt>Operator Type</dt>
          <dd>{d.operatortype}</dd>
          <dt>Oversight Agency</dt>
          <dd>{d.oversightagency.split(',').join(', ')}</dd>
        </dl>
      </div>
    );


    const DataSource = () => (
      <div>
        <h4>Data Source</h4>
        <dl className="dl-horizontal">
          <dt>Source Dataset</dt>
          <dd>{`${d.agencysource} - ${d.sourcedatasetname.split(',').join(', ')}`}</dd>
          <dt>Last Update</dt>
          <dd>{d.datesourceupdated}</dd>
          <dt>Facility ID in Source Data</dt>
          <dd>{d.idagency ? d.idagency.split(',').join(', ') : 'None Provided'}</dd>
        </dl>
      </div>
    );

    return (
      <div>
        <div className="col-md-12">
          <h3>{d.facilityname}</h3>
          <p>{d.address}</p>
        </div>
        <div className="col-md-6">
          {data && <ModalMap feature={data} label={data.properties.facilityname} />}
          <FeedbackForm
            displayUnit="Facility"
            ref_type="facility"
            ref_id={this.props.params.id}
          />
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <Categories />
            </li>
            <li className="list-group-item">
              <CapacityUtilization />
            </li>
            <li className="list-group-item">
              <OperationsAndOversight />
            </li>
            <li className="list-group-item">
              <DataSource />
            </li>
          </ul>
        </div>
      </div>
    );
  },

  render() {
    const content = this.state.data ? this.renderContent(this.state.data) : null;

    return (
      <DetailPage
        location={this.props.location}
        defaultText="Facilities Map"
        defaultLink="/facilities/all"
        feedback
      >
        {content}
      </DetailPage>
    );
  },

});

module.exports = FacilityPage;
