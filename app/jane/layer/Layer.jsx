import React from 'react'

const Layer = React.createClass({

  componentDidMount() {
    console.log('Layer did mount')

    this.map = this.props.map.mapObject

    this.props.config.mapLayers.map((mapLayer) => {
      this.map.addLayer(mapLayer)
    })

    this.props.onLoaded()
  },

  componentWillUnmount() {
    console.log('layer is unmounting!')
    this.props.config.mapLayers.map((mapLayer) => {
      this.map.removeLayer(mapLayer.id)
    })
  },

  render() {

    return (
      <div>
       
      </div>
    )
  }
})

export default Layer