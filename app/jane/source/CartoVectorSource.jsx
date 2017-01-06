import React from 'react'
import Carto from '../../helpers/carto.js'

const CartoVectorSource = React.createClass({

  componentWillMount() {
    this.map = this.props.map.mapObject
    //fetch data if necessary, add layer to map
    if (!this.props.source.tiles) {
      this.fetchData(this.props.source.sql)
    } 
  },

  componentWillReceiveProps(nextProps) {
    //compare sql

    if(!(nextProps.source.sql == this.props.source.sql)) {
      this.fetchData(nextProps.source.sql)
    }
  },

  componentWillUnmount() {
    this.removeSource()
  },

  fetchData(sql) {
    const self=this

    const mapConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": "#layer { polygon-fill: #FFF; }",
          "sql": sql
        }
      }]
    }

    Carto.getVectorTileTemplate(mapConfig)
      .then(function(template) {
        self.addSource(template)
      })
  },

  addSource(template) {

    if (this.map.getSource(this.props.source.id)){
      this.map.removeSource(this.props.source.id);
    }

    this.map.addSource(this.props.source.id, {
      type: 'vector',
      tiles: [template]
    })

    console.log('Added source ' + this.props.source.id, this.map.getStyle())

    this.props.onLoaded(this.map.getStyle().sources)
  },

  removeSource() {
    this.map.removeSource(this.props.source.id)
  },

  render() {
    return null
  }
})

export default CartoVectorSource