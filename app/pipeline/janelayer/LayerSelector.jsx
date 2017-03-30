import React from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CountWidget from '../../common/CountWidget';
import Carto from '../../helpers/carto';
import Checkboxes from './Checkboxes';

import RangeSlider from '../../common/RangeSlider';
import InfoIcon from '../../common/InfoIcon';

import { defaultFilterDimensions } from './config';

import './LayerSelector.scss';

const LayerSelector = React.createClass({
  propTypes: {
    updateSQL: React.PropTypes.func.isRequired,
    symbologyDimension: React.PropTypes.string.isRequired,
    onSymbologyDimensionChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      selectedCount: null,
      totalCount: null,
      issueDateFilterDisabled: true,
      completionDateFilterDisabled: true,
      filterDimensions: defaultFilterDimensions,
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

    // since pipeline does not start with all selected, we must provide a query that will count all rows
    if (this.state.totalCount == null) this.getTotalCount(sql);

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

    if (dimension === 'dob_cofo_date') {
      this.sqlChunks[dimension] = `NOT (dob_cofo_date_first >= '${dateRangeFormatted.to}' OR dob_cofo_date_last <= '${dateRangeFormatted.from}')`;
    }

    if (dimension === 'dob_qdate') {
      this.sqlChunks[dimension] = `(dob_qdate >= '${dateRangeFormatted.from}' AND dob_qdate <= '${dateRangeFormatted.to}')`;
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

    this.createDateSQLChunk('dob_qdate', this.state.filterDimensions.dob_qdate);

    if (!this.state.completionDateFilterDisabled) {
      this.createDateSQLChunk('dob_cofo_date', this.state.filterDimensions.dob_cofo_date);
    }

    if (!this.state.issueDateFilterDisabled) {
      this.createDateSQLChunk('dob_qdate', this.state.filterDimensions.dob_qdate);
    }
  },

  handleChange(dimension, values) {
    // before setting state, set the label for each value to the agency acronym so that the full text does not appear in the multi-select component
    this.state.filterDimensions[dimension] = values;

    // if dimension is status, check which items are included and disable/reset date slider accordingly
    if (dimension === 'dcp_pipeline_status') {
      const invalidValuesCompletion = values.filter(value => (
        (value.value === 'Permit issued' || value.value === 'Application filed') ? value.value : null
      ));


      // Completion Slider
      if (invalidValuesCompletion.length > 0 || values.length === 0) {
        this.state.filterDimensions.dob_cofo_date = [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')]; // eslint-disable-line
        this.state.completionDateFilterDisabled = true;
      } else {
        this.state.completionDateFilterDisabled = false;
      }

      // Permit Issued Slider
      const invalidValuesIssued = values.filter(value => (
        (value.value === 'Application filed') ? value.value : null
      ));


      if (invalidValuesIssued.length > 0 || values.length === 0) {
        this.state.filterDimensions.dob_qdate = [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')]; // eslint-disable-line
        this.state.issueDateFilterDisabled = true;
      } else {
        this.state.issueDateFilterDisabled = false;
      }
    }

    this.forceUpdate();
    this.buildSQL();
  },

  handleSliderChange(dimension, data) {
    // expects the data output from the ionRangeSlider
    // updates state with an array of the filter range

    // update the manual input elements
    if (dimension === 'dcp_units_use_map') {
      this.unitsMin.value = data.from;
      this.unitsMax.value = data.to;
    }

    this.state.filterDimensions[dimension] = [data.from, data.to];
    this.buildSQL();
  },

  handleInputChange(e) { // handles changes to the manual inputs for total units
    e.preventDefault();

    const self = this;

    const newFilterDimensions = this.state.filterDimensions;
    newFilterDimensions.dcp_units_use_map = [this.unitsMin.value, this.unitsMax.value];
    this.setState({ filterDimensions: newFilterDimensions }, () => { self.buildSQL(); });
  },

  sqlChunks: {},

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      padding: '0px 16px',
    };

    const { filterDimensions, issueDateFilterDisabled, completionDateFilterDisabled, totalCount, selectedCount } = this.state;
    const { symbologyDimension } = this.props;

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

    return (
      <div className="sidebar-tab-content pipeline-layer-selector">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'records'}
        />
        <div className="scroll-container count-widget-offset">
          <Subheader>
            Development Status
            <InfoIcon text="Categorizes developments based on construction status, determined using DOB Permit and Certificate of Occupancy data" />
            <PinSelect
              onClick={() => { this.props.onSymbologyDimensionChange('dcp_pipeline_status'); }}
              selected={symbologyDimension === 'dcp_pipeline_status'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              value={filterDimensions.dcp_pipeline_status}
              options={defaultFilterDimensions.dcp_pipeline_status}
              onChange={this.handleChange.bind(this, 'dcp_pipeline_status')}
              legendCircleType={symbologyDimension === 'dcp_pipeline_status' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Permit Type
            <InfoIcon text="Categorizes developments based on the permit type, determined using DOB data" />
            <PinSelect
              onClick={() => { this.props.onSymbologyDimensionChange('dcp_permit_type'); }}
              selected={symbologyDimension === 'dcp_permit_type'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              value={filterDimensions.dcp_permit_type}
              options={defaultFilterDimensions.dcp_permit_type}
              onChange={this.handleChange.bind(this, 'dcp_permit_type')}
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
              value={filterDimensions.dcp_development_type}
              options={defaultFilterDimensions.dcp_development_type}
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
            <form className="manual-input" onSubmit={this.handleInputChange}>
              <input
                type="text"
                className="form-control mb-2 mr-sm-2 mb-sm-0"
                defaultValue={filterDimensions.dcp_units_use_map[0]}
                ref={(unitsMin) => { this.unitsMin = unitsMin; }}
              />
              <input
                type="text"
                style={{ float: 'right' }}
                className="form-control mb-2 mr-sm-2 mb-sm-0"
                defaultValue={filterDimensions.dcp_units_use_map[1]}
                ref={(unitsMax) => { this.unitsMax = unitsMax; }}
              />
              <input type="submit" value="Submit" />
            </form>
            <RangeSlider
              data={filterDimensions.dcp_units_use_map}
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
              data={filterDimensions.dob_qdate}
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
              data={filterDimensions.dob_cofo_date}
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
