// CapitalProjectsDataLayer- A Data Layer Component for cpdb, to be added as a child of MapComponent
// Includes custom filtering UI for this dataset, creates/updates a mapboxGL source and layer for the current filters

//Props:
//  map: the mapboxGL map object to add the source and layer to

import React from 'react'
import {Link} from 'react-router'
import {ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'

import CapitalProjectsFilter from './CapitalProjectsFilter.jsx'

import Agencies from './agencies.js'
import Carto from '../helpers/carto.js'

var CapitalProjectsDataLayer = React.createClass({

  componentWillMount() {
    //SELECT columns and table name(s) for use throughout this data layer
    let sqlConfig = this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, sagency, projectid, name',
      pointsTablename: 'adoyle.capeprojectspoints',
      polygonsTablename: 'adoyle.capeprojectspolygons'
    }

    this.setState({
      pointsSql: `SELECT ${sqlConfig.columns} FROM ${sqlConfig.pointsTablename}`,
      polygonsSql: `SELECT ${sqlConfig.columns} FROM ${sqlConfig.polygonsTablename}`
    })
  },

  componentDidMount() {
    this.instantiateVectorTiles()

    var legendContent = (
      <div className="legendSection">
        <h4>Sponsor Agency</h4>
        <div className="legendItem">
          <div className="colorBox" style={{backgroundColor: 'rgb(51, 160, 44)'}}></div>
          <div className="legendItemText">Dept. of Parks and Recreation - (DPR)</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{backgroundColor: 'rgb(202, 178, 214)'}}></div>
          <div className="legendItemText">Dept. of Transportation - (DOT)</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{backgroundColor: 'rgb(31, 120, 180)'}}></div>
          <div className="legendItemText">Dept. of Environmental Protection - (DEP)</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{backgroundColor: 'rgb(255, 127, 0)'}}></div>
          <div className="legendItemText">School Construction Authority - (SCA)</div>
        </div>
        <div className="legendItem">
          <div className="colorBox" style={{backgroundColor: 'rgb(255, 204, 0)'}}></div>
          <div className="legendItemText">All other agencies</div>
        </div>
      </div>
    )

    this.props.updateLegend('capitalprojects', legendContent) //send legend content up to MapComponent for rendering
  },

  instantiateVectorTiles() {
    // initialize a vector tile layer from our carto server
    // calls this.renderVectorTiles() when done
    var self=this

    var pointsConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": "#layer { polygon-fill: #FFF; }",
          "sql": this.state.pointsSql
        }
      }]
    }

    var polygonsConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": "#layer { polygon-fill: #FFF; }",
          "sql": this.state.polygonsSql
        }
      }]
    }
     
    Promise.all([
      Carto.getVectorTileTemplate(pointsConfig),
      Carto.getVectorTileTemplate(polygonsConfig)
    ])
      .then(function(templates) {
        self.renderVectorTiles(templates)
      })
  },

  renderVectorTiles(templates) {
    var self=this
    //add a mapboxGL source for this vector tile template and associated layer(s)
    var map = this.props.map.map 

    map.addSource('capitalprojects-points', {
      'type': 'vector',
      "tiles": [
        templates[0]
      ]
    })

    map.addSource('capitalprojects-polygons', {
      'type': 'vector',
      "tiles": [
        templates[1]
      ]
    })

    map.addLayer({
      "id": "capitalprojects-polygons",
      'type':'fill',
      "source": 'capitalprojects-polygons',
      "source-layer": "layer0",
      'paint': {
          'fill-color': Agencies.mapboxGLStyle,
          'fill-opacity': 0.75,
          //'fill-outline-color': '#838763',
          'fill-antialias': true 
      }
    });

    map.addLayer({
      "id": "capitalprojects-points-outline",
      "source": 'capitalprojects-points',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
          "circle-radius": {
            "stops": [
              [10,2],
              [15,6]
            ]
          },
          "circle-color": '#838763',
          "circle-opacity": 0.3
      }
    });

    map.addLayer({
      "id": "capitalprojects-points",
      "source": 'capitalprojects-points',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
          "circle-radius": {
            "stops": [
              [10,1],
              [15,5]
            ]
          },
          "circle-color": Agencies.mapboxGLStyle,
          "circle-opacity": 0.75
      }
    });

    //show a pointer on hover
    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['capitalprojects-points','capitalprojects-polygons'] });
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    }) 

    //popup on click
    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['capitalprojects-points','capitalprojects-polygons'] });

      if (!features.length) return
      self.buildSelections(e.lngLat, features)
    })
  },

  buildSelections(lngLat, features) {
    var self=this
    //builds content for the right sidebar

    var content = features.map(
      (feature, i) => {
        const d = feature.properties
        const type = (feature.geometry.type == 'Point') ? '0' : '1'

        return (
          <Link
            key={i}
            to={{
              //add flag for point or polygon so the project view knows which table to query
              pathname: `/capitalprojects/${d.cartodb_id}-${type}`  ,
              state: { modal: true, returnTo: '/capitalprojects'}
            }}
          >
            <ListItem
              primaryText={d.name}
              secondaryText={d.projectid}
              leftIcon={
                <div 
                  className={'color-circle'} 
                  style={{
                    'backgroundColor': Agencies.getAgencyColor(d.sagency),
                    'borderRadius': '12px'
                  }}
                /> 
              }
              rightIcon={<FontIcon className='fa fa-chevron-right'/>}
            />
          </Link>
        )
      }
    )

    this.props.showSelections(content)
  },

  updateSQL(pointsSql, polygonsSql) {
    //gets chunksString (Where clause) from the filter UI, updates vector Tile layers accordingly

    var self=this

    this.setState({
      pointsSql: pointsSql,
      polygonsSql: polygonsSql
    }, function() {

      var map = self.props.map.map
      map.removeLayer('capitalprojects-points')
      map.removeLayer('capitalprojects-points-outline')
      map.removeLayer('capitalprojects-polygons')

      map.removeSource('capitalprojects-points')
      map.removeSource('capitalprojects-polygons')
      self.instantiateVectorTiles()      
    })
  },

  render() {
    return(
      <div>
        <CapitalProjectsFilter 
          updateSQL={this.updateSQL}
          sqlConfig={this.sqlConfig}
        />
      </div>
    )
  }
})

module.exports = CapitalProjectsDataLayer