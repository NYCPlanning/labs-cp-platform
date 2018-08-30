import React from 'react';
import PropTypes from 'prop-types';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import FeedbackForm from '../common/FeedbackForm';
import * as facilitiesActions from '../actions/facilities';
import { dbStringToArray, dbStringAgencyLookup, dbStringToObject } from '../helpers/dbStrings';

import './PopsDetailPage.scss';

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
    this.props.fetchPopsDetails(id);
    this.props.fetchFacilityDetails(id, 'pops');
  }

  render() {
    const { facilityDetails, popsDetails, sources } = this.props;

    if (_.isEmpty(facilityDetails) || !sources) {
      return null;
    }

    const d = facilityDetails.properties;
    const p = popsDetails.properties;

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
                <h1>{p.building_name ? p.building_name : d.facname}</h1>
                <h2 style={{ margin: '5px 0', lineHeight: '1px' }}><small>
                  {facilityAddress()}
                  { p.public_space_location && <em><br />{p.public_space_location}</em> }
                </small></h2>

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
              <div className="col-lg-6">
                <div className="panel panel-default">
                  <div className="panel-heading"><strong>Building Details</strong></div>
                  <table className="table datasource-table" key={d.cartodb_id}>
                    <tbody>
                      <tr>
                        <td>Architect</td>
                        <td><strong>{p.building_architect}</strong></td>
                      </tr>
                      <tr>
                        <td>Year Built</td>
                        <td><strong>{p.year_completed}</strong></td>
                      </tr>
                      <tr>
                        <td>BBL (Tax Lot ID) <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BBL hyperlink to get more infomation about this tax lot and its zoning.</Tooltip>}>
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </OverlayTrigger></td>
                        <td><strong>{d.bbl ? bblList(d.bbl) : 'Not Available'}</strong></td>
                      </tr>
                      <tr>
                        <td>BIN (Building ID) <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BIN hyperlink to get more infomation about this building from the NYC Dept. of Buildings.</Tooltip>}>
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </OverlayTrigger></td>
                        <td><strong>{d.bin ? binList(d.bin) : 'Not Available'}</strong></td>
                      </tr>
                      <tr>
                        <td>Property Type</td>
                        <td><strong>{d.proptype ? d.proptype : 'Privately Owned'}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="panel panel-default">
                  <div className="panel-heading"><strong>Space Details</strong></div>
                  <table className="table datasource-table" key={d.cartodb_id}>
                    <tbody>
                      <tr>
                        <td>Hours of Access</td>
                        <td><strong>{p.hour_of_access_required}</strong></td>
                      </tr>
                      <tr>
                        <td>ADA Accessibility</td>
                        <td><strong>{p.physically_disabled}</strong></td>
                      </tr>
                      <tr>
                        <td>Space Type</td>
                        <td><strong>{p.public_space_type}</strong></td>
                      </tr>
                      <tr>
                        <td>Required Size</td>
                        <td><strong>{p.size_required}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row equal" style={{ marginBottom: '15px' }}>
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Required Amenities</div>
                  <table className="table datasource-table" key={d.cartodb_id}>
                    <tbody>
                      { p.bicycle_parking &&
                        <tr>
                          <td>Bicycle Parking</td>
                          <td><strong>{p.bicycle_parking}</strong></td>
                        </tr>
                      }

                      { p.lighting &&
                        <tr>
                          <td>Lighting</td>
                          <td><strong>{p.lighting}</strong></td>
                        </tr>
                      }

                      { p.litter_recepticles &&
                        <tr>
                          <td>Litter Recepticles</td>
                          <td><strong>{p.litter_recepticles}</strong></td>
                        </tr>
                      }

                      { p.planting &&
                        <tr>
                          <td>Planting</td>
                          <td><strong>{p.planting}</strong></td>
                        </tr>
                      }

                      { p.plaque_sign &&
                        <tr>
                          <td>Plaque Sign</td>
                          <td><strong>{p.plaque_sign}</strong></td>
                        </tr>
                      }

                      { p.seating &&
                        <tr>
                          <td>Seating</td>
                          <td><strong>{p.seating}</strong></td>
                        </tr>
                      }

                      { p.subway &&
                        <tr>
                          <td>Subway</td>
                          <td><strong>{p.subway}</strong></td>
                        </tr>
                      }

                      { p.tables &&
                        <tr>
                          <td>Tables</td>
                          <td><strong>{p.tables}</strong></td>
                        </tr>
                      }

                      { p.trees_on_street &&
                        <tr>
                          <td>Trees on the Street</td>
                          <td><strong>{p.trees_on_street}</strong></td>
                        </tr>
                      }

                      { p.trees_within_space &&
                        <tr>
                          <td>Trees within the Space</td>
                          <td><strong>{p.trees_within_space}</strong></td>
                        </tr>
                      }

                      { p.water_feature &&
                        <tr>
                          <td>Water Feature</td>
                          <td><strong>{p.water_feature}</strong></td>
                        </tr>
                      }

                      { p.permitted_amenities &&
                        <tr>
                          <td>Permitted Amenities</td>
                          <td><strong>{p.permitted_amenities}</strong></td>
                        </tr>
                      }

                      { p.other_required &&
                        <tr>
                          <td>Other Amenities</td>
                          <td><strong>{p.other_required}</strong></td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row equal" style={{ marginBottom: '15px' }}>
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Additional Resources</div>
                  <div className="panel-body">
                    <ul>
                      <li><a href="https://www1.nyc.gov/site/planning/plans/pops/pops.page" target="_blank" rel="noopener noreferrer">NYC Planning POPS Website</a></li>
                      <li><a href="https://apops.mas.org/" target="_blank" rel="noopener noreferrer">Advocates for Privately Owned Open Space Website</a></li>
                      <li><a href="https://www1.nyc.gov/apps/311universalintake/form.htm?serviceName=DOB+Privately+Owned+Public+Space" target="_blank" rel="noopener noreferrer">311 Complaint Form for POPS</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row equal" style={{ marginBottom: '15px' }}>
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading"><strong>POPS Data Source</strong></div>
                  <div className="panel-body">
                    <p>Privately Owned Public Space Database (2018), owned and maintained by the New York City Department of
                      City Planning and created in collaboration with Jerold S. Kayden and The Municipal Art Society of New York.</p>
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
  popsDetails: {},
  facilityDetails: {},
};

FacilityDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.shape().isRequired,
  auth: PropTypes.object,
  fetchPopsDetails: PropTypes.func.isRequired,
  fetchFacilityDetails: PropTypes.func.isRequired,
  popsDetails: PropTypes.object,
  facilityDetails: PropTypes.object,
  sources: PropTypes.array,
};

const mapStateToProps = ({ facilities }) => ({
  facilityDetails: facilities.facilityDetails,
  popsDetails: facilities.popsDetails,
  sources: facilities.sources,
});

export default connect(mapStateToProps, {
  fetchPopsDetails: facilitiesActions.fetchPopsDetails,
  fetchFacilityDetails: facilitiesActions.fetchFacilityDetails,
})(FacilityDetailPage);
