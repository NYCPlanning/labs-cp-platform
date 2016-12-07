//Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react' 

import Nav from '../common/Nav.jsx'
import MapComponent from '../common/MapComponent.jsx'
import FacilitiesDataLayer from './FacilitiesDataLayer.jsx'
import content from './content.jsx'

var FacilitiesExplorer = React.createClass({

  componentDidMount() {
    document.title = "Facilities and Program Sites Explorer";

    this.props.showModal({
      modalHeading: 'Welcome!',
      modalContent: content.splash,
      modalCloseText: 'Got it.  Let me in!'
    })
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this tool',
      modalContent: content.about,
      modalCloseText: 'Close'
    })
  },

  render() {
    //Facilities Data Layer is composable, and will show different data/filters based on the route
    const mode = this.props.params.domain ? this.props.params.domain : 'all'

    return(
      <div>
        <Nav title={'Facilities and Program Sites Explorer'} auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <MapComponent leftDrawerOpen={true} auth={this.props.auth} showModal={this.props.showModal}>
          <FacilitiesDataLayer 
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