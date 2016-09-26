import React from 'react'
import DataGrid from 'react-datagrid'
import DashboardMap from './DashboardMap.jsx'
import DcColumnChart from './DcColumnChart.jsx'
import crossfilter from 'crossfilter'
import dc from 'dc'


var AgencyDashboard = React.createClass({
  getInitialState() {
    return({
      gridData: this.props.data
    })
  },

  componentWillMount() {
    console.log('willmount')
    //set up crossfilters, add dimensions 
    this.store = {}

    var filter = this.store.filter = crossfilter(this.props.data);
    var all = this.store.all = filter.groupAll();

    this.store.everything = filter.dimension(function(d) { return d });

    this.store.geom = filter.dimension(function (d) { 
      return (d.geometry.type == 'Point') ? 'Point' :
        (d.geometry.type == 'LineString') ? 'Line' :
        (d.geometry.type == 'Polygon') ? 'Polygon' : 
        (d.geometry.type == 'MultiPoint') ? 'Multipoint' :
        (d.geometry.type == 'MultiLineString') ? 'MultiLine' :
        (d.geometry.type == 'MultiPolygon') ? 'MutiPolygon' : 
        'No Geom'
    });

    this.store.geomCount = this.store.geom.group();

    this.store.discrete = filter.dimension(function(d) {
      return (d.properties.discrete==true) ? 'Discrete' :
        (d.properties.discrete==false) ? 'Nondiscrete' :
        'Null'
    })
    this.store.discreteCount = this.store.discrete.group();

  },

  render() {
    console.log('render', this.state)
    var agency = this.props.params.agency.toUpperCase()
    var gridData = this.state.gridData.map(function(feature) {
      feature.properties.geom = feature.geometry.type
      return feature.properties
    })

    var columns = [
      { name: 'geom', width: 80 },
      { name: 'maprojectid', width: 150 },
      { name: 'sagency', width: 50 },
      { name: 'magency', width: 50  },
      { name: 'name', width: 400 },
      { name: 'description' },
      { name: 'discrete', width: 50 }
    ]

    return(
      <div className="full-height">
        <div className={'col-md-4 left full-height'}>
          <div className="statsContainer half-height clearfix">
            <h3>Project Dashboard - {agency}</h3>
              <DcColumnChart 
                title={'Geometries'}
                dimension={this.store.geom}
                group={this.store.geomCount}
                margins={{top: 10, right: 50, bottom: 30, left: 40}}
                update={this.update}
              />
              <DcColumnChart 
                title={'Discrete Projects'}
                dimension={this.store.discrete}
                group={this.store.discreteCount}
                margins={{top: 10, right: 50, bottom: 30, left: 40}}
                update={this.update}
              />
          </div>
          <div className="mapContainer half-height">
            <DashboardMap/>
          </div>
        </div>
        <div className={'col-md-8 right full-height'}>
          <DataGrid
            idProperty='maprojectid'
            dataSource={gridData}
            columns={columns}
            style={{height: '100%'}}
            emptyText={'No records'}
            //if you don't want to show a column menu to show/hide columns, use
            //withColumnMenu={false}
          />
        </div>
      </div>
    );
  },

  update() {
    this.setState({
      gridData: this.store.everything.top(Number.POSITIVE_INFINITY)
    })    
  }

});

module.exports=AgencyDashboard;

        // {
        //   this.state.loggedIn ? 
        //     (
        //       <AgencyDashboard/>
        //     ) :
        //     (
        //       <div className="main-column">
        //         <GoogleLogin
        //           clientId="755447712627-dm9dbsoevk9f4rvcch1hr0m853ai8f18.apps.googleusercontent.com"
        //           buttonText="Login"
        //           onSuccess={this.handleGoogleSuccess}
        //           onFailure={this.handleGoogleFailure}
        //         />
        //       </div>
        //     )
        // }