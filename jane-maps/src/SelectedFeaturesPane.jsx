import React from 'react';

const SelectedFeauturesPane = props => (
  <div className="jane-selected-features" style={props.style}>
    {props.children}
  </div>
);

SelectedFeauturesPane.propTypes = {
  children: React.PropTypes.array,
  style: React.PropTypes.shape(),
};

export default SelectedFeauturesPane;
