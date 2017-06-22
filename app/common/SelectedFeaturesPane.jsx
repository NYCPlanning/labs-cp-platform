import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SelectedFeaturesPane = (props) => {
  const style = { right: props.children.length > 0 ? 0 : '-335px' };

  return (
    <ReactCSSTransitionGroup
      transitionName="feature"
      transitionEnter={false}
      transitionLeaveTimeout={250}
    >
      <div className="selected-features" style={style}>
        {props.children}
      </div>
    </ReactCSSTransitionGroup>
  );
};

SelectedFeaturesPane.propTypes = {
  children: PropTypes.array.isRequired,
};

export default SelectedFeaturesPane;
