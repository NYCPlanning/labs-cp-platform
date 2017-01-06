import React from 'react'
import Carto from '../../helpers/carto.js'
import appConfig from '../../helpers/appConfig.js'

const CartoRasterSource = React.createClass({

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

  fetchData(sql) {
    const mapConfig = {
      "version": "1.3.0",
      "layers": [{
        "type": "mapnik",
        "options": {
          "cartocss_version": "2.1.1",
          "cartocss": this.props.source.options.cartocss,
          "sql": this.props.source.options.sql
        }
      }]
    }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(mapConfig),
      url: `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v1/map`,
      dataType : "text",
      contentType: "application/json",
      success: function(data) { 
        data = JSON.parse(data);
        const layergroupid = data.layergroupid
        const template=`https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v1/map/${layergroupid}/{z}/{x}/{y}.png`
        this.addSource(template)
      }.bind(this)
    })
  },

  addSource(template) {

    if (this.map.getSource(this.props.source.id)){
      this.map.removeSource(this.props.source.id);
    }

    this.map.addSource(this.props.source.id, {
      type: 'raster',
      tiles: [template]
    })

    this.props.onLoaded(this.map.getStyle().sources)
  },


  render() {
    return null
  }
})

export default CartoRasterSource