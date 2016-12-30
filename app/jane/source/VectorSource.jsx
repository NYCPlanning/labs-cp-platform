import React from 'react'
import Carto from '../../helpers/carto.js'

const VectorSource = React.createClass({

  componentWillMount() {
    this.map = this.props.map.mapObject
    //fetch data if necessary, add layer to map
    if (!this.props.source.tiles) {
      this.fetchData()
    } 
  },

  componentDidUpdate() {
    console.log('source did update')
  },

  fetchData() {
    const self=this

    Carto.getVectorTileTemplate(this.props.source.mapConfig)
      .then(function(template) {
        self.addSource(template)
      })
  },

  addSource(template) {
    this.map.addSource(this.props.source.id, {
      type: 'vector',
      tiles: [template]
    })
    
    console.log(this.map.getStyle())
    this.props.onLoaded(this.map.getStyle().sources)
  },

  render() {
    return null
  }
})

export default VectorSource