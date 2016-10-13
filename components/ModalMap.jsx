import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'
import turf from 'turf'
import extent from 'turf-extent'


import Search from './Search.jsx'



//object used in mapboxgl data-driven styling
var agencyColors = {
  property: 'sponsoragency',
  type: 'categorical',
  stops: [
    ['Others','#8dd3c7'],
    ['SCA','#ffffb3'],
    ['DOT','#bebada'],
    ['DEP','#fb8072'],
    ['DCLA','#80b1d3'],
    ['NYPL','#fdb462'],
    ['BPL','#b3de69'],
    ['DPR','#fccde5'],
    ['DCAS','#d9d9d9'],
    ['FDNY','#bc80bd']
  ]
}

//uses the agencyColors object for one-off color assignments
//used for adding inline styles to non-map things
function getAgencyColor(agency) {
  var match = agencyColors.stops.filter(function(stop) {
    return stop[0] == agency;
  })
  return match.length>0 ? match[0][1] : '#8dd3c7';
}

var Map = React.createClass({
  getInitialState() {
    return {
      basemap: 'light'
    }
  },

  flyMap() {
    var self=this;

    var feature = this.props.data;

    //single points get flyTo(), everything else gets fitBounds()
    if(feature.geometry.type=='MultiPoint' && feature.geometry.coordinates.length == 1) {
      this.map.flyTo({
        center: feature.geometry.coordinates[0],
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

    //dynamically create a legend
    var legendItems = agencyColors.stops.map(function(stop,i) {
      return (
          <div key={i} className='legendItem'>
            <div className='colorBox' style={{'backgroundColor': stop[1]}}/>
            <div className='legendItemText'>{stop[0]}</div> 
          </div>
      )
    })

    //draw map, legend, basemap toggle, and searchbox
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

      if(self.props.data.geometry.type == 'MultiPoint') {
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
              "circle-color": '#8dd3c7',
              "circle-color": agencyColors,
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
              'fill-color': agencyColors,
              'fill-opacity': 0.8,
          }
          
        });
      }

      self.flyMap()
    })
  }
});

module.exports=Map;