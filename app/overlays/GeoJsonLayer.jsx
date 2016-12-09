//Community Districts Layer
import React from 'react'

var GeoJsonLayer = React.createClass({
  componentDidMount() {
    var self=this

    if(!this.data) {
      $.getJSON(this.props.source)
        .then(function(data) {
          self.data = data
          self.addLayer()
        })      
      } else {
        self.addLayer()
      }
  },

  componentWillUnmount() {
    //remove the source and the layer
    this.props.map.removeLayer(this.props.id)
    this.props.map.removeSource(this.props.id)
  },

  addLayer() {
    this.props.map.addSource(this.props.id, {
      type: 'geojson',
      data: this.data
    })

    this.props.map.addLayer(this.props.layer)
  },

  render() {
    return null
  }
})

module.exports=GeoJsonLayer