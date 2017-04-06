// LayerSelector.jsx - This component builds the layer selector which is used in the facilities JaneLayer

/* eslint-disable react/no-multi-comp */

import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import CountWidget from '../../common/CountWidget';
import InfoIcon from '../../common/InfoIcon';
import NestedSelect from './NestedSelect';
import Checkbox from '../../common/Checkbox';


import FacilitiesActions from '../../actions/FacilitiesActions';
import FacilitiesStore from '../../stores/FacilitiesStore';
import Carto from '../../helpers/carto';
import ga from '../../helpers/ga';

import './LayerSelector.scss';

const LayerSelector = React.createClass({
  propTypes: {
    updateSQL: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      layers: [],
      filterDimensions: null,
    };
  },

  getInitialState() {
    const { filterDimensions } = FacilitiesStore;
    return ({ filterDimensions });
  },

  componentWillMount() {
    FacilitiesStore.on('facilitiesUpdated', () => {
      const { totalCount, selectedCount, filterDimensions } = FacilitiesStore;

      this.setState({
        totalCount,
        selectedCount,
        filterDimensions,
      });
    });


    // const self = this;
    // const layers = this.props.layers;
    // const filterDimensions = this.props.filterDimensions;
    //

    //
    // // Loop over any default filterDimensions and set them before initial load
    // if (filterDimensions) {
    //   Object.keys(filterDimensions).forEach((k) => {
    //     this.updateFilterDimension(k, filterDimensions[k]);
    //   });
    // }
    //
    // this.mounted = false;
    //
    // this.setState({ layers }, () => {
    //   self.buildSQL(); // trigger map layer update
    // });
  },

  componentDidUpdate() {
    if (this.state.expanded === true || this.state.expanded === false) this.setState({ expanded: null }); // eslint-disable-line react/no-did-update-set-state
  },

  getTotalCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => {
        self.setState({ totalCount: count });
      });
  },

  getSelectedCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => { self.setState({ selectedCount: count }); });
  },

  updateFilterDimension(dimension, values) {
    FacilitiesActions.onFilterDimensionChange(dimension, values);
  },

  // builds WHERE clause partial for optype filter
  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')
    const subChunks = values.map((value) => {
      if (dimension !== 'overabbrev') {
        return `${dimension} = '${value.value}'`;
      }

      return `${dimension} LIKE '%${value.value}%'`;
    });

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const joined = subChunks.join(' OR ');
      const chunk = `(${joined})`;

      this.sqlChunks[dimension] = chunk;
    }
  },

  processChecked() {
    const layers = this.state.layers;

    let allChecked = 0;
    let allIndeterminate = 0;

    // set indeterminate states, start from the bottom and work up
    layers.forEach((facdomain) => {
      let facdomainChecked = 0;
      let facdomainIndeterminate = 0;

      facdomain.children.forEach((group) => {
        let groupChecked = 0;

        group.children.forEach((subgroup) => {
          if (subgroup.checked) groupChecked += 1;
        });

        group.checked = (groupChecked === group.children.length);
        group.indeterminate = !!((groupChecked < group.children.length) && groupChecked > 0);

        if (group.checked) facdomainChecked += 1;
        if (group.indeterminate) facdomainIndeterminate += 1;
      });

      facdomain.checked = (facdomainChecked === facdomain.children.length);
      if (facdomain.checked) allChecked += 1;

      facdomain.indeterminate = (facdomainIndeterminate > 0) || ((facdomainChecked < facdomain.children.length) && facdomainChecked > 0);
      if (facdomain.indeterminate) allIndeterminate += 1;
    });

    let checkedStatus;
    // figure out whether all, none, or some are checked
    if (allChecked === layers.length) {
      checkedStatus = 'all';
    } else if (allChecked === 0 && allIndeterminate === 0) {
      checkedStatus = 'none';
    } else {
      checkedStatus = null;
    }

    this.setState({
      layers,
      checked: checkedStatus,
    });

    const selectedLayers = [];

    this.state.layers.forEach((facdomain) => {
      facdomain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          if (subgroup.checked) {
            selectedLayers.push(subgroup.name);
          }
        });
      });
    });

    return selectedLayers;
  },


  createSQLChunks() {
    // create an array of where clause chunks to be joined by 'AND'
    this.sqlChunks = {};

    const f = this.state.filterDimensions;

    this.createMultiSelectSQLChunk('optype', f.optype);
    this.createMultiSelectSQLChunk('overabbrev', f.overabbrev);
    this.createMultiSelectSQLChunk('proptype', f.proptype);
    this.createCategorySQLChunk();
  },

  // builds the WHERE clause partial for facsubgrp filter
  createCategorySQLChunk() {
    const layers = this.processChecked();

    let layersChunk = '';

    layers.forEach((name, i) => {
      if (i > 0) layersChunk += ' OR ';
      layersChunk += `facsubgrp = '${name}'`;
    });

    this.sqlChunks.facsubgrp = (layersChunk.length > 0) ? `(${layersChunk})` : 'false';
  },

  buildSQL() {
    // the main event!  This method is called whenever any change is detected in the UI,
    // and ultimately ends up passing a new layerconfig to jane

    this.createSQLChunks();

    const chunksArray = [];

    Object.keys(this.sqlChunks).forEach((key) => {
      chunksArray.push(this.sqlChunks[key]);
    });

    const chunksString = chunksArray.length > 0 ? chunksArray.join(' AND ') : 'true';

    const sql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE ${chunksString}`;
    const totalSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}`;

    if (this.state.totalCount == null) this.getTotalCount(totalSql);

    if (this.mounted) {
      ga.event({
        category: 'facilities-explorer',
        action: 'set-filter',
      });
    }

    this.props.updateSQL(sql);
    this.getSelectedCount(sql);
  },

  handleToggleAll() {
    const layers = this.state.layers;

    layers.forEach((facdomain) => {
      facdomain.children.forEach((group) => {
        group.children.forEach((subgroup) => {
          // if none or some are selected, select all
          if (this.state.checked !== 'all') {
            (subgroup.checked) = true;
          } else {
            (subgroup.checked) = false;
          }
        });
      });
    });

    this.buildSQL();
  },

  expandAll() {
    this.setState({ expanded: true });
  },

  collapseAll() {
    this.setState({ expanded: false });
  },

  render() {
    const { overabbrev, optype, proptype } = this.state.filterDimensions;

    // override material ui ListItem spacing and react-select component font size
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    const MultiSelect = React.createClass({
      propTypes: {
        options: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
      },

      handleChange(selectedOptions) {
        const { options } = this.props;

        // reset checked status for all options, check those that were just passed in
        options.forEach((option) => { option.checked = false; });
        selectedOptions.forEach((option) => {
          option.checked = true;
        });

        this.props.onChange(options);
      },

      render() {
        const { options, placeholder } = this.props;
        const checkedValues = options.filter(option => option.checked === true).map(option => option.value);

        return (
          <Select
            multi
            value={checkedValues}
            placeholder={placeholder}
            name="form-field-name"
            options={options}
            onChange={this.handleChange}
          />
        );
      },
    });

    return (
      <div className="sidebar-tab-content facilities-filter">
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'records'}
        />
        <div className="scroll-container count-widget-offset" style={{ paddingTop: '15px' }}>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Oversight Agencies"
              name="form-field-name"
              options={overabbrev.values}
              onChange={this.updateFilterDimension.bind(this, 'overabbrev')}
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
              checked={this.state.checked === 'all'}
              indeterminate={this.state.checked !== 'all' && this.state.checked !== 'none'}
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
              layers={this.state.layers}
              onUpdate={this.buildSQL}
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
