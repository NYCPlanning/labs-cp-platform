// Checkboxes.jsx - A checkbox multiselect component, built to mirror the same inputs
// and outputs as the react-select multiselect component


import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import _ from 'underscore';

import Checkbox from '../../common/Checkbox';

import './Checkboxes.scss';

const LegendCircle = (props) => {
  const { color, type } = props;

  const style = {
    fill: {
      height: '12px',
      width: '12px',
      background: color,
      display: 'inline-block',
      borderRadius: '6px',
      marginLeft: '6px',
    },
    stroke: {
      height: '13px',
      width: '13px',
      background: 'transparent',
      display: 'inline-block',
      borderRadius: '7px',
      border: `2px solid ${color}`,
      marginLeft: '7px',
    },
  };

  return (
    <div className="legend-circle" style={style[type]}>&zwnj;</div>
  );
};

LegendCircle.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const Checkboxes = React.createClass({

  propTypes: {
    value: PropTypes.array.isRequired, // array of objects for currently checked items
    options: PropTypes.array.isRequired, // array of objects for all possible items
    onChange: PropTypes.func.isRequired, // function to send an updated array of objects to when a checkbox is toggled
    legendCircleType: PropTypes.string.isRequired, // string indicating the type of legendCircle
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
    const { options, value, legendCircleType } = this.props;

    const checkboxListItems = options.map((option) => {
      const isChecked = value.filter(d => d.value === option.value).length > 0;

      const checkbox = (
        <Checkbox
          value={option.value}
          checked={isChecked}
          onChange={this.handleChange.bind(this, option)}
        />
      );

      const label = (
        <div>
          {option.label} {legendCircleType !== 'none' ? <LegendCircle color={option.color} type={legendCircleType} /> : null}
        </div>
      );

      return (
        <ListItem
          primaryText={label}
          style={{
            padding: '4px 8px 4px 48px',
            margin: 0,
          }}
          key={option.value}
          leftCheckbox={checkbox}
        />
      );
    });

    return (
      <div className="checkboxes" >
        <List style={{ padding: 0 }}>
          {checkboxListItems}
        </List>
      </div>
    );
  },
});

export default Checkboxes;
