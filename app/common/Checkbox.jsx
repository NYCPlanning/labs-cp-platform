import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => (
  <div className="checkbox-container">
    <input
      id={props.value}
      type="checkbox"
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
      ref={elem => elem && (elem.indeterminate = props.indeterminate)}
    />
    <label
      htmlFor={props.value}
    />
  </div>
);

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
};

Checkbox.defaultProps = {
  indeterminate: null,
};

export default Checkbox;
