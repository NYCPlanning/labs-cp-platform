import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as capitalProjectsActions from '../actions/capitalProjects';

/* eslint-disable no-undef */

class CostGroupChart extends React.Component {
  // on mount, set up chart and go get data
  componentDidMount() {
    this.props.fetchCostGroupData(this.props.pointsSql, this.props.polygonsSql);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pointsSql !== this.props.pointsSql) {
      this.props.fetchCostGroupData(nextProps.pointsSql, nextProps.polygonsSql);
    }

    if (this.props.costGroupData !== nextProps.costGroupData) {
      if (this.chartInitialized) {
        this.renderBars(nextProps.costGroupData);
      } else {
        this.initializeChart(nextProps.costGroupData);
      }
    }
  }

  initializeChart = (costGroupData) => {
    if (!this.chartContainer) {
      return;
    }

    this.margin = {
      top: 20,
      bottom: 20,
    };

    const width = this.chartContainer.getBoundingClientRect().width;

    // overall chart height defined here
    this.height = 100 - this.margin.top - this.margin.bottom;

    // create an svg container
    this.chart = d3.select(this.chartContainer)
      .append('svg:svg')
      .attr('width', width)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.25);

    this.y = d3.scaleLinear()
      .range([this.height + this.margin.top, this.margin.top]);


    this.chart.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${(this.height + this.margin.top)})`)
      .call(d3.axisBottom(this.x));

    this.renderBars(costGroupData);
    this.chartInitialized = true;
  };

  renderBars = (data) => {
    const x = this.x;
    const y = this.y;

    const t = d3.transition()
      .duration(750);

    x.domain(data.map(d => d.range));
    y.domain([0, d3.max(data, d => d.count)]);

    const bar = this.chart.selectAll('.bar-group')
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
      .attr('fill', '#d96b27');

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
  };

  render() {
    return (
      <div className="chart-container" ref={(node) => { this.chartContainer = node; }} />
    );
  }
}

CostGroupChart.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  costGroupData: PropTypes.array.isRequired,
  fetchCostGroupData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ capitalProjects }) => ({
  costGroupData: capitalProjects.costGroupData,
});

export default connect(mapStateToProps, {
  fetchCostGroupData: capitalProjectsActions.fetchCostGroupData,
})(CostGroupChart);
