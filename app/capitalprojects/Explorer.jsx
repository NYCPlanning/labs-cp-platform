// PipeLineTest - Custom config/code for the pipeline explorer should go here.  This component will make use of MapTest.jsx, a global map component that all "explorers" can use
import React from 'react' 

import MapComponent from '../common/MapComponent.jsx'
import CapitalProjectsDataLayer from './CapitalProjectsDataLayer.jsx'

var CapitalProjectsExplorer = React.createClass({ 
  componentDidMount() {
    document.title = "NYC Capital Projects Map";

    var splashContent = (
      <div>
        <h4>Hello, Beta Tester!</h4>
        <p>The Capital Projects Explorer is currently under development by the NYC Department of City Planning Capital Planning Team.</p>
        <p>The Capital Projects Explorer’s goal is to act as a starting point for planners exploring what capital projects are taking place within an area, means to identify potential conflicts and synergies among capital projects, and resource for all City agencies learn more about capital projects.  To know about the uses and limitations of the Capital Projects Explorer we encourage you to <a href="http://docs.capitalplanning.nyc/cpdbv1/">read more about the data</a> powering this map.</p>
        <p>Likely, you’ll find some bugs and uncover some less-than-accurate data since this is a work in progress, so we’re soliciting your help improving this product.  <a href="http://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please get in touch!</a></p>
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
      <MapComponent leftDrawerOpen={true} title={'Capital Projects Explorer'} auth={this.props.auth}>
        <CapitalProjectsDataLayer 
          name="Capital Projects Explorer"
          tooltipText="Capital Projects Database" 
          icon="fa fa-money" 
          showModal={this.props.showModal}/>
      </MapComponent>
    )
  }
})

module.exports=CapitalProjectsExplorer