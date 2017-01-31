import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import moment from 'moment';
import numeral from 'numeral';

import PlanningApi from '../helpers/PlanningApi';

// css for this component is in ./styles.scss

const CommitmentExpenditureChart = React.createClass({

  propTypes: {
    maprojid: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      data: null,
      offset: {
        x: 0,
        y: 0,
      },
      popupType: null,
    };
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    PlanningApi.getCommitSpend(this.props.maprojid)
      .then(data => this.setState({ data }, this.renderChart));
  },

  handleBarMouseover(d) {
    const e = d3.event;

    this.setState({
      showPopup: true,
      offset: {
        x: e.offsetX,
        y: e.offsetY,
      },
      popupType: d.type,
      popupMonth: d.month,
      popupTotal: d.total,
    });
  },

  handleBarMouseout() {
    this.setState({
      showPopup: false,
    });
  },

  renderChart() {
    const data = this.state.data;
    const padding = 40;
    const width = ReactDOM.findDOMNode(this.chartContainer).getBoundingClientRect().width; // eslint-disable-line react/no-find-dom-node
    const height = 120;

    // create an svg container
    const chart = d3.select(this.chartContainer)
      .append('svg:svg')
      .attr('width', '100%')
      .attr('height', height);

    const minMonth = new Date(d3.min(data, d => d.month));
    const maxMonth = new Date(d3.max(data, d => d.month));

    // array of min and max from the range and today's date
    const dates = [
      minMonth,
      maxMonth,
      new Date(),
    ];

    const minDate = d3.min(dates);
    const maxDate = d3.max(dates);

    const numMonths = moment(maxDate).diff(moment(minDate), 'months', true);

    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([padding, width - (padding * 2)]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.total))])
      .range([height - padding, 0]);

    const xAxis = d3.axisBottom(xScale)
    .ticks(numMonths < 24 ? d3.timeMonth.every(1) : d3.timeYear.every(1))
    .tickFormat((date) => {
      if (d3.timeYear(date) < date) {
        return d3.timeFormat('%b')(date);
      }

      return d3.timeFormat('%Y')(date);
    });

    chart.append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0,${height - padding})`)
      .call(xAxis);

    const barPadding = 2;
    const barWidth = ((width - (padding * 2)) / numMonths) - (barPadding * 2);

    // eslint ignores func-names because this.getBBox() won't work with an arrow function
    chart.selectAll('.xaxis text')
      .attr('transform', function () { // eslint-disable-line func-names
        return `translate(${this.getBBox().height * -2},${this.getBBox().height})rotate(-45)`;
      });

    chart.selectAll('.month-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'month-bar')
      // .attr('r', d => radius_scale(parseInt(d.total)))
      // .attr('cx', d => xScale(new Date(d.month)))
      // .attr('cy', (height - padding))
      .attr('x', d => xScale(new Date(d.month)) - (barWidth / 2))
      .attr('width', barWidth)
      .attr('y', d => yScale(parseInt(d.total)))
      .attr('height', d => height - padding - yScale(parseInt(d.total)))
      .style('fill', (d) => { return d.type === 'expenditures' ? 'steelblue' : '#D96B27'; }) // eslint-disable-line arrow-body-style
      .style('fill-opacity', 0.6)
      .on('mouseover', this.handleBarMouseover)
      .on('mouseout', this.handleBarMouseout);

    chart.append('line')
      .attr('x1', xScale(new Date()))
      .attr('y1', 0)
      .attr('x2', xScale(new Date()))
      .attr('y2', height - padding)
      .style('stroke-width', 1)
      .style('stroke', 'red')
      .style('stroke-opacity', 0.6)
      .style('fill', 'none');
  },

  render() {
    const popupWidth = 100;

    return (
      <div className="chart-container" ref={(x) => { this.chartContainer = x; }} >
        {!this.state.data && (
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        )}
        <div
          className={`arrow_box ${this.state.popupType === 'expenditures' ? 'expenditures' : 'commitments'}`}
          ref={x => (this.popup = x)}
          style={{
            opacity: this.state.showPopup ? 1 : 0.001,
            left: this.state.offset.x - (popupWidth / 2), // TODO plus half width somehow
            top: '100px', // TODO base off of chart height
            zIndex: 999,
          }}
        >
          <div className="popup-top">
            {moment(this.state.popupMonth).format('MMM YYYY')}
          </div>

          <div className="popup-bottom">
            <div className="cost-total">
              {numeral(this.state.popupTotal).format('($0.00a)')}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default CommitmentExpenditureChart;
