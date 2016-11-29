// PipeLineTest - Custom config/code for the pipeline explorer should go here.  This component will make use of MapTest.jsx, a global map component that all "explorers" can use
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import CapitalProjectsDataLayer from './CapitalProjectsDataLayer.jsx'

var CapitalProjectsExplorer = React.createClass({ 
  render() {
    return(
      <MapComponent dockedDrawerOpen={true} auth={this.props.auth}>
        <CapitalProjectsDataLayer name="Capital Projects Explorer" showModal={this.props.showModal}/>
      </MapComponent>
    )
  }
})

module.exports=CapitalProjectsExplorer