// PipelineDataLayer - A Data Layer Component for the housing pipeline, to be added as a child of MapComponent
// Includes custom filtering UI for this dataset, creates/updates a mapboxGL source and layer for the current filters

//Props:
//  map: the mapboxGL map object to add the source and layer to
//  mode: which mode the data layer shoud be in all, domain-[domainname], etc
import React from 'react'
import Moment from 'moment'
import {Link} from 'react-router'
import {ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import {browserHistory} from 'react-router'

import facilitiesLayers from '../facilities/facilitiesLayers.js'
import Carto from '../helpers/carto.js'


var DummyDataLayer = React.createClass({

  componentWillMount() {
    var self=this

    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, domain, facilitygroup, facilitysubgroup, facilityname, address, facilitytype',
      tablename: 'hkates.facilities_data'
    }
    
    let sql = ''

    //update initial state and the layer structure based on mode

    //if map mode is 'all', initialSQL has no WHERE, and layerStructure is unchanged
    sql=`SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE 1=1`
    this.layerStructure=facilitiesLayers


    this.setState({
      sql: sql
    })
  },

  componentDidMount() {
    var self=this
    this.instantiateVectorTiles()

    var sql = `
      SELECT
        min(datesourceupdated)::date AS min,
        max(datesourceupdated)::date AS max
      FROM hkates.facilities_data`

    Carto.SQL(sql, 'json')
      .then(function(data) {

        var range = {
          min: Moment(data[0].min).format('MM/DD/YYYY'),
          max: Moment(data[0].max).format('MM/DD/YYYY')
        }

        var legendContent = (
          <div className="legendSection">
            <p>Click on the map for facility details</p>
            <p>Data current as of {range.min} - {range.max}</p>
          </div>
        )

        //send legend content up to MapComponent for rendering
      })

  },

  instantiateVectorTiles() {
    // initialize a vector tile layer from our carto server
    // calls this.renderVectorTiles() when done
    var self=this

    var mapConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": "#layer { polygon-fill: #FFF; }",
          "sql": this.state.sql
        }
      }]
    }

    Carto.getVectorTileTemplate(mapConfig)
      .then(function(template) {
        self.renderVectorTiles(template)
      })
  },

  renderVectorTiles(template) {
    var self=this
    
    //add a mapboxGL source for this vector tile template and associated layer(s)
    var map = this.props.map.map 

    try {   
      map.removeLayer('facilities-points')
      map.removeLayer('facilities-points-outline')
      map.removeSource('facilities-points')
    }
    catch(err) {

    }

    map.addSource('facilities-points', {
      "type": 'vector',
      "tiles": [
        template
      ]
    })

    map.addLayer({
      "id": "facilities-points-outline",
      "source": 'facilities-points',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
        "circle-radius": {
          "stops": [
            [10,3],
            [15,7]
          ]
        },
        "circle-color": "#012700",
        "circle-opacity": 0.7
      }
    })

    map.addLayer({
      "id": "facilities-points",
      "source": 'facilities-points',
      "source-layer": "layer0",
      "type": "circle",
      "paint": {
        "circle-radius": {
          "stops": [
            [10,2],
            [15,6]
          ]
        },
        "circle-color": 'steelblue',
        "circle-opacity": 0.7
      }
    })

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['facilities-points'] });
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    }) 

    //populate right sidebar on click
    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['facilities-points'] });

      if (!features.length) return
    
      self.buildSelections(e.lngLat, features)
    })
  },

  render() {
    return <div></div>
    // return(
    //   <FacLayerSelector 
    //     updateSQL={this.updateSQL}
    //     sql={this.state.sql}
    //     sqlConfig={this.sqlConfig}
    //     facilitiesLayers={this.layerStructure}
    //   />
    // )
  }
})

module.exports = DummyDataLayer