//Adds a tile layer to the map
import React from 'react'

var TileLayer = React.createClass({
  componentDidMount() {
    this.addLayer()
  },

  componentWillUnmount() {
    //remove the source and the layer
    this.props.map.removeLayer(this.props.id)
    this.props.map.removeSource(this.props.id)
  },

  addLayer(layergroupid) {
    this.props.map.addSource(this.props.id, {
      type: 'raster',
      tiles: [this.props.tiles],
      tileSize: 256
    })

    this.props.map.addLayer({
      "id": this.props.id,
      "type": "raster",
      "source": this.props.id
    })
  },

  render() {
    return null
  }
})

module.exports=TileLayer