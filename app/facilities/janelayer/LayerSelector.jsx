// LayerSelector.jsx - This component builds the layer selector which is used in the facilities JaneLayer

import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import CountWidget from '../../common/CountWidget';
import InfoIcon from '../../common/InfoIcon';
import NestedSelect from './NestedSelect';
import Checkbox from './Checkbox';

import config from './config';
import layerConfig from '../layerConfig';
import Carto from '../../helpers/carto';

import './LayerSelector.scss';

const LayerSelector = React.createClass({
  propTypes: {
    updateSQL: PropTypes.func.isRequired,
    layers: PropTypes.array,
  },

  getDefaultProps() {
    return {
      layers: [],
    };
  },

  getInitialState() {
    return ({
      layers: [],
      selectedCount: null,
      totalCount: null,
      checked: 'all', // all, none, or null
      filterDimensions: {
        operatortype: [],
        oversightabbrev: [],
        propertytype: [],
      },
    });
  },

  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'uid, the_geom_webmercator, domain, facilityname, address, facilitytype, operatorname',
      tablename: 'cpadmin.facilities',
    };

    let layers = [];

    if (this.props.layers) {
      layers = this.props.layers;
    } else {
      layers = layerConfig.map((domain) => {
        domain.checked = true;
        domain.children = domain.children.map((group) => {
          group.checked = true;
          group.children = group.children.map((subgroup) => {
            subgroup.checked = true;
            return subgroup;
          });
          return group;
        });
        return domain;
      });
    }

    this.setState({ layers }, () => {
      self.buildSQL(); // trigger map layer update
    });
  },

  componentDidMount() {
    // expand list if we are on a domain page
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

    this.state.filterDimensions[key] = key !== 'oversightabbrev' ? values : abbreviated;
    this.buildSQL();
  },

  // builds WHERE clause partial for operatortype filter
  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')
    const subChunks = values.map((value) => {
      if (dimension !== 'oversightabbrev') {
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
    layers.forEach((domain) => {
      let domainChecked = 0;
      let domainIndeterminate = 0;

      domain.children.forEach((group) => {
        let groupChecked = 0;

        group.children.forEach((subgroup) => {
          if (subgroup.checked) groupChecked += 1;
        });

        group.checked = (groupChecked === group.children.length);
        group.indeterminate = !!((groupChecked < group.children.length) && groupChecked > 0);

        if (group.checked) domainChecked += 1;
        if (group.indeterminate) domainIndeterminate += 1;
      });

      domain.checked = (domainChecked === domain.children.length);
      if (domain.checked) allChecked += 1;

      domain.indeterminate = (domainIndeterminate > 0) || ((domainChecked < domain.children.length) && domainChecked > 0);
      if (domain.indeterminate) allIndeterminate += 1;
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

    this.state.layers.forEach((domain) => {
      domain.children.forEach((group) => {
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

    this.createMultiSelectSQLChunk('operatortype', f.operatortype);
    this.createMultiSelectSQLChunk('oversightabbrev', f.oversightabbrev);
    this.createMultiSelectSQLChunk('propertytype', f.propertytype);
    this.createCategorySQLChunk();
  },

  // builds the WHERE clause partial for facilitysubgroup filter
  createCategorySQLChunk() {
    const layers = this.processChecked();

    let layersChunk = '';

    layers.forEach((name, i) => {
      if (i > 0) layersChunk += ' OR ';
      layersChunk += `facilitysubgroup = '${name}'`;
    });

    this.sqlChunks.facilitysubgroup = (layersChunk.length > 0) ? `(${layersChunk})` : 'false';
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

    this.props.updateSQL(sql);
    this.getSelectedCount(sql);
  },

  handleToggleAll() {
    const layers = this.state.layers;

    layers.forEach((domain) => {
      domain.children.forEach((group) => {
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
          units={'facilities'}
        />
        <div className="scroll-container">
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Select
              multi
              placeholder="Oversight Agencies"
              value={this.state.filterDimensions.oversightabbrev}
              name="form-field-name"
              options={config.agencies}
              onChange={this.updateFilterDimension.bind(this, 'oversightabbrev')}
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
              value={this.state.filterDimensions.operatortype}
              name="form-field-name"
              options={config.operatorTypes}
              onChange={this.updateFilterDimension.bind(this, 'operatortype')}
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
              value={this.state.filterDimensions.propertytype}
              name="form-field-name"
              options={config.propertyTypes}
              onChange={this.updateFilterDimension.bind(this, 'propertytype')}
            />
            <InfoIcon text="Indicates whether the City owns or directly leases the property" />
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
            <div className="btn-group btn-group-xs" role="group" style={{ float: 'right' }}>
              <div
                className="btn dcp-orange btn-xs "
                onClick={this.expandAll}
              >Expand All</div>
              <div className="btn dcp-orange btn-xs " onClick={this.collapseAll}>Collapse All</div>
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