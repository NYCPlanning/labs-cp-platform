import React from 'react';

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
  value: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  indeterminate: React.PropTypes.bool,
};

Checkbox.defaultProps = {
  indeterminate: null,
};

export default Checkbox;