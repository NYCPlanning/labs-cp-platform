import React from 'react'
import AgencyDashboard from './AgencyDashboard.jsx'
import crud from '../helpers/crud.js'

//handles AJAX for fms projects list
var AgencyDashboardContainer = React.createClass({

  getInitialState() {
    return { 
      data: []
    }
  },

  componentDidMount() {
    this.getData()
  },

  getData() {

    var agency = this.props.params.agency

    crud.projects.getMany(agency)
      .done((res) => {
        var response = JSON.parse(res)
        console.log(response)
        this.setState({
          data: response.data
        });
      })
  },

  render() {
    return this.state.data.length > 0 ?
      <AgencyDashboard data={this.state.data} refresh={this.getData} params={this.props.params}/> :
      null
  }
})

module.exports = AgencyDashboardContainer