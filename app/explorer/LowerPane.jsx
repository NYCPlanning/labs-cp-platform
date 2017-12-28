import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Results from './Results';

import './LowerPane.scss';

class LowerPane extends React.Component {
  componentDidUpdate() {
    this.props.setBottomOffset(this.divElement.clientHeight);
  }

  height = 0;

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="background"
        transitionAppear
        transitionAppearTimeout={250}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        <div
          style={{
            zIndex: 99,
            position: 'absolute',
            right: 0,
            left: this.props.leftOffset,
            bottom: 0,
            top: '300px',
            background: 'white',
            transition: 'left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
          }}
          ref={(divElement) => { this.divElement = divElement; }}
        >
          <div className="detail-page">
            { this.props.detailPage }
          </div>
          <div className="results-pane">
            <Results selectedFeatures={this.props.selectedFeatures} />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

LowerPane.propTypes = {
  detailPage: PropTypes.object,
  selectedFeatures: PropTypes.array.isRequired,
  leftOffset: PropTypes.number,

  setBottomOffset: PropTypes.func,
};

LowerPane.defaultProps = {
  detailPage: {},
  leftOffset: 0,
  setBottomOffset: () => {},
};

export default LowerPane;
