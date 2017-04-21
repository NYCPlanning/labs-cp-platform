// Checkboxes.jsx - A checkbox multiselect component


import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';

import Checkbox from '../common/Checkbox';

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
      border: '1px solid #65696A',
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
    dimension: PropTypes.object.isRequired, // array of objects for all possible items
    onChange: PropTypes.func.isRequired, // function to send an updated array of objects to when a checkbox is toggled
    legendCircleType: PropTypes.string.isRequired, // string indicating the type of legendCircle
  },

  handleChange(value) {
    const { dimension, onChange } = this.props;

    const thisOption = dimension.values.filter(option => option.value === value)[0];
    thisOption.checked = !thisOption.checked;

    onChange(dimension.values);
  },

  render() {
    const { dimension, legendCircleType } = this.props;

    const checkboxListItems = dimension.values.map((option) => {
      const checkbox = (
        <Checkbox
          value={option.value}
          checked={option.checked}
          onChange={this.handleChange.bind(this, option.value)}
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
