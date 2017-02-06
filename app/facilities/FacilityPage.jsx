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
// import FeedbackForm from '../common/FeedbackForm';

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

    const CardStyles = {
      zDepth: 1,
      height: '100%',
    };

    const facilitySize = () => {
      if (d.capacity) {
        return (
          <div>
            <h3 style={{ margin: 0 }}>{d.capacity}</h3>
            <h4><small>{d.capacitytype}</small></h4>
          </div>
        );
      }

      return (<div><h3>Unknown</h3></div>);
    };

    const utilization = () => {
      if (d.utilization) {
        return (
          <div>
            <h3 style={{ margin: 0 }}>{d.utilization}</h3>
            <h4><small>{d.capacitytype}</small></h4>
          </div>
        );
      }

      return (<div><h3>Not Available</h3></div>);
    };

    return (
      <div className="facility-page">
        <div className="col-md-12">
          <h1>{d.facilityname}</h1>
          <span className={'badge'} style={{ backgroundColor: 'grey', marginRight: '5px', fontSize: '13px' }}>
            {d.facilitytype}
          </span>
          <h4><small>{d.address}</small></h4>
        </div>

        <div className={'col-md-6'}>
          <div className={'row'} style={{ marginBottom: '15px', marginTop: '15px' }}>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Operated By" />
                <CardText>
                  {<h3>{d.operatorname}</h3>}
                </CardText>
              </Card>
            </div>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Overseen By" />
                <CardText>
                  <h3>{d.oversightagency.split(',').join(', ')}</h3>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Facility Size" />
                <CardText className={'text-center'}>
                  {facilitySize()}
                </CardText>
              </Card>
            </div>
            <div className={'col-md-6'}>
              <Card style={CardStyles}>
                <CardHeader title="Utilization" />
                <CardText className={'text-center'}>
                  {utilization()}
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles} initiallyExpanded>
                <CardHeader title="Property Details" actAsExpander showExpandableButton />
                <CardText expandable className="property-detail-container">
                  <div className="property-detail-blocks"><h4>{d.bbl}</h4><h4><small>BBL</small></h4></div>
                  <div className="property-detail-blocks"><h4>{d.bin}</h4><h4><small>BIN</small></h4></div>
                  <div className="property-detail-blocks"><h4>{d.propertytype ? d.propertytype : 'Privately Owned'}</h4></div>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Classification" actAsExpander showExpandableButton />
                <CardText expandable>
                  <h5>{d.domain} <i className="fa fa-level-down" aria-hidden="true" /></h5>
                  <h5 style={{ marginLeft: '10px' }}>{d.facilitygroup} <i className="fa fa-level-down" aria-hidden="true" /></h5>
                  <h5 style={{ marginLeft: '20px' }}>{d.facilitysubgroup} <i className="fa fa-level-down" aria-hidden="true" /></h5>
                  <h5 style={{ marginLeft: '30px' }}>
                    {d.facilitytype}
                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip"> The facility&apos;s Type is derived from the most granular description provided in the source dataset. The categories and descriptions are limited by the information provided.</Tooltip>}>
                      <i className="fa fa-info-circle" aria-hidden="true" />
                    </OverlayTrigger>
                  </h5>
                </CardText>
              </Card>
            </div>
          </div>

          <div className={'row'} style={{ marginBottom: '15px' }}>
            <div className={'col-md-12'}>
              <Card style={CardStyles}>
                <CardHeader title="Source Data Details" actAsExpander showExpandableButton />
                <CardText expandable>
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn>Source Agency</TableRowColumn>
                        <TableRowColumn><h5>{d.agencysource}</h5></TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Source Dataset</TableRowColumn>
                        <TableRowColumn><h5>{d.sourcedatasetname.split(',').join(', ')}</h5></TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Facility ID in Source Data</TableRowColumn>
                        <TableRowColumn><h5>{d.idagency ? d.idagency.split(',').join(', ') : 'None Provided'}</h5></TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>Last Updated</TableRowColumn>
                        <TableRowColumn><h5>{d.datesourceupdated}</h5></TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardText>
              </Card>
            </div>
          </div>
        </div>

        <div className={'col-md-6'}>
          {data && <ModalMap feature={data} label={data.properties.facilityname} />}
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
