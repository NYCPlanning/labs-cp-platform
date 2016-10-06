import React from 'react'
import Nav from './Nav.jsx'
import Modal from './Modal.jsx'

var CapitalProjectsExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentDidMount: function() {
    document.title = "NYC Capital Projects Map";

    this.showModal({
      modalHeading: 'Welcome!',
      modalContent: splashContent,
      modalCloseText: 'Got it.  Let me in!'
    }) 
  },

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },


  render() {
    var Iframe = 'iframe'

    return(
      <div className="full-height">
        <Nav title="NYC Capital Projects Map">
          <li onClick={this.showAbout}><a><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About</a></li>
        </Nav>
        <Iframe src={'https://nycplanning.github.io/cpdb-explore'} height={'100%'} width={'100%'} frameborder={'0'}/>
        <Modal
          heading={this.state.modalHeading}
          body={this.state.modalContent}
          closeText={this.state.modalCloseText}
          ref="modal"
        />
      </div>
    )
  }
})

module.exports=CapitalProjectsExplorer

var splashContent = (
  <div>
    "Welcome Beta Tester!" 
    This interactive explorer of the XYZ dataset is currently under development by the Department of City Planning. 
    You are likely to find some bugs and even some less-than-accurate data. These are works in progress! 
    If you're here, it means we want to improve this data and this map with your help! Please get in touch...
  </div>
)

var aboutContent = (
  <div>About</div>
)