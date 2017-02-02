import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import carto from '../../helpers/carto';

// css for this component is in ./styles.scss

const CostGroupChart = React.createClass({

  propTypes: {
    pointsSql: PropTypes.string.isRequired,
    polygonsSql: PropTypes.string.isRequired,
  },

  componentDidMount() {
    this.initializeChart();
    this.fetchData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.pointsSql !== this.props.pointsSql) this.fetchData(nextProps);
  },

  fetchData(props) {
    const unioned = `${props.pointsSql} UNION ALL ${props.polygonsSql}`;

    const sql = `
      SELECT 
        range, 
        count(range), 
        CASE
          WHEN range = '<10K' THEN 0 
          WHEN range = '10K-100K' THEN 1 
          WHEN range = '100K-1M' THEN 2 
          WHEN range = '10M-100M' THEN 3 
          WHEN range = '>100M' THEN 4 
        END as i
      FROM (
        SELECT 
          CASE 
              WHEN totalcost < 10000 THEN '<10K' 
              WHEN totalcost >= 10000 AND totalcost < 100000 THEN '10K-100K'
              WHEN totalcost >= 10000 AND totalcost < 100000 THEN '10K-100K'
              WHEN totalcost >= 100000 AND totalcost < 1000000 THEN '100K-1M'
              WHEN totalcost >= 10000000 AND totalcost < 100000000 THEN '10M-100M'
              ELSE '>100M'

          END as range
        FROM ( 
          ${unioned} 
        ) x
      )y
      GROUP BY range
      ORDER BY i
    `;

    carto.SQL(sql, 'json')
      .then(data => this.setState({ data }, this.renderBars));
  },

  initializeChart() {
    this.margin = {
      top: 20,
      right: 0,
      bottom: 20,
      left: 0,
    };

    this.height = 150 - this.margin.top - this.margin.bottom;
    this.width = ReactDOM.findDOMNode(this.chartContainer).getBoundingClientRect().width; // eslint-disable-line react/no-find-dom-node

    // create an svg container
    this.chart = d3.select(this.chartContainer)
      .append('svg:svg')
      .attr('width', '100%')
      .attr('height', this.height + this.margin.top + this.margin.bottom);
  },

  renderBars() {
    const data = this.state.data;
    const chart = this.chart;

    const x = d3.scaleBand()
      .rangeRound([0, this.width])
      .domain(data.map(d => d.range))
      .paddingInner(0.25)
      .paddingOuter(0.25);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([this.height, 0 + this.margin.top]);

    const bar = chart.selectAll('.bar-group')
      .data(data);

    const barEnter = bar.enter()
      .append('g')
      .attr('class', 'bar-group');

    barEnter.append('rect')
      .attr('y', d => y(d.count))
      .attr('height', d => (this.height + this.margin.top) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', 'steelblue');

    // bar labels
    barEnter.append('text')
      .attr('x', x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 15)
      .attr('dy', '.75em')
      .text(d => d.count)
      .attr('text-anchor', 'middle');

    // update
    chart.selectAll('.bar-group')
      .attr('transform', function (d) {
        return `translate(${x(d.range)},0)`;
      });

    bar.selectAll('rect')
      .attr('y', function(d) {
        console.log(d.count, y(d.count));
        return y(d.count);
      })
      .attr('height', d => (this.height + this.margin.top) - y(d.count))
      .attr('width', x.bandwidth());

    bar.selectAll('text')
      .attr('x', x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 15)
      .attr('dy', '.75em')
      .text(d => d.count);


    chart.select('.axis').remove();

    chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${(this.height + this.margin.top)})`)
      .call(d3.axisBottom(x));
  },

  render() {
    return (
      <div className="chart-container" ref={(x) => { this.chartContainer = x; }} />
    );
  },
});

export default CostGroupChart;
