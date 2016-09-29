import React from 'react'
import {VictoryChart, VictoryBar, VictoryTooltip} from 'victory'
import {Link} from 'react-router'
import {Button} from 'react-bootstrap'
import crud from '../helpers/crud.js'

var AdminDashboard = React.createClass({

  getInitialState() {
    return({
      agencyData: null
    })
  },

  componentDidMount() {
    var self=this
    crud.projects.getStats()
      .then(function(res) {
        var response = JSON.parse(res)
        self.setState({
          agencyData: response.data
        })
      })
  },

  render() {

    var agencyCharts = this.state.agencyData != null ? this.state.agencyData.map(function(agency, i) {
      return (<AgencyStats data={agency} key={i}/>)
    }) : null

    return(
      <div className='admin-dashboard'>
        {agencyCharts}
      </div>
    );
  }

});

var AgencyStats = React.createClass({
  render() {
    var d = this.props.data

      var locationStatusChartArray = [
      {
        x:1,
        y:d.discrete || 0,
        label: 'Discrete\n' + (d.discrete || 0)
      },
      {
        x:2,
        y:d.nondiscrete || 0,
        label: 'Nondiscrete\n' + (d.nondiscrete || 0)
      },
      {
        x:3,
        y:d.tbd || 0,
        label: 'TBD\n' + (d.tbd || 0)
      },
      {
        x:4,
        y:d.nonspatial || 0,
        label: 'Nonspatial\n' + (d.nonspatial || 0)
      },
      {
        x:5,
        y:d.null || 0,
        label: 'Null\n' + (d.null || 0)
      }
    ]

    return (
      <div className='col-md-4'> 
        <h3>{d.sagency} <Link to={'/agency/' + d.sagency}><Button bsStyle="success" bsSize="xsmall" >Go</Button></Link></h3> 
        <h4>Location Status</h4>
     
          <VictoryBar
            height={200}

            data={locationStatusChartArray}  
            style={{
              data: {
                width: 60,
                fill: '#D96B27'
              },
              labels: {fontSize: 20},
              margin: 0
            }}    
          />  
        <h4>Discrete Projects Geocoded: {d.hasgeom}/{d.hasgeom + d.totalprojects}</h4>      
        <hr/>
      </div> 
    )
  }
})

module.exports=AdminDashboard;