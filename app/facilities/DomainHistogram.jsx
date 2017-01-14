import React from 'react';
import { VictoryBar } from 'victory';
import Subheader from 'material-ui/Subheader';

import Carto from '../helpers/carto';


const DomainHistogram = React.createClass({

  propTypes: {
    sql: React.PropTypes.string,
    getColor: React.PropTypes.func,
  },

  getInitialState() {
    return ({
      data: null,
    });
  },

  componentDidMount() {
    this.fetchData(this.props.sql);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.sql !== this.props.sql) this.fetchData(nextProps.sql);
  },

  fetchData(sql) {
    const self = this;

    Carto.SQL(`SELECT count(*), domain FROM (${sql}) a WHERE domain IS NOT NULL GROUP BY domain ORDER BY domain ASC`, 'json')
      .then((data) => {
        self.setState({
          data,
        });
      })
      .catch()
  },

  render() {
    return (
      this.state.data && (
        <div>
          <Subheader>
            Facilities by Domain
          </Subheader>

          <VictoryBar
            data={this.state.data}
            x="domain"
            y="count"
            labels={d => d.count}
            style={{
              data: {
                fill: d => this.props.getColor(d.domain),
                width: 400 / this.state.data.length,
              },
              labels: { fontSize: 20 },
              parent: { border: '1px solid #ccc' },
            }}
          />


        </div>
      )
    );
  },
});

module.exports = DomainHistogram;
