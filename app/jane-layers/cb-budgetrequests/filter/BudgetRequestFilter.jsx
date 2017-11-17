import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';

import MultiSelect from '../../../common/MultiSelect';
import AreaFilterSelect from '../../../common/AreaFilterSelect';

import * as BudgetRequestActions from '../../../actions/cbBudgetRequests';

import './BudgetRequestFilter.scss';

class BudgetRequestFilter extends React.Component {
  updateFilterDimension = (dimension, values) => {
    this.props.setFilterDimension(dimension, values);
  };

  render() {
    console.log(this.props);

    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    return (
      <div className="sidebar-tab-content facilities-filter">
        {
        // <ListItem
        //   disabled
        //   style={listItemStyle}
        // >
        //   <AreaFilterSelect
        //     updateFilterDimension={this.updateFilterDimension}
        //     filterDimensions={{
        //       commboard,
        //       borocode,
        //       nta,
        //       censtract,
        //       council,
        //       schooldistrict,
        //     }}
        //     options={[
        //       { value: 'commboard', label: 'Community District' },
        //       { value: 'borocode', label: 'Borough' },
        //       { value: 'nta', label: 'Neighborhood Tabulation Area' },
        //       { value: 'council', label: 'City Council District' },
        //       { value: 'censtract', label: 'Census Tract' },
        //       { value: 'schooldistrict', label: 'School District' },
        //     ]}
        //   />
        // </ListItem>
        }

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
      </div>
    );
  }
}

BudgetRequestFilter.propTypes = {
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,

  filterDimensions: PropTypes.object.isRequired,

  resetFilter: PropTypes.func.isRequired,
  setFilterDimension: PropTypes.func.isRequired,
};

BudgetRequestFilter.defaultProps = {
  selectedPointType: null,
  selectedPointCoordinates: [],
};

const mapStateToProps = ({ cbBudgetRequests }) => ({
  filterDimensions: cbBudgetRequests.filterDimensions,
});

export default connect(mapStateToProps, {
  resetFilter: BudgetRequestActions.resetFilter,
  setFilterDimension: BudgetRequestActions.setFilterDimension,
})(BudgetRequestFilter);
