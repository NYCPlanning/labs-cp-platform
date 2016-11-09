//App.jsx - Top-level container for the react SPA, it passes the auth property to 
//its children, which are the app's top-level routes
//Props:
//  route - object passed in from react-router, which includes auth
//  children - the top-level route(s) from react router

import React from 'react'
import {browserHistory} from 'react-router'

import GlobalModal from './common/GlobalModal.jsx'

import '../stylesheets/App.scss'

var App = React.createClass({
  getInitialState() {
    return({
      loggedIn: true,
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  //modalOptions should be an object with modalHeading:String, modalContent:rendered JSX, modalCloseText: String
  showModal(modalOptions) {
    console.log(modalOptions)
    this.setState(modalOptions)
    this.refs.modal ? this.refs.modal.open() : null  //show the modal
  },

  render() {
    let children = null;

    //pass the auth object to the child components so they know who is logged in
    //pass showModal() method so any descendant can trigger the showing of the modal
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
        showModal: this.showModal 
      })
    }

    return(
      <div className="full-height">
        <GlobalModal
          heading={this.state.modalHeading}
          body={this.state.modalContent}
          closeText={this.state.modalCloseText}
          ref="modal"
        />
       {children}
      </div>
    )
  }
})

module.exports=App