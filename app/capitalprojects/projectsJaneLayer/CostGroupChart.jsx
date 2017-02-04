import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import carto from '../../helpers/carto';

const CostGroupChart = React.createClass({

  propTypes: {
    pointsSql: PropTypes.string.isRequired,
  },

  // on mount, set up chart and go get data
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
      WITH ranges(range,i) AS (
        VALUES 
          ('<$10K',0), 
          ('10K-100K', 1),
          ('100K-1M',2),
          ('1M-10M',3),
          ('10M-100M',4),
          ('>100M',5)
      )

      SELECT a.range, a.i, count(b.range)
      FROM ranges a 
      LEFT JOIN (
          SELECT 
          CASE 
              WHEN totalcost < 10000 THEN '<$10K' 
              WHEN totalcost >= 10000 AND totalcost < 100000 THEN '10K-100K'
              WHEN totalcost >= 100000 AND totalcost < 1000000 THEN '100K-1M'
              WHEN totalcost >= 1000000 AND totalcost < 10000000 THEN '1M-10M'
              WHEN totalcost >= 10000000 AND totalcost < 100000000 THEN '10M-100M'
              ELSE '>100M'
          END as range
        FROM (${unioned}) x
      ) b
      ON a.range = b.range
      GROUP BY a.range, a.i
      ORDER BY a.i
    `;

    carto.SQL(sql, 'json')
      .then((data) => {
        this.renderBars(data);
      });
  },

  initializeChart() {
    this.margin = {
      top: 20,
      bottom: 20,
    };

    // overall chart height defined here
    this.height = 100 - this.margin.top - this.margin.bottom;
    this.width = ReactDOM.findDOMNode(this.chartContainer).getBoundingClientRect().width; // eslint-disable-line react/no-find-dom-node

    // create an svg container
    this.chart = d3.select(this.chartContainer)
      .append('svg:svg')
      .attr('width', this.width)
      .attr('height', this.height + this.margin.top + this.margin.bottom);


    this.x = d3.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.25);

    this.y = d3.scaleLinear()
      .range([this.height + this.margin.top, 0 + this.margin.top]);


    this.chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${(this.height + this.margin.top)})`)
      .call(d3.axisBottom(this.x));
  },

  renderBars(data) {
    const chart = this.chart;
    const x = this.x;
    const y = this.y;

    const t = d3.transition()
      .duration(750);

    x.domain(data.map(d => d.range));
    y.domain([0, d3.max(data, d => d.count)]);

    const bar = chart.selectAll('.bar-group')
      .data(data);

    // d3 enter()
    const barEnter = bar.enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', d => `translate(${x(d.range)},0)`);

    barEnter.append('rect')
      .attr('y', () => y(0))
      .attr('height', () => (this.height + this.margin.top) - y(0))
      .attr('width', x.bandwidth())
      .transition(t)
      .attr('y', d => y(d.count))
      .attr('height', d => (this.height + this.margin.top) - y(d.count))
      .attr('fill', 'steelblue');

    // bar labels
    barEnter.append('text')
      .attr('x', x.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('y', () => y(0) - 15)
      .transition(t)
      .attr('y', d => y(d.count) - 15)
      .attr('dy', '.75em')
      .text(d => d.count);

    // update
    bar.select('rect')
      .attr('width', x.bandwidth())
      .transition(t)
      .attr('y', d => y(d.count))
      .attr('height', d => (this.height + this.margin.top) - y(d.count));

    bar.select('text')
      .attr('x', x.bandwidth() / 2)
      .transition(t)
      .attr('y', d => y(d.count) - 15)
      .attr('dy', '.75em')
      .text(d => d.count);

    this.chart.select('.axis')
      .call(d3.axisBottom(x));
  },

  render() {
    return (
      <div className="chart-container" ref={(x) => { this.chartContainer = x; }} />
    );
  },
});

export default CostGroupChart;
