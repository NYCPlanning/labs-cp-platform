import React from 'react';
import createReactClass from 'create-react-class';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import CapitalProjectsActions from '../actions/CapitalProjectsActions';
import CapitalProjectsStore from '../stores/CapitalProjectsStore';
import CountWidget from '../common/CountWidget';
import InfoIcon from '../common/InfoIcon';
import CostGroupChart from './CostGroupChart';
import RangeSlider from '../common/RangeSlider';
import RangeInputs from '../common/RangeInputs';
import MultiSelect from '../common/MultiSelect';

const Filter = createReactClass({
  propTypes: {
  },

  getInitialState() {
    return ({
      filterDimensions: CapitalProjectsStore.filterDimensions,
      totalspendRange: [0, 9],
      totalcommitRange: [0, 9],
    });
  },

  componentWillMount() {
    CapitalProjectsStore.on('capitalProjectsUpdated', () => {
      this.setState({
        totalCount: CapitalProjectsStore.totalCount,
        selectedCount: CapitalProjectsStore.selectedCount,
        pointsSql: CapitalProjectsStore.pointsSql,
        polygonsSql: CapitalProjectsStore.polygonsSql,
        filterDimensions: CapitalProjectsStore.filterDimensions,
      }, () => {
        // check for default status of sliders with mapped values
        const totalspendRange = this.state.filterDimensions.totalspend.values;
        if (totalspendRange[0] === 0 && totalspendRange[1] === 10000000000) this.setState({ totalspendRange: [0, 9] });

        const totalcommitRange = this.state.filterDimensions.totalcommit.values;
        if (totalcommitRange[0] === 1000 && totalcommitRange[1] === 10000000000) this.setState({ totalcommitRange: [0, 9] });
      });
    });

    CapitalProjectsStore.initialize();
  },

  componentWillUnmount() {
    CapitalProjectsStore.removeAllListeners('capitalProjectsUpdated');
  },

  updateFilterDimension(dimension, values) {
    CapitalProjectsActions.onFilterDimensionChange(dimension, values);
  },

  handleSliderChange(dimension, data) {
    this.updateFilterDimension(dimension, [data.from, data.to]);
  },

  resetFilter() {
    CapitalProjectsActions.resetFilter();
  },

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
    };

    const { totalCount, selectedCount, pointsSql, polygonsSql, filterDimensions } = this.state;

    return (
      <div className="sidebar-tab-content">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'projects'}
          resetFilter={this.resetFilter}
        />
        <div className="scroll-container count-widget-offset" style={{ paddingTop: '15px' }}>
          <Subheader>
            Number of Projects by Planned Commitment
            <InfoIcon text="Sum of commitments in the latest Capital Commitment Plan" />
          </Subheader>
          {
            pointsSql && polygonsSql &&
              <CostGroupChart
                pointsSql={pointsSql}
                polygonsSql={polygonsSql}
              />
          }
          <Divider />
          <Subheader>
            Managing Agency
            <InfoIcon text="The City agency associated with the project in FMS" />
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
            <InfoIcon text="The City agency providing part or all of the funds for a project" />
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
            <InfoIcon text="The FMS Project Type" />
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
              position: 'initial',
            }}
          >
            <RangeInputs
              data={filterDimensions.totalspend.values}
              onChange={this.handleSliderChange.bind(this, 'totalspend')}
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
            Active Years
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
    );
  },
});

export default Filter;
