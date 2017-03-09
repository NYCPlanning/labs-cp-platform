import React from 'react';

const RangeSlider = React.createClass({
  propTypes: {
    disable: React.PropTypes.bool,
    data: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return ({
      disable: false,
    })
  },

  componentDidMount() {
    const self = this;
    $(this.sliderEl).ionRangeSlider({ // eslint-disable-line no-undef
      type: self.props.type,
      min: self.props.data[0],
      max: self.props.data[1],
      from: self.props.data[0],
      to: self.props.data[1],
      step: self.props.step,
      disable: self.props.disable ? self.props.disable : false,
      onFinish: self.props.onChange,
      prettify: self.props.prettify,
      prefix: self.props.prefix,
      grid: self.props.grid,
      grid_num: self.props.grid_num,
      max_postfix: self.props.max_postfix,
      force_edges: self.props.force_edges,
      prettify_enabled: self.props.prettify_enabled,
      values: self.props.values,
    });

    this.slider = $(this.sliderEl).data('ionRangeSlider'); // eslint-disable-line no-undef
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
