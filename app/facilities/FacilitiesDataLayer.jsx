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

import FacLayerSelector from './FacLayerSelector.jsx'

import facilitiesLayers from './facilitiesLayers.js'
import Carto from '../helpers/carto.js'


var FacilitiesDataLayer = React.createClass({

  componentWillMount() {
    var self=this

    this.sqlConfig = {
      columns: 'cartodb_id, the_geom_webmercator, domain, facilitygroup, facilitysubgroup, facilityname, address, facilitytype',
      tablename: 'hkates.facilities_data'
    }
    
    let sql = ''

    //update initial state and the layer structure based on mode
    if (this.props.mode != 'all') {
      sql=`SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename} WHERE domain ILIKE '${this.props.mode.substr(0,4)}%'`
      
      this.layerStructure = facilitiesLayers.filter(function(layer) {
        return (layer.slug == self.props.mode)
      })
    } else {
      //if map mode is 'all', initialSQL has no WHERE, and layerStructure is unchanged
      sql=`SELECT ${this.sqlConfig.columns} FROM ${this.sqlConfig.tablename}`
      this.layerStructure=facilitiesLayers
    }

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
        self.props.updateLegend('facilities', legendContent)
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
        "circle-color": this.getColorObject(),
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

  getColorObject() {
    //generate a mapboxGL style categorical color object based on mode
    if(this.props.mode=='all') {
      return {
        property: 'domain',
        type: 'categorical',
        stops: this.layerStructure.map(function(layer) {
          return [
            layer.name,
            layer.color
          ]
        })
      }
    } else {
      return {
        property: 'facilitygroup',
        type: 'categorical',
        stops: this.layerStructure[0].children.map(function(layer) {
          return [
            layer.name,
            layer.color
          ]
        })
      }
    }
  },

  getColor(value) {
    var colorObject = this.getColorObject()
    
    return colorObject.stops.filter((stop) => stop[0] == value)[0][1]
  },

  buildSelections(lngLat, features) {
    var self=this
    //builds content for the popup, sends it to the map

    var content = features.map(
      (feature, i) => {
        const d = feature.properties

        return (
          <Link
            key={i}
            to={{
              pathname: `/facilities/${d.cartodb_id}`,
              state: { modal: true, returnTo: '/facilities/all'}
            }}
          >
            <ListItem
              primaryText={d.facilityname}
              secondaryText={d.address + ' | ' + d.facilitytype}
              leftIcon={
                <div 
                  className={'color-circle'} 
                  style={{
                    'backgroundColor': this.props.mode == 'all' ? this.getColor(d.domain) : this.getColor(d.facilitygroup),
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

  updateSQL(sql) {
    //set this.state.sql to the new sql, remove layers from the map, re-load layers

    var self=this

    this.setState({
      sql: sql
    }, function() {

      var map = self.props.map.map
      map.removeLayer('facilities-points')
      map.removeLayer('facilities-points-outline')
      map.removeSource('facilities-points')
      self.instantiateVectorTiles()      
    })
  },

  render() {
    return(
      <FacLayerSelector 
        updateSQL={this.updateSQL}
        sql={this.state.sql}
        sqlConfig={this.sqlConfig}
        facilitiesLayers={this.layerStructure}
      />
    )
  }
})

module.exports = FacilitiesDataLayer