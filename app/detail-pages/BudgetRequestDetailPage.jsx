import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import * as cbBudgetRequestActions from '../actions/cbBudgetRequests';

import './BudgetRequestDetailPage.scss';

class BudgetRequestDetailPage extends React.Component {
  componentWillMount() {
    this.fetchPageData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchPageData(nextProps.id);
  }

  fetchPageData(id) {
    this.props.fetchDetails(id);
  }

  renderContent = (data) => {
    const d = data.properties;
    const inTopTen = () => parseInt(d.priority) <= 10;
    const budgetCategoryColor = d.budgetcategory === 'Capital' ? '#b2df8a' : '#a6cee3';

    return (
      <div className="cb-budget-request-page">
        <div className="col-md-12">
          <div className="row equal">
            <div className="col-md-12">
              <h1>{d.need}</h1>
              <h2 style={{ marginBottom: '5px' }}>
                <span className={'badge'} style={{ backgroundColor: budgetCategoryColor }}>{d.budgetcategory}</span>
                <small>{d.sitename} {d.address}</small>
              </h2>
            </div>
          </div>

          <div className="row equal" style={{ marginBottom: '15px', marginTop: '15px' }}>
            <div className={'col-md-4'}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Community District</Tooltip>}>
                <div>
                  Community District
                  <h4>{d.borough} {d.commdist.substr(1)}</h4>
                </div>
              </OverlayTrigger>
            </div>

            <div className={'col-md-4'}>
              { d.priority &&
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Total Requests <br /> (mapped and unmapped)</Tooltip>}>
                  <div>
                    Priority
                    <h4>{d.priority} of {d.denominator} { inTopTen() && <span className={'label label-success'}>Top Ten</span> }</h4>
                  </div>
                </OverlayTrigger>
              }
            </div>

            <div className={'col-md-4'}>
              { d.firstyrsubmitted &&
                <div>
                  First Submitted
                  <h4>{d.firstyrsubmitted}</h4>
                </div>
              }
            </div>
          </div>

          <div className="row equal">
            <div className={'col-md-12'}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Agency</Tooltip>}>
                <h3>{d.agency}</h3>
              </OverlayTrigger>

              <div className="panel panel-default" style={{ marginTop: '15px' }}>
                <div className="panel-heading">
                  Community Board Request and Explanation
                </div>
                <div className="panel-body">
                  <h4 style={{ marginBottom: '5px' }}>{d.request}</h4>
                  {d.description}
                </div>
              </div>
            </div>
          </div>

          <div className="row equal">
            <div className={'col-md-6'}>
              { (d.supporters1 || d.supporters2) &&
                <div className="panel panel-default">
                  <div className="panel-heading">Supporters</div>
                  <div className="panel-body">
                    <div>{d.supporters1}</div>
                    <div>{d.supporters2}</div>
                  </div>
                </div> }
            </div>

            <div className={'col-md-6'}>
              { d.cilast &&
                <div className="panel panel-default">
                  <div className="panel-heading">Community Contact</div>
                  <div className="panel-body">
                    <div><strong>{d.cifirst} {d.cilast}</strong></div>
                    <div><em>{d.cititle}</em></div>
                    <div><a href={`mailto:${d.ciemail}`}>{d.ciemail}</a></div>
                    <div>{d.ciphone}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.cbDetails) {
      return null;
    }
    return (
      <div>
        {this.renderContent(this.props.cbDetails)}
      </div>
    );
  }
}

BudgetRequestDetailPage.defaultProps = {
  cbDetails: {},
};

BudgetRequestDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  cbDetails: PropTypes.object,
  fetchDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({ cbBudgetRequests }) => ({
  cbDetails: cbBudgetRequests.cbDetails,
});

export default connect(mapStateToProps, {
  fetchDetails: cbBudgetRequestActions.fetchDetails,
})(BudgetRequestDetailPage);
