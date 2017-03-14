import React from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';
import Numeral from 'numeral';
import Divider from 'material-ui/Divider';

import CountWidget from '../common/CountWidget';
import InfoIcon from '../common/InfoIcon';
import CostGroupChart from './janelayer/CostGroupChart';
import RangeSlider from '../common/RangeSlider';

import Carto from '../helpers/carto';
import config from './config';


const Filter = React.createClass({
  propTypes: {
    updateSQL: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return ({
      selectedCount: null,
      totalCount: null,
      filterDimensions: {
        magencyacro: [],
        projecttype: [],
        totalcommitspend: [1000, 100000000],
        activeyears: [2010, 2027],
      },
    });
  },

  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'the_geom_webmercator, magency, magencyacro, description, totalcommitspend, maprojid, totalspend',
      pointsTablename: 'cpdb_map_pts',
      polygonsTablename: 'cpdb_map_poly',
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

  createUnitsSQLChunk(dimension, range) {
    // conditional, if slider max value is at the starting point, only include results greater than the lower slider
    if (range[1] < 100000000) {
      this.sqlChunks[dimension] = `(totalcommitspend >= '${range[0]}' AND totalcommitspend <= '${range[1]}')`;
    } else {
      this.sqlChunks[dimension] = `(totalcommitspend >= '${range[0]}')`;
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
    this.createUnitsSQLChunk('totalcommitspend', this.state.filterDimensions.totalcommitspend);
    this.createActiveYearsSQLChunk(this.state.filterDimensions.activeyears);
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
    if (dimension === 'totalcommitspend') {
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
      <div>

      </div>
    );
  },
});

export default Filter;

// materialized view SQL

// DROP MATERIALIZED VIEW commitmentspointsjoined;
// DROP MATERIALIZED VIEW commitmentspolygonsjoined;

// CREATE MATERIALIZED VIEW commitmentspointsjoined as
// SELECT a.*,
//   array_agg(DISTINCT b.projecttype) AS projecttype,
  // min(c.date) mindate,
  // max(c.date) maxdate,
  // sum(c.commitspend) as totalcommitspend,
  // sum(c.commit) as totalcommit,
  // sum(c.spend) as totalspend
// FROM adoyle.commitmentspoints a
// LEFT JOIN adoyle.budgetcommitments b ON a.maprojid = b.maprojid
// LEFT JOIN (
//   SELECT TRIM(LEFT(capital_project,12)) as maprojid,
//     to_date(issue_date,'YYYY-MM-DD') as date,
//     0 as commit,
//     check_amount::double precision as spend,
//     check_amount::double precision as commitspend
//   FROM cpadmin.spending
//   UNION ALL
//   SELECT maprojid,
//     to_date(plancommdate,'YY-Mon') as date,
//     totalcost as commit,
//   0 as spend,
//     totalcost as commitspend
//   FROM adoyle.commitscommitments
// ) c ON c.maprojid = a.maprojid
// GROUP BY a.cartodb_id


// GRANT SELECT on commitmentspointsjoined to publicuser;
// GRANT SELECT on commitmentspolygonsjoined to publicuser;
