import React from 'react';
import PropTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import FeedbackForm from '../common/FeedbackForm';
import * as facilitiesActions from '../actions/facilities';

import './FacilityDetailPage.scss';

class FacilityDetailPage extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSourcesOpen: false,
    };
  }

  componentDidMount() {
    this.fetchPageData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchPageData(nextProps.id);
  }

  fetchPageData(id) {
    if (this.props.pops) {
      this.props.fetchFacilityDetails(id, 'pops');
    } else {
      this.props.fetchFacilityDetails(id, 'facility');
    }
  }

  render() {
    const { facilityDetails, sources } = this.props;

    if (_.isEmpty(facilityDetails) || !sources) {
      return null;
    }

    const d = facilityDetails.properties;
    const isPublicSchool = d.facsubgrp === 'PUBLIC K-12 SCHOOLS';

    const sourceDataDetails = () => {
      const s = sources[0];

      return (
        <table className="table datasource-table" key={s.common_name}>
          <thead>
            <tr>
              <td colSpan="2"><h4>{s.common_name}<span style={{ lineHeight: 2.5, marginLeft: '10px', bottom: '4px' }} className="label label-default">{s.data_source}</span></h4></td>
            </tr>
          </thead>
          <tbody>
            {(s.source_index_page) &&
            <tr>
              <td>Source Index</td>
              <td><h5><a href={s.source_index_page}>source</a></h5></td>
            </tr>
            }
            {(s.source_url) &&
              <tr>
                <td>Source Download</td>
                <td><h5><a href={s.source_url}>download</a></h5></td>
              </tr>
            }
            <tr>
              <td>Last Updated</td>
              <td><h5>{s.date_data_source_updated}</h5></td>
            </tr>
          </tbody>
        </table>
      );
    };

    const facilityAddress = () => {
      if (d.address && d.zipcode) return `${d.address}, ${d.city}, NY ${d.zipcode}`;
      if (d.address) return `${d.address}, ${d.city}, NY`;
      if (d.zipcode) return `${d.city}, NY ${d.zipcode}`;
      if (d.city) return `${d.city}, NY`;
      return 'NY';
    };

    return (
      <div>
        <div className="facility-page">
          <div className="col-md-12">
            <div className="row" style={{ marginBottom: '15px' }}>
              <div className="col-md-12">
                <h1>{d.facname}</h1>
                <h2 style={{ marginBottom: '5px' }}><small>{facilityAddress()}</small></h2>
                <ol className="breadcrumb">
                  <li>{d.facdomain}</li>
                  <li>{d.facgroup}</li>
                  <li>{d.facsubgrp}</li>
                  <li>
                    <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }}>
                      {d.factype}
                    </span>
                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> The facility&apos;s Type is derived from the most granular description provided in the source dataset. The categories and descriptions are limited by the information provided.</Tooltip>}>
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </OverlayTrigger>
                  </li>
                </ol>
              </div>
            </div>

            <div className="row equal" style={{ marginBottom: '15px' }}>
              <div className={'col-md-6'}>
                <div>
                  Operated By
                  <h3>{d.opname}</h3>
                </div>
              </div>
              <div className={'col-md-6'}>
                <div>
                Overseen By
                  <h3>{d.overagency}</h3>
                </div>
              </div>
            </div>

            {(d.capacity) && // hide capacity &util information boxes if the record has neither
              (
                <div className="row equal" style={{ marginBottom: '15px' }}>
                  <div className={'col-md-6'}>
                    <div>
                      { isPublicSchool ? 'Target Capacity' : 'Facility Size' }
                      <h3>{d.capacity} <small>{d.captype}</small></h3>
                    </div>
                  </div>
                </div>
              )
            }

            <div className="row equal" style={{ marginBottom: '15px' }}>
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-body" style={{ textAlign: 'center' }}>
                    <div className="property-detail-blocks"><h4><small>BBL (Tax Lot ID) <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BBL hyperlink to get more infomation about this tax lot and its zoning.</Tooltip>}>
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </OverlayTrigger>
                    </small></h4><h4>{d.bbl ? d.bbl : 'Not Available'}</h4></div>
                    <div className="property-detail-blocks"><h4><small>BIN (Building ID) <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BIN hyperlink to get more infomation about this building from the NYC Dept. of Buildings.</Tooltip>}>
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </OverlayTrigger>
                    </small></h4><h4>{d.bin ? d.bin : 'Not Available'}</h4></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={'row'} style={{ marginBottom: '15px' }}>
              <div className={'col-md-12'}>
                <button
                  type="button"
                  className={cx('btn btn-default', { active: this.state.dataSourcesOpen })}
                  onClick={() => this.setState({ dataSourcesOpen: !this.state.dataSourcesOpen })}
                >Data Sources</button>

                { this.state.dataSourcesOpen &&
                  <div className="panel panel-default" style={{ marginTop: '15px' }}>
                    <div className="panel-body">
                      {sourceDataDetails()}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FacilityDetailPage.defaultProps = {
  auth: null,
  sources: [],
  facilityDetails: {},
  pops: false,
};

FacilityDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.shape().isRequired,
  auth: PropTypes.object,
  fetchFacilityDetails: PropTypes.func.isRequired,
  facilityDetails: PropTypes.object,
  sources: PropTypes.array,
  pops: PropTypes.bool,
};

const mapStateToProps = ({ facilities }) => ({
  facilityDetails: facilities.facilityDetails,
  sources: facilities.sources,
});

export default connect(mapStateToProps, {
  fetchFacilityDetails: facilitiesActions.fetchFacilityDetails,
})(FacilityDetailPage);
