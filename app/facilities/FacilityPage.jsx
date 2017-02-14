// /facilities/FacilityPage.jsx - This component builds an individual page for each facility in the database and compiles its databse lookup details
// Props:
//  params.id - Facility ID being shown based on the route being passed in from carto. Provides row of data.
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React, { PropTypes } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';


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
        self.fetchAgencyValues();
      });
  },

  // Helper methods for db arrays being stored as strings
  dbStringToArray(string) {
    return string.replace(/[{}"]/g, '').split(',');
  },

  dbStringToObject(string) {
    const array = this.dbStringToArray(string);
    return array.map((a) => {
      const label = a.split(': ');
      return {
        agency: label[0],
        value: label[1],
      };
    });
  },

  dbStringAgencyLookup(string, lookup) {
    const object = this.dbStringToObject(string);
    return object.find(o => o.agency === lookup);
  },

  fetchAgencyValues() {
    const self = this;
    const d = this.state.data.properties;

    // Assumes a structure to the string given by the database
    const pgTableIds = this.dbStringToArray(d.pgtable);
    const pgTableSQL = pgTableIds.map(pg => `'${pg}'`).join(',');

    const sql = `SELECT * FROM facilities_datasources WHERE pgtable IN (${pgTableSQL})`;

    carto.SQL(sql, 'json')
      .then((sources) => {
        self.setState({ sources });
      });
  },

  renderContent(state) {
    const d = state.data.properties;
    const sources = state.sources;

    const CardStyles = {
      zDepth: 1,
      height: '100%',
    };

    const wrapInPanel = (title, badge, content) => (
      <div className="panel panel-default">
        <div className="panel-heading"><h4>{title}<span style={{ marginLeft: '10px', bottom: '4px' }} className="label label-default">{badge}</span></h4></div>
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
        const idAgency = this.dbStringAgencyLookup(d.idagency, s.agencysource);
        const table = (
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Source Dataset</TableRowColumn>
                <TableRowColumn><h5>{wrapInLink(s.linkdata, s.sourcedatasetname)}</h5></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Facility ID in Source Data</TableRowColumn>
                <TableRowColumn><h5>{idAgency ? idAgency.value : 'None Provided'}</h5></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Last Updated</TableRowColumn>
                <TableRowColumn><h5>{s.datesourceupdated}</h5></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        );

        return wrapInPanel(s.agencysourcename, s.agencysource, table);
      });

      return sourceDetails;
    };

    const usageList = (data, type) => {
      if (data) {
        const sizes = this.dbStringToObject(data);
        const types = this.dbStringToObject(type);

        const list = sizes.map(size =>
          (
            <li key={size.agency} className="usage-list">
              <h3>{size.value} <small>{types[0].value}</small></h3>
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
      const array = this.dbStringToArray(string);
      const list = array.map(item =>
        <li key={item}>{item}</li>,
      );

      return (
        <ul>{list}</ul>
      );
    };

    const childcareTooltip = () => {
      if (d.facilitygroup === 'Child Care and Pre-Kindergarten') {
        return (
          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Please note that DOE, ACS, and DOHMH capacity numbers for DOE Universal Pre-K and Child Care sites do not match up, because they are all calculated and tracked for different purposes. DOE and ACS each track the number of program seats their agency subsidizes at a facility based on their respective contracts. DOHMH determines capacity as the maximum capacity the space will allow based on square footage.</Tooltip>}>
            <i className="fa fa-info-circle" aria-hidden="true" />
          </OverlayTrigger>
        );
      }

      return null;
    };

    return (
      <div className="facility-page">
        <div className="col-md-12">
          <h1>{d.facilityname}</h1>
          <h2 style={{ marginBottom: '5px' }}><small>{d.address}</small></h2>
          <ol className="breadcrumb">
            <li>{d.domain}</li>
            <li>{d.facilitygroup}</li>
            <li>{d.facilitysubgroup}</li>
            <li>
              <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }}>
                {d.facilitytype}
              </span>
              <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> The facility&apos;s Type is derived from the most granular description provided in the source dataset. The categories and descriptions are limited by the information provided.</Tooltip>}>
                <i className="fa fa-info-circle" aria-hidden="true" />
              </OverlayTrigger>
            </li>
          </ol>
        </div>

        <div className={'col-md-6'}>
          <div style={{ marginBottom: '15px', marginTop: '15px' }}>
            <Card style={CardStyles} className="clearfix">
              <CardHeader title="Property Details" />
              <CardText>
                <div className="row equal">
                  <div className={'col-md-6'}>
                    <div className="panel panel-default">
                      <div className="panel-heading">Operated By</div>
                      <div className="panel-body">
                        {<h3>{d.operatorname}</h3>}
                      </div>
                    </div>
                  </div>
                  <div className={'col-md-6'}>
                    <div className="panel panel-default">
                      <div className="panel-heading">Overseen By</div>
                      <div className="panel-body">
                        <h3>{asList(d.oversightagency)}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row equal">
                  <div className={'col-md-6'}>
                    <div className="panel panel-default">
                      <div className="panel-heading">Facility Size
                        {childcareTooltip()}
                      </div>
                      <div className="panel-body">
                        {d.capacity ? usageList(d.capacity, d.capacitytype) : usageList(d.area, d.areatype) }
                      </div>
                    </div>
                  </div>
                  <div className={'col-md-6'}>
                    <div className="panel panel-default">
                      <div className="panel-heading">Utilization</div>
                      <div className="panel-body">
                        {usageList(d.utilization)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row property-detail-container">
                  <div className="property-detail-blocks"><h4>{d.bbl ? asList(d.bbl) : 'Not Available'}</h4><h4><small>BBL</small></h4></div>
                  <div className="property-detail-blocks"><h4>{d.bin ? asList(d.bin) : 'Not Available'}</h4><h4><small>BIN</small></h4></div>
                  <div className="property-detail-blocks"><h4>{d.propertytype ? d.propertytype : 'Privately Owned'}</h4></div>
                </div>
              </CardText>
            </Card>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles} className="source-data-details">
                <CardHeader title="Source Data Details" actAsExpander showExpandableButton />
                <CardText expandable>
                  {sourceDataDetails()}
                </CardText>
              </Card>
            </div>
          </div>
        </div>

        <div className={'col-md-6'}>
          <div style={{ marginTop: '15px' }}>
            {state.data && <ModalMap feature={state.data} label={state.data.properties.facilityname} />}
          </div>
          <div className={'row'} style={{ marginBottom: '15px', padding: '15px' }}>
            <FeedbackForm
              ref_type="capitalproject"
              ref_id={this.props.params.id}
            />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const content = (this.state.data && this.state.sources) ? this.renderContent(this.state) : null;

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
