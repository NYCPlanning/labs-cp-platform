import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MultiSelect extends React.Component {
  handleMultiSelectChange = (selectedOptions) => {
    const { options } = this.props;

    // reset checked status for all options, check those that were just passed in
    options.forEach((option) => { option.checked = false; });
    selectedOptions.forEach((option) => {
      option.checked = true;
    });

    this.props.onChange(options);
  }

  render() {
    const { options, placeholder, valueRenderer } = this.props;
    const checkedValues = options.filter(option => option.checked === true)
      .map(option => option.value);

    return (
      <Select
        multi
        value={checkedValues}
        placeholder={placeholder}
        name="form-field-name"
        options={options}
        onChange={this.handleMultiSelectChange}
        valueRenderer={valueRenderer}
      />
    );
  }
}

MultiSelect.defaultProps = {
  valueRenderer: null,
};

MultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  valueRenderer: PropTypes.func,
};

export default MultiSelect;
