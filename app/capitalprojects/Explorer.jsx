// PipeLineTest - Custom config/code for the pipeline explorer should go here.  This component will make use of MapTest.jsx, a global map component that all "explorers" can use
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import CapitalProjectsDataLayer from './CapitalProjectsDataLayer.jsx'
import content from './content.jsx'

import '../../stylesheets/capitalprojects/Explorer.scss'

var CapitalProjectsExplorer = React.createClass({ 
  componentDidMount() {
    
    //show modal on first launch
    var modalShown = JSON.parse(localStorage.getItem('capitalprojects-splash'))
    
    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splashContent,
        modalCloseText: 'Got it.  Let me in!'
      }) 

      localStorage.setItem('capitalprojects-splash', 'true');    
    }
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this tool',
      modalContent: content.aboutContent,
      modalCloseText: 'Close'
    })
  },

  render() {
    return(
      <div className='full-screen'>
        <MapComponent leftDrawerOpen={true} auth={this.props.auth}>
          <CapitalProjectsDataLayer 
            name="Capital Projects Explorer"
            tooltipText="Capital Projects Database" 
            icon="fa fa-usd" 
            showModal={this.props.showModal}/>
        </MapComponent>
      </div>
    )
  }
})

module.exports=CapitalProjectsExplorer