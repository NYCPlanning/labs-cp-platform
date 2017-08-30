import React from 'react';
import PropTypes from 'prop-types';


class RadiusFilter extends React.Component {
  render() {
    // const disabled = !!this.props.clickedPointCoordinates;
    const disabled = false;

    function onClick() {
      this.props.updateFilterDimension('radiusfilter', this.props.clickedPointCoordinates);
    }

    return (
      // NEXT: capture point when click a location on the map
      <button disabled={disabled} onClick={onClick.bind(this)}>
        Filter Around Selected Point
      </button>
    );
  }
}

RadiusFilter.propTypes = {
  clickedPointCoordinates: PropTypes.array.isRequired,
  updateFilterDimension: PropTypes.func.isRequired,
};

export default RadiusFilter;
