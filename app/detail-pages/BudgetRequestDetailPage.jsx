import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackButton from '../common/BackButton';

import * as cbBudgetRequestActions from '../actions/cbBudgetRequests';

import './BudgetRequestDetailPage.scss';

class BudgetRequestDetailPage extends React.Component {
  componentWillMount() {
    this.props.fetchDetails(this.props.params.id);
  }

  renderContent = (data) => {
    const d = data.properties;
    const inTopTen = () => parseInt(d.priority) <= 10;
    const budgetCategoryColor = d.budgetcategory === 'Capital' ? '#b2df8a' : '#a6cee3';

    return (
      <div className="cb-budget-request-page detail-page">
        <div className="col-md-12">
          <div className={'row'}>
            <div
              className="button-container col-md-3 col-md-push-9"
              style={{ textAlign: 'right' }}
            >
              <BackButton
                location={this.props.location}
                defaultText="Map"
                defaultLink="/capitalprojects/explorer"
              />
            </div>

            <div className="col-md-9 col-md-pull-3">
              <h1>{d.need}</h1>
              <h2 style={{ marginBottom: '5px' }}><small>{d.sitename} {d.addressnum} {d.streename}</small></h2>
              <span className={'badge'} style={{ backgroundColor: budgetCategoryColor }}>{d.budgetcategory}</span>
              { inTopTen() &&
                <span className={'badge'} style={{ backgroundColor: 'grey' }}>Top Ten Request</span> }
            </div>
          </div>

          <div className="row equal">
            <div className={'col-md-12'}>
              <div className="panel panel-default">
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
              { d.priority &&
                <div className="panel panel-default">
                  <div className="panel-heading">
                    Priority
                  </div>
                  <div className="panel-body"><strong>{d.priority} of {d.denominator}</strong> total requests <br />(mapped and unmapped)</div>
                </div> }

              { d.firstyrsubmitted &&
                <div className="panel panel-default">
                  <div className="panel-body">First Submitted: <strong>{d.firstyrsubmitted}</strong></div>
                </div> }

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
              <div className="panel panel-default">
                <div className="panel-heading">Community Board</div>
                <div className="panel-body">
                  {<h4>{d.borough} {d.commdist.substr(1)}</h4>}
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">Agency</div>
                <div className="panel-body">
                  {<h4>{d.agency}</h4>}
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">Community Contact</div>
                <div className="panel-body">
                  <div><strong>{d.cifirst} {d.cilast}</strong></div>
                  <div><em>{d.cititle}</em></div>
                  <div><a href={`mailto:${d.ciemail}`}>{d.ciemail}</a></div>
                  <div>{d.ciphone}</div>
                </div>
              </div>
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
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  cbDetails: PropTypes.object,
  location: PropTypes.shape().isRequired,
  fetchDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({ cbBudgetRequests }) => ({
  cbDetails: cbBudgetRequests.cbDetails,
});

export default connect(mapStateToProps, {
  fetchDetails: cbBudgetRequestActions.fetchDetails,
})(BudgetRequestDetailPage);
