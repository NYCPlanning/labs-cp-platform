import React from 'react'

var Component = React.createClass({

  componentDidMount() {
    var self=this 

    var map = new L.Map(this.refs.map, {
      center: [40.71,-73.934555],
      zoomControl: false,
      zoom: 11
    })

    //add zoom control
    L.control.zoom({
         position:'topright'
    }).addTo(map);

    //add positron basemap
    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' })
      .addTo(map)

  

      cartodb.createLayer(map, this.props.vizJson)
        .addTo(map)
        .on('done', function(layer) {
          self.cartoLayer = layer.getSubLayer(0)

          layer
            .on('featureOver', function(e, latlng, pos, data) {
              $('#map').css('cursor','pointer');
            })
            .on('featureOut', function(e, latlng, pos, data) {
              $('#map').css('cursor','-webkit-grab'); 
            })
            .on('featureClick', self.props.handleFeatureClick)

        })
        .on('error', function(err) {
          alert("some error occurred: " + err);
        });
  
    
  },

  setSQL(sql) {
    this.cartoLayer.setSQL(sql)
  },

  render() {
    return(
      <div id="map" ref="map">
      </div>
    )
  }
})

module.exports=Component