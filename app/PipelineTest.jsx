// PipeLineTest - Custom config/code for the pipeline explorer should go here.  This component will make use of MapTest.jsx, a global map component that all "explorers" can use
import React from 'react' 

import MapTest from './MapTest.jsx'
import PipelineDataLayer from './PipelineDataLayer.jsx'

var PipelineTest = React.createClass({ 
  render() {
    return(
      <MapTest dockedDrawerOpen={true} auth={this.props.auth}>
        <PipelineDataLayer name="Housing Pipeline"/>
      </MapTest>
    )
  }
})

module.exports=PipelineTest