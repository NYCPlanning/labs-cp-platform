// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import PipelineDataLayer from './PipelineDataLayer.jsx'
import FacilitiesDataLayer from '../facilities/FacilitiesDataLayer.jsx'

var PipeLineExplorer = React.createClass({ 
  render() {
    return(
      <MapComponent leftDrawerOpen={true} title={'Housing Pipeline Explorer'} auth={this.props.auth}>
        <PipelineDataLayer 
          name="Housing Pipeline" 
          tooltipText="Housing Pipeline"
          icon="fa fa-home" 
          showModal={this.props.showModal}/>
      </MapComponent>
    )
  }
})

module.exports=PipeLineExplorer