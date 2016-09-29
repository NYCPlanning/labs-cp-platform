//DashboardMap
// Component that creates a leaflet map
// props: data - geojson to be displayed on the map
// highlightID - a property of something in the data, used to highlight a selection
// highlightFeature - function to call when highlightID is specified

import React from 'react'

var ListMap = React.createClass({
  render() {
    return(
      <div className='map' ref='map'></div>
    )
  },

  shouldComponentUpdate() {
    return false
  },


  renderData(data) {
    var self=this;

    function onEachFeature(feature, layer) {
     
      // layer.on('mouseover', function() {
      //   this.setStyle({
      //     "weight": 3.5,
      //     "color": "#FFF",
      //     "opacity": 1
      //   })
       
      // })

      // layer.on('mouseout', function() {
      //   this.setStyle(self.defaultStyle)
      // })
    }

    // if(!Array.isArray(data)) {
    //   data = [data]
    // }


    var FeatureCollection = {
          type: 'FeatureCollection',
          features: data
        }


        // //get rid of existing features
        // if(this.geojsonLayer) {
        //   this.map.removeLayer(this.geojsonLayer) 
        // }

        function style(feature) {
          return {
            fillColor: 'steelblue',
            radius: 3,
            weight: 1.5,
            opacity: 0.7,
            color: 'steelblue',
            fillOpacity: 0.7
          };
        }

        var mapOptions = {
          style: style,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 4,
              fillColor: "#FFF",
              color: "#69899f",
              weight: 0.5,
              opacity: 1,
              fillOpacity: 0.8
            });
          }
        }


        this.geojsonLayer = L.geoJson(FeatureCollection, mapOptions).addTo(this.map) 


     this.map.fitBounds(this.geojsonLayer.getBounds())   
  },

  componentDidMount() {
    console.log('Mounted')

    this.defaultStyle = {
      "weight": 0.5,
      "color":"steelblue"
    }

    this.renderMap();


  },


  componentWillReceiveProps(nextProps) {
    var self=this;
    if(nextProps.data) {
      if(JSON.stringify(nextProps.data)!=JSON.stringify(this.props.data)) {
        this.renderData(nextProps.data)
      }
    }
  },


  renderMap() {
    var self=this;
    var map = this.map = L.map(this.refs.map, {
      center: [40.7,-73.953094],
      zoom: 11,
      scrollWheelZoom: false
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{ attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>' }).addTo(map);
    L.Icon.Default.imagePath = 'https://npmcdn.com/leaflet@0.7.7/dist/images/';

    if(this.props.data && this.props.data.length > 0) {
      this.renderData(this.props.data)
    }
  }
})

module.exports=ListMap;