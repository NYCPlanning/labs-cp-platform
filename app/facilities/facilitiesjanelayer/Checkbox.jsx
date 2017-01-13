import React from 'react';
import ReactDOM from 'react-dom';

const Checkbox = props => (
  <input
    type="checkbox"
    value={props.value}
    checked={props.checked}
    onChange={props.onChange}
    ref={
      (input) => {
        if (input != null) {
          ReactDOM.findDOMNode(input).indeterminate = self.props.indeterminate;
        }
      }
    }
  />
);

Checkbox.propTypes = {
  value: React.PropTypes.string,
  checked: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default Checkbox;
