// Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react';

import FixedDataTable from 'fixed-data-table';

import carto from '../helpers/carto';

const { Table, Column, Cell } = FixedDataTable;

const CPTable = React.createClass({

  getInitialState() {
    return {
      data: null,
    };
  },

  componentDidMount() {
    const self = this;

    carto.SQL('SELECT * FROM projects', 'json')
      .then((data) => {
        self.setState({
          data,
        });
      });
  },

  render() {
    const TextCell = ({ rowIndex, data, col, ...props }) => (
      <Cell {...props}>
        {data[rowIndex][col]}
      </Cell>
    );

    return (
      <div className="full-screen">
        {this.state.data && (
          <Table
            rowHeight={50}
            rowsCount={this.state.data.length}
            headerHeight={50}
            width={1000}
            height={500}
            {...this.props}
          >
            <Column
              header={<Cell>MA Project ID</Cell>}
              cell={<TextCell data={this.state.data} col="maprojid" />}
              width={100}
            />
          </Table>
      )}
      </div>
    );
  },
});

module.exports = CPTable;
