import React from 'react';
import Select from 'react-select';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CountWidget from '../../common/CountWidget';
import Carto from '../../helpers/carto';

import RangeSlider from '../../common/RangeSlider';
import InfoIcon from '../../common/InfoIcon';


const filterDimensions = {
  sqlChunks: {},

  dcp_pipeline_status: {
    label: 'Development Status',
    options: [
      {
        label: 'Complete',
        value: 'Complete',
      },
      {
        label: 'Partial complete',
        value: 'Partial complete',
      },
      {
        label: 'Permit issued',
        value: 'Permit issued',
      },
      {
        label: 'Application filed',
        value: 'Application filed',
      },
      {
        label: 'Demolition (complete)',
        value: 'Demolition (complete)',
      },
    ],
  },
  dcp_pipeline_category: {
    label: 'Development Type',
    options: [
      {
        label: 'New Building - Residential',
        value: 'New Building - Residential',
      },
      {
        label: 'New Building - Non-residential',
        value: 'New Building - Non-residential',
      },
      {
        label: 'Alteration - Residential',
        value: 'Alteration - Residential',
      },
      {
        label: 'Alteration - Non-residential',
        value: 'Alteration - Non-residential',
      },
      {
        label: 'Demolition - Residential',
        value: 'Demolition - Residential',
      },
      {
        label: 'Demolition - Non-residential',
        value: 'Demolition - Non-residential',
      },
    ],
  },
};


const LayerSelector = React.createClass({
  propTypes: {
    updateSQL: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      selectedCount: null,
      totalCount: null,
      dateFilter: true,
      filterDimensions: {
        dcp_pipeline_status: [
          {
            label: 'Complete',
            value: 'Complete',
          },
          {
            label: 'Partial complete',
            value: 'Partial complete',
          },
        ],
        dcp_pipeline_category: filterDimensions.dcp_pipeline_category.options,
        dcp_units_use_map: [-310, 1670],
        dob_cofo_date: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef
      },
    });
  },

  componentDidMount() {
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_units_use_map, dob_permit_address',
      tablename: 'nchatterjee.dob_permits_cofos_hpd_geocode',
    };

    this.buildSQL();
  },

  getTotalCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => {
        self.setState({
          selectedCount: count,
          totalCount: count,
        });
      });
  },

  getSelectedCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => { self.setState({ selectedCount: count }); });
  },

  buildSQL() {
    // assemble sql chunks based on the current state
    this.createSQLChunks();

    const sqlTemplate = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE `;

    const chunksArray = [];

    Object.keys(this.sqlChunks).forEach(key => chunksArray.push(this.sqlChunks[key]));

    const chunksString = chunksArray.join(' AND ');

    const sql = sqlTemplate + chunksString;

    // since pipeline does not start with all selected, we must provide a query that will count all rows
    const totalSql = `SELECT * FROM ${this.sqlConfig.tablename}`;
    if (this.state.totalCount == null) this.getTotalCount(totalSql);

    this.props.updateSQL(sql);

    this.getSelectedCount(sql);
  },

  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')
    const subChunks = values.map(value => `${dimension} = '${value.value}'`);

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      this.sqlChunks[dimension] = chunk;
    }
  },

  createDateSQLChunk(dimension, range) {
    const dateRangeFormatted = {
      from: moment(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    if (this.state.dateFilter) {
      this.sqlChunks[dimension] = `NOT (dob_cofo_date_first >= '${dateRangeFormatted.to}' OR dob_cofo_date_last <= '${dateRangeFormatted.from}')`;
    }
  },

  createUnitsSQLChunk(dimension, range) {
    this.sqlChunks[dimension] = `(dcp_units_use_map >= '${range[0]}' AND dcp_units_use_map <= '${range[1]}')`;
  },

  createSQLChunks() {
    this.sqlChunks = {};
    // generate SQL WHERE partials for each filter dimension
    this.createMultiSelectSQLChunk('dcp_pipeline_status', this.state.filterDimensions.dcp_pipeline_status);
    this.createMultiSelectSQLChunk('dcp_pipeline_category', this.state.filterDimensions.dcp_pipeline_category);
    this.createUnitsSQLChunk('dcp_units_use_map', this.state.filterDimensions.dcp_units_use_map);

    if (this.state.dateFilter) {
      this.createDateSQLChunk('dob_cofo_date', this.state.filterDimensions.dob_cofo_date);
    }
  },

  handleChange(dimension, values) {
    // before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    this.state.filterDimensions[dimension] = values;

    // if dimension is status, check which items are included and disable/reset date slider accordingly
    if (dimension === 'dcp_pipeline_status') {
      const invalidValues = values.filter(value => (
        (value.value === 'Permit issued' || value.value === 'Application filed' || value.value === 'Demolition (complete)') ? value.value : null
      ));

      if (invalidValues.length > 0 || values.length === 0) {
        this.state.filterDimensions.dob_cofo_date = [moment('2011-1-1').format('X'), moment().format('X')]; // eslint-disable-line no-undef
        this.state.dateFilter = false;
      } else {
        this.state.dateFilter = true;
      }
    }

    this.forceUpdate();
    this.buildSQL();
  },

  handleSliderChange(dimension, data) {
    // expects the data output from the ionRangeSlider
    // updates state with an array of the filter range
    this.state.filterDimensions[dimension] = [data.from, data.to];
    this.buildSQL();
  },

  sqlChunks: {},

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
    };

    return (
      <div>
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'developments'}
        />
        <List>
          <Subheader
            style={{
              paddingTop: '12px',
            }}
          >
            Development Status
            <InfoIcon text="Categorizes developments based on construction status, determined using DOB Permit and Certificate of Occupancy data" />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Select
              multi
              value={this.state.filterDimensions.dcp_pipeline_status}
              name="form-field-name"
              placeholder="No Status Filter Applied"
              options={filterDimensions.dcp_pipeline_status.options}
              onChange={this.handleChange.bind(this, 'dcp_pipeline_status')}
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
            <Select
              multi
              value={this.state.filterDimensions.dcp_pipeline_category}
              name="form-field-name"
              placeholder="No Category Filter Applied"
              options={filterDimensions.dcp_pipeline_category.options}
              onChange={this.handleChange.bind(this, 'dcp_pipeline_category')}
            />
          </ListItem>

          <Subheader>
            Development Size (Net Units)
            <InfoIcon text="Net change in units resulting from development. Negative values occur from demolitions and/or alterations that reduce the number of units." />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RangeSlider
              data={this.state.filterDimensions.dcp_units_use_map}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dcp_units_use_map')}
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
              data={this.state.filterDimensions.dob_cofo_date}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dob_cofo_date')}
              disable={!this.state.dateFilter}
              prettify={date => moment(date, 'X').format('MMM YYYY')} // eslint-disable-line no-undef
            />
          </ListItem>
        </List>
      </div>
    );
  },
});


module.exports = LayerSelector;
