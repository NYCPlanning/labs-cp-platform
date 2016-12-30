import React from 'react'

const Layer = React.createClass({

  componentDidMount() {

    this.map = this.props.map.mapObject

    this.map.addLayer(this.props.config)
    

    this.props.onLoaded()
  },

  componentDidUpdate() {
    console.log('Layer did update', this.props.config)
  },

  componentWillUnmount() {
    this.map.removeLayer(this.props.config.id)
  },

  render() {

    return (
      <div>
       
      </div>
    )
  }
})

export default Layer