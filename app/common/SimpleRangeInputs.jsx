import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import './SimpleRangeInputs.scss';

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

  componentWillReceiveProps(nextProps) {
    const { prettify } = this.props;

    if (nextProps.data[0] !== this.props.data[0]) this.min.value = prettify(nextProps.data[0]);
    if (nextProps.data[1] !== this.props.data[1]) this.max.value = prettify(nextProps.data[1]);
  },

  updateMin(e) {
    e.preventDefault();

    this.props.onChange({
      from: this.min.value,
      to: this.props.data[1],
    });
  },

  updateMax(e) {
    e.preventDefault();

    this.props.onChange({
      from: this.props.data[0],
      to: this.max.value,
    });
  },


  render() {
    const { data, prettify } = this.props;

    return (
      <div>
        <form className="simple-range-input" onSubmit={this.updateMin}>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            defaultValue={prettify(data[0])}
            ref={(min) => { this.min = min; }}
          />
        </form>
        <form className="simple-range-input" onSubmit={this.updateMax}>
          <input
            type="text"
            style={{ float: 'right' }}
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            defaultValue={prettify(data[1])}
            ref={(max) => { this.max = max; }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  },
});

export default RangeInputs;
