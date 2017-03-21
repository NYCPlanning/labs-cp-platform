// Checkboxes.jsx - A checkbox multiselect component, built to mirror the same inputs
// and outputs as the react-select multiselect component

import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import _ from 'underscore';

import Checkbox from '../../common/Checkbox';

import './Checkboxes.scss';

const Checkboxes = React.createClass({

  propTypes: {
    value: PropTypes.array.isRequired, // array of objects for currently checked items
    options: PropTypes.array.isRequired, // array of objects for all possible items
    onChange: PropTypes.func.isRequired, // function to send an updated array of objects to when a checkbox is toggled
  },

  handleChange(option) {
    const { value, onChange } = this.props;

    // if checked, remove from values and call props.onChange
    // if not, add to values and call props.onChange
    const wasChecked = value.filter(d => d.value === option.value).length > 0;

    let newValue;
    if (wasChecked) {
      // remove
      newValue = _.reject(value, d => d.value === option.value);
    } else {
      // add
      value.push(option);
      newValue = value;
    }

    onChange(newValue);
  },

  render() {
    const { options, value } = this.props;

    const checkboxListItems = options.map((option) => {
      const isChecked = value.filter(d => d.value === option.value).length > 0;

      const checkbox = (
        <Checkbox
          value={option.value}
          checked={isChecked}
          onChange={this.handleChange.bind(this, option)}
        />
      );

      return (
        <ListItem
          primaryText={option.label}
          style={{
            padding: '4px 8px 4px 48px',
          }}
          key={option.value}
          leftCheckbox={checkbox}
        />
      );
    });

    return (
      <div className="checkboxes">
        <List>
          {checkboxListItems}
        </List>
      </div>
    );
  },
});

export default Checkboxes;
