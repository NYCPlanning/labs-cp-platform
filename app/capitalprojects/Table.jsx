/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FixedDataTable from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import Numeral from 'numeral';
import { Tabs, Tab } from 'material-ui/Tabs';
import 'fixed-data-table/dist/fixed-data-table.css';
import _ from 'lodash';

import InfoIcon from '../common/InfoIcon';
import TableFilter from './TableFilter';
import { agencies } from './config';
import * as capitalProjectsTableActions from '../actions/capitalProjectsTable';
import SortHeaderCell from './SortHeaderCell';
import DownloadTable from '../common/DownloadTable';
import SignupPrompt from '../common/SignupPrompt';
import ga from '../helpers/ga';

import './Table.scss';

const { Table, Column, Cell } = FixedDataTable;


class CPTable extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      filteredSortedData: filterAndSortData(
        props.capitalProjectDetails,
        props.filterBy,
        props.colSortDirs,
      )
    };
  }

  componentDidMount() {
    this.props.fetchTotalCount();
    this.props.fetchSelectedCount(this.props.filterDimensions);
    this.props.fetchDetails(this.props.filterDimensions);
    this.props.resetFilter();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      this.props.fetchDetails(nextProps.filterDimensions);
      this.props.fetchSelectedCount(nextProps.filterDimensions);
    }

    if (!_.isEqual(this.props.filterBy, nextProps.filterBy) ||
        !_.isEqual(this.props.colSortDirs, nextProps.colSortDirs) ||
        this.props.capitalProjectDetails.length !== nextProps.capitalProjectDetails.length) {
      this.setState({
        filteredSortedData: filterAndSortData(
          nextProps.capitalProjectDetails,
          nextProps.filterBy,
          nextProps.colSortDirs,
        ),
      });
    }
  }

  handleDownload = (label) => {
    ga.event({
      category: 'capitalprojects-table',
      action: 'download',
      label,
    });
  };

  handleFilterBy = (e) => {  // onFilterChange, update the state to reflect the filter term, then execute this.filterAndSortData()
    const filterBy = e.target.value
      ? e.target.value.toLowerCase()
      : null;

    this.props.setFilterBy(filterBy);
  };

  handleSortChange = (columnKey, sortDir) => {
    this.props.setSort(columnKey, sortDir);
  };

  linkToProject = rowData => content => (
    <Link
      to={{
        pathname: `/capitalproject/${rowData.maprojid}`,
        state: { modal: true, returnTo: '/capitalprojects' },
      }}
    >
      { content }
    </Link>
  );

  render() {
    const TextCell = ({ rowIndex, data, col, ...props }) => this.linkToProject(data[rowIndex])(
      <Cell {...props}>
        {data[rowIndex][col]}
      </Cell>,
    );

    const ArrayTextCell = ({ rowIndex, data, col, ...props }) => this.linkToProject(data[rowIndex])(
      <Cell {...props}>
        {data[rowIndex][col].join(', ')}
      </Cell>,
    );

    const MoneyCell = ({ rowIndex, data, col, ...props }) => this.linkToProject(data[rowIndex])(
      <Cell {...props}>
        {Numeral(data[rowIndex][col]).format('($ 0.00 a)')}
      </Cell>,
    );

    const { colSortDirs, containerHeight, containerWidth } = this.props;
    const { filteredSortedData } = this.state;

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
                  sql={this.props.sql}
                  commitmentsSql={this.props.commitmentsSql}
                  filePrefix="projects"
                  commitmentsFilePrefix="commitments"
                  onDownload={this.handleDownload}
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
        {filteredSortedData && (
          <Table
            rowHeight={50}
            rowsCount={filteredSortedData.length}
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
              cell={<TextCell data={filteredSortedData} col="maprojid" />}
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
              cell={<TextCell data={filteredSortedData} col="description" />}
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
              cell={<TextCell data={filteredSortedData} col="magencyacro" />}
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
              cell={<ArrayTextCell data={filteredSortedData} col="sagencyacro" />}
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
              cell={<ArrayTextCell data={filteredSortedData} col="projecttype" />}
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
              cell={<MoneyCell data={filteredSortedData} col="totalspend" style={{ textAlign: 'right' }} />}
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
              cell={<MoneyCell data={filteredSortedData} col="totalcommit" style={{ textAlign: 'right' }} />}
              width={180}
            />
          </Table>
        )}
      </div>
    );
  }
}

CPTable.propTypes = {
  containerHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  resetFilter: PropTypes.func.isRequired,
  filterDimensions: PropTypes.object,
  colSortDirs: PropTypes.object,
  sql: PropTypes.string,
  commitmentsSql: PropTypes.string,
  setFilterBy: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  filterBy: PropTypes.string,
  capitalProjectDetails: PropTypes.array,
  fetchTotalCount: PropTypes.func.isRequired,
  fetchSelectedCount: PropTypes.func.isRequired,
};

const filterAndSortData = (data, filterBy, colSortDirs) => {
  const filteredSortedData = [];

  // filter
  if (filterBy) {
    for (let i = 0; i < data.length; i += 1) {
      const { maprojid, description } = data[i];
      if (
        maprojid.toLowerCase().indexOf(filterBy) !== -1 ||
        description.toLowerCase().indexOf(filterBy) !== -1
      ) {
        filteredSortedData.push(data[i]);
      }
    }
  } else {
    for (let i = 0; i < data.length; i += 1) {
      filteredSortedData.push(data[i]);
    }
  }

  // sort
  const columnKey = Object.keys(colSortDirs)[0];
  const sortDir = colSortDirs[columnKey];

  filteredSortedData.sort((a, b) => {
    let sortVal = 0;
    if (a[columnKey] > b[columnKey]) sortVal = 1;
    if (a[columnKey] < b[columnKey]) sortVal = -1;

    if (sortVal !== 0 && sortDir === 'ASC') {
      sortVal *= -1;
    }

    return sortVal;
  });

  return filteredSortedData;
};

const mapStateToProps = ({ capitalProjectsTable }) => ({
  filterDimensions: capitalProjectsTable.filterDimensions,
  sql: capitalProjectsTable.sql,
  commitmentsSql: capitalProjectsTable.commitmentsSql,
  colSortDirs: capitalProjectsTable.colSortDirs,
  filterBy: capitalProjectsTable.filterBy,
  capitalProjectDetails: capitalProjectsTable.capitalProjectDetails,
});

const ConnectedTable = connect(mapStateToProps, {
  fetchDetails: capitalProjectsTableActions.fetchDetails,
  resetFilter: capitalProjectsTableActions.resetFilter,
  setFilterBy: capitalProjectsTableActions.setTableFilterBy,
  setSort: capitalProjectsTableActions.setTableSort,
  fetchTotalCount: capitalProjectsTableActions.fetchTotalCount,
  fetchSelectedCount: capitalProjectsTableActions.fetchSelectedCount,
})(CPTable);

export default Dimensions({
  getHeight() {
    return window.innerHeight - 50;
  },

  getWidth() {
    return window.innerWidth - 320;
  },
})(ConnectedTable);
