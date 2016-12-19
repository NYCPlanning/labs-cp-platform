//App.jsx - Top-level container for the react SPA
//Props:
//  route - object passed in from react-router, which includes auth
//  children - the top-level route(s) from react router

import React from 'react'
import {browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import GlobalModal from './common/GlobalModal.jsx'
import Nav from './common/Nav.jsx'

import '../stylesheets/App.scss'

injectTapEventPlugin();

var App = React.createClass({
  getInitialState() {
    return({
      loggedIn: true,
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentWillReceiveProps(nextProps) {
    //from the react router pinterest example, this allows us to slide in a new page without unmounting the old one
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      this.previousChildren = this.props.children
    }
  },

  //modalOptions should be an object with modalHeading:String, modalContent:rendered JSX, modalCloseText: String
  showModal(modalOptions) {
    this.setState(modalOptions)
    this.refs.modal ? this.refs.modal.open() : null  //show the modal
  },

  render() {

    let { location } = this.props

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    let children = null;

    //pass the auth object to the child components so they know who is logged in
    //pass showModal() method so any descendant can trigger the showing of the modal
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
        showModal: this.showModal 
      })
    }

    if (this.previousChildren) {
      this.previousChildren = React.cloneElement(this.previousChildren, {
        auth: this.props.route.auth,
        showModal: this.showModal 
      })
    }

    document.title = this.props.children.props.route.title

    return( 
      <MuiThemeProvider>
        <div>
          <Nav 
            title={this.props.children.props.route.title} 
            mini={this.props.children.props.route.miniNav}
            auth={this.props.route.auth} 
            showModal={this.showModal}>
          </Nav>
          <div>
            <GlobalModal
              heading={this.state.modalHeading}
              body={this.state.modalContent}
              closeText={this.state.modalCloseText}
              ref="modal"
            />
            {isModal ?
              this.previousChildren :
              children
            }
            <ReactCSSTransitionGroup
                transitionName="background"
                transitionAppear={true}
                transitionAppearTimeout={250}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
              >
              
              {isModal && (
                <div style={{
                  zIndex: 1000,
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  bottom: 0,
                  top: 0
                }} >
                {React.cloneElement(this.props.children, {
                  key: this.props.location.pathname
                }) } 
                </div>
              )}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
})

module.exports=App