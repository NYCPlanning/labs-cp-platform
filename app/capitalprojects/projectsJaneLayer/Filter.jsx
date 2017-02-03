import React from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Select from 'react-select';
import Numeral from 'numeral';
import Divider from 'material-ui/Divider';

import CountWidget from '../../common/CountWidget';
import InfoIcon from '../../common/InfoIcon';
import CostGroupChart from './CostGroupChart';
import RangeSlider from '../../common/RangeSlider';

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
        totalcommitspend: [1000, 100000000],
        activeyears: [2010, 2027],
      },
    });
  },

  componentWillMount() {
    const self = this;

    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, agency, descriptio, totalcommitspend, maprojid',
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
    this.createMultiSelectSQLChunk('agency', f.agency);
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
        <CountWidget
          totalCount={this.state.totalCount}
          selectedCount={this.state.selectedCount}
          units={'projects'}
        />
        <Subheader>
          Number of Projects by Total Cost
          <InfoIcon text="Total cost is all past spending + all future commitments" />
        </Subheader>
        {
          this.props.pointsSql && this.props.polygonsSql &&
            <CostGroupChart
              pointsSql={this.props.pointsSql}
              polygonsSql={this.props.polygonsSql}
            />
        }
        <Divider />
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
          Total Cost
          <InfoIcon text="Total cost is all past spending + all future commitments" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <RangeSlider
            data={this.state.filterDimensions.totalcommitspend}
            type={'double'}
            onChange={this.handleSliderChange.bind(this, 'totalcommitspend')}
            step={1000}
            prettify={num => Numeral(num).format('($ 0.00 a)')}
            grid
            force_edges
            max_postfix="+"
            values={[1000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000]}
          />
        </ListItem>

        <Subheader>
          Active Years
          <InfoIcon text="Active period is the date of a project's earliest spending or commitment to the date of its latest spending or commitment " />
        </Subheader>
        <ListItem
          disabled
          style={listItemStyle}
        >
          <RangeSlider
            data={this.state.filterDimensions.activeyears}
            type={'double'}
            onChange={this.handleSliderChange.bind(this, 'activeyears')}
            step={1}
            force_edges
            prettify_enabled={false}
            grid
          />
        </ListItem>

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
//   min(c.date) mindate,
//   max(c.date) maxdate,
//   sum(c.commitspend) as totalcommitspend,
//   sum(c.commit) as totalcommit,
//   sum(c.spend) as totalspend
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
