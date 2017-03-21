// LayerSelector.jsx - This component builds the layer selector which is used in the facilities JaneLayer

import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import CountWidget from '../../common/CountWidget';
import InfoIcon from '../../common/InfoIcon';
import NestedSelect from './NestedSelect';
import Checkbox from '../../common/Checkbox';

import config from './config';
import Carto from '../../helpers/carto';
import ga from '../../helpers/ga';

import './LayerSelector.scss';

const LayerSelector = React.createClass({
  propTypes: {
    updateSQL: PropTypes.func.isRequired,
    layers: PropTypes.array,
    filterDimensions: PropTypes.object,
  },

  getDefaultProps() {
    return {
      layers: [],
      filterDimensions: null,
    };
  },

  getInitialState() {
    return ({
      layers: [],
      selectedCount: null,
      totalCount: null,
      checked: 'all', // all, none, or null
      filterDimensions: {
        optype: [],
        overabbrev: [],
        proptype: [],
      },
    });
  },

  componentWillMount() {
    const self = this;
    const layers = this.props.layers;
    const filterDimensions = this.props.filterDimensions;

    this.sqlConfig = {
      columns: 'uid, the_geom_webmercator, facdomain, facname, address, factype, opname',
      tablename: 'facdb_facilities',
    };

    // Loop over any default filterDimensions and set them before initial load
    if (filterDimensions) {
      Object.keys(filterDimensions).forEach((k) => {
        this.updateFilterDimension(k, filterDimensions[k]);
      });
    }

    this.mounted = false;

    this.setState({ layers }, () => {
      self.buildSQL(); // trigger map layer update
    });
  },

  componentDidMount() {
    this.mounted = true; // used by buildSQL() to not trigger event on first build
    // expand list if we are on a facdomain page
    if (this.state.layers.length === 1) {
      this.expandAll();
    }
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

  updateFilterDimension(key, values) {
    const abbreviated = values.map(value => ({
      value: value.value,
      label: value.value,
    }));

    this.state.filterDimensions[key] = key !== 'overabbrev' ? values : abbreviated;
    this.buildSQL();
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
    // override material ui ListItem spacing and react-select component font size
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    return (
      <div className="sidebar-tab-content facilities-filter">
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'records'}
        />
        <div className="scroll-container count-widget-offset">
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Select
              multi
              placeholder="Oversight Agencies"
              value={this.state.filterDimensions.overabbrev}
              name="form-field-name"
              options={config.agencies}
              onChange={this.updateFilterDimension.bind(this, 'overabbrev')}
            />
            <InfoIcon text="The agency that funds or oversees this facility" />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <Select
              multi
              placeholder="Operator Types"
              value={this.state.filterDimensions.optype}
              name="form-field-name"
              options={config.optypes}
              onChange={this.updateFilterDimension.bind(this, 'optype')}
            />
            <InfoIcon text="The type of entity operating the facility" />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <Select
              multi
              placeholder="Property Types"
              value={this.state.filterDimensions.proptype}
              name="form-field-name"
              options={config.proptypes}
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
