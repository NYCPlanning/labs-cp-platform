// ChoroplethLayer.jsx - Creates a Leaflet Choropleth Layer by aggregating point data
// The component does a sql API call aggregating point data and gets geojson back
// This component should be a sibling to CartoMap, the parent should grab the Leaflet map object from CartoMap so it can be passed here as props
//For now it only counts rows, TODO specify other aggregate functions, most likely SUM of a specific column

// Props:
//   mapObject - the Leaflet map object to render the choropleth in
//   sql - the sql query of point data.  The component will use a CTE to aggregate by a known geometry column
//   geom - 'cd', 'nta', 'boro' the geometry type to use in the choropleth
//   visible - boolean, whether the choropleth layer should be visible on the map

import React from 'react'
import Numeral from 'numeral'

import carto from '../helpers/carto.js'
import NycGeom from '../helpers/NycGeom.js'


var ChoroplethLayer = React.createClass({

  componentDidMount() {
    //create the layer, but don't add it to the map
    this.updateLayer(this.props.sql)
  },

  componentWillReceiveProps(nextProps) {
    var self=this
    //if new sql or new geom, updateLayer()
    if ((nextProps.sql != this.props.sql) || (nextProps.geom != this.props.geom)) {
      this.updateLayer(nextProps.sql, nextProps.geom, nextProps.visible)
    } else {
      //if no change in sql or geom, just show or hide based on visible
      if (nextProps.visible) {
        this.layer.addTo(nextProps.mapObject)
        if (!this.legend._map) this.legend.addTo(nextProps.mapObject)
      } else {
        if (this.layer) nextProps.mapObject.removeLayer(this.layer)
        if (this.legend && this.legend._map) nextProps.mapObject.removeControl(this.legend)
      }
    }
  },

  updateLayer(sql, geom = 'cd', visible) {
    var self=this
 
    var config = NycGeom.getGeomConfig(geom)

    //first get data
    var spatialQuery = `WITH points as (${sql}) 
    SELECT polygons.${config.column}, polygons.the_geom, SUM(points.dcp_units_use_map) as aggregate
    FROM ${config.dataset} polygons, points 
    WHERE points.${config.column} = polygons.${config.column}::text 
    GROUP BY polygons.cartodb_id`


    carto.SQL(spatialQuery)
      .then(function(data) {
        if (self.layer) self.props.mapObject.removeLayer(self.layer)
        if (self.legend && self.legend._map) self.props.mapObject.removeControl(self.legend)
        self.layer = L.choropleth(data, {
            valueProperty: 'aggregate', // which property in the features to use
            scale: ['lightblue', 'darkblue'], // chroma.js scale - include as many as you like
            steps: 8, // number of breaks or steps in range
            mode: 'q', // q for quantile, e for equidistant, k for k-means
            style: {
                color: '#fff', // border color
                weight: 2,
                fillOpacity: 0.8
            },
            onEachFeature: function(feature, layer) {
              layer.on({
                mouseover: self.showInfoWindow,
                mousemove: self.moveInfoWindow,
                mouseout: self.hideInfoWindow
              })
            }
        })

        if (visible) self.layer.addTo(self.props.mapObject) 

          // Legend pulled right from the example... reactify it
          // Add legend (don't forget to add the CSS from index.html)
          self.legend = L.control({ position: 'bottomright' })
          self.legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend')
            var limits = self.layer.options.limits
            var colors = self.layer.options.colors
            var labels = []

            // Add min & max
            div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
              <div class="max">' + limits[limits.length - 1] + '</div></div>'

            limits.forEach(function (limit, index) {
              labels.push('<li style="background-color: ' + colors[index] + '"></li>')
            })

            div.innerHTML += '<ul>' + labels.join('') + '</ul>'
            return div
          }

          if(visible) self.legend.addTo(self.props.mapObject)
      })
  },

  showInfoWindow(e, layer) {
    var d = e.target.feature.properties
    //get the geomId
    var column = NycGeom.getGeomConfig(this.props.geom).column
    //get the name of this geom
    var geomName = NycGeom.getGeomName(this.props.geom, d[column])


    //populate the content of the infowindow
    $('.choropleth').html(`
      <div class="cartodb-tooltip-content-wrapper">
        <div class="cartodb-tooltip-content">
          <div class="name">${geomName}</div>
          <div>Incremental Units: ${Numeral(d.aggregate).format('0,0')} </div>
        </div>
      </div>
    `)

    var point = e.containerPoint
    point.x += 10
    point.y += 10
    $('.choropleth').stop().css('top',point.y + 'px').css('left',point.x + 'px').fadeIn(50)
  },

  moveInfoWindow(e) {
    var point = e.containerPoint
    point.x += 10
    point.y += 10
    $('.choropleth').css('top',point.y + 'px').css('left',point.x + 'px')
  },

  hideInfoWindow() {
    $('.choropleth').fadeOut(50)
  },

  render() {
    return (
      <div className="cartodb-tooltip choropleth"/>
    )
  }
})

module.exports = ChoroplethLayer