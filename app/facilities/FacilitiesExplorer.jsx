//Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react' 

import Nav from '../common/Nav.jsx'
import MapComponent from '../common/MapComponent.jsx'
import FacilitiesDataLayer from './FacilitiesDataLayer.jsx'
import content from './content.jsx'

var FacilitiesExplorer = React.createClass({

  componentDidMount() {
    document.title = "Facilities and Program Sites Explorer";

    

    var modalShown = JSON.parse(localStorage.getItem('facilities-splash'))
    
    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splash,
        modalCloseText: 'Got it.  Let me in!'
      })

      localStorage.setItem('facilities-splash', 'true');    
    }

  },




  showAbout() {
    this.props.showModal({
      modalHeading: 'About this tool',
      modalContent: content.about,
      modalCloseText: 'Close'
    })
  },

  render() {

    let { location } = this.props

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )
    
    //Facilities Data Layer is composable, and will show different data/filters based on the route
    const mode = this.props.params.domain ? this.props.params.domain : 'all'

    return(
      <div>
        <Nav title={'Facilities and Program Sites Explorer'} auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <MapComponent leftDrawerOpen={true} auth={this.props.auth} showModal={this.props.showModal}>
          <FacilitiesDataLayer 
            history={this.props.history}
            name="Housing Pipeline" 
            icon="fa fa-university" 
            tooltipText="Facilities Database"
            showModal={this.props.showModal} 
            mode={mode}/>
        </MapComponent>
      </div>
    )
  }
})

module.exports=FacilitiesExplorer