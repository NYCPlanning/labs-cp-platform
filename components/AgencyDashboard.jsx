import React from 'react'
import DataGrid from 'react-datagrid'
import {Button, Modal} from 'react-bootstrap'
import DashboardMap from './DashboardMap.jsx'
//import DcColumnChart from './DcColumnChart.jsx'
import ProjectEditor from './ProjectEditor.jsx'
import {VictoryChart, VictoryBar, VictoryTooltip} from 'victory'

// import crossfilter from 'crossfilter'
// import dc from 'dc'
import _ from 'underscore'

var AgencyDashboard = React.createClass({
  getInitialState() {
    return({
      //gridData: this.props.data,
      mapData: null,
      showModal: false,
      selected: this.props.data[0].properties.maprojectid
    })
  },

  render() {
    console.log('render in dashboard')
    var self=this;
    var agency = this.props.params.agency.toUpperCase()
    var gridData = this.props.data.map(function(feature, i) {
      if(feature.geometry != null) {
        feature.properties.geom = feature.geometry.type
      }

      feature.properties.number = i+1

      return feature.properties
    })

    var columns = [
      { name: 'number', width: 60},
      { name: 'geom', width: 80 },
      { name: 'maprojectid', width: 150 },
      { name: 'sagency', width: 50 },
      { name: 'magency', width: 50  },
      { name: 'name' },
      { name: 'locationstatus', width: 150 }
    ]

    var totalProjects = gridData.length

    //prep data for stacked victory bar chart
    var counts = _.countBy(gridData, function(d){
      return d.locationstatus == 'discrete' ? 'discrete' :
        d.locationstatus == 'nondiscrete' ? 'nondiscrete' :
        d.locationstatus == 'tbd' ? 'tbd' :
        d.locationstatus == 'nonspatial' ? 'nonspatial' :
        d.locationstatus == null ? 'null' : null 

    });


    console.log('COUNTS', counts)
    var locationStatusChartArray = [
      {
        x:1,
        y:counts.discrete || 0,
        label: 'Discrete\n' + (counts.discrete || 0)
      },
      {
        x:2,
        y:counts.nondiscrete || 0,
        label: 'Nondiscrete\n' + (counts.nondiscrete || 0)
      },
      {
        x:3,
        y:counts.tbd || 0,
        label: 'TBD\n' + (counts.tbd || 0)
      },
      {
        x:4,
        y:counts.nonspatial || 0,
        label: 'Nonspatial\n' + (counts.nonspatial || 0)
      },
      {
        x:5,
        y:counts.null || 0,
        label: 'Null\n' + (counts.null || 0)
      }
    ]

    var geomCounts = _.countBy(gridData, function(d) {
      return (d.locationstatus == 'discrete' && d.geom != null) ? 'geom' : 
        (d.locationstatus == 'discrete' && d.geom == null) ? 'nogeom': null
    })

    console.log(geomCounts)

    // var geomChartArray = [
    //   {
    //     x:1,
    //     y:geomCounts.geom || 0,
    //     label: 'Has Geom\n' + (geomCounts.geom || 0)
    //   },
    //   {
    //     x:2,
    //     y:geomCounts.nogeom || 0,
    //     label: 'No Geom\n' + (geomCounts.nogeom || 0)
    //   }
    // ]


    return(
      <div className="full-height">
        <div className={'col-md-4 left full-height'}>
          <div className="statsContainer half-height clearfix">
            <h3>{agency} - {totalProjects} Projects</h3>
           
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
            <h4>Discrete Projects Geocoded: {geomCounts.geom}/{counts.discrete || 0}</h4>
     

 
          </div>
          <div className="mapContainer half-height">
            <DashboardMap data={this.props.data.filter(function(feature){
              return !$.isEmptyObject(feature.geometry) && 
              (feature.geometry.type=='Point' || feature.geometry.type=='LineString' || feature.geometry.type=='Polygon')
            })}/>
          </div>
        </div>
        <div className={'col-md-8 right full-height'}>
          <DataGrid
            idProperty='maprojectid'
            onSelectionChange={this.onSelectionChange}
            dataSource={gridData}
            columns={columns}
            pagination={false}
            style={{height: 500}}
            emptyText={'No records'}
            selected={this.state.selected}
            withColumnMenu={false}
          />
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <ProjectEditor data={this.state.mapData} onHide={this.closeModal} refresh={this.props.refresh}/>
        </Modal>
      </div>
    );
  },

  onSelectionChange(id, data) {
    var self=this

    var selectedFeature = this.props.data.filter(function(feature){
      return feature.properties.maprojectid == id
    })[0]

    this.setState({
      selected: id,
      mapData: selectedFeature  
    })
    this.setState({
      showModal: true
    })
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  update() {
    this.setState({
      gridData: this.store.everything.top(Number.POSITIVE_INFINITY)
    })    
  }

});

module.exports=AgencyDashboard;

