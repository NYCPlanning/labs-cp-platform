// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import PipelineDataLayer from './PipelineDataLayer.jsx'
import FacilitiesDataLayer from '../facilities/FacilitiesDataLayer.jsx'

var PipeLineExplorer = React.createClass({ 
  componentDidMount() {
    document.title = "Housing Development Explorer";

    var splashContent = (
      <div>
        <h4>Welcome, Beta Tester!</h4>
        <p>This interactive explorer of the new Housing Pipeline Dataset is currently under development by the Department of City Planning. You are likely to find some bugs, as this is a work in progress.</p>
        <p>If you're seeing this message, it means we want your help improving this product! <a href="https://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions</a>.</p>
      </div>
    )
    
    this.props.showModal({
      modalHeading: 'Welcome!',
      modalContent: splashContent,
      modalCloseText: 'Got it.  Let me in!'
    })
  },

  render() {
    return(
      <MapComponent leftDrawerOpen={true} title={'Housing Development Explorer'} auth={this.props.auth}>
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