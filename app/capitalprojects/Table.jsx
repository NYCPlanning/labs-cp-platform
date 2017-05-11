/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
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
import DownloadTable from '../common/DownloadTable';
import SignupPrompt from '../common/SignupPrompt';

import './Table.scss';

const { Table, Column, Cell } = FixedDataTable;


const CPTable = createReactClass({ // eslint-disable-line
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

    CapitalProjectsTableStore.initialize();
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
            <Tab label="Download">
              <div className="sidebar-tab-content padded">
                <DownloadTable
                  sql={CapitalProjectsTableStore.sql}
                  commitmentsSql={CapitalProjectsTableStore.commitmentsSql}
                  filePrefix="projects"
                  commitmentsFilePrefix="commitments"
                />
                <SignupPrompt />
              </div>
            </Tab>
            <Tab label="About">
              <div className="sidebar-tab-content">
                <div className="scroll-container padded">
                  <h4>Product Overview</h4>
                  <p>
                    <b>The Capital Project Table</b> is a way to quickly and easily explore and learn about ongoing and planned capital projects within in the most recent Capital Commitment Plan published by OMB.  It’s main purpose is to be a starting point for exploring potential, planned, and ongoing capital projects to better understand and communicate New York City’s capital project portfolio within and across particular agencies.
                  </p>
                  <h4>Limitations and Disclaimers</h4>
                  <p>
                    <li>This is not a project management system, so data on project timeline or budget may be incorrect</li>
                    <li>All monies committed to or spent on a project may not be captured</li>
                    <li>Planned projects that may never come to fruition are captured</li>
                  </p>
                  <p>
                  As a result of these limitations and inconsistencies, the Capital Projects Map is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses, - it is built for planning coordination and information purposes only.  Please consult <a href="http://docs.capitalplanning.nyc/cpdb/" target="_blank" rel="noreferrer noopener">NYC Planning’s Capital Planning Docs</a> for more details about the limitations.
                  </p>
                  <h4>Feedback</h4>
                  <p>
                  We are constantly looking for ways to improve this product.  Please <a href="mailto:capital@planning.nyc.gov">share your feedback and suggestions</a> with Capital Planning.
                  </p>
                </div>
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
                  Man. Agency <InfoIcon text="The city agency managing the project." />
                </SortHeaderCell>
              }
              cell={<TextCell data={data} col="magencyacro" />}
              width={120}
            />
            <Column
              columnKey="sagencyacro"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.sagencyacro}
                >
                  Spon. Agency <InfoIcon text="The city agency funding the project." />
                </SortHeaderCell>
              }
              cell={<ArrayTextCell data={data} col="sagencyacro" />}
              width={130}
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
                  Spent to Date <InfoIcon text="Sum of spending for this capital project from Checkbook NYC data" />
                </SortHeaderCell>
              }
              cell={<MoneyCell data={data} col="totalspend" style={{ textAlign: 'right' }} />}
              width={130}
            />
            <Column
              columnKey="totalcommit"
              header={
                <SortHeaderCell
                  onSortChange={this.handleSortChange}
                  sortDir={colSortDirs.totalcommit}
                >
                  Planned Commitment <InfoIcon text="Sum of commitments in the latest capital commitment plan" />

                </SortHeaderCell>
              }
              cell={<MoneyCell data={data} col="totalcommit" style={{ textAlign: 'right' }} />}
              width={180}
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
