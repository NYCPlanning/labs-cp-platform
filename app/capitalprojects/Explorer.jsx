// PipeLineTest - Custom config/code for the pipeline explorer should go here.  This component will make use of MapTest.jsx, a global map component that all "explorers" can use
import React from 'react' 

import Nav from '../common/Nav.jsx'
import MapComponent from '../common/MapComponent.jsx'
import CapitalProjectsDataLayer from './CapitalProjectsDataLayer.jsx'

import '../../stylesheets/capitalprojects/Explorer.scss'

var CapitalProjectsExplorer = React.createClass({ 
  componentDidMount() {
    document.title = "NYC Capital Projects Map";
    
    var modalShown = JSON.parse(localStorage.getItem('capitalprojects-splash'))
    
    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: splashContent,
        modalCloseText: 'Got it.  Let me in!'
      }) 

      localStorage.setItem('capitalprojects-splash', 'true');    
    }
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this tool',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  render() {
    return(
      <div>
        <Nav title={'NYC Capital Projects Explorer'} auth={this.props.auth} showModal={this.props.showModal}>
            <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <MapComponent leftDrawerOpen={true} auth={this.props.auth}>
          <CapitalProjectsDataLayer 
            name="Capital Projects Explorer"
            tooltipText="Capital Projects Database" 
            icon="fa fa-usd" 
            showModal={this.props.showModal}/>
        </MapComponent>
      </div>
    )
  }
})

  var splashContent = (
      <div>
        <h4>Hello, Beta Tester!</h4>
        <p>The Capital Projects Explorer is currently under development by the NYC Department of City Planning Capital Planning Team.</p>
        <p>The Capital Projects Explorer’s goal is to act as a starting point for planners exploring what capital projects are taking place within an area, means to identify potential conflicts and synergies among capital projects, and resource for all City agencies learn more about capital projects.  To know about the uses and limitations of the Capital Projects Explorer we encourage you to <a href="http://docs.capitalplanning.nyc/cpdbv1/">read more about the data</a> powering this map.</p>
        <p>Likely, you’ll find some bugs and uncover some less-than-accurate data since this is a work in progress, so we’re soliciting your help improving this product.  <a href="http://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please get in touch!</a></p>
      </div>
    )

  var aboutContent = (
    <div>
      <h4>Product Overview</h4>
      <p>
      The Capital Projects Explorer integrates disparate datasets of capital projects published by capital agencies into one database and map-based data explorer.
      </p>
      <p>
      The Capital Projects Explorer’s primary purpose is to provide a common operational picture to capital planners and budget staff across City agencies, which can in turn minimize conflicts among different agencies’ capital projects, maximize opportunities for coordinated capital investment planning and funding alignment, and provide a starting point for integrated neighborhood-based planning.  This is certainly not a complete map of capital construction sites funded by NYC, but the Capital Projects Explorer is currently the best starting point for exploring capital projects in NYC.
      </p>
      <p>
      Special thanks to the NYC Departments of Parks and Recreation, Transportation, Design and Construction, the School Construction Authority, and the Mayor’s Office of Recovery and Resiliency for publishing spatial data on capital projects.
      </p>
      <h4>Limitations and Disclaimers</h4>
      <p>
      The Capital Projects Explorer is only as good as the source data it aggregates.  Currently, there is no data standard for capital project mapping and agencies are not required to map their capital projects; therefore, the Capital Projects Explorer makes some assumptions to aggregate and normalize the data into one data table.  As a result, this data source has some major limitations.
      </p>
      <p>
        <b>Duplicates.</b> This version of the Capital Projects Explorer includes some duplicate records for the same capital project because some of the source datasets have overlapping content, but different unique identifiers for a project, making it difficult to systematically identify and reconcile duplicate records.
      </p>
      <p>
        <b>Inconsistent data standards.</b> Capital agencies manage their capital projects data separately and have varying data standards that meet their needs; therefore, the Capital Projects Explorer makes some assumptions to reconcile key common attributes across datasets and integrate the data into one database.
      </p>
      <p>
        <b>Project definition</b> Capital agencies define capital projects differently; therefore, the projects in this explorer vary in size, scope, and impact.  The inconsistent definition of a capital project has the potential to skew analyses generated from these data - e.g. comparing the number of capital projects in or amount of funding dedicated to a neighborhood to another con produce misleading results.
      </p> 
      <p>
        <b>Completeness.</b> This dataset does not capture the entirety of NYC's Capital Budget.  The Capital Projects Explorer is built using records from agencies' project management systems, which do not always maintain a link to budget lines, making it impossible to account for the whole Capital Budget.
      </p>
      <p>
        <b>Different update frequencies.</b> Data from source agencies are updated at various frequencies, ranging from daily updates to infrequent updates. As a result, the freshness of the data in the Capital Projects Explorer varies depending on the data source.
      </p>
      <p>
      As a result of these data limitations and inconsistencies, the Capital Projects Explorer is not an analysis tool, it does not report any metrics, and the data should not be used for quantitative analyses - it is <b>built for planning coordination purposes only</b>.
      </p>
      <p>
      Please consult <a href="http://docs.capitalplanning.nyc/cpdbv1/">NYC Planning’s Capital Planning Docs</a> for more details about these data limitations.
      </p>
      <h4>Feedback</h4>
      <p>
        We are constantly looking for ways to improve this product.  <a href="http://docs.google.com/forms/d/e/1FAIpQLSffdzVSCRmMQhGn32Z6bDnBEKPXJw20m6CkDMeco-z4B1FcNQ/viewform">Please share your feedback and suggestions </a> with Capital Planning.
      </p>
    </div>
  )

module.exports=CapitalProjectsExplorer