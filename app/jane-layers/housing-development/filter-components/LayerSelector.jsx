import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import CountWidget from '../../../common/CountWidget';
import Checkboxes from './Checkboxes';
import * as housingDevelopmentActions from '../../../actions/housingDevelopment';

import RangeSlider from '../../../common/RangeSlider';
import AreaFilterSelect from '../../../common/AreaFilterSelect';
import RadiusFilter from '../../../common/RadiusFilter';
import SimpleRangeInputs from '../../../common/SimpleRangeInputs';
import InfoIcon from '../../../common/InfoIcon';

import './LayerSelector.scss';

class LayerSelector extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedCount(this.props.filterDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sql !== nextProps.sql) {
      this.props.fetchSelectedCount(nextProps.filterDimensions);
    }
  }

  handleFilterDimensionChange = (dimension, values) => {
    this.props.setFilterDimension(dimension, values);
  };

  handleSymbologyDimensionChange = (symbologyDimension) => {
    this.props.setSymbology(symbologyDimension);
  };

  handleSliderChange = (dimension, data) => {
    this.props.setFilterDimension(dimension, [data.from, data.to]);
  };

  resetFilter = () => {
    this.props.handleRadiusFilter(0);
    this.props.resetFilter();
  };

  render() {
    // override material ui ListItem spacing
    const listItemStyle = {
      padding: '0px 16px',
      fontSize: '14px',
    };

    const {
      filterDimensions,
      totalCount,
      selectedCount,
      symbologyDimension,
      issueDateFilterDisabled,
      completionDateFilterDisabled,
    } = this.props;

    // Geographic filtering dimensions
    const {
      radiusfilter,
      geo_cd,
      geo_boro,
      geo_ntacode2010,
      geo_censustract2010,
      geo_council,
      geo_csd,
    } = filterDimensions;

    const PinSelect = (props) => {
      const style = {
        selected: {
          color: '#D96B27',
          paddingLeft: '5px',
        },
        unselected: {
          color: '#9C9C9C',
          paddingLeft: '5px',
        },
      };

      return (
        <div
          style={props.selected ? style.selected : style.unselected}
          className="fa fa-map-pin"
          onClick={props.onClick}
        />
      );
    };

    PinSelect.propTypes = {
      selected: PropTypes.bool,
      onClick: PropTypes.func,
    };

    return (
      <div className="sidebar-tab-content pipeline-layer-selector">
        <CountWidget
          totalCount={totalCount}
          selectedCount={selectedCount}
          units={'records'}
          resetFilter={this.resetFilter}
        />
        <div
          className="scroll-container count-widget-offset"
          style={{ paddingTop: '15px' }}
        >
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RadiusFilter
              selectedPointCoordinates={this.props.selectedPointCoordinates}
              selectedPointType={this.props.selectedPointType}
              updateFilterDimension={this.handleFilterDimensionChange.bind(this, 'radiusfilter')}
              handleRadiusFilter={this.props.handleRadiusFilter}
              filterDimensions={{ radiusfilter }}
            />
          </ListItem>

          <ListItem
            disabled
            style={listItemStyle}
          >
            <AreaFilterSelect
              updateFilterDimension={this.handleFilterDimensionChange}
              filterDimensions={{
                geo_cd,
                geo_boro,
                geo_ntacode2010,
                geo_censustract2010,
                geo_council,
                geo_csd,
              }}
              options={[
                { value: 'geo_cd', label: 'Community District' },
                { value: 'geo_boro', label: 'Borough' },
                { value: 'geo_ntacode2010', label: 'Neighborhood Tabulation Area' },
                { value: 'geo_censustract2010', label: 'Census Tract' },
                { value: 'geo_council', label: 'City Council District' },
                { value: 'geo_csd', label: 'School District' },
              ]}
            />
          </ListItem>

          <Subheader>
            Development Status
            <InfoIcon text="Categorizes developments based on construction status, determined using DOB Permit and Certificate of Occupancy data" />
            <PinSelect
              onClick={() => { this.handleSymbologyDimensionChange('status'); }}
              selected={symbologyDimension === 'status'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.status}
              onChange={this.handleFilterDimensionChange.bind(this, 'status')}
              legendCircleType={symbologyDimension === 'status' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Permit Type
            <InfoIcon text="Categorizes developments based on the permit type, determined using DOB data" />
            <PinSelect
              onClick={() => { this.handleSymbologyDimensionChange('job_type'); }}
              selected={symbologyDimension === 'job_type'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.job_type}
              onChange={this.handleFilterDimensionChange.bind(this, 'job_type')}
              legendCircleType={symbologyDimension === 'job_type' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Total New Units
            <InfoIcon text="Net change in units resulting from development. Negative values occur from demolitions and/or alterations that reduce the number of units." />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <SimpleRangeInputs
              data={filterDimensions.units_net.values}
              onChange={this.handleSliderChange.bind(this, 'units_net')}
            />
            <RangeSlider
              data={filterDimensions.units_net.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'units_net')}
              grid
              keyboard
              force_edges
            />
          </ListItem>

          <Subheader>
            Permit Issued
            <InfoIcon text="Reflects date(s) when permits were issued by DOB" />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RangeSlider
              data={filterDimensions.status_q.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'status_q')}
              disable={issueDateFilterDisabled}
              prettify={date => moment(date, 'X').format('MMM YYYY')} // eslint-disable-line no-undef
              force_edges
            />
          </ListItem>

          <Subheader>
            Completion Date
            <InfoIcon text="Reflects date(s) when developments have received Certificate(s) of Occupancy (CofO). If a development has received multiple CofOs, filter evalutes timeframe between earliest CofO (since 2010) and most recent CofO." />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <RangeSlider
              data={filterDimensions.co_earliest_effectivedate.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'co_earliest_effectivedate')}
              disable={completionDateFilterDisabled}
              prettify={date => moment(date, 'X').format('MMM YYYY')} // eslint-disable-line no-undef
              force_edges
            />
          </ListItem>
        </div>
      </div>
    );
  }
}

LayerSelector.propTypes = {
  // Set by defaults
  totalCount: PropTypes.number,
  selectedCount: PropTypes.number,
  selectedPointType: PropTypes.string,
  selectedPointCoordinates: PropTypes.array,
  handleRadiusFilter: PropTypes.func.isRequired,

  // Set by mapStateToProps
  filterDimensions: PropTypes.object.isRequired,
  symbologyDimension: PropTypes.string.isRequired,
  issueDateFilterDisabled: PropTypes.bool.isRequired,
  completionDateFilterDisabled: PropTypes.bool.isRequired,
  sql: PropTypes.string.isRequired,

  // Functions set through Redux connect
  fetchSelectedCount: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  setFilterDimension: PropTypes.func.isRequired,
  setSymbology: PropTypes.func.isRequired,
};

LayerSelector.defaultProps = {
  totalCount: 0,
  selectedCount: 0,
  selectedPointType: null,
  selectedPointCoordinates: [],
};

const mapStateToProps = ({ housingDevelopment }) => ({
  filterDimensions: housingDevelopment.filterDimensions,
  symbologyDimension: housingDevelopment.symbologyDimension,
  issueDateFilterDisabled: housingDevelopment.issueDateFilterDisabled,
  completionDateFilterDisabled: housingDevelopment.completionDateFilterDisabled,
  sql: housingDevelopment.sql,

  totalCount: housingDevelopment.totalCount,
  selectedCount: housingDevelopment.selectedCount,
});

export default connect(mapStateToProps, {
  fetchSelectedCount: housingDevelopmentActions.fetchSelectedCount,
  resetFilter: housingDevelopmentActions.resetFilter,
  setFilterDimension: housingDevelopmentActions.setFilterDimension,
  setSymbology: housingDevelopmentActions.setSymbology,
})(LayerSelector);
