//MapboxGLMap.jsx - MapboxGL Map Component specific to capital projects explorer
//TODO - Make this a generic MapboxGL Map Component and move cpdb-specific logic to the explorer Component
//Props:
//  data - 
//  handleClick() - function to be called when the user clicks on the map

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'
import turf from 'turf'
import extent from 'turf-extent'

import Search from './Search.jsx'
import LocationWidget from '../common/LocationWidget.jsx'
import Popup from './Popup.jsx'

import Agencies from '../helpers/agencies.js'
import carto from '../helpers/carto.js'

import '../../stylesheets/common/MapboxGLMap.scss'

var MapboxGLMap = React.createClass({
  getInitialState() {
    return {
      basemap: 'light',
      clickFeatures: [],
      clickLngLat: {
        lat: 0,
        lng: 0
      }
    }
  },

  componentDidMount() {
    var self=this

    carto.getVectorTileUrls([
        'https://carto.capitalplanning.nyc/user/cpadmin/api/v2/viz/92bc20a0-9a27-11e6-b600-0242ac110002/viz.json',
        'https://carto.capitalplanning.nyc/user/cpadmin/api/v2/viz/ad142984-9a27-11e6-b600-0242ac110002/viz.json',
    ])
      .then(function(templates) {
        self.templates = templates
        self.renderMap();
      })
    
  },

  //given a feature, fly the map to it and show a pop-up over its centroid
  flyMap(e, {suggestion}) {
    var self=this;

    var feature = suggestion;

    this.map.flyTo({
      center: feature.geometry.coordinates,
      zoom: 15
    })

    this.setState({
      clickFeatures: [
        feature
      ],
      clickLngLat: feature.geometry.coordinates
    })
  },

  setBasemap(style) {
    this.setState({
      basemap: style
    })
    this.map.setStyle('mapbox://styles/mapbox/' + style + '-v9')
  },

  applyFilters(filters) {


    this.map.setFilter('points', filters);
    this.map.setFilter('points-outline', filters);
    this.map.setFilter('polygons', filters);
  },

  renderMap() {
    var self=this;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q';
    var map = this.map = new mapboxgl.Map({
        container: 'mapboxGLmap',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 10,
        minZoom: 10,
        center: [-74.024849,40.705628],
        pitch: 0
    });

    map.addControl(new mapboxgl.NavigationControl({position: 'bottom-right'}));
  
 
    $('.mapboxgl-ctrl-bottom-right')
      .prepend('<div class="mapboxgl-ctrl-group mapboxgl-ctrl"><button class="location-control" type="button"><i class="fa fa-crosshairs" aria-hidden="true"></i></button></div>')
      .click(function() {
        self.refs.LocationWidget.zoomMap()
      })



    

    this.map.on('style.load', function() {

      //add vector tile data sources from carto
      map.addSource('pointFeatures', {
        'type': 'vector',
        "tiles": [
          self.templates[0]
        ]
      })

      map.addSource('polygonFeatures', {
        'type': 'vector',
        "tiles": [
          self.templates[1]
        ]
      })

      //add geojson layer to gray areas outside of NYC
      $.getJSON('data/greyOutsideNYC.geojson', function(data) {
          map.addSource('grey-outside', {
          type: 'geojson',
          data: data
        })

        map.addLayer({
          "id": "grey-outside",
          "type": "fill",
          "source": "grey-outside",
          "paint": {
            'fill-color': '#000',
            'fill-opacity': 0.15   
          }
        });          
      })
      

      //add map layers based on the data sources above
      //points gets two layers, one for fill, one for a pseudo-stroke

      map.addLayer({
        "id": "polygons",
        'type':'fill',
        "source": 'polygonFeatures',
        "source-layer": "layer0",
        'paint': {
            'fill-color': Agencies.mapboxGLStyle,
            'fill-opacity': 0.75,
            //'fill-outline-color': '#838763',
            'fill-antialias': true 
        }
      });

      map.addLayer({
        "id": "points-outline",
        "source": 'pointFeatures',
        "source-layer": "layer0",
        "type": "circle",
        "paint": {
            "circle-radius": {
              "stops": [
                [10,2],
                [15,6]
              ]
            },
            "circle-color": '#838763',
            "circle-opacity": 0.3
        }
      });

      map.addLayer({
        "id": "points",
        "source": 'pointFeatures',
        "source-layer": "layer0",
        "type": "circle",
        "paint": {
            "circle-radius": {
              "stops": [
                [10,1],
                [15,5]
              ]
            },
            "circle-color": Agencies.mapboxGLStyle,
            "circle-opacity": 0.75
        }
      });


      //popup on click
      map.on('click', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['points', 'polygons'] });

          if (!features.length) {
              return;
          }

          self.setState({
            clickFeatures: features,
            clickLngLat: e.lngLat
          })
      });

      map.on('move', function(e) {
        if(self.refs.popup) {
          self.refs.popup.forceUpdate()
        } 
      })

      //highlight on hover
      map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['points', 'polygons'] });
     
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      })  
    })

    //force update after the map initializes so that the locationwidget will mount
    this.forceUpdate()
  },

  setViewToFeature(feature) {
    this.flyMap(null, {suggestion: feature})
  },

  render() {
    //dynamically create a legend
    var legendItems = Agencies.agencies.map(function(agency,i) {
      return (
          <div key={i} className='legendItem'>
            <div className='colorBox' style={{'backgroundColor': agency.color}}/>
            <div className='legendItemText'>{agency.name} - ({agency.acronym})</div> 
          </div>
      )
    })

    //hack to move "others" to the bottom of the legend, it must be first in the array to be a catchall for mapbox gl symbology
    var others = legendItems.shift()
    legendItems.push(others)

    //draw map, legend, basemap toggle, and searchbox
    return(
      <div id='mapboxGLmap' ref='map'>
        <div className='legend mapOverlay'>
          <h4>Sponsor Agency</h4>
          {legendItems}
        </div>
      {/*TODO: Make this a component so it can be easily added to other maps*/}
        <div className='basemap mapOverlay'>
          <h4>Basemap</h4>
          <ButtonGroup>
            <Button active={this.state.basemap=='light'} onClick={this.setBasemap.bind(this, 'light')} bsSize="xsmall"> Streets</Button>
            <Button active={this.state.basemap=='satellite'} onClick={this.setBasemap.bind(this, 'satellite')} bsSize="xsmall"> Aerial</Button>
          </ButtonGroup>
        </div>
        <div className='search mapOverlay'>
          <Search 
            data={{}}
            onSuggestionSelected={this.flyMap}/>
        </div>
      
        {
          this.map ? 
            <Popup 
              features={this.state.clickFeatures} 
              lngLat={this.state.clickLngLat} 
              map={this.map}
              ref={'popup'}
              handleClick={this.props.handleClick}/> :
            null
        }
        { this.map ? <LocationWidget type='mapboxGL' map={this.map} ref='LocationWidget'/> : null }
      </div>
    )
  },
})

module.exports=MapboxGLMap;