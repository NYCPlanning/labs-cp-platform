import React from 'react';
import PropTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import FeedbackForm from '../common/FeedbackForm';
import * as facilitiesActions from '../actions/facilities';
import { dbStringToArray, dbStringAgencyLookup, dbStringToObject } from '../helpers/dbStrings';

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

    const wrapInLink = (link, text) => {
      // The database stores 'NA' for links that do not exist
      if (link && link !== 'NA') {
        return <a href={link}>{text}</a>;
      }
      return text;
    };

    const sourceDataDetails = () => {
      const sourceDetails = sources.map((s) => {
        const idAgency = dbStringAgencyLookup(d.idagency, s.datasource);
        return (
          <table className="table datasource-table" key={s.datasourcefull}>
            <thead>
              <tr>
                <td colSpan="2"><h4>{s.datasourcefull}<span style={{ lineHeight: 2.5, marginLeft: '10px', bottom: '4px' }} className="label label-default">{s.datasource}</span></h4></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Source Dataset</td>
                <td><h5>{wrapInLink(s.dataurl, s.dataname)}</h5></td>
              </tr>
              <tr>
                <td>Facility ID in Source Data</td>
                <td><h5>{idAgency ? idAgency.value : 'None Provided'}</h5></td>
              </tr>
              <tr>
                <td>Last Updated</td>
                <td><h5>{s.datadate}</h5></td>
              </tr>
            </tbody>
          </table>
        );
      });

      return sourceDetails;
    };

    const usageList = (data, type) => {
      if (data && type) {
        const sizes = dbStringToObject(data);

        const list = sizes.map(size =>
          (
            <li key={size.index} className="usage-list">
              <h3>{size.value} <small>{dbStringAgencyLookup(type, size.agency).value}</small></h3>
              <h4><span className="label label-default">{size.agency}</span></h4>
            </li>
          ),
        );

        return (
          <ul>{list}</ul>
        );
      }

      return (<div><h3>Not Available</h3></div>);
    };

    const asList = (string) => {
      const array = dbStringToArray(string);

      return (
        <ul>
          { array.map(item => <li key={item}>{item}</li>) }
        </ul>
      );
    };

    const bblList = (string) => {
      const array = dbStringToArray(string);

      return (
        <ul>
          { array.map(item => <li key={item}><a href={`https://zola.planning.nyc.gov/bbl/${item}`} target="_blank">{item}</a></li>) }
        </ul>
      );
    };

    const binList = (string) => {
      const array = dbStringToArray(string);

      return (
        <ul>
          { array.map(item => <li key={item}><a href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?bin=${item}&go4=+GO+&requestid=0`} target="_blank">{item}</a></li>) }
        </ul>
      );
    };

    const childcareTooltip = () => {
      if (d.facgroup === 'Child Care and Pre-Kindergarten') {
        return (
          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Please note that DOE, ACS, and DOHMH capacity numbers for DOE Universal Pre-K and Child Care sites do not match up, because they are all calculated and tracked for different purposes. DOE and ACS each track the number of program seats their agency oversees or funds at a facility based on their respective contracts. DOHMH determines capacity as the maximum capacity the space will allow based on square footage.</Tooltip>}>
            <i className="fa fa-info-circle" aria-hidden="true" />
          </OverlayTrigger>
        );
      }

      return null;
    };

    const popsTooltip = () => {
      if (d.facsubgrp === 'Privately Owned Public Space') {
        return (
          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Please note that DCP issues POPS approvals, and DOB is responsible for POPS enforcement.</Tooltip>}>
            <i className="fa fa-info-circle" aria-hidden="true" />
          </OverlayTrigger>
        );
      }

      return null;
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
                Overseen By {popsTooltip()}
                  <h3>{asList(d.overagency)}</h3>
                </div>
              </div>
            </div>

            {(d.capacity.length > 0 || d.util.length > 0 || d.area.length > 0) && // hide capacity &util information boxes if the record has neither
              (
                <div className="row equal" style={{ marginBottom: '15px' }}>
                  <div className={'col-md-6'}>
                    <div>
                      Facility Size {childcareTooltip()}
                      {d.capacity ? usageList(d.capacity, d.captype) : usageList(d.area, d.areatype) }
                    </div>
                  </div>
                  <div className={'col-md-6'}>
                    <div>
                      Utilization
                      {usageList(d.util, d.captype)}
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
                    </small></h4><h4>{d.bbl ? bblList(d.bbl) : 'Not Available'}</h4></div>
                    <div className="property-detail-blocks"><h4><small>BIN (Building ID) <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BIN hyperlink to get more infomation about this building from the NYC Dept. of Buildings.</Tooltip>}>
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </OverlayTrigger>
                    </small></h4><h4>{d.bin ? binList(d.bin) : 'Not Available'}</h4></div>
                    <div className="property-detail-blocks"><h4><small>Property Type</small></h4><h4>{d.proptype ? d.proptype : 'Privately Owned'}</h4></div>
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

            <FeedbackForm
              ref_type="facility"
              ref_id={this.props.id}
              location={this.props.location}
              auth={this.props.auth}
            />
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
