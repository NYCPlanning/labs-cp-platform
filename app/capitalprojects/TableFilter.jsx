import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Numeral from 'numeral';

import InfoIcon from '../common/InfoIcon';
import MultiSelect from '../common/MultiSelect';
import RangeSlider from '../common/RangeSlider';
import CountWidget from '../common/CountWidget';
import CapitalProjectsTableActions from '../actions/CapitalProjectsTableActions';
import CapitalProjectsTableStore from '../stores/CapitalProjectsTableStore';


const Filter = React.createClass({
  propTypes: {
    onFilterBy: PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      filterDimensions: null,
      totalSpendRange: [0, 100000000],
      totalCommitRange: [1000, 100000000],
    });
  },

  componentWillMount() {
    CapitalProjectsTableStore.on('updated', () => {
      this.setState({
        totalCount: CapitalProjectsTableStore.totalCount,
        selectedCount: CapitalProjectsTableStore.selectedCount,
        filterDimensions: CapitalProjectsTableStore.filterDimensions,
      });
    });
  },

  updateFilterDimension(dimension, values) {
    CapitalProjectsTableActions.onFilterDimensionChange(dimension, values);
  },

  handleSliderChange(dimension, sliderState) {
    // expects the data output from the ionRangeSlider

    let values;
    if (dimension === 'totalcommit') {
      values = [sliderState.from_value, sliderState.to_value];
      this.setState({ totalCommitRange: [sliderState.from, sliderState.to] });
    }

    if (dimension === 'totalspend') {
      values = [sliderState.from_value, sliderState.to_value];
      this.setState({ totalSpendRange: [sliderState.from, sliderState.to] });
    }

    this.updateFilterDimension(dimension, values);
  },

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
    };

    const { totalCount, selectedCount, filterDimensions } = this.state;

    return (
      filterDimensions && (
        <div className="sidebar-tab-content">
          <CountWidget
            totalCount={totalCount}
            selectedCount={selectedCount}
            units={'projects'}
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
              Spent to Date
              <InfoIcon text="Sum of spending for this capital project from Checkbook NYC data" />
            </Subheader>

            <ListItem
              disabled
              style={{
                paddingTop: '0px',
                zIndex: '0',
              }}
            >
              <RangeSlider
                data={this.state.totalSpendRange}
                type={'double'}
                onChange={this.handleSliderChange.bind(this, 'totalspend')}
                step={1000}
                prettify={num => Numeral(num).format('($ 0.00 a)')}
                grid
                force_edges
                max_postfix="+"
                values={[0, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000]}
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
                zIndex: '0',
              }}
            >
              <RangeSlider
                data={this.state.totalCommitRange}
                type={'double'}
                onChange={this.handleSliderChange.bind(this, 'totalcommit')}
                step={1000}
                prettify={num => Numeral(num).format('($ 0.00 a)')}
                grid
                force_edges
                max_postfix="+"
                values={[1000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000]}
              />
            </ListItem>
          </div>
        </div>
      )
    );
  },
});

export default Filter;
