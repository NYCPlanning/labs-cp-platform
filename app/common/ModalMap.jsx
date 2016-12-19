//ModalMap.jsx - A simple mapboxGL map for the capital projects modals
//Props:
//  data: a geojson feature whose geometry will be rendered on the map
//TODO: This is similar to SimplePointMap.jsx, maybe combine with that, or combine with a more generic MapboxGLMap.jsx

import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import extent from 'turf-extent'
import centroid from 'turf-centroid'

import appConfig from '../helpers/appConfig.js'

var ModalMap = React.createClass({
  getInitialState() {
    return {
      basemap: 'light'
    }
  },

  componentDidMount() {
    this.renderMap();
  },

  setBasemap(style) {
    this.setState({
      basemap: style
    })
    this.map.setStyle('mapbox://styles/mapbox/' + style + '-v9')
  },

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
      var bbox = extent(feature)  //use turf to get the extent of the feature
      this.map.fitBounds([[bbox[0],bbox[1]],[bbox[2],bbox[3]]], {
        padding:100
      })
    }

  },

  getCenter() {
    var feature = this.props.data;
    //single points get flyTo(), everything else gets fitBounds()
    if(feature.geometry.type=='Point') {
      return feature.geometry.coordinates
    } else {
      return centroid(feature).geometry.coordinates //get the centroid
    }
  },

  renderMap() {
    var self=this;

    mapboxgl.accessToken = appConfig.mapbox_accessToken;
    var map = this.map = new mapboxgl.Map({
        container: 'modalmap',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 12,
        minZoom: 1,
        center: this.getCenter(),
        pitch: 0
    });

    this.map.on('style.load', function() {

      if(self.props.data.geometry.type == 'Point') {

        //Implement MapboxGL Marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(/img/orange-marker.png)';
        el.style.width = '32px'
        el.style.height = '32px'
        el.style.zIndex = 10

        new mapboxgl.Marker(el, {
          offset: [-16,-32]
        })
          .setLngLat(self.props.data.geometry.coordinates)
          .addTo(map);

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
              'fill-color': 'steelblue',
              'fill-opacity': 0.8,
          }
          
        });
      }

      self.label = new mapboxgl.Popup({
        offset: [0,0],
        anchor: 'left',
        closeButton: false,
        closeOnClick: false
      })
        .setLngLat(self.props.data.geometry.coordinates)
        .addTo(self.map)
        .setHTML("<p>" + self.props.label + "</p>")

      self.flyMap()
    })
  },

  render() {
    return(
      <div id='modalmap' style={{height: 450}}>
        <div className='basemap mapOverlay'>
          <h4>Basemap</h4>
          <ButtonGroup>
            <Button active={this.state.basemap=='light'} onClick={this.setBasemap.bind(this, 'light')} bsSize="xsmall"> Streets</Button>
            <Button active={this.state.basemap=='satellite'} onClick={this.setBasemap.bind(this, 'satellite')} bsSize="xsmall"> Aerial</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  },


});

module.exports=ModalMap;