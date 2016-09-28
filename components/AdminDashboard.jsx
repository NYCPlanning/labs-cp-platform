import React from 'react'
import {VictoryChart, VictoryBar, VictoryTooltip} from 'victory'

var AdminDashboard = React.createClass({

  getInitialState() {
    return({
      agencyData: null
    })
  },

  componentDidMount() {
    var self=this
    $.getJSON('http://localhost:3000/api/projecteditor/allstats', function(res) {
      console.log(res.data)
      self.setState({
        agencyData: res.data
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
        y:d.locationstatus.discrete || 0,
        label: 'Discrete\n' + (d.locationstatus.discrete || 0)
      },
      {
        x:2,
        y:d.locationstatus.nondiscrete || 0,
        label: 'Nondiscrete\n' + (d.locationstatus.nondiscrete || 0)
      },
      {
        x:3,
        y:d.locationstatus.tbd || 0,
        label: 'TBD\n' + (d.locationstatus.tbd || 0)
      },
      {
        x:4,
        y:d.locationstatus.nonspatial || 0,
        label: 'Nonspatial\n' + (d.locationstatus.nonspatial || 0)
      },
      {
        x:5,
        y:d.locationstatus.null || 0,
        label: 'Null\n' + (d.locationstatus.null || 0)
      }
    ]

    return (
      <div className='col-md-4'> 
        <h3>{d.sagency}</h3>
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
        <h4>Discrete Projects Geocoded: {d.discretegeoms.hasgeom}/{d.discretegeoms.hasgeom + d.discretegeoms.nogeom}</h4>      
        <hr/>
      </div> 
    )
  }
})

module.exports=AdminDashboard;