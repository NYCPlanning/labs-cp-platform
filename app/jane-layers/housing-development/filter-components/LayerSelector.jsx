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
    this.props.fetchTotalCount();
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
      admin_cd,
      admin_borocode,
      admin_nta,
      admin_censtract,
      admin_council,
      admin_policeprecinct,
      admin_schooldistrict,
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
                admin_cd,
                admin_borocode,
                admin_nta,
                admin_censtract,
                admin_council,
                admin_policeprecinct,
                admin_schooldistrict,
              }}
              options={[
                { value: 'admin_cd', label: 'Community District' },
                { value: 'admin_borocode', label: 'Borough' },
                { value: 'admin_nta', label: 'Neighborhood Tabulation Area' },
                { value: 'admin_council', label: 'City Council District' },
                { value: 'admin_censtract', label: 'Census Tract' },
                { value: 'admin_policeprecinct', label: 'Police Precinct' },
                { value: 'admin_schooldistrict', label: 'School District' },
              ]}
            />
          </ListItem>

          <Subheader>
            Development Status
            <InfoIcon text="Categorizes developments based on construction status, determined using DOB Permit and Certificate of Occupancy data" />
            <PinSelect
              onClick={() => { this.handleSymbologyDimensionChange('dcp_status'); }}
              selected={symbologyDimension === 'dcp_status'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.dcp_status}
              onChange={this.handleFilterDimensionChange.bind(this, 'dcp_status')}
              legendCircleType={symbologyDimension === 'dcp_status' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Permit Type
            <InfoIcon text="Categorizes developments based on the permit type, determined using DOB data" />
            <PinSelect
              onClick={() => { this.handleSymbologyDimensionChange('dcp_dev_category'); }}
              selected={symbologyDimension === 'dcp_dev_category'}
            />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.dcp_dev_category}
              onChange={this.handleFilterDimensionChange.bind(this, 'dcp_dev_category')}
              legendCircleType={symbologyDimension === 'dcp_dev_category' ? 'fill' : 'none'}
            />
          </ListItem>

          <Subheader>
            Development Type
            <InfoIcon text="Categorizes developments based on the construction and housing types, determined using DOB Permit data" />
          </Subheader>
          <ListItem
            disabled
            style={listItemStyle}
          >
            <Checkboxes
              dimension={filterDimensions.dcp_occ_category}
              onChange={this.handleFilterDimensionChange.bind(this, 'dcp_occ_category')}
              legendCircleType={'none'}
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
              data={filterDimensions.u_net.values}
              onChange={this.handleSliderChange.bind(this, 'u_net')}
            />
            <RangeSlider
              data={filterDimensions.u_net.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'u_net')}
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
              data={filterDimensions.c_date_earliest.values}
              type={'double'}
              onChange={this.handleSliderChange.bind(this, 'c_date_earliest')}
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

  // Set by mapStateToProps
  filterDimensions: PropTypes.object.isRequired,
  symbologyDimension: PropTypes.string.isRequired,
  issueDateFilterDisabled: PropTypes.bool.isRequired,
  completionDateFilterDisabled: PropTypes.bool.isRequired,
  sql: PropTypes.string.isRequired,

  // Functions set through Redux connect
  fetchTotalCount: PropTypes.func.isRequired,
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
  fetchTotalCount: housingDevelopmentActions.fetchTotalCount,
  fetchSelectedCount: housingDevelopmentActions.fetchSelectedCount,
  resetFilter: housingDevelopmentActions.resetFilter,
  setFilterDimension: housingDevelopmentActions.setFilterDimension,
  setSymbology: housingDevelopmentActions.setSymbology,
})(LayerSelector);
