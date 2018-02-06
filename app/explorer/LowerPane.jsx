import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import _ from 'lodash';

import Results from './Results';

import './LowerPane.scss';

const detailPageTypeMap = {
  facility: {
    title: 'Facility',
    icon: 'university',
  },
  capitalproject: {
    title: 'Capital Project',
    icon: 'usd',
  },
  sca: {
    title: 'School Construction Authority Capital Project',
    icon: 'graduation-cap',
  },
  budgetrequest: {
    title: 'Community Board Budget Request',
    icon: 'book',
  },
  development: {
    title: 'Housing Development',
    icon: 'cubes',
  },
  feature: {
    title: 'Feature',
    icon: 'usd',
  },
};

class LowerPane extends React.Component {
  constructor() {
    super();
    this.state = {
      detailPageType: 'feature',
      detailPageId: null,
    };
  }

  componentDidMount() {
    this.setBottomOffset();
  }

  componentDidUpdate() {
    this.setBottomOffset();
  }

  setBottomOffset(offset = this.divElement.clientHeight) {
    this.props.setBottomOffset(offset);
  }

  setDetailPageData = (payload) => {    
    this.setState({
      detailPageType: payload.type,
      detailPageId: payload.id,
    });
  }

  render() {
    const closeLowerPane = () => {
      this.setBottomOffset(0);
      this.props.closeLowerPane();
    };

    const detailPage = React.Children.map(this.props.detailPage, child =>
      React.cloneElement(child, { setDetailPageData: this.setDetailPageData }));

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
            top: 'calc(50%)',
            background: 'white',
            transition: 'left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
          }}
          ref={(divElement) => { this.divElement = divElement; }}
        >
          <div className="detail-page--bar">
            <span className={`fa fa-${detailPageTypeMap[this.state.detailPageType].icon}`} /> { detailPageTypeMap[this.state.detailPageType].title }
            <button
              onClick={closeLowerPane}
            ><span className="fa fa-times" /></button>
          </div>
          <div className={cx('detail-page', { 'with-selected': !_.isEmpty(this.props.selectedFeatures) })}>
            { detailPage }
          </div>
          <div className="results-pane">
            <Results
              selectedFeatures={this.props.selectedFeatures}
              detailPageId={this.state.detailPageId}
            />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

LowerPane.propTypes = {
  detailPage: PropTypes.object,
  selectedFeatures: PropTypes.array,
  closeLowerPane: PropTypes.func,

  leftOffset: PropTypes.number,
  setBottomOffset: PropTypes.func,
};

LowerPane.defaultProps = {
  selectedFeatures: [],
  detailPage: {},
  closeLowerPane: () => {},
  leftOffset: 0,
  setBottomOffset: () => {},
};

export default LowerPane;
