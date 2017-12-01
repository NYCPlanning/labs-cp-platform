import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

// get styles for jane-maps
import './jane-maps/styles.scss';

import * as authActions from './actions/auth';

import GlobalModal from './common/GlobalModal';
import Nav from './common/Nav';

import './app.scss';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.loadCredentials({ targetPath: location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    // from the react router pinterest example, this allows us to slide in a new page without unmounting the old one
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      this.previousChildren = this.props.children;
    }
  }

  // modalOptions should be an object with modalHeading:String, modalContent:rendered JSX, modalCloseText: String
  showModal = (modalOptions) => {
    this.setState(modalOptions);
    if (this.modal) this.modal.open();
  }

  render() {
    const { location } = this.props;

    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    let children = null;

    // pass showModal() method so any descendant can trigger the showing of the modal
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        showModal: this.showModal,
      });
    }

    if (this.previousChildren) {
      this.previousChildren = React.cloneElement(this.previousChildren, {
        showModal: this.showModal,
      });
    }

    document.title = this.props.children.props.route.title || 'NYC Capital Planning Platform';

    return (
      <div>
        <Nav
          title={this.props.children.props.route.title}
          about={this.props.children.props.route.about ? this.props.children.props.route.about : '/about'}
          mini={this.props.children.props.route.miniNav}
        />
        <div>
          {
            this.state.modalHeading &&
            this.state.modalContent &&
            <GlobalModal
              heading={this.state.modalHeading}
              body={this.state.modalContent}
              closeText={this.state.modalCloseText}
              ref={(modal) => { this.modal = modal; }}
            />
          }
          {isModal ?
            this.previousChildren :
            children
          }
          <ReactCSSTransitionGroup
            transitionName="background"
            transitionAppear
            transitionAppearTimeout={250}
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >

            {isModal && (
              <div
                style={{
                  zIndex: 1000,
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  bottom: 0,
                  top: 0,
                }}
              >
                {children}
              </div>
            )}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape().isRequired,
  children: PropTypes.element.isRequired,
  route: PropTypes.shape().isRequired,

  loadCredentials: PropTypes.func.isRequired,
};

export default connect(null, {
  loadCredentials: authActions.loadCredentials,
})(App);
