import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';
import Numeral from 'numeral';

import InfoIcon from '../common/InfoIcon';
import RangeSlider from '../common/RangeSlider';
import CountWidget from '../common/CountWidget';


import Carto from '../helpers/carto';
import config from './config';


const Filter = React.createClass({
  propTypes: {
    onUpdateSql: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    selectedCount: PropTypes.number.isRequired,
  },

  getInitialState() {
    return ({
      filterDimensions: {
        magencyacro: [],
        projecttype: [],
        totalspend: [0, 100000000],
        totalcommit: [1000, 100000000],
        // activeyears: [2010, 2027],
      },
    });
  },

  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'magency, magencyacro, maprojid, description, totalcommit, totalspend, projecttype',
      pointsTablename: 'cpdb_map_combined',
    };

    self.buildSQL();
  },

  getTotalCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => {
        self.totalCount = count;
      })
      .catch();
  },

  getSelectedCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => { self.setState({ selectedCount: count }); })
      .catch();
  },

  unionSQL(pointsSql, polygonsSql) {
    return `
      ${pointsSql}
      UNION ALL
      ${polygonsSql}
    `;
  },

  buildSQL() {
    this.createSQLChunks();

    const chunksArray = [];

    Object.keys(this.sqlChunks).forEach((key) => {
      chunksArray.push(this.sqlChunks[key]);
    });

    // join chunks with AND, or handle empty filters
    const chunksString = chunksArray.length > 0 ? chunksArray.join(' AND ') : 'true';

    const sql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.pointsTablename} WHERE ${chunksString}`;

    if (this.totalCount === undefined) this.getTotalCount(sql);

    this.props.onUpdateSql(sql);
  },

  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')
    const subChunks = values.map((value) => {
      if (dimension === 'projecttype') {
        return `array_to_string(projecttype, ', ') like '%${value.value}%'`;
      }

      return `${dimension} = '${value.value}'`;
    });

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const joined = subChunks.join(' OR ');
      const chunk = `(${joined})`;

      this.sqlChunks[dimension] = chunk;
    }
  },

  createUnitsSQLChunk(dimension, range) {
    // conditional, if slider max value is at the starting point, only include results greater than the lower slider
    if (range[1] < 100000000) {
      this.sqlChunks[dimension] = `(${dimension} >= '${range[0]}' AND ${dimension} <= '${range[1]}')`;
    } else {
      this.sqlChunks[dimension] = `(${dimension} >= '${range[0]}')`;
    }
  },

  createActiveYearsSQLChunk(range) {
    this.sqlChunks.activeyears = `NOT (maxdate <= to_date('${range[0] - 1}-07-01', 'YYYY-MM-DD') OR mindate >= to_date('${range[1]}-06-30', 'YYYY-MM-DD'))`;
  },

  createSQLChunks() {
    // create an array of where clause chunks to be joined by 'AND'
    this.sqlChunks = {};

    const f = this.state.filterDimensions;
    this.createMultiSelectSQLChunk('magencyacro', f.magencyacro);
    this.createMultiSelectSQLChunk('projecttype', f.projecttype);
    this.createUnitsSQLChunk('totalspend', this.state.filterDimensions.totalspend);
    this.createUnitsSQLChunk('totalcommit', this.state.filterDimensions.totalcommit);
    // this.createActiveYearsSQLChunk(this.state.filterDimensions.activeyears);
  },

  updateFilterDimension(key, values) {
    // before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    const abbreviated = values.map(value => ({
      value: value.value,
      label: value.value,
    }));

    this.state.filterDimensions[key] = abbreviated;

    this.buildSQL();
  },

  handleSliderChange(dimension, data) {
    // expects the data output from the ionRangeSlider
    // updates state with an array of the filter range
    if (dimension === 'totalcommit' || dimension === 'totalspend') {
      this.state.filterDimensions[dimension] = [data.from_value, data.to_value];
    } else {
      this.state.filterDimensions[dimension] = [data.from, data.to];
    }

    this.buildSQL();
  },

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
    };

    return (
      <div className="sidebar-tab-content">
        <CountWidget
          totalCount={this.totalCount}
          selectedCount={this.props.selectedCount}
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
              onChange={this.props.onFilterChange}
              placeholder="Filter by Project ID or Description"
            />
          </ListItem>

          <Subheader>
            Managing Agency
            <InfoIcon text="The City agency associated with the project in FMS" />
          </Subheader>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <Select
              multi
              placeholder="Select Agencies"
              value={this.state.filterDimensions.magencyacro}
              name="form-field-name"
              options={config.agencies}
              onChange={this.updateFilterDimension.bind(this, 'magencyacro')}
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
            <Select
              multi
              placeholder="Select Project Types"
              value={this.state.filterDimensions.projecttype}
              name="form-field-name"
              options={config.projecttypes}
              onChange={this.updateFilterDimension.bind(this, 'projecttype')}
            />
          </ListItem>

          <Subheader>
            Spent
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
              data={this.state.filterDimensions.totalspend}
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
            Committed
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
              data={this.state.filterDimensions.totalcommit}
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
    );
  },
});

export default Filter;
