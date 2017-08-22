import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import MultiSelect from './MultiSelect';

class AreaFilterSelect extends React.Component {
  constructor() {
    super();
    this.state = { selectedLayer: null };
  }

  options = [
    { value: 'commboard', label: 'Community Districts' },
    { value: 'borocode', label: 'Boroughs' },
  ]

  handleSelectChange = (selectedLayer) => {
    this.setState({ selectedLayer });
  }

  handleMultiSelectChange = (options) => {
    this.props.updateFilterDimension(this.state.selectedLayer.value, options);
  }

  render() {
    const polygonSelectorComponent = () => {
      if (this.state.selectedLayer !== null) {
        const placeholderName = `Select ${this.state.selectedLayer.label}`;

        return (
          <MultiSelect
            placeholder={placeholderName}
            displayValues
            valueRenderer={option => option.label}
            options={this.props.filterDimensions[this.state.selectedLayer.value].values}
            onChange={this.handleMultiSelectChange.bind(this)}
          />
        );
      }
      return null;
    };

    return (
      <div className="area-filter-select">
        <Select
          name="area-filter-select"
          placeholder="Filter by Area"
          value={this.state.selectedLayer}
          options={this.options}
          onChange={this.handleSelectChange}
        />
        { polygonSelectorComponent() }
      </div>
    );
  }
}

AreaFilterSelect.propTypes = {
  updateFilterDimension: PropTypes.func.isRequired,
  filterDimensions: PropTypes.object.isRequired,
};

export default AreaFilterSelect;
