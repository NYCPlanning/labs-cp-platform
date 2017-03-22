import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CountWidget from '../../common/CountWidget';
import Carto from '../../helpers/carto';
import Checkboxes from './Checkboxes';

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
        color: '#525252',
      },
      {
        label: 'Partial complete',
        value: 'Partial complete',
        color: '#969696',
      },
      {
        label: 'Permit issued',
        value: 'Permit issued',
        color: '#cccccc',
      },
      {
        label: 'Application filed',
        value: 'Application filed',
        color: '#f7f7f7',
      },
    ],
  },
  dcp_permit_type: {
    label: 'Permit Type',
    options: [
      {
        label: 'New Building',
        value: 'New Building',
        color: 'rgba(0, 228, 14, 0.7)',
      },
      {
        label: 'Alteration',
        value: 'Alteration',
        color: 'rgba(81, 99, 230, 0.77)',
      },
      {
        label: 'Demolition',
        value: 'Demolition',
        color: 'rgba(234, 62, 62, 1)',
      },
    ],
  },
  dcp_development_type: {
    label: 'Development Type',
    options: [
      {
        label: 'Residential',
        value: 'Residential',
      },
      {
        label: 'Non-residential',
        value: 'Non-residential',
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
        dcp_pipeline_status: filterDimensions.dcp_pipeline_status.options,
        dcp_permit_type: filterDimensions.dcp_permit_type.options,
        dcp_development_type: filterDimensions.dcp_development_type.options,
        dcp_units_use_map: [-1445, 1669],
        dob_cofo_date: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef
        dob_pdate: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef
      },
    });
  },

  componentDidMount() {
    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, dcp_pipeline_status, dcp_permit_type, dcp_units_use_map, dob_permit_address',
      tablename: 'pipeline_projects_dev',
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

    console.log(sql);

    // since pipeline does not start with all selected, we must provide a query that will count all rows
    const totalSql = `SELECT * FROM ${this.sqlConfig.tablename}`;
    if (this.state.totalCount == null) this.getTotalCount(totalSql);

    this.props.updateSQL(sql);

    this.getSelectedCount(sql);
  },

  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')

    // inject some additional values to handle the demolition use className
    // demolitions where permit is issues should also show up under searches for complete.
    const demolitionIsSelected = this.state.filterDimensions.dcp_permit_type.filter(d => d.value === 'Demolition').length > 0;
    const completeIsSelected = values.filter(d => d.value === 'Complete').length > 0;
    const permitIssuedIsSelected = values.filter(d => d.value === 'Permit issued').length > 0;

    console.log('demolition is selected', demolitionIsSelected, completeIsSelected, permitIssuedIsSelected);

    const subChunks = values.map(value => `${dimension} = '${value.value}'`);

    if (dimension === 'dcp_pipeline_status' && demolitionIsSelected && (completeIsSelected || permitIssuedIsSelected)) {
      subChunks.push('dcp_pipeline_status = \'Demolition (complete)\'');
    }

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      this.sqlChunks[dimension] = chunk;
    } else {
      this.sqlChunks[dimension] = 'FALSE'; // if no options in the multiselect are selected, make the resulting SQL return no rows
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
    this.createMultiSelectSQLChunk('dcp_permit_type', this.state.filterDimensions.dcp_permit_type);
    this.createMultiSelectSQLChunk('dcp_development_type', this.state.filterDimensions.dcp_development_type);
    this.createUnitsSQLChunk('dcp_units_use_map', this.state.filterDimensions.dcp_units_use_map);

    this.createDateSQLChunk('dob_pdate', this.state.filterDimensions.dob_pdate);

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
      <div className="sidebar-tab-content facilities-filter">
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'records'}
        />
        <div className="scroll-container count-widget-offset">
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
            <Checkboxes
              value={this.state.filterDimensions.dcp_pipeline_status}
              options={filterDimensions.dcp_pipeline_status.options}
              onChange={this.handleChange.bind(this, 'dcp_pipeline_status')}
              legendCircleType={'none'}
            />
          </ListItem>

          <Subheader>
            Permit Type
            <InfoIcon text="Categorizes developments based on the construction and housing types, determined using DOB Permit data" />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              value={this.state.filterDimensions.dcp_permit_type}
              options={filterDimensions.dcp_permit_type.options}
              onChange={this.handleChange.bind(this, 'dcp_permit_type')}
              legendCircleType={'fill'}
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
              value={this.state.filterDimensions.dcp_development_type}
              options={filterDimensions.dcp_development_type.options}
              onChange={this.handleChange.bind(this, 'dcp_development_type')}
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
            <RangeSlider
              data={this.state.filterDimensions.dcp_units_use_map}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dcp_units_use_map')}
              grid
              keyboard
              max_postfix="+"
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
              data={this.state.filterDimensions.dob_pdate}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'dob_pdate')}
              disable={!this.state.dateFilter}
              prettify={date => moment(date, 'X').format('MMM YYYY')} // eslint-disable-line no-undef
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
        </div>
      </div>
    );
  },
});


module.exports = LayerSelector;
