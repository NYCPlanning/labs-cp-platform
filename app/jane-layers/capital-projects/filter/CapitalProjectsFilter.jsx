import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';

import * as capitalProjectsActions from '../../../actions/capitalProjects';
import CountWidget from '../../../common/CountWidget';
import InfoIcon from '../../../common/InfoIcon';
import RangeSlider from '../../../common/RangeSlider';
import RangeInputs from '../../../common/RangeInputs';
import MultiSelect from '../../../common/MultiSelect';
import AreaFilterSelect from '../../../common/AreaFilterSelect';
import RadiusFilter from '../../../common/RadiusFilter';

class Filter extends React.Component {
  updateFilterDimension = (dimension, values) => {
    this.props.setFilterDimension(dimension, values);
  };

  handleSliderChange = (dimension, data) => {
    this.updateFilterDimension(dimension, [data.from, data.to]);
  };

  resetFilter = () => {
    this.props.handleRadiusFilter(0);
    this.props.resetFilter();
  };

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      paddingTop: '0px',
      fontSize: '14px',
    };

    const {
      totalCount,
      selectedCount,
      filterDimensions,
    } = this.props;

    // Geographic filtering dimensions
    const {
      radiusfilter,
      commboard,
      borocode,
      nta,
      censtract,
      council,
      schooldistrict,
    } = filterDimensions;

    return (
      <div className="sidebar-tab-content">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'projects'}
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
              handleRadiusFilter={this.props.handleRadiusFilter}
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
                borocode,
                nta,
                censtract,
                council,
                schooldistrict,
              }}
              options={[
                { value: 'commboard', label: 'Community District' },
                { value: 'borocode', label: 'Borough' },
                { value: 'nta', label: 'Neighborhood Tabulation Area' },
                { value: 'council', label: 'City Council District' },
                { value: 'censtract', label: 'Census Tract' },
                { value: 'schooldistrict', label: 'School District' },
              ]}
            />
          </ListItem>

          <Subheader>
            Managing Agency
            <InfoIcon text="The City agency associated with the project in FMS" />
          </Subheader>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              multi
              placeholder="Select Agencies"
              name="form-field-name"
              displayValues
              options={filterDimensions.magencyacro.values}
              onChange={this.updateFilterDimension.bind(this, 'magencyacro')}
              valueRenderer={option => option.value}
            />
          </ListItem>

          <Subheader>
            Sponsor Agency
            <InfoIcon text="The City agency providing part or all of the funds for a project" />
          </Subheader>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              multi
              placeholder="Select Agencies"
              name="form-field-name"
              displayValues
              options={filterDimensions.sagencyacro.values}
              onChange={this.updateFilterDimension.bind(this, 'sagencyacro')}
              valueRenderer={option => option.value}
            />
          </ListItem>

          <Subheader>
            Project Type
            <InfoIcon text="The FMS Project Type" />
          </Subheader>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <MultiSelect
              multi
              placeholder="Select Project Types"
              name="form-field-name"
              options={filterDimensions.projecttype.values}
              onChange={this.updateFilterDimension.bind(this, 'projecttype')}
            />
          </ListItem>

          <Subheader>
            Planned Commitment
            <InfoIcon text="Sum of all commitments in the latest capital commitment plan" />
          </Subheader>

          <ListItem
            disabled
            style={{
              paddingTop: '0px',
              zIndex: 1,
            }}
          >
            <RangeInputs
              data={filterDimensions.totalcommit.values}
              onChange={this.handleSliderChange.bind(this, 'totalcommit')}
            />
          </ListItem>

          <Subheader>
            Active Years
            <InfoIcon text="Active period is the date of a project's earliest spending or commitment to the date of its latest spending or commitment " />
          </Subheader>
          <ListItem
            disabled
            style={{
              paddingTop: '0px',
              zIndex: '0',
            }}
          >
            <RangeSlider
              data={filterDimensions.activeyears.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'activeyears')}
              step={1}
              force_edges
              prettify_enabled={false}
              grid
            />
          </ListItem>
        </div>
      </div>
    );
  }
}

Filter.defaultProps = {
  totalCount: 0,
  selectedCount: 0,
};

Filter.propTypes = {
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,
  filterDimensions: PropTypes.object.isRequired,
  resetFilter: PropTypes.func.isRequired,
  setFilterDimension: PropTypes.func.isRequired,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleRadiusFilter: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  selectedPointType: '',
  selectedPointCoordinates: [],
};

export default connect(null, {
  resetFilter: capitalProjectsActions.resetFilter,
  setFilterDimension: capitalProjectsActions.setFilterDimension,
})(Filter);
