import React from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import CountWidget from '../../common/CountWidget';
import InfoIcon from '../../common/InfoIcon';
import CostGroupChart from './CostGroupChart';

import Carto from '../../helpers/carto';
import config from '../config';


const Filter = React.createClass({
  propTypes: {
    updateSQL: React.PropTypes.func.isRequired,
    pointsSql: React.PropTypes.string.isRequired,
    polygonsSql: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return ({
      selectedCount: null,
      totalCount: null,
      filterDimensions: {
        agency: [],
        projecttype: [],
      },
    });
  },

  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, agency, descriptio, totalcost, maprojid',
      pointsTablename: 'commitmentspointsjoined',
      polygonsTablename: 'commitmentspolygonsjoined',
    };

    self.buildSQL();
  },

  getTotalCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => {
        self.setState({
          selectedCount: count,
          totalCount: count,
        });
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

    const pointsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.pointsTablename} WHERE ${chunksString}`;
    const polygonsSql = `SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.polygonsTablename} WHERE ${chunksString}`;
    const sql = this.unionSQL(pointsSql, polygonsSql);

    if (this.state.totalCount == null) this.getTotalCount(sql);

    this.getSelectedCount(`${pointsSql} UNION ALL ${polygonsSql}`);
    this.props.updateSQL(pointsSql, polygonsSql);
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

  createSQLChunks() {
    // create an array of where clause chunks to be joined by 'AND'
    this.sqlChunks = {};

    const f = this.state.filterDimensions;
    this.createMultiSelectSQLChunk('agency', f.agency);
    this.createMultiSelectSQLChunk('projecttype', f.projecttype);
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
          units={'projects'}
        />
        <Subheader>
          Agency
          <InfoIcon text="The City agency associated with the project in FMS" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <Select
            multi
            placeholder="Select Agencies"
            value={this.state.filterDimensions.agency}
            name="form-field-name"
            options={config.agencies}
            onChange={this.updateFilterDimension.bind(this, 'agency')}
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
          Number of Projects by Total Cost
        </Subheader>
        {
          this.props.pointsSql && this.props.polygonsSql &&
            <CostGroupChart
              pointsSql={this.props.pointsSql}
              polygonsSql={this.props.polygonsSql}
            />
        }
      </div>
    );
  },
});

export default Filter;
