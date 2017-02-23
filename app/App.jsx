import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import GlobalModal from './common/GlobalModal';
import Nav from './common/Nav';

import './app.scss';

// get styles for jane-maps, TODO figure out the best way to include this
import '../jane-maps/src/styles.scss';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#b1b1b1',
    accent1Color: '#D96B27',
  },
});

const App = React.createClass({
  propTypes: {
    location: React.PropTypes.shape().isRequired,
    children: React.PropTypes.element.isRequired,
    route: React.PropTypes.shape().isRequired,
  },

  getInitialState() {
    return ({
      loggedIn: true,
    });
  },

  componentWillReceiveProps(nextProps) {
    // from the react router pinterest example, this allows us to slide in a new page without unmounting the old one
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      this.previousChildren = this.props.children;
    }
  },

  // modalOptions should be an object with modalHeading:String, modalContent:rendered JSX, modalCloseText: String
  showModal(modalOptions) {
    this.setState(modalOptions);
    if (this.modal) this.modal.open();
  },

  render() {
    const { location } = this.props;

    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    let children = null;

    // pass the auth object to the child components so they know who is logged in
    // pass showModal() method so any descendant can trigger the showing of the modal
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
        showModal: this.showModal,
      });
    }

    if (this.previousChildren) {
      this.previousChildren = React.cloneElement(this.previousChildren, {
        auth: this.props.route.auth,
        showModal: this.showModal,
      });
    }

    document.title = this.props.children.props.route.title || 'NYC Captial Planning Platform';

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Nav
            title={this.props.children.props.route.title}
            mini={this.props.children.props.route.miniNav}
            auth={this.props.route.auth}
            showModal={this.showModal}
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
                  {
                    React.cloneElement(this.props.children, {
                      key: this.props.location.pathname,
                    })
                  }
                </div>
              )}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </MuiThemeProvider>
    );
  },
});

module.exports = App;
