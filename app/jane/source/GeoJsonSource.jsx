import React from 'react'

const GeoJsonSource = React.createClass({

  componentWillMount() {
    this.map = this.props.map.mapObject
    //fetch data if necessary, add layer to map
    if (!this.props.source.data) {
      this.fetchData()
    } else {
      this.data = this.props.source.data
      this.addSource()
    }
  },

  fetchData() {
    const self=this

    $.getJSON(this.props.source.source)
      .then((data) => {
        self.data = data
        self.addSource()
      })
  },

  addSource() {
    this.map.addSource(this.props.source.id, {
      type: 'geojson',
      data: this.data
    })
    
    this.props.onLoaded(this.map.getStyle().sources)
  },

  render() {
    return null
  }
})

export default GeoJsonSource