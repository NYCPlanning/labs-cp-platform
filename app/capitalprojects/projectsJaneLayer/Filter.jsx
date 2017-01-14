import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';

import CountWidget from '../../common/CountWidget';

import Carto from '../../helpers/carto';
import config from '../config';


const Filter = React.createClass({
  propTypes: {
    updateSQL: React.PropTypes.func,
  },

  getInitialState() {
    return ({
      selectedCount: null,
      totalCount: null,
      filterDimensions: {
        agency: [],
      },
    });
  },

  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, agency, descriptio, totalcost',
      pointsTablename: 'adoyle.commitmentspoints',
      polygonsTablename: 'adoyle.commitmentspolygons',
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
      });
  },

  getSelectedCount(sql) {
    const self = this;

    Carto.getCount(sql)
      .then((count) => { self.setState({ selectedCount: count }); });
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

    this.getSelectedCount(pointsSql, polygonsSql);
    this.props.updateSQL(pointsSql, polygonsSql);
  },

  createMultiSelectSQLChunk(dimension, values) {
    // for react-select multiselects, generates a WHERE partial by combining comparators with 'OR'
    // like ( dimension = 'value1' OR dimension = 'value2')
    const subChunks = values.map((value) => {
      //  custom handling for label "Unknown" to query for NULL
      //  TODO make this generic to handle nulls in other dimensions
      if (dimension === 'cpstatus' && value.label === 'Unknown') {
        return 'cpstatus IS NULL';
      }

      return `${dimension}' = '${value.value}'`;
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
    return (
      <div>
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'projects'}
        />
        <Subheader>
          Agency
          <OverlayTrigger
            placement="right" overlay={
              <Tooltip id="tooltip">The City agency associated with the project in FMS</Tooltip>
            }
          >
            <i className="fa fa-info-circle" aria-hidden="true" />
          </OverlayTrigger>
        </Subheader>

        <ListItem
          disabled
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
      </div>
    );
  },
});

export default Filter;
