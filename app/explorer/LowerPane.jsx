import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Results from './Results';

import './LowerPane.scss';

class LowerPane extends React.Component {
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
            left: '320px',
            bottom: 0,
            top: '300px',
            background: 'white',
          }}
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
  detailPage: PropTypes.object.isRequired,
  selectedFeatures: PropTypes.array.isRequired,
};

export default LowerPane;
