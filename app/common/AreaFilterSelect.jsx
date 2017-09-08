import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
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
        console.log(this.props.filterDimensions);

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

AreaFilterSelect.defaultProps = {
  options: [
    { value: 'borocode', label: 'Boroughs' },
    // { value: 'commboard', label: 'Community Districts' },
    // { value: 'taz', label: 'Traffic Analysis Zones' },
    // { value: 'censtract', label: 'Census Tract' },
    // { value: 'nta', label: 'Neighborhood Tabulation Area' },
    // { value: 'council', label: 'City Council Districts' },
    // { value: 'congdist', label: 'Congressional Districts' },
    // { value: 'firediv', label: 'Fire Divisions' },
    // { value: 'firebn', label: 'Fire Battalions' },
    // { value: 'fireconum', label: 'Fire Companies' },
    // { value: 'municourt', label: 'Municipal Court Districts' },
    // { value: 'policeprecinct', label: 'Police Precincts' },
    // { value: 'schooldistrict', label: 'School Districts' },
    // { value: 'stateassemblydistrict', label: 'State Assembly Districts' },
    // { value: 'statesenatedistrict', label: 'State Senate Districts' },
  ],
};

AreaFilterSelect.propTypes = {
  updateFilterDimension: PropTypes.func.isRequired,
  filterDimensions: PropTypes.object.isRequired,
  options: PropTypes.array,
};

export default AreaFilterSelect;
