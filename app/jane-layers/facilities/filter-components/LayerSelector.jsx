// LayerSelector.jsx - This component builds the layer selector which is used in the facilities JaneLayer
/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import _ from 'lodash';

import NestedSelect from './NestedSelect';
import CountWidget from '../../../common/CountWidget';
import InfoIcon from '../../../common/InfoIcon';
import MultiSelect from '../../../common/MultiSelect';
import AreaFilterSelect from '../../../common/AreaFilterSelect';
import RadiusFilter from '../../../common/RadiusFilter';
import Checkbox from '../../../common/Checkbox';
import * as facilityCPActions from '../../../actions/facilitiesCP';

import './LayerSelector.scss';

// iterates over all facsubgrp options, sets check/indeterminate status of parents
// updates this.checkStatus (used to know whether all, none, or some are currently selected)
function processChecked(layers) {
  let allChecked = 0;
  let allIndeterminate = 0;
  // set indeterminate states, start from the bottom and work up
  layers.forEach((facdomain) => {
    let facdomainChecked = 0;
    let facdomainIndeterminate = 0;

    facdomain.children.forEach((group) => {
      let groupChecked = 0;

      group.children.forEach((subgroup) => {
        if (subgroup.checked) groupChecked += 1;
      });

      group.checked = (groupChecked === group.children.length);
      group.indeterminate = (groupChecked < group.children.length) && groupChecked > 0;

      if (group.checked) facdomainChecked += 1;
      if (group.indeterminate) facdomainIndeterminate += 1;
    });

    facdomain.checked = (facdomainChecked === facdomain.children.length);
    if (facdomain.checked) allChecked += 1;

    facdomain.indeterminate = (facdomainIndeterminate > 0) || ((facdomainChecked < facdomain.children.length) && facdomainChecked > 0);
    if (facdomain.indeterminate) allIndeterminate += 1;
  });

  let checkStatus;
  // figure out whether all, none, or some are checked
  if (allChecked === layers.length) {
    checkStatus = 'all';
  } else if (allChecked === 0 && allIndeterminate === 0) {
    checkStatus = 'none';
  } else {
    checkStatus = null;
  }

  return { layers, checkStatus };
}

class LayerSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: null };
  }

  componentDidMount() {
    const {
      filterDimensions,
      setFilters,
      fetchTotalFacilitiesCount,
      fetchSelectedFacilitiesCount,
    } = this.props;

    fetchTotalFacilitiesCount();

    setFilters(filterDimensions);
    fetchSelectedFacilitiesCount(filterDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      this.props.fetchSelectedFacilitiesCount(nextProps.filterDimensions);
    }
  }

  componentDidUpdate() {
    if (this.state.expanded === true || this.state.expanded === false) this.setState({ expanded: null }); // eslint-disable-line react/no-did-update-set-state
  }

  updateFilterDimension = (dimension, values) => {
    this.props.setFilterDimension(dimension, values);
  };

  handleToggleAll = (checkStatus) => {
    const filterDimensions = _.cloneDeep(this.props.filterDimensions);
    const allChecked = checkStatus === 'all';

    filterDimensions.facsubgrp.values.forEach(facdomain =>
      facdomain.children.forEach(group =>
        group.children.forEach(subgroup =>
          subgroup.checked = !allChecked)));

    this.props.setFilters(filterDimensions);
  };

  expandAll = () => {
    this.setState({ expanded: true });
  };

  collapseAll = () => {
    this.setState({ expanded: false });
  };

  handleLayerUpdate = (layers) => {
    this.updateFilterDimension('facsubgrp', layers);
  };

  resetFilter = () => {
    this.props.resetFilter();
  };

  render() {
    const { totalCount, selectedCount, filterDimensions } = this.props;
    const {
      overabbrev,
      optype,
      proptype,
      facsubgrp,
      radiusfilter,
      commboard,
      nta,
      admin_borocode,
      admin_censtract,
      admin_council,
      admin_policeprecinct,
      admin_schooldistrict,
    } = filterDimensions;

    // override material ui ListItem spacing and react-select component font size
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    const { layers, checkStatus } = processChecked(facsubgrp.values);

    return (
      <div className="sidebar-tab-content facilities-filter">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'records'}
          resetFilter={this.resetFilter}
        />
        <div className="scroll-container count-widget-offset" style={{ paddingTop: '15px' }}>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RadiusFilter
              selectedPointCoordinates={this.props.selectedPointCoordinates}
              selectedPointType={this.props.selectedPointType}
              updateFilterDimension={this.updateFilterDimension.bind(this, 'radiusfilter')}
              filterDimensions={{ radiusfilter }}
            />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <AreaFilterSelect
              updateFilterDimension={this.updateFilterDimension}
              filterDimensions={{
                commboard,
                nta,
                admin_borocode,
                admin_censtract,
                admin_council,
                admin_policeprecinct,
                admin_schooldistrict,
              }}
              options={[
                { value: 'commboard', label: 'Community District' },
                { value: 'admin_borocode', label: 'Borough' },
                { value: 'nta', label: 'Neighborhood Tabulation Area' },
                { value: 'admin_council', label: 'City Council District' },
                { value: 'admin_censtract', label: 'Census Tract' },
                { value: 'admin_policeprecinct', label: 'Police Precinct' },
                { value: 'admin_schooldistrict', label: 'School District' },
              ]}
            />
          </ListItem>

          <Subheader>
            Operators, Oversight, and Property Types
          </Subheader>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Oversight Agencies"
              name="form-field-name"
              displayValues
              options={overabbrev.values}
              onChange={this.updateFilterDimension.bind(this, 'overabbrev')}
              valueRenderer={option => option.value}
            />
            <InfoIcon text="The agency that funds or oversees this facility" />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Operator Types"
              options={optype.values}
              onChange={this.updateFilterDimension.bind(this, 'optype')}
            />
            <InfoIcon text="The type of entity operating the facility" />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              placeholder="Property Types"
              name="form-field-name"
              options={proptype.values}
              onChange={this.updateFilterDimension.bind(this, 'proptype')}
            />
            <InfoIcon text="Indicates whether the City owns or directly leases the property. This property type data is sourced from the Department of Citywide Administrative Services." />
          </ListItem>

          <Subheader>
            Facility Category
            <a href="https://nycplanning.github.io/cpdocs/facdb/" target="_blank" rel="noreferrer noopener"><InfoIcon text="Learn more about facility types" /></a>
          </Subheader>

          <div className="toggle-expand">
            <Checkbox
              value={'allChecked'}
              checked={checkStatus === 'all'}
              indeterminate={checkStatus !== 'all' && checkStatus !== 'none'}
              onChange={() => { this.handleToggleAll(checkStatus); }}
            />
            All
            <div className="expand-collapse">
              <span onClick={this.expandAll}>Expand</span> | <span onClick={this.collapseAll}>Collapse</span>
            </div>
          </div>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <NestedSelect
              layers={layers}
              onUpdate={this.handleLayerUpdate}
              initiallyOpen={false}
              expanded={this.state.expanded}
            />
          </ListItem>
        </div>
      </div>
    );
  }
}

LayerSelector.defaultProps = {
  filterDimensions: {},
  totalCount: 0,
  selectedCount: 0,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

LayerSelector.propTypes = {
  sql: PropTypes.string.isRequired,
  filterDimensions: PropTypes.object,
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,
  setFilters: PropTypes.func.isRequired,
  fetchTotalFacilitiesCount: PropTypes.func.isRequired,
  fetchSelectedFacilitiesCount: PropTypes.func.isRequired,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  setFilterDimension: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ facilitiesCP }) => ({
  filterDimensions: facilitiesCP.filterDimensions,
  sql: facilitiesCP.sql,
  totalCount: facilitiesCP.totalCount,
  selectedCount: facilitiesCP.selectedCount,
});

export default connect(mapStateToProps, {
  fetchTotalFacilitiesCount: facilityCPActions.fetchTotalCount,
  fetchSelectedFacilitiesCount: facilityCPActions.fetchSelectedCount,
  setFilters: facilityCPActions.setFilters,
  resetFilter: facilityCPActions.resetFilter,
  setFilterDimension: facilityCPActions.setFilterDimension,
})(LayerSelector);
