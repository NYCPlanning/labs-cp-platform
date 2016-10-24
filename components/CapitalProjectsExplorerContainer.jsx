import React from 'react'
import CapitalProjectsExplorer from './CapitalProjectsExplorer.jsx'


var DashboardContainer = React.createClass({

  getInitialState(){
    return({})
  },

  // componentDidMount() {
  //   var self=this;
  //   $.getJSON('data/projects.geojson', function(data) {
  //     self.setState({
  //       data: data
  //     })
  //   })
  // },

  render() {
    // if(this.state.data) {
      return(
        <CapitalProjectsExplorer auth={this.props.auth}/>
      );     
    // } else {
    //   return null
    // }
  }
});

module.exports=DashboardContainer;