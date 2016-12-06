//Community Districts Layer
import React from 'react'

var CdLayer = React.createClass({
  componentDidMount() {
    //TODO write a method in the carto helper class for this kind of post.  getLayerGroupId()?

    var mapConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": "#dcp_cdboundaries{ polygon-fill: #FF5C00; polygon-opacity: 0; line-color: #000000; line-width: 3; line-opacity: 0.5; line-dasharray: 10, 5; } #dcp_cdboundaries::labels { text-name: [borocd]; text-face-name: 'DejaVu Sans Book'; text-size: 15; text-label-position-tolerance: 10; text-fill: #000; text-halo-fill: #FFF; text-halo-radius: 2.5; text-dy: 0; text-allow-overlap: true; text-placement: point; text-placement-type: simple; }",
          "sql": "select * from dcp_cdboundaries"
        }
      }]
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(mapConfig),
      url: 'https://carto.capitalplanning.nyc/user/cpadmin/api/v1/map',
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
    this.props.map.removeLayer('cdboundaries')
    this.props.map.removeSource('cdboundaries')
  },

  addLayer(layergroupid) {
    this.props.map.addSource('cdboundaries', {
      type: 'raster',
      tiles: ['https://carto.capitalplanning.nyc/user/cpadmin/api/v1/map/' + layergroupid + '/{z}/{x}/{y}.png'],
      tileSize: 256
    })

    this.props.map.addLayer({
      "id": "cdboundaries",
      "type": "raster",
      "source": "cdboundaries",
      "minzoom": 0,
      "maxzoom": 22
    })
  },

  render() {
    return null
  }
})

module.exports=CdLayer