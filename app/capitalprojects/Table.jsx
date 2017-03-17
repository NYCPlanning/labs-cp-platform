// Explorer.jsx - Top level Component for the Facilities Explorer
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FixedDataTable from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import Numeral from 'numeral';
import { Tabs, Tab } from 'material-ui/Tabs';
import 'fixed-data-table/dist/fixed-data-table.css';

import InfoIcon from '../common/InfoIcon';
import TableFilter from './TableFilter';
import { agencies } from './config';
import carto from '../helpers/carto';
import './Table.scss';

const { Table, Column, Cell } = FixedDataTable;

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
  }

  onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC,
      );
    }
  }

  render() {
    const { sortDir, children, ...props } = this.props; // eslint-disable-line
    let sortArrow;
    if (sortDir) {
      sortArrow = (sortDir === SortTypes.DESC) ?
        <span className="fa fa-arrow-down header-fa" /> :
        <span className="fa fa-arrow-up header-fa" />;
    } else {
      sortArrow = '';
    }

    return (
      <Cell {...props}>
        <a onClick={this.onSortChange}>
          {children}
          {sortArrow}
        </a>
      </Cell>
    );
  }
}

SortHeaderCell.propTypes = {
  sortDir: PropTypes.string, // eslint-disable-line
  onSortChange: PropTypes.func.isRequired,
  columnKey: PropTypes.string, // eslint-disable-line
};


const CPTable = React.createClass({ // eslint-disable-line
  propTypes: {
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      data: null,
      colSortDirs: {
        maprojid: 'DESC',
      },
    };
  },

  handleFilterChange(e) {  // onFilterChange, update the state to reflect the filter term, then execute this.filterAndSortData()
    let filterBy = null;
    if (e.target.value) {
      filterBy = e.target.value.toLowerCase();
    }

    this.setState({ filterBy }, this.filterAndSortData);
  },

  handleSortChange(columnKey, sortDir) {
    this.setState({
      colSortDirs: {
        [columnKey]: sortDir,
      },
    }, this.filterAndSortData);
  },

  filterAndSortData() {
    const filteredDataList = [];

    const { filterBy } = this.state;


    // filter
    if (filterBy) {
      for (let i = 0; i < this.data.length; i += 1) {
        const { maprojid, description } = this.data[i];
        if (
          maprojid.toLowerCase().indexOf(filterBy) !== -1 ||
          description.toLowerCase().indexOf(filterBy) !== -1
        ) {
          filteredDataList.push(this.data[i]);
        }
      }
    } else {
      for (let i = 0; i < this.data.length; i += 1) {
        filteredDataList.push(this.data[i]);
      }
    }


    // sort
    const columnKey = Object.keys(this.state.colSortDirs)[0];
    const sortDir = this.state.colSortDirs[columnKey];

    filteredDataList.sort((a, b) => {
      let sortVal = 0;
      if (a[columnKey] > b[columnKey]) sortVal = 1;
      if (a[columnKey] < b[columnKey]) sortVal = -1;

      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal *= -1;
      }

      return sortVal;
    });


    this.setState({ filteredDataList });
  },

  handleUpdateSql(sql) {
    const self = this;
    carto.SQL(sql, 'json')
      .then((data) => {
        self.data = data;
        self.setState({
          filteredDataList: data,
        }, self.filterAndSortData);
      });
  },

  render() {
    const TextCell = ({ rowIndex, data, col, ...props }) => (
      <Cell {...props}>
        {data[rowIndex][col]}
      </Cell>
    );

    const ArrayTextCell = ({ rowIndex, data, col, ...props }) => (
      <Cell {...props}>
        {data[rowIndex][col].join(', ')}
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

    const AgencyCell = ({ rowIndex, data, col, ...props }) => { // eslint-disable-line
      const filteredAgencies = agencies.filter(agency => agency.value === data[rowIndex][col]);

      return (
        <Cell {...props}>
          {filteredAgencies.length > 0 ? filteredAgencies[0].label : 'Not Found'}
        </Cell>
      );
    };

    const { containerHeight, containerWidth } = this.props;

    const { colSortDirs, filteredDataList } = this.state;


    const selectedCount = filteredDataList ? filteredDataList.length : 0;

    const tabTemplateStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
    };

    return (
      <div className="full-screen projects-table">
        <div className="sidebar">
          <Tabs
            className="sidebar-tabs"
            tabTemplateStyle={tabTemplateStyle}
          >
            <Tab label="Data">
              <TableFilter
                onUpdateSql={this.handleUpdateSql}
                onFilterChange={this.handleFilterChange}
                selectedCount={selectedCount}
              />

            </Tab>
            <Tab label="About">
              <div className="sidebar-tab-content padded">
                <p>This table displays data from the Capital Commitment Plan PDFs published in October 2016, joined with Checkbook NYC data pulled in March of 2017.</p>
              </div>
            </Tab>
          </Tabs>
        </div>
        {filteredDataList && (
          <Table
            rowHeight={50}
            rowsCount={filteredDataList.length}
            headerHeight={50}
            width={containerWidth}
            height={containerHeight}
            {...this.props}
          >
            <Column
              columnKey="maprojid"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.maprojid}
                >
                  FMS ID
                </SortHeaderCell>
              }
              cell={<TextCell data={filteredDataList} col="maprojid" />}
              width={120}
            />
            <Column
              columnKey="description"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.description}
                >
                  Description
                </SortHeaderCell>
              }
              cell={<TextCell data={filteredDataList} col="description" />}
              flexGrow={2}
              width={300}
            />
            <Column
              columnKey="magencyacro"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.magencyacro}
                >
                  Man. Agency <InfoIcon text="The city agency associated with the project in FMS" />
                </SortHeaderCell>
              }
              cell={<TextCell data={filteredDataList} col="magencyacro" />}
              width={120}
            />
            <Column
              columnKey="projecttype"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.projecttype}
                >
                  Project Type <InfoIcon text="Project Types associated with the project in FMS" />
                </SortHeaderCell>
              }
              cell={<ArrayTextCell data={filteredDataList} col="projecttype" />}
              width={200}
            />
            <Column
              columnKey="totalspend"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.totalspend}
                >
                  Spent <InfoIcon text="Sum of spending for this capital project from Checkbook NYC data" />
                </SortHeaderCell>
              }
              cell={<MoneyCell data={filteredDataList} col="totalspend" />}
              width={100}
            />
            <Column
              columnKey="totalcommit"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.totalcommit}
                >
                  Committed <InfoIcon text="Sum of commitments in the latest capital commitment plan" />

                </SortHeaderCell>
              }
              cell={<MoneyCell data={filteredDataList} col="totalcommit" />}
              width={130}
            />
            <Column
              cell={<DetailCell data={filteredDataList} col="maprojid" />}
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
