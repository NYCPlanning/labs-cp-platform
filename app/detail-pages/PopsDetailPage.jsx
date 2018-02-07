import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import FeedbackForm from '../common/FeedbackForm';
import * as facilitiesActions from '../actions/facilities';
import { dbStringToArray, dbStringAgencyLookup, dbStringToObject } from '../helpers/dbStrings';

import './PopsDetailPage.scss';
import '../app.scss';

const CardStyles = {
  zDepth: 1,
  height: '100%',
};

class PopsDetailPage extends React.Component {
  componentDidMount() {
    this.fetchPageData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchPageData(nextProps.id);
  }

  fetchPageData(id) {
    this.props.fetchPopsDetails('K020001');
    // this.props.fetchFacilityDetails(id, 'pops');
    this.props.fetchFacilityDetails(id, 'facility');
  }

  render() {
    const { facilityDetails, popsDetails, sources } = this.props;

    if (!popsDetails || !facilityDetails || !sources) {
      return null;
    }

    const d = facilityDetails.properties;
    const p = popsDetails.properties;

    const wrapInPanel = (title, badge, content) => (
      <div key={title} className="panel panel-default">
        <div className="panel-heading"><h4>{title}<span style={{ lineHeight: 2.5, marginLeft: '10px', bottom: '4px' }} className="label label-default">{badge}</span></h4></div>
        <div className="panel-body">
          {content}
        </div>
      </div>
    );

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
        const table = (
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Source Dataset</TableRowColumn>
                <TableRowColumn style={{ whiteSpace: 'initial' }}><h5>{wrapInLink(s.dataurl, s.dataname)}</h5></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Facility ID in Source Data</TableRowColumn>
                <TableRowColumn><h5>{idAgency ? idAgency.value : 'None Provided'}</h5></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Last Updated</TableRowColumn>
                <TableRowColumn><h5>{s.datadate}</h5></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        );

        return wrapInPanel(s.datasourcefull, s.datasource, table);
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

    return (
      <div>
        <div className="facility-page">
          <div className="col-md-12">
            <div className={'row'}>
              <div className="col-md-12">
                <h1>{d.facname}</h1>
                <h2 style={{ marginBottom: '5px' }}><small>{`${d.address}, ${d.city}, NY ${d.zipcode}`}</small></h2>
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

            <div style={{ marginBottom: '15px', marginTop: '15px' }}>
              <Card style={CardStyles} className="clearfix">
                <CardHeader title="Property Details" />
                <CardText>
                  <div className="row equal">
                    <div className={'col-md-6'}>
                      <div className="panel panel-default">
                        <div className="panel-heading">Operated By</div>
                        <div className="panel-body">
                          {<h3>{d.opname}</h3>}
                        </div>
                      </div>
                    </div>
                    <div className={'col-md-6'}>
                      <div className="panel panel-default">
                        <div className="panel-heading">Overseen By {popsTooltip()}</div>
                        <div className="panel-body">
                          <h3>{asList(d.overagency)}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(d.capacity.length > 0 || d.util.length > 0 || d.area.length > 0) && // hide capacity &util information boxes if the record has neither
                   (
                     <div className="row equal">
                       <div className={'col-md-6'}>
                         <div className="panel panel-default">
                           <div className="panel-heading">Facility Size {childcareTooltip()}
                           </div>
                           <div className="panel-body">
                             {d.capacity ? usageList(d.capacity, d.captype) : usageList(d.area, d.areatype) }
                           </div>
                         </div>
                       </div>
                       <div className={'col-md-6'}>
                         <div className="panel panel-default">
                           <div className="panel-heading">Utilization</div>
                           <div className="panel-body">
                             {usageList(d.util, d.captype)}
                           </div>
                         </div>
                       </div>
                     </div>
                   )
                  }

                  <div className="row property-detail-container">
                    <div className="property-detail-blocks"><h4>
                      <small>BBL (Tax Lot ID)
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BBL hyperlink to get more infomation about this tax lot and its zoning.</Tooltip>}>
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </OverlayTrigger>
                      </small></h4><h4>{d.bbl ? bblList(d.bbl) : 'Not Available'}</h4></div>
                    <div className="property-detail-blocks"><h4>
                      <small>BIN (Building ID)
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> Click the BIN hyperlink to get more infomation about this building from the NYC Dept. of Buildings.</Tooltip>}>
                          <i className="fa fa-info-circle" aria-hidden="true" />
                        </OverlayTrigger>
                      </small></h4><h4>{d.bin ? binList(d.bin) : 'Not Available'}</h4></div>
                    <div className="property-detail-blocks"><h4><small>Property Type</small></h4><h4>{d.proptype ? d.proptype : 'Privately Owned'}</h4></div>
                  </div>
                </CardText>
              </Card>
            </div>

            <div style={{ marginBottom: '15px', marginTop: '15px' }}>
              <Card style={CardStyles} className="clearfix">
                <CardHeader title="Privately Owned Public Space (POPS) Details" />
                <CardText>
                  <div className="row equal">
                    <div className={'col-md-6'}>
                      <div className="panel panel-default">
                        <div className="panel-heading">General Info</div>
                        <div className="panel-body">
                          <h4>Space Type: </h4>
                          <h4>Size Required: </h4>
                          <h4>Space Location: </h4>
                          <h4>Year Completed: </h4>
                          <h4>Principal Public Space Designer: </h4>
                          <h4>Building Architect: </h4>
                        </div>
                      </div>
                    </div>
                    <div className={'col-md-6'}>
                      <div className="panel panel-default">
                        <div className="panel-heading">Required Access and Amenities</div>
                        <div className="panel-body">
                          <h4><i className="fa fa-clock-o" aria-hidden="true" /> Hours of Access: </h4>
                          <h4><i className="fa fa-wheelchair" aria-hidden="true" /> Access for the Physically Disabled: </h4>
                          <h4><i className="fa fa-bicycle" aria-hidden="true" /> Bicycle Parking: </h4>
                          <h4>Lighting: </h4>
                          <h4>Litter Recepticles: </h4>
                          <h4>Other Amenity: </h4>
                          <h4>Planting: </h4>
                          <h4>Plaque/Sign: </h4>
                          <h4>Seating: </h4>
                          <h4>Subway: </h4>
                          <h4>Tables: </h4>
                          <h4>Trees on Street: </h4>
                          <h4>Trees within Space: </h4>
                          <h4>Water Feature: </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardText>
              </Card>
            </div>

            <div className={'row'} style={{ marginBottom: '15px' }}>
              <div className={'col-md-12'}>
                <Card style={CardStyles} className="source-data-details">
                  <CardHeader title="Source Data Details" />
                  <CardText>
                    {sourceDataDetails()}
                  </CardText>
                </Card>
              </div>
            </div>
          </div>

          <div className={'col-md-6'}>
            <div className={'row'} style={{ marginBottom: '15px', padding: '15px' }}>
              <FeedbackForm
                ref_type="facility"
                ref_id={this.props.id}
                location={this.props.location}
                auth={this.props.auth}
              />
            </div>

            <div className={'row'} style={{ marginBottom: '15px' }}>
              <div className={'col-md-12'}>
                <Card style={CardStyles} className="source-data-details">
                  <CardHeader title="Site Image Gallery" />
                  <CardText>
                    <ImageGallery items={[
                      {
                        original: 'http://lorempixel.com/1000/600/nature/1/',
                        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
                      },
                      {
                        original: 'http://lorempixel.com/1000/600/nature/2/',
                        thumbnail: 'http://lorempixel.com/250/150/nature/2/',
                      },
                      {
                        original: 'http://lorempixel.com/1000/600/nature/3/',
                        thumbnail: 'http://lorempixel.com/250/150/nature/3/',
                      },
                    ]}
                    />
                  </CardText>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PopsDetailPage.defaultProps = {
  auth: null,
  sources: [],
  popsDetails: {},
  facilityDetails: {},
};

PopsDetailPage.propTypes = {
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
})(PopsDetailPage);
