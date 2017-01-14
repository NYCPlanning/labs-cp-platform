//CartoLayer.jsx - Instantiates a carto anonymous map (tile layer), returns a TileLayer
import React from 'react'
import TileLayer from './TileLayer.jsx'

import appConfig from '../../helpers/appConfig.js'

const CartoLayer = React.createClass({

  componentDidMount() {

    var mapConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": this.props.options.cartocss,
          "sql": this.props.options.sql
        }
      }]
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(mapConfig),
      url: `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v1/map`,
      dataType : "text",
      contentType: "application/json",
      success: function(data) { 
        data = JSON.parse(data);
        var layergroupid = data.layergroupid
        this.tiles=`https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v1/map/${layergroupid}/{z}/{x}/{y}.png`
        this.forceUpdate()
      }.bind(this)
    })
  },

  render() {
    return this.tiles ? 
      <TileLayer 
        map={this.props.map}
        id={this.props.id} 
        tiles={this.tiles}/> : 
      null
  }
})

module.exports=CartoLayer
