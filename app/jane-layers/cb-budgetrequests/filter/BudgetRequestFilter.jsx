import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';

import MultiSelect from '../../../common/MultiSelect';
import CountWidget from '../../../common/CountWidget';

import * as BudgetRequestActions from '../../../actions/cbBudgetRequests';

import './BudgetRequestFilter.scss';

class BudgetRequestFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: null };
  }

  componentDidMount() {
    this.props.fetchTotalCount();
    this.props.fetchSelectedCount(this.props.filterDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      this.props.fetchSelectedCount(nextProps.filterDimensions);
    }
  }

  componentDidUpdate() {
    if (this.state.expanded === true || this.state.expanded === false) this.setState({ expanded: null }); // eslint-disable-line react/no-did-update-set-state
  }

  updateFilterDimension = (dimension, values) => {
    this.props.setFilterDimension(dimension, values);
  };

  updateTop10Checkbox = () => {
    this.props.setFilterDimension('top10', !this.props.filterDimensions.top10.values);
  }

  render() {
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    return (
      <div className="sidebar-tab-content facilities-filter">
        <CountWidget
          totalCount={this.props.totalCount}
          selectedCount={this.props.selectedCount}
          units={'records'}
          resetFilter={this.props.resetFilter}
        />
        <div className="scroll-container count-widget-offset" style={{ paddingTop: '15px' }}>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              multi
              placeholder="Filter by Agency"
              name="form-field-name"
              displayValues
              options={this.props.filterDimensions.agencyacro.values}
              onChange={this.updateFilterDimension.bind(this, 'agencyacro')}
              valueRenderer={option => option.value}
            />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              multi
              placeholder="Filter by Community Board"
              name="form-field-name"
              displayValues
              options={this.props.filterDimensions.commdist.values}
              onChange={this.updateFilterDimension.bind(this, 'commdist')}
              valueRenderer={option => option.label}
            />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <div className="checkbox-container">
              <input
                id="top10"
                type="checkbox"
                value="top10"
                checked={this.props.filterDimensions.top10.values}
                onChange={this.updateTop10Checkbox.bind(this)}
              />
              <label
                htmlFor="top10"
              />
              <div style={{
                display: 'inline',
                paddingLeft: '5px',
              }}
              >
                Show Top 10 Requests by CB
              </div>
            </div>
          </ListItem>
        </div>
      </div>
    );
  }
}

BudgetRequestFilter.propTypes = {
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,

  filterDimensions: PropTypes.object.isRequired,
  sql: PropTypes.string.isRequired,

  resetFilter: PropTypes.func.isRequired,
  setFilterDimension: PropTypes.func.isRequired,
  fetchTotalCount: PropTypes.func.isRequired,
  fetchSelectedCount: PropTypes.func.isRequired,
};

BudgetRequestFilter.defaultProps = {
  selectedPointType: null,
  selectedPointCoordinates: [],
  totalCount: 0,
  selectedCount: 0,
};

const mapStateToProps = ({ cbBudgetRequests }) => ({
  filterDimensions: cbBudgetRequests.filterDimensions,
  sql: cbBudgetRequests.sql,
  totalCount: cbBudgetRequests.totalCount,
  selectedCount: cbBudgetRequests.selectedCount,
});

export default connect(mapStateToProps, {
  fetchTotalCount: BudgetRequestActions.fetchTotalCount,
  fetchSelectedCount: BudgetRequestActions.fetchSelectedCount,
  resetFilter: BudgetRequestActions.resetFilter,
  setFilterDimension: BudgetRequestActions.setFilterDimension,
})(BudgetRequestFilter);
