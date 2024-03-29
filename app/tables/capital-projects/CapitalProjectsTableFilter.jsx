import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import Subheader from 'material-ui/Subheader';

import InfoIcon from '../../common/InfoIcon';
import MultiSelect from '../../common/MultiSelect';
import RangeInputs from '../../common/RangeInputs';
import RangeSlider from '../../common/RangeSlider';
import CountWidget from '../../common/CountWidget';
import * as capitalProjectsTableActions from '../../actions/capitalProjectsTable';

class Filter extends React.Component {
  constructor() {
    super();

    this.state = {
      totalspendRange: [0, 9],
      totalcommitRange: [0, 9],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      const totalspendRange = this.props.filterDimensions.totalspend.values;
      if (totalspendRange[0] === 0 && totalspendRange[1] === 10000000000) this.setState({ totalspendRange: [0, 9] });

      const totalcommitRange = this.props.filterDimensions.totalcommit.values;
      if (totalcommitRange[0] === 1000 && totalcommitRange[1] === 10000000000) this.setState({ totalcommitRange: [0, 9] });
    }
  }

  updateFilterDimension = (dimension, values) => {
    this.props.setFilterDimension(dimension, values);
  };

  handleSliderChange = (dimension, data) => {
    this.updateFilterDimension(dimension, [data.from, data.to]);
  };

  resetFilter = () => {
    this.props.resetFilter();
  };

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
    };

    const { totalCount, selectedCount, filterDimensions } = this.props;

    return (
      filterDimensions && (
        <div className="sidebar-tab-content">
          <CountWidget
            totalCount={totalCount}
            selectedCount={selectedCount}
            units={'projects'}
            resetFilter={this.resetFilter}
          />
          <div className="scroll-container count-widget-offset">
            <Subheader>
              FMS ID or Description Search
              <InfoIcon text="Filter for matching FMS ID or Project Description" />
            </Subheader>

            <ListItem
              disabled
              style={listItemStyle}
            >
              <input
                className="form-control"
                onChange={this.props.onFilterBy}
                placeholder="Filter by Project ID or Description"
              />
            </ListItem>

            <Subheader>
              Managing Agency
              <InfoIcon text="The City agency managing the project" />
            </Subheader>

            <ListItem
              disabled
              style={listItemStyle}
            >
              <MultiSelect
                multi
                placeholder="Select Agencies"
                name="form-field-name"
                displayValues
                options={filterDimensions.magencyacro.values}
                onChange={this.updateFilterDimension.bind(this, 'magencyacro')}
                valueRenderer={option => option.value}
              />
            </ListItem>

            <Subheader>
              Sponsor Agency
              <InfoIcon text="The City agency funding the project" />
            </Subheader>

            <ListItem
              disabled
              style={listItemStyle}
            >
              <MultiSelect
                multi
                placeholder="Select Agencies"
                name="form-field-name"
                displayValues
                options={filterDimensions.sagencyacro.values}
                onChange={this.updateFilterDimension.bind(this, 'sagencyacro')}
                valueRenderer={option => option.value}
              />
            </ListItem>

            <Subheader>
              Project Type
              <InfoIcon text="The Project Types associated with the project in FMS" />
            </Subheader>

            <ListItem
              disabled
              style={listItemStyle}
            >
              <MultiSelect
                multi
                placeholder="Select Project Types"
                name="form-field-name"
                options={filterDimensions.projecttype.values}
                onChange={this.updateFilterDimension.bind(this, 'projecttype')}
              />
            </ListItem>

            <Subheader>
              Planned Commitment
              <InfoIcon text="Sum of all commitments in the latest capital commitment plan" />
            </Subheader>

            <ListItem
              disabled
              style={{
                paddingTop: '0px',
                zIndex: 1,
              }}
            >
              <RangeInputs
                data={filterDimensions.totalcommit.values}
                onChange={this.handleSliderChange.bind(this, 'totalcommit')}
              />
            </ListItem>

            <Subheader>
              Years Included in Capital Commitment Plan
              <InfoIcon text="Active period is the date of a project's earliest spending or commitment to the date of its latest spending or commitment " />
            </Subheader>
            <ListItem
              disabled
              style={{
                paddingTop: '0px',
                zIndex: '0',
              }}
            >
              <RangeSlider
                data={filterDimensions.activeyears.values}
                type={'double'}
                onChange={this.handleSliderChange.bind(this, 'activeyears')}
                step={1}
                force_edges
                prettify_enabled={false}
                grid
              />
            </ListItem>
          </div>
        </div>
      )
    );
  }
}

Filter.propTypes = {
  totalCount: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onFilterBy: PropTypes.func.isRequired,
  filterDimensions: PropTypes.object.isRequired,
  sql: PropTypes.string.isRequired,

  setFilterDimension: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ capitalProjectsTable }) => ({
  sql: capitalProjectsTable.sql,
  filterDimensions: capitalProjectsTable.filterDimensions,
  selectedCount: capitalProjectsTable.selectedCount,
  totalCount: capitalProjectsTable.totalCount,
});

export default connect(mapStateToProps, {
  resetFilter: capitalProjectsTableActions.resetFilter,
  setFilterDimension: capitalProjectsTableActions.setFilterDimension,
})(Filter);
