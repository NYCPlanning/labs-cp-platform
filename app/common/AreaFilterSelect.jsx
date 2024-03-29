import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import MultiSelect from './MultiSelect';

class AreaFilterSelect extends React.Component {
  constructor() {
    super();
    this.state = { selectedLayer: null };
  }

  handleSelectChange = (selectedLayer) => {
    // Set all options of selectedLayer being navigated away from to false
    if (this.state.selectedLayer && selectedLayer !== this.state.selectedLayer) {
      const options = this.props.filterDimensions[this.state.selectedLayer.value].values;
      options.forEach((option) => { option.checked = false; });
      this.props.updateFilterDimension(this.state.selectedLayer.value, options);
    }

    this.setState({ selectedLayer });
  }

  handleMultiSelectChange = (options) => {
    this.props.updateFilterDimension(this.state.selectedLayer.value, options);
  }

  render() {
    const polygonSelectorComponent = () => {
      if (this.state.selectedLayer !== null) {
        const placeholderName = `Select ${this.state.selectedLayer.label}`;
        const sortedValues = this.props.filterDimensions[this.state.selectedLayer.value].values.sort((a,b) => {
          if(a.value > b.value) return 1
          if(a.value < b.value) return -1
          return
        })
        return (
          <MultiSelect
            placeholder={placeholderName}
            displayValues
            valueRenderer={option => option.label}
            options={sortedValues}
            onChange={this.handleMultiSelectChange.bind(this)}
          />
        );
      }
      return null;
    };

    const { exploreNeighborhoodSelected } = this.props;

    if (exploreNeighborhoodSelected) {
      this.state.selectedLayer = { value: 'nta2020', label: 'Neighborhood Tabulation Area' };

      return (
        <div className="area-filter-select">
          <Select
            name="area-filter-select"
            placeholder="Filter by Administrative Boundary"
            value={this.state.selectedLayer}
            options={this.props.options}
            onChange={this.handleSelectChange}
          />
          { polygonSelectorComponent() }
        </div>
      );
    } else {
      return (
        <div className="area-filter-select">
          <Select
            name="area-filter-select"
            placeholder="Filter by Administrative Boundary"
            value={this.state.selectedLayer}
            options={this.props.options}
            onChange={this.handleSelectChange}
          />
          { polygonSelectorComponent() }
        </div>
      );
    }
  }
}

AreaFilterSelect.defaultProps = {
  options: [
    { value: 'admin_borocode', label: 'Boroughs' },
  ],
};

AreaFilterSelect.propTypes = {
  updateFilterDimension: PropTypes.func.isRequired,
  filterDimensions: PropTypes.object.isRequired,
  options: PropTypes.array,
};

export default AreaFilterSelect;
