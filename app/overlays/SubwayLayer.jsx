//Instantiates a carto named map for subways, renders a TileLayer
import React from 'react'
import TileLayer from './TileLayer.jsx'

var SubwayLayer = React.createClass({
  componentDidMount() {
    //TODO write a method in the carto helper class for this kind of post.  getLayerGroupId()?

    $.ajax({
      type: 'POST',
      url: 'https://cwhong.carto.com/api/v1/map/named/tpl_230e29ac_7640_11e6_89c5_0e05a8b3e3d7',
      dataType : "text",
      contentType: "application/json",
      success: function(data) { 
        data = JSON.parse(data);
        var layergroupid = data.layergroupid
        this.tiles = 'https://cwhong.carto.com/api/v1/map/' + layergroupid + '/{z}/{x}/{y}.png'
        this.forceUpdate()
      }.bind(this)
    })
  },

  render() {
    return this.tiles ? 
      <TileLayer 
        map={this.props.map}
        name={'subways'} 
        tiles={this.tiles}/> : 
      null
  }
})

module.exports=SubwayLayer

