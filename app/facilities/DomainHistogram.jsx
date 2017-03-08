import React from 'react';
import { VictoryBar } from 'victory';
import Subheader from 'material-ui/Subheader';

import Carto from '../helpers/carto';


const facdomainHistogram = React.createClass({

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

    Carto.SQL(`SELECT count(*), facdomain FROM (${sql}) a WHERE facdomain IS NOT NULL GROUP BY facdomain ORDER BY facdomain ASC`, 'json')
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
            Facilities by facdomain
          </Subheader>

          <VictoryBar
            data={this.state.data}
            x="facdomain"
            y="count"
            labels={d => d.count}
            style={{
              data: {
                fill: d => this.props.getColor(d.facdomain),
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

module.exports = facdomainHistogram;
