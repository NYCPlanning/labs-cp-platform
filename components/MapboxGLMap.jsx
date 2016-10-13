import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {ButtonGroup, Button, Badge} from 'react-bootstrap'
import Search from './Search.jsx'
import turf from 'turf'
import extent from 'turf-extent'

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
      basemap: 'light',
      clickFeatures: [],
      clickLngLat: {
        lat: 0,
        lng: 0
      }
    }
  },

  //given a feature, fly the map to it and show a pop-up over its centroid
  //TODO have it only take a feature, not the two arguments being passed in from <Search/>
  flyMap(e, {suggestion}) {
    var self=this;

    var feature = suggestion;

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

    // //draw a popup
    // //TODO this should be its own method
    // if( this.popup ) this.popup.remove()

    // this.popup = new mapboxgl.Popup({
    //   anchor: 'left'
    // })
    //   .setLngLat(turf.centroid(feature).geometry.coordinates)
    //   .setHTML(self.renderPopup([feature]))
    //   .addTo(self.map);
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
      <div id='map' ref='map'>
        <div className='legend mapOverlay'>
          <h4>Managing Agency</h4>
          {legendItems}
        </div>
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

  setBasemap(style) {
    this.setState({
      basemap: style
    })
    this.map.setStyle('mapbox://styles/mapbox/' + style + '-v9')
  },

  updateSources(data) {
    var map = this.map;

    //split FeatureCollection with mixed MultiPoint and MultiPolygon data into two discrete FCs
    this.splitGeomTypes(data)

    map.getSource('pointFeatures').setData(this.PointFeatureCollection)
    map.getSource('polygonFeatures').setData(this.PolygonFeatureCollection)

  },

  componentWillReceiveProps(nextProps) {
    this.updateSources(nextProps.data)
  },

  componentDidMount() {
    this.splitGeomTypes(this.props.data)
    this.renderMap();
  },

  splitGeomTypes(data) {
    this.PointFeatureCollection = {
        type: 'FeatureCollection',
        features: data.filter(function(feature) {
          if (feature.geometry) {
            return feature.geometry.type == 'MultiPoint' || feature.geometry.type == 'Point'
          }
          
        })
      }

    this.PolygonFeatureCollection = {
        type: 'FeatureCollection',
        features: data.filter(function(feature) {
          if (feature.geometry) {
            return feature.geometry.type == 'MultiPolygon' || feature.geometry.type == 'Polygon'
          }
          
        })
      }
  },

  // renderPopup(features) {
  //   return ReactDOMServer.renderToStaticMarkup(<ProjectsPopup features={features}/>)
  // },

  renderMap() {
    var self=this;

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q';
    var map = this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 10,
        minZoom: 1,
        center: [-74.024849,40.705628],
        pitch: 0
    });

    this.map.on('style.load', function() {
      map.addSource('pointFeatures', {
          'type': 'geojson',
          'data': self.PointFeatureCollection
        })

      map.addSource('lineFeatures', {
        'type': 'geojson',
        'data': self.LineFeatureCollection
      })

      map.addSource('polygonFeatures', {
        'type': 'geojson',
        'data': self.PolygonFeatureCollection
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
            "circle-opacity": 0.6
        }
      });

      map.addLayer({
        "id": "points-hover",
        "source": 'pointFeatures',
        "type": "circle",
        "paint": {
            "circle-radius": {
              "stops": [
                [10,2],
                [15,8]
              ]
            },
            "circle-color": '#8dd3c7',
            "circle-color": agencyColors,
            "circle-opacity": 0.9
        }
      });

      map.addLayer({
        "id": "polygons",
        'type':'fill',
        "source": 'polygonFeatures',
        'paint': {
            'fill-color': agencyColors,
            'fill-opacity': 0.6,
        }
        
      });

      map.addLayer({
        "id": "polygons-hover",
        'type':'fill',
        "source": 'polygonFeatures',
        'paint': {
            'fill-color': agencyColors,
            'fill-opacity': 0.9,
        },
        "filter": ["==", "guid", ""]
        
      });

      //popup on click
      map.on('click', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['points', 'polygons'] });
          if (!features.length) {
              return;
          }

          console.log(e)

          //create popup outside of Map component so it can include dynamic links
          // self.props.onClick(features)

        

          // // Populate the popup and set its coordinates
          // // based on the feature found.
          // new mapboxgl.Popup({
          //   anchor: 'left'
          // })
          //   .setLngLat(e.lngLat)
          //   .setHTML(self.renderPopup(features))
          //   .addTo(map);

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

        if (features.length) {
          map.setFilter("polygons-hover", ["==", "guid", features[0].properties.guid]);
          map.setFilter("points-hover", ["==", "guid", features[0].properties.guid]);
        } else {
          map.setFilter("points-hover", ["==", "guid", ""]);
          map.setFilter("polygons-hover", ["==", "guid", ""]);
        }


      }) 



    })
  },


})


//Component for popups, takes an array of features, renders static HTML
var ProjectsPopup = React.createClass({
  showDetails(feature) {
    this.props.handleClick(feature.properties.guid)
  },

  render() {
    var self=this



    var point = this.props.map.project(this.props.lngLat)

    var rows=this.props.features.map(function(feature, i) {
      var d=feature.properties
      return(
        <div className='popupRow' key={i}>
          
          <span className={'badge'} style={{'backgroundColor': getAgencyColor(d.sponsoragency)}}>{d.sponsoragency}</span> 
          {d.projectname}
          <div onClick={self.showDetails.bind(self, feature)} className='btn btn-default btn-xs' style={{'color': getAgencyColor(d.sponsoragency)}}>Details</div>
        </div>
      ) 
    })
    return(<div className={'popup mapOverlay'} style={{'left': point.x, 'top': point.y}}>
      <div className='popupRowContainer'>
       {rows}
      </div>
    </div>)
  }
})

// var PopUp = React.createClass({
//   render() {

//     console.log(this.props.clickFeatures)

//     // if(this.props.features) {
//     //   var d = this.props.feature.properties
//     //   return(
//     //     <div>
//     //       <h4>Project Details</h4>
//     //       <div>Name: {d.projectname}</div>
//     //       <div>Description: {d.projectname}</div>
//     //       <div>Construction Start: {d.constructionstart}</div>
//     //       <div>Construction Complete: {d.constructioncomplete}</div>
//     //       <div>Status: {d.currentstatus}</div>
//     //       <div>Funding: {d.fundingamount}</div>
//     //       <div>Funding Status: {d.fundingstatus}</div>
//     //       <div>FMS ID: {d.idfms}</div>
//     //       <div>Sponsor Agency: {d.sponsoragency}</div>
//     //       <div>Managing Agency: {d.managingagency}</div>
       

//     //     </div>
//     //   )
//     // } else { return null }
//   }
// })


module.exports=Map;