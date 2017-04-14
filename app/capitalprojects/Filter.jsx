import React from 'react';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Numeral from 'numeral';
import Divider from 'material-ui/Divider';

import CapitalProjectsActions from '../actions/CapitalProjectsActions';
import CapitalProjectsStore from '../stores/CapitalProjectsStore';
import CountWidget from '../common/CountWidget';
import InfoIcon from '../common/InfoIcon';
import CostGroupChart from './CostGroupChart';
import RangeSlider from '../common/RangeSlider';
import MultiSelect from '../common/MultiSelect';

const Filter = React.createClass({
  propTypes: {
  },

  getInitialState() {
    return ({
      filterDimensions: CapitalProjectsStore.filterDimensions,
      totalcommitspendRange: [0, 10],
    });
  },

  componentWillMount() {
    CapitalProjectsStore.on('capitalProjectsUpdated', () => {
      this.setState({
        totalCount: CapitalProjectsStore.totalCount,
        selectedCount: CapitalProjectsStore.selectedCount,
        pointsSql: CapitalProjectsStore.pointsSql,
        polygonsSql: CapitalProjectsStore.polygonsSql,
        filterDimensions: CapitalProjectsStore.filterDimensions,
      });
    });
  },

  updateFilterDimension(dimension, values) {
    CapitalProjectsActions.onFilterDimensionChange(dimension, values);
  },

  handleSliderChange(dimension, sliderState) {
    // because the totalcommitspend slider is using "values"
    // the actual range we want is stored as from_value and to_value
    // we need to store the mapped values to local state so we can update the UI

    let values;
    if (dimension === 'activeyears') values = [sliderState.from, sliderState.to];
    if (dimension === 'totalcommitspend') {
      values = [parseInt(sliderState.from_value), parseInt(sliderState.to_value)];
      this.setState({
        totalcommitspendRange: [sliderState.from, sliderState.to],
      });
    }
    this.updateFilterDimension(dimension, values);
  },

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
    };

    const { totalCount, selectedCount, pointsSql, polygonsSql, filterDimensions } = this.state;

    return (
      <div>
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'projects'}
        />
        <Subheader>
          Number of Projects by Total Cost
          <InfoIcon text="Total cost is all past spending + all future commitments" />
        </Subheader>
        {
          pointsSql && polygonsSql &&
            <CostGroupChart
              pointsSql={pointsSql}
              polygonsSql={polygonsSql}
            />
        }
        <Divider />
        <Subheader>
          Managing Agency
          <InfoIcon text="The City agency associated with the project in FMS" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <MultiSelect
            multi
            placeholder="Select Agencies"
            name="form-field-name"
            displayValues
            options={filterDimensions.magencyacro.values}
            onChange={this.updateFilterDimension.bind(this, 'magencyacro')}
            valueRenderer={option => option.value}
          />
        </ListItem>

        <Subheader>
          Sponsor Agency
          <InfoIcon text="The City agency providing part or all of the funds for a project" />
        </Subheader>

        <ListItem
          disabled
          style={listItemStyle}
        >
          <MultiSelect
            multi
            placeholder="Select Agencies"
            name="form-field-name"
            displayValues
            options={filterDimensions.sagencyacro.values}
            onChange={this.updateFilterDimension.bind(this, 'sagencyacro')}
            valueRenderer={option => option.value}
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
          <MultiSelect
            multi
            placeholder="Select Project Types"
            name="form-field-name"
            options={filterDimensions.projecttype.values}
            onChange={this.updateFilterDimension.bind(this, 'projecttype')}
          />
        </ListItem>

        <Subheader>
          Total Cost
          <InfoIcon text="Total cost is all past spending + all future commitments" />
        </Subheader>

        <ListItem
          disabled
          style={{
            paddingTop: '0px',
            zIndex: '0',
          }}
        >
          <RangeSlider
            data={this.state.totalcommitspendRange}
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
          style={{
            paddingTop: '0px',
            zIndex: '0',
          }}
        >
          <RangeSlider
            data={filterDimensions.activeyears.values}
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
