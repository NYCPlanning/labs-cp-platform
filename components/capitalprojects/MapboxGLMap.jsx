import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'
import turf from 'turf'
import extent from 'turf-extent'

import Agencies from '../../helpers/agencies.js'
import Search from './Search.jsx'
import carto from '../../helpers/carto.js'


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

    console.log('applying Filters', filters)

    this.map.setFilter('points', filters);
    this.map.setFilter('points-outline', filters);
    this.map.setFilter('polygons', filters);
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

  renderMap() {
    var self=this;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q';
    var map = this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 10,
        minZoom: 10,
        center: [-74.024849,40.705628],
        pitch: 0
    });

    map.addControl(new mapboxgl.Navigation());

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
        console.log(data)
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
            'fill-color': Agencies.agencyColors,
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
            "circle-color": Agencies.agencyColors,
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

        // if (features.length) {
        //   map.setFilter("polygons-hover", ["==", "guid", features[0].properties.guid]);
        //   map.setFilter("points-hover", ["==", "guid", features[0].properties.guid]);
        // } else {
        //   map.setFilter("points-hover", ["==", "guid", ""]);
        //   map.setFilter("polygons-hover", ["==", "guid", ""]);
        // }


      })      
    })
  },

  render() {
    //dynamically create a legend
    var legendItems = Agencies.agencyColors.stops.map(function(stop,i) {
      return (
          <div key={i} className='legendItem'>
            <div className='colorBox' style={{'backgroundColor': stop[1]}}/>
            <div className='legendItemText'>{stop[0]}</div> 
          </div>
      )
    })

    //hack to move "others" to the bottom of the legend, it must be first in the array to be a catchall for mapbox gl symbology
    var others = legendItems.shift()
    legendItems.push(others)

    //draw map, legend, basemap toggle, and searchbox
    return(
      <div id='map' ref='map'>
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
            data={this.props.data}
            onSuggestionSelected={this.flyMap}/>
        </div>
      
        {
          this.map ? 
            <ProjectsPopup 
              features={this.state.clickFeatures} 
              lngLat={this.state.clickLngLat} 
              map={this.map}
              ref={'popup'}
              handleClick={this.props.handleClick}/> :
            null
        }
        
        
      </div>
    )
  },
})


module.exports=MapboxGLMap;

//Component for popups, takes an array of features, renders static HTML
var ProjectsPopup = React.createClass({
  showDetails(feature) {
    this.props.handleClick(feature)
  },

  getInitialState() {
    return({
      visible:true
    })
  },

  componentWillReceiveProps() {
    this.setState({
      visible: true
    })
  },

  hide() {
    this.setState({
      visible: false
    })
  },

  render() {
    var self=this



    var point = this.props.map.project(this.props.lngLat)

    var rows=this.props.features.map(function(feature, i) {
      var d=feature.properties
      return (
        <div className='popupRow' key={i} onClick={self.showDetails.bind(self, feature)}>
          
          <span className={'badge'} style={{'backgroundColor': Agencies.getAgencyColor(d.sagency)}}>{d.sagency}</span> 
          {d.projectid} - {d.name} <i className="fa fa-angle-right" aria-hidden="true"></i> 
          
        </div>
      ) 
    })

    if(this.state.visible) {
      return (
        <div className={'popup mapOverlay'} style={{'left': point.x, 'top': point.y}}>
          <div className='popupRowContainer'>
            <div className="closeButton" onClick={this.hide}>&#10006;</div>
           {rows}
          </div>
        </div>
      )      
    } else {
      return <div></div>
    }

  }
})

