import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';

import BigMoneyInput from './BigMoneyInput';

import './RangeInputs.scss';


class RangeInputs extends React.Component {
  propTypes: {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  updateMin = (value) => {
    this.props.onChange({
      from: value,
      to: this.props.data[1],
    });
  }

  updateMax = (value) => {
    this.props.onChange({
      from: this.props.data[0],
      to: value,
    });
  }


  render() {
    const { data } = this.props;

    function prettify(value) {
      return Numeral(value).format('($0.00 a)').toUpperCase();
    }

    return (
      <div className="range-input">
        <div className="pretty-number-range">
          <div className="number">{prettify(data[0])}</div>
          <div className="divider" />
          <div className="number">{prettify(data[1])}</div>
        </div>
        <br />
        <BigMoneyInput
          value={data[0]}
          onSubmit={this.updateMin}
        />
        <BigMoneyInput
          value={data[1]}
          onSubmit={this.updateMax}
          alignRight
        />
      </div>
    );
  }
}

RangeInputs.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default RangeInputs;
