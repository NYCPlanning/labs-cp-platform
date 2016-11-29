// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import PipelineDataLayer from './PipelineDataLayer.jsx'

var PipeLineExplorer = React.createClass({ 
  render() {
    return(
      <MapComponent dockedDrawerOpen={true} auth={this.props.auth}>
        <PipelineDataLayer name="Housing Pipeline" showModal={this.props.showModal}/>
      </MapComponent>
    )
  }
})

module.exports=PipeLineExplorer