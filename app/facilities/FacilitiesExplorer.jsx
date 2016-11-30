//Explorer.jsx - Top level Component for the Facilities Explorer
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import FacilitiesDataLayer from './FacilitiesDataLayer.jsx'

var FacilitiesExplorer = React.createClass({ 
  render() {
    //Facilities Data Layer is composable, and will show different data/filters based on the route
    const mode = this.props.params.domain ? this.props.params.domain : 'all'

    return(
      <MapComponent dockedDrawerOpen={true} title={'Housing Pipeline Explorer'} auth={this.props.auth}>
        <FacilitiesDataLayer name="Housing Pipeline" showModal={this.props.showModal} mode={mode}/>
      </MapComponent>
    )
  }
})

module.exports=FacilitiesExplorer