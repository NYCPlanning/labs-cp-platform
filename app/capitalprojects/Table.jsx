// Explorer.jsx - Top level Component for the Facilities Explorer
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FixedDataTable from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import Numeral from 'numeral';

import 'fixed-data-table/dist/fixed-data-table.css';

import carto from '../helpers/carto';

import './Table.scss';

const { Table, Column, Cell } = FixedDataTable;

const CPTable = React.createClass({
  propTypes: {
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      data: null,
    };
  },

  componentDidMount() {
    const self = this;

    carto.SQL('SELECT magency, magencyacro, maprojid, description,citycost,noncitycost,totalcost, ST_GeometryType(the_geom) as geometry FROM cpdb_map_combined ORDER BY maprojid ASC', 'json')
      .then((data) => {
        self.data = data;

        self.setState({
          filteredDataList: data,
        });
      });
  },

  onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this.data,
      });
    }

    const filterBy = e.target.value.toLowerCase();
    const filteredDataList = [];

    for (let i = 0; i < this.data.length; i += 1) {
      const { maprojid, description } = this.data[i];
      if (
        maprojid.toLowerCase().indexOf(filterBy) !== -1 ||
        description.toLowerCase().indexOf(filterBy) !== -1
      ) {
        filteredDataList.push(this.data[i]);
      }
    }

    this.setState({
      filteredDataList,
    });
  },

  render() {
    const TextCell = ({ rowIndex, data, col, ...props }) => (
      <Cell {...props}>
        {data[rowIndex][col]}
      </Cell>
    );

    const MoneyCell = ({ rowIndex, data, col, ...props }) => (
      <Cell {...props}>
        {Numeral(data[rowIndex][col]).format('($ 0.00 a)')}
      </Cell>
    );

    const DetailCell = ({ rowIndex, data, col, ...props }) => (
      <Cell {...props}>
        <Link
          to={{
            pathname: `/capitalproject/${data[rowIndex][col]}`,
            state: { modal: true, returnTo: '/capitalprojects' },
          }}
        >
          <button type="button" className="btn btn-primary btn-xs details-button">Details</button>
        </Link>
      </Cell>
    );

    const GeometryCell = ({ rowIndex, data, col, ...props }) => {
      const hasGeom = (data[rowIndex][col] !== null) ?
        <div className="fa fa-map-marker" /> :
        <div className="fa fa-minus" />;

      return (
        <Cell {...props}>
          {hasGeom}
        </Cell>
      );
    };


    const { containerHeight, containerWidth } = this.props;

    const data = this.state.filteredDataList;

    return (
      <div className="full-screen projects-table">
        {data && (
          <div>
            <div className="row">
              <div className="col-md-3">
                <input
                  className="form-control"
                  onChange={this.onFilterChange}
                  placeholder="Filter by Project ID or Description"
                />
              </div>
              <div className="col-md-3 match">
                <span className="badge">{data.length}</span> Matching Projects
              </div>
            </div>
            <br />
            <Table
              rowHeight={50}
              rowsCount={data.length}
              headerHeight={50}
              width={containerWidth}
              height={containerHeight}
              {...this.props}
            >
              <Column
                header={<Cell>Managing Agency</Cell>}
                cell={<TextCell data={data} col="magency" />}
                width={80}
              />
              <Column
                header={<Cell>Acronym</Cell>}
                cell={<TextCell data={data} col="magencyacro" />}
                width={80}
              />
              <Column
                header={<Cell>MA Project ID</Cell>}
                cell={<TextCell data={data} col="maprojid" />}
                width={120}
              />
              <Column
                header={<Cell>Description</Cell>}
                cell={<TextCell data={data} col="description" />}
                flexGrow={2}
                width={300}
              />
              <Column
                header={<Cell>City Cost</Cell>}
                cell={<MoneyCell data={data} col="citycost" />}
                width={100}
              />
              <Column
                header={<Cell>Non-City Cost</Cell>}
                cell={<MoneyCell data={data} col="noncitycost" />}
                width={100}
              />
              <Column
                header={<Cell>Total Cost</Cell>}
                cell={<MoneyCell data={data} col="totalcost" />}
                width={100}
              />
              <Column
                header={<Cell>Geo</Cell>}
                cell={<GeometryCell data={data} col="geometry" />}
                width={50}
              />
              <Column
                header={<Cell>Details</Cell>}
                cell={<DetailCell data={data} col="maprojid" />}
                width={100}
              />
            </Table>
          </div>
        )}
      </div>
    );
  },
});

module.exports = Dimensions({
  getHeight() {
    return window.innerHeight - 140;
  },

  getWidth() {
    return window.innerWidth;
  },
})(CPTable);
