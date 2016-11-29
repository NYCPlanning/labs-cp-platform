//Tile Layer
import React from 'react'

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
        this.addLayer(layergroupid)
      }.bind(this)
    })
  },

  componentWillUnmount() {
    //remove the source and the layer
    this.props.map.removeLayer('subway-lines')
    this.props.map.removeSource('subway-lines')
  },

  addLayer(layergroupid) {
    this.props.map.addSource('subway-lines', {
      type: 'raster',
      tiles: ['https://cwhong.carto.com/api/v1/map/' + layergroupid + '/{z}/{x}/{y}.png'],
      tileSize: 256
    })

    this.props.map.addLayer({
      "id": "subway-lines",
      "type": "raster",
      "source": "subway-lines",
      "minzoom": 0,
      "maxzoom": 22
    })
  },

  render() {
    return null
  }
})