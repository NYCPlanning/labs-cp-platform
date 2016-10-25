import React from 'react'
import turf from 'turf'
import extent from 'turf-extent'

import Agencies from '../helpers/agencies.js'





var ModalMap = React.createClass({


  flyMap() {
    var self=this;

    var feature = this.props.data;

    //single points get flyTo(), everything else gets fitBounds()
    if(feature.geometry.type=='Point') {
      this.map.flyTo({
        center: feature.geometry.coordinates,
        zoom: 14
      })
    } else {
      var bbox = extent(feature)  
      this.map.fitBounds([[bbox[0],bbox[1]],[bbox[2],bbox[3]]], {
        padding:100
      })
    }

  },

  render() {
    return(
      <div id='modalmap'>
      </div>
    )
  },



  componentDidMount() {
    this.renderMap();
  },

 
  renderMap() {
    var self=this;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q';
    var map = this.map = new mapboxgl.Map({
        container: 'modalmap',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 10,
        minZoom: 1,
        center: [-74.024849,40.705628],
        pitch: 0
    });

    this.map.on('style.load', function() {

      if(self.props.data.geometry.type == 'Point') {
        map.addSource('pointFeatures', {
          'type': 'geojson',
          'data': self.props.data
          })   

        map.addLayer({
          "id": "points",
          "source": 'pointFeatures',
          "type": "circle",
          "paint": {
              "circle-radius": {
                "stops": [
                  [10,1],
                  [15,6]
                ]
              },
              "circle-color": Agencies.agencyColors,
              "circle-opacity": 0.8
          }
        });

      } else {
        map.addSource('polygonFeatures', {
          'type': 'geojson',
          'data': self.props.data
        })      
        map.addLayer({
          "id": "polygons",
          'type':'fill',
          "source": 'polygonFeatures',
          'paint': {
              'fill-color': Agencies.agencyColors,
              'fill-opacity': 0.8,
          }
          
        });
      }

      self.flyMap()
    })
  }
});

module.exports=ModalMap;