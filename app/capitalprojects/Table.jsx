// Explorer.jsx - Top level Component for the Facilities Explorer
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FixedDataTable from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import Numeral from 'numeral';
import { Tabs, Tab } from 'material-ui/Tabs';
import 'fixed-data-table/dist/fixed-data-table.css';


import TableFilter from './TableFilter';
import { agencies } from './config';
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
    // const self = this;
    //
    // carto.SQL('SELECT magency, magencyacro, maprojid, description,citycost,noncitycost,totalcost, ST_GeometryType(the_geom) as geometry FROM cpdb_map_combined ORDER BY maprojid ASC', 'json')
    //   .then((data) => {
    //     self.data = data;
    //
    //     self.setState({
    //       filteredDataList: data,
    //     });
    //   });
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

  handleUpdateSql(sql) {
    console.log(sql);
    const self = this;
    carto.SQL(sql, 'json')
      .then((data) => {
        console.log(data);
        self.data = data;
        self.setState({
          filteredDataList: data,
        });
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
          <button type="button" className="btn btn-primary btn-xs details-button">
            <div className="fa fa-arrow-right" />
          </button>
        </Link>
      </Cell>
    );

    const AgencyCell = ({ rowIndex, data, col, ...props }) => {
      const filteredAgencies = agencies.filter(agency => agency.value === data[rowIndex][col]);

      return (
        <Cell {...props}>
          {filteredAgencies[0].label}
        </Cell>
      );
    };

    const { containerHeight, containerWidth } = this.props;

    const data = this.state.filteredDataList;

    return (
      <div className="full-screen projects-table">
        <div className="sidebar">
          <Tabs className="sidebar-tabs">
            <Tab label="Data">
              <TableFilter
                updateSql={this.handleUpdateSql}
                Sql={null}
              />
              <input
                className="form-control"
                onChange={this.onFilterChange}
                placeholder="Filter by Project ID or Description"
              />
            </Tab>
            <Tab label="Download">
              <div className="sidebar-tab-content padded">
              </div>
            </Tab>
            <Tab label="About">
              <div className="sidebar-tab-content padded">
                About
              </div>
            </Tab>
          </Tabs>
        </div>
        {data && (
          <Table
            rowHeight={50}
            rowsCount={data.length}
            headerHeight={50}
            width={containerWidth}
            height={containerHeight}
            {...this.props}
          >
            <Column
              header={<Cell>FMS ID</Cell>}
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
              header={<Cell>Agency</Cell>}
              cell={<AgencyCell data={data} col="magencyacro" />}
              width={250}
            />
            <Column
              header={<Cell>Spending</Cell>}
              cell={<MoneyCell data={data} col="totalspend" />}
              width={100}
            />
            <Column
              header={<Cell>Commitments</Cell>}
              cell={<MoneyCell data={data} col="totalcommit" />}
              width={100}
            />
            <Column
              cell={<DetailCell data={data} col="maprojid" />}
              width={50}
            />
          </Table>
        )}
      </div>
    );
  },
});

module.exports = Dimensions({
  getHeight() {
    return window.innerHeight - 50;
  },

  getWidth() {
    return window.innerWidth - 320;
  },
})(CPTable);
