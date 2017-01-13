import React from 'react';
import $ from 'jquery';

const RangeSlider = React.createClass({
  componentDidMount() {
    const self = this;
    $(this.sliderEl).ionRangeSlider({
      type: self.props.type,
      min: self.props.data[0],
      max: self.props.data[1],
      from: self.props.data[0],
      to: self.props.data[1],
      step: self.props.step,
      disable: self.props.disable ? self.props.disable : false,
      onFinish: self.props.onChange,
      prettify: self.props.prettify,
    });

    this.slider = $(this.sliderEl).data('ionRangeSlider');
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.disable) {
      this.slider.update({
        min: nextProps.data[0],
        max: nextProps.data[1],
        from: nextProps.data[0],
        to: nextProps.data[1],
        disable: true,
      });
    } else {
      this.slider.update({
        disable: false,
      });
    }
  },

  render() {
    return (
      <input type="text" ref={(sliderEl) => { this.sliderEl = sliderEl; }} value="" />
    );
  },
});

export default RangeSlider;
