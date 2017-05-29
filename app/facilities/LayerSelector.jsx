// LayerSelector.jsx - This component builds the layer selector which is used in the facilities JaneLayer
/* eslint-disable react/no-multi-comp */

import React from 'react';
import createReactClass from 'create-react-class';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import NestedSelect from './NestedSelect';
import CountWidget from '../common/CountWidget';
import InfoIcon from '../common/InfoIcon';
import MultiSelect from '../common/MultiSelect';
import Checkbox from '../common/Checkbox';
import FacilitiesActions from '../actions/FacilitiesActions';
import FacilitiesStore from '../stores/FacilitiesStore';

import './LayerSelector.scss';

const LayerSelector = createReactClass({

  getDefaultProps() {
    return {
      layers: [],
      filterDimensions: null,
    };
  },

  getInitialState() {
    return { expanded: false };
  },

  componentDidUpdate() {
    if (this.state.expanded === true || this.state.expanded === false) this.setState({ expanded: null }); // eslint-disable-line react/no-did-update-set-state
  },

  updateFilterDimension(dimension, values) {
    FacilitiesActions.onFilterDimensionChange(dimension, values);
  },

  handleToggleAll() {
    FacilitiesActions.onToggleAll();
  },

  expandAll() {
    this.setState({ expanded: true });
  },

  collapseAll() {
    this.setState({ expanded: false });
  },

  handleLayerUpdate(layers) {
    this.updateFilterDimension('facsubgrp', layers);
  },

  resetFilter() {
    FacilitiesActions.resetFilter();
  },

  render() {
    const { totalCount, selectedCount, filterDimensions } = this.props;
    const { overabbrev, optype, proptype, facsubgrp } = filterDimensions;

    // override material ui ListItem spacing and react-select component font size
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    const checkStatus = FacilitiesStore.checkStatus;

    return (
      <div className="sidebar-tab-content facilities-filter">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'records'}
          resetFilter={this.resetFilter}
        />
        <div className="scroll-container count-widget-offset" style={{ paddingTop: '15px' }}>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Oversight Agencies"
              name="form-field-name"
              displayValues
              options={overabbrev.values}
              onChange={this.updateFilterDimension.bind(this, 'overabbrev')}
              valueRenderer={option => option.value}
            />
            <InfoIcon text="The agency that funds or oversees this facility" />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Operator Types"
              options={optype.values}
              onChange={this.updateFilterDimension.bind(this, 'optype')}
            />
            <InfoIcon text="The type of entity operating the facility" />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Property Types"
              name="form-field-name"
              options={proptype.values}
              onChange={this.updateFilterDimension.bind(this, 'proptype')}
            />
            <InfoIcon text="Indicates whether the City owns or directly leases the property. This property type data is sourced from the Department of Citywide Administrative Services." />
          </ListItem>

          <Subheader>
            Facility Category
            <a href="https://nycplanning.github.io/cpdocs/facdb/" target="_blank" rel="noreferrer noopener"><InfoIcon text="Learn more about facility types" /></a>
          </Subheader>

          <div className="toggle-expand">
            <Checkbox
              value={'allChecked'}
              checked={checkStatus === 'all'}
              indeterminate={checkStatus !== 'all' && checkStatus !== 'none'}
              onChange={this.handleToggleAll}
            />
            All
            <div className="expand-collapse">
              <span onClick={this.expandAll}>Expand</span> | <span onClick={this.collapseAll}>Collapse</span>
            </div>
          </div>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <NestedSelect
              layers={facsubgrp.values}
              onUpdate={this.handleLayerUpdate}
              initiallyOpen={false}
              expanded={this.state.expanded}
            />
          </ListItem>
        </div>
      </div>
    );
  },
});


module.exports = LayerSelector;
