import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

import BigMoneyInput from './BigMoneyInput';

import './RangeInputs.scss';


const RangeInputs = createReactClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    prettify: PropTypes.func,
  },

  getDefaultProps() {
    return {
      prettify: value => value,
    };
  },

  updateMin(value) {
    this.props.onChange({
      from: value,
      to: this.props.data[1],
    });
  },

  updateMax(value) {
    this.props.onChange({
      from: this.props.data[0],
      to: value,
    });
  },


  render() {
    const { data } = this.props;

    return (
      <div>
        <BigMoneyInput
          value={data[0]}
          onSubmit={this.updateMin}
        />
        <BigMoneyInput
          value={data[1]}
          onSubmit={this.updateMax}
          style={{ float: 'right' }}
        />
      </div>
    );
  },
});

export default RangeInputs;
