import React from 'react';

const Checkbox = props => (
  <input
    type="checkbox"
    value={props.value}
    checked={props.checked}
    onChange={props.onChange}
    ref={elem => elem && (elem.indeterminate = props.indeterminate)}
  />
);

Checkbox.propTypes = {
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  indeterminate: React.PropTypes.bool,
};

export default Checkbox;
