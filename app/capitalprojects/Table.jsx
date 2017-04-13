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
import CapitalProjectsTableActions from '../actions/CapitalProjectsTableActions';
import CapitalProjectsTableStore from '../stores/CapitalProjectsTableStore';
import SortHeaderCell from './SortHeaderCell';

import './Table.scss';

const { Table, Column, Cell } = FixedDataTable;


const CPTable = React.createClass({ // eslint-disable-line
  propTypes: {
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      data: null,
    };
  },

  componentWillMount() {
    CapitalProjectsTableStore.on('updatedTableData', () => {
      this.setState({
        data: CapitalProjectsTableStore.filteredSortedData,
        colSortDirs: CapitalProjectsTableStore.colSortDirs,
      });
    });
  },

  handleFilterBy(e) {  // onFilterChange, update the state to reflect the filter term, then execute this.filterAndSortData()
    let filterBy = null;
    if (e.target.value) {
      filterBy = e.target.value.toLowerCase();
    }

    CapitalProjectsTableActions.onFilterBy(filterBy);
  },

  handleSortChange(columnKey, sortDir) {
    CapitalProjectsTableActions.onSortChange(columnKey, sortDir);
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

    const { colSortDirs, data } = this.state;

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
                onFilterBy={this.handleFilterBy}
              />
            </Tab>
            <Tab label="About">
              <div className="sidebar-tab-content padded">
                <p>This table displays data from the Capital Commitment Plan PDFs published in October 2016, joined with Checkbook NYC data pulled in March of 2017.</p>
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
              columnKey="maprojid"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.maprojid}
                >
                  FMS ID
                </SortHeaderCell>
              }
              cell={<TextCell data={data} col="maprojid" />}
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
              cell={<TextCell data={data} col="description" />}
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
              cell={<TextCell data={data} col="magencyacro" />}
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
              cell={<ArrayTextCell data={data} col="projecttype" />}
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
              cell={<MoneyCell data={data} col="totalspend" />}
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
              cell={<MoneyCell data={data} col="totalcommit" />}
              width={130}
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
