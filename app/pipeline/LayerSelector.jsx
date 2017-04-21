import React from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CountWidget from '../common/CountWidget';
import Checkboxes from './Checkboxes';
import PipelineActions from '../actions/PipelineActions';
import PipelineStore from '../stores/PipelineStore';

import RangeSlider from '../common/RangeSlider';
import InfoIcon from '../common/InfoIcon';

import './LayerSelector.scss';

const LayerSelector = React.createClass({

  getInitialState() {
    return ({
      symbologyDimension: PipelineStore.symbologyDimension,
      filterDimensions: PipelineStore.filterDimensions,
    });
  },

  componentWillMount() {
    PipelineStore.on('pipelineUpdated', () => {
      this.setState({
        totalCount: PipelineStore.totalCount,
        selectedCount: PipelineStore.selectedCount,
        filterDimensions: PipelineStore.filterDimensions,
        symbologyDimension: PipelineStore.symbologyDimension,
      });
    });

    PipelineStore.initialize();
  },

  componentWillUnmount() {
    PipelineStore.removeAllListeners('pipelineUpdated');
  },

  handleFilterDimensionChange(dimension, values) {
    PipelineActions.onFilterDimensionChange(dimension, values);
  },

  handleSymbologyDimensionChange(symbologyDimension) {
    PipelineActions.onSymbologyDimensionChange(symbologyDimension);
  },

  handleSliderChange(dimension, data) {
    // expects the data output from the ionRangeSlider
    // updates state with an array of the filter range

    // // update the manual input elements
    // if (dimension === 'dcp_units_use_map') {
    //   this.unitsMin.value = data.from;
    //   this.unitsMax.value = data.to;
    // }

    PipelineActions.onFilterDimensionChange(dimension, [data.from, data.to]);
  },

  handleInputChange(e) { // handles changes to the manual inputs for total units
    e.preventDefault();
    PipelineActions.onFilterDimensionChange('dcp_units_use_map', [this.unitsMin.value, this.unitsMax.value]);
  },

  resetFilter() {
    PipelineActions.resetFilter();
  },

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      padding: '0px 16px',
    };

    const {
      filterDimensions,
      totalCount,
      selectedCount,
      symbologyDimension,
    } = this.state;


    const issueDateFilterDisabled = PipelineStore.issueDateFilterDisabled();
    const completionDateFilterDisabled = PipelineStore.completionDateFilterDisabled();

    const PinSelect = (props) => {
      const style = {
        selected: {
          color: '#D96B27',
          paddingLeft: '5px',
        },
        unselected: {
          color: '#9C9C9C',
          paddingLeft: '5px',
        },
      };

      return (
        <div
          style={props.selected ? style.selected : style.unselected}
          className="fa fa-map-pin"
          onClick={props.onClick}
        />
      );
    };

    // the manual inputs are not react-based, so this makes sure their values reflect the slider
    // if is necessary because this.unitsMin is a ref and does not exist until after the first render
    if (this.unitsMin) {
      this.unitsMin.value = filterDimensions.dcp_units_use_map.values[0];
      this.unitsMax.value = filterDimensions.dcp_units_use_map.values[1];
    }

    return (
      <div className="sidebar-tab-content pipeline-layer-selector">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'records'}
          resetFilter={this.resetFilter}
        />
        <div className="scroll-container count-widget-offset">
          <Subheader>
            Development Status
            <InfoIcon text="Categorizes developments based on construction status, determined using DOB Permit and Certificate of Occupancy data" />
            <PinSelect
              onClick={() => { this.handleSymbologyDimensionChange('dcp_pipeline_status'); }}
              selected={symbologyDimension === 'dcp_pipeline_status'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.dcp_pipeline_status}
              onChange={this.handleFilterDimensionChange.bind(this, 'dcp_pipeline_status')}
              legendCircleType={symbologyDimension === 'dcp_pipeline_status' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Permit Type
            <InfoIcon text="Categorizes developments based on the permit type, determined using DOB data" />
            <PinSelect
              onClick={() => { this.handleSymbologyDimensionChange('dcp_permit_type'); }}
              selected={symbologyDimension === 'dcp_permit_type'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.dcp_permit_type}
              onChange={this.handleFilterDimensionChange.bind(this, 'dcp_permit_type')}
              legendCircleType={symbologyDimension === 'dcp_permit_type' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Development Type
            <InfoIcon text="Categorizes developments based on the construction and housing types, determined using DOB Permit data" />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.dcp_development_type}
              onChange={this.handleFilterDimensionChange.bind(this, 'dcp_development_type')}
              legendCircleType={'none'}
            />
          </ListItem>

          <Subheader>
            Total New Units
            <InfoIcon text="Net change in units resulting from development. Negative values occur from demolitions and/or alterations that reduce the number of units." />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <form className="manual-input" onSubmit={this.handleInputChange}>
              <input
                type="text"
                className="form-control mb-2 mr-sm-2 mb-sm-0"
                defaultValue={filterDimensions.dcp_units_use_map.values[1]}
                ref={(unitsMin) => { this.unitsMin = unitsMin; }}
              />
              <input
                type="text"
                style={{ float: 'right' }}
                className="form-control mb-2 mr-sm-2 mb-sm-0"
                defaultValue={filterDimensions.dcp_units_use_map.values[1]}
                ref={(unitsMax) => { this.unitsMax = unitsMax; }}
              />
              <input type="submit" value="Submit" />
            </form>
            <RangeSlider
              data={filterDimensions.dcp_units_use_map.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dcp_units_use_map')}
              grid
              keyboard
              force_edges
            />
          </ListItem>

          <Subheader>
            Permit Issued
            <InfoIcon text="Reflects date(s) when permits were issued by DOB" />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RangeSlider
              data={filterDimensions.dob_qdate.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dob_qdate')}
              disable={issueDateFilterDisabled}
              prettify={date => moment(date, 'X').format('MMM YYYY')} // eslint-disable-line no-undef
              force_edges
            />
          </ListItem>

          <Subheader>
            Completion Date
            <InfoIcon text="Reflects date(s) when developments have received Certificate(s) of Occupancy (CofO). If a development has received multiple CofOs, filter evalutes timeframe between earliest CofO (since 2010) and most recent CofO." />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RangeSlider
              data={filterDimensions.dob_cofo_date.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dob_cofo_date')}
              disable={completionDateFilterDisabled}
              prettify={date => moment(date, 'X').format('MMM YYYY')} // eslint-disable-line no-undef
              force_edges
            />
          </ListItem>
        </div>
      </div>
    );
  },
});


module.exports = LayerSelector;
