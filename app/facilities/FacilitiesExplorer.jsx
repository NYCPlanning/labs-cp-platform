//Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react' 

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

  render() {
    //Facilities Data Layer is composable, and will show different data/filters based on the route
    const mode = this.props.params.domain ? this.props.params.domain : 'all'

    return(
      <MapComponent leftDrawerOpen={true} title={'Facilities Explorer'} auth={this.props.auth}>
        <FacilitiesDataLayer 
          name="Housing Pipeline" 
          icon="fa fa-university" 
          tooltipText="Facilities Database"
          showModal={this.props.showModal} 
          mode={mode}/>
      </MapComponent>
    )
  }
})

module.exports=FacilitiesExplorer