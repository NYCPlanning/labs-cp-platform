import React from 'react'

var Component = React.createClass({

  componentDidMount() {
    var self=this 

    var map = this.map = new L.Map(this.refs.map, {
      center: [40.71,-73.934555],
      zoomControl: false,
      zoom: 11,
      maxZoom: 18,
      minZoom: 10
    })


    //add zoom control
    L.control.zoom({
         position:'topright'
    }).addTo(map);

    var MyControl = L.Control.extend({
      options: {
        position: 'topright'
      },

      onAdd: function (map) {
        // create the control container with a particular class name
        // ** you can add the image to the div as a background image using css
        var container = L.DomUtil.create('div', 'map-loader');
        container.innerHTML = `
          <div class="spinner-container">
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
          </div>`

        return container;
      }
    });

    map.addControl(new MyControl());

  
    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>' })
      .addTo(map)
  },

  render() {
    return(
      <div id="map" ref="map"/> 
    )
  }
})

module.exports=Component