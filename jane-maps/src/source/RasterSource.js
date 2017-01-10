import React from 'react'
import Carto from '../Carto.js'

const RasterSource = React.createClass({

  componentWillMount() {
    this.map = this.props.map.mapObject
    //fetch data if necessary, add layer to map
    this.addSource(this.props.source.tiles)
  },

  addSource(tiles) {

    if (this.map.getSource(this.props.source.id)){
      this.map.removeSource(this.props.source.id);
    }

    this.map.addSource(this.props.source.id, {
      type: 'raster',
      tiles: [tiles]
    })

    this.props.onLoaded(this.map.getStyle().sources)
  },

  render() {
    return null
  }
})

export default RasterSource