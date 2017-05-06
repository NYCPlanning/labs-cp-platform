import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SelectedFeaturesPane = (props) => {
  const style = { right: props.children.length > 0 ? 0 : '-335px' };

  return (
    <div className="selected-features" style={style}>
      <ReactCSSTransitionGroup
        transitionName="feature"
        transitionEnter={false}
        transitionLeaveTimeout={450}
      >
        {props.children}
      </ReactCSSTransitionGroup>

    </div>
  );
};

SelectedFeaturesPane.propTypes = {
  children: PropTypes.array.isRequired,
};

export default SelectedFeaturesPane;
