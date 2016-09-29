//MapEditor
// Component that creates a leaflet draw map.
// props: data - a geojson geometry to be displayed on the map (includes properties to keep things simple) 
//state should be the latest edits as a geojson geometry (no properties), grabbable at any time if someone hits save

import React from 'react'
import Draw from 'leaflet-draw'
import $ from 'jquery'

var MapEditor = React.createClass({
  getInitialState() {
    return({
      showNoGeomMessage:false,
      data: this.props.data
    })
  },

  render() {
    var noGeom = (
      <div className="no-geom" >
        <h5>No Geometry</h5>
        <p>Use the drawing tools to create a geometry</p>
      </div>
    )

    return(
      <div>
        <div className='draw-map' ref='map'> 
        </div>
        {this.state.showNoGeomMessage ? noGeom : null}
      </div>
    )
  },


  componentWillMount() {
    this.setState({
      showNoGeomMessage: $.isEmptyObject(this.props.data)
    })
  },

  renderData(data) {
    var self=this;
    this.map.invalidateSize();

   
    //reset the Featuregroup
    this.drawnItems.clearLayers()

    var layers = L.geoJson(data).getLayers();
    layers.forEach(function(layer) {
      self.drawnItems.addLayer(layer)
    })

    self.map.fitBounds(self.drawnItems.getBounds())
    
  },

  componentDidMount() {
    this.renderMap();
  },

  showCreate() {
    if(this.drawnItems.getLayers().length == 0) {
      this.map.removeControl(this.editDrawControl)
      this.map.addControl(this.createDrawControl)
      this.updateGeomState()      
    }
  }, 

  showEdit() {
    this.map.removeControl(this.createDrawControl)
    this.map.addControl(this.editDrawControl)
    this.updateGeomState()
  },

  updateGeomState() {
    console.log('update geomstate')
    if(this.drawnItems.getLayers()[0]) {
      var geom = this.drawnItems.getLayers()[0].toGeoJSON().geometry
    } else {
      geom = {}
    }

    this.setState({
      data: geom
    })
    this.props.validate() 

  },

  renderMap() {
    var self=this;
    var map = this.map = L.map(this.refs.map, {
      center: [40.7,-73.953094],
      zoom: 11,
      scrollWheelZoom: true
    });

    //add basemap
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{ attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>' }).addTo(map);

    L.control.geocoder('search-zTuXMNE', {
      position: 'bottomleft',
      expanded: true
    }).addTo(map);

    L.Icon.Default.imagePath = 'https://npmcdn.com/leaflet@0.7.7/dist/images/';

    // Initialise the FeatureGroup to store editable layers
    this.drawnItems = new L.FeatureGroup();
    map.addLayer(this.drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    this.editDrawControl = new L.Control.Draw({
        edit: {
            featureGroup: this.drawnItems
        },
        position: 'topright',
        draw: false
    });

    this.createDrawControl = new L.Control.Draw({
        edit: {
            featureGroup: this.drawnItems,
            edit: false,
            remove: false
        },
        position: 'topright',
        draw: {
            polyline:true,
            polygon: true,
            circle: false,
            marker: true,
            rectangle: false
        }
    });

    map.on('click', function (e) {
      if(self.state.showNoGeomMessage) {
        self.setState({
          showNoGeomMessage: false
        })       
      }

    })

    //when a new feature is added, add it to the featuregroup and log the geoJson
    map.on('draw:created', function (e) {
      var layer = e.layer;
      self.drawnItems.addLayer(layer)
      self.showEdit()

    });

    map.on('draw:drawstart', function(e) {
      self.setState({
        showNoGeomMessage: false
      })
    })

    map.on('draw:edited', function(e) {
      // var layer = e.layer;
      // //self.drawnItems.addLayer(layer)
      self.updateGeomState()
    })

    map.on('draw:deleted', function(e) {
      self.showCreate()
    
    })

    //draw the passed-in geom on the map, if it exists
    if(!$.isEmptyObject(this.props.data)) {
      this.renderData(this.props.data)
      map.addControl(this.editDrawControl);
    } else {
      map.addControl(this.createDrawControl);
    }
  }
})

module.exports=MapEditor;