import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// get styles for jane-maps, TODO figure out the best way to include this
import 'jane-maps/dist/styles.css';

import GlobalModal from './common/GlobalModal';
import Nav from './common/Nav';

import './app.scss';

injectTapEventPlugin();

// set material ui default styles
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#b1b1b1',
    accent1Color: '#D96B27',
  },
});

const App = React.createClass({
  propTypes: {
    location: PropTypes.shape().isRequired,
    children: PropTypes.element.isRequired,
    route: PropTypes.shape().isRequired,
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Nav
            title={this.props.children.props.route.title}
            mini={this.props.children.props.route.miniNav}
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
                  {children}
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
