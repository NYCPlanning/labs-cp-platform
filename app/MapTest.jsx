// /facilities/PipelineExplorer.jsx - This component builds the Facilities Explorer map interface, establishes the connection with Carto, and dynamically changes content depending on what is being shown based on the query results
// Props:
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React from 'react'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Popover from 'material-ui/Popover'
import Drawer from 'material-ui/Drawer'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import Toggle from 'material-ui/Toggle';

import PipelineLayerSelector from './pipeline/PipelineLayerSelector.jsx'
import MapboxGLMap from './common/MapboxGLMapGeneric.jsx'


import Subheader from 'material-ui/Subheader';

import Nav from './common/Nav.jsx'
import CartoMap from './common/CartoMap.jsx'
import SearchFilterToolbar from './common/SearchFilterToolbar.jsx'


import '../stylesheets/pipeline/PipelineExplorer.scss'

var MapComponent = React.createClass({
  getInitialState() {
    return({
      menuDrawerOpen: false,
      dockedDrawerOpen: this.props.dockedDrawerOpen ? this.props.dockedDrawerOpen : false,
      overlays: {
        subways: false
      }
    })
  },

  componentDidMount: function() {
    //document.title = "Housing Development Explorer"

    this.forceUpdate()

    // this.props.showModal({
    //   modalHeading: 'Welcome!',
    //   modalContent: content.splash,
    //   modalCloseText: 'Got it.  Let me in!'
    // }) 
  },

  toggleMenuDrawer() {
    this.setState({menuDrawerOpen: !this.state.menuDrawerOpen})
  },

  // handleGeocoderSelection(feature) {
  //   this.refs.map.setViewToFeature(feature)
  // },

  toggleDockedDrawer() {
    this.setState({
      dockedDrawerOpen: !this.state.dockedDrawerOpen
    })
  },

  handleOverlayToggle(overlay) {

    var overlayState = this.state.overlays 
    overlayState[overlay] = !overlayState[overlay]

    this.setState({
      overlays: overlayState,
      menuDrawerOpen: false

    })
  },

  render() {
    var self=this

    const styles = {
      customWidth: {
        width: 277,
      },
    }

    const childrenWithProps = React.Children.map(this.props.children, 
      (child) => React.cloneElement(child, {
        map: this.refs.map ? this.refs.map.map : null //pass in mapboxGL map object as prop
      })
    )


    return(
      <div className="full-height">
        <Nav title='Housing Development Explorer' auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="content">
            <div className = {"left-overlay-bar " + (this.state.dockedDrawerOpen ? 'open-left' : null)}>
              <SearchFilterToolbar 
                map={this.refs.map}
                onToggleMenuDrawer={this.toggleMenuDrawer}
                />
              <div className='floating-button-stack'>
                {/* Draw a floating action button for each data layer*/}
                {React.Children.map( this.props.children, function(child) {
                  console.log(child.props)
                  return (
                    <FloatingActionButton mini={true} style={{marginBottom: '10px'}} onTouchTap={self.toggleDockedDrawer}>
                      <FontIcon className="fa fa-home" />
                    </FloatingActionButton>
                  )
                })}

                
              </div>
            </div>
            <MapboxGLMap
              ref="map">
              {this.state.overlays.subway ? <SubwayLayer/> : null}
            </MapboxGLMap>
            <Drawer className="dockedDrawer"
              open={this.state.dockedDrawerOpen}
              docked={true}
              width={320}
              style={{
                marginTop: '80px',
                zIndex: 999,
                position: 'absolute'
              }}>
              <div 
                className="menu-header-filler" 
                style={{
                  height: '80px'
                }}/>
              <Toolbar >
                <ToolbarGroup>
                  <ToolbarTitle text="Housing Pipeline" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconButton tooltip="Close">
                    <FontIcon className="fa fa-times" onTouchTap={this.toggleDockedDrawer}/>
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
              {this.refs.map ? childrenWithProps : null}
            </Drawer>
            <Drawer className="menuDrawer"
              open={this.state.menuDrawerOpen}
              docked={false}
              width={320}
              onRequestChange={(open) => this.setState({menuDrawerOpen: open})}
              style={{
                marginTop: '80px',
                zIndex: 999,
                position: 'absolute'
              }}>
              <div 
                className="menu-header-filler" 
                style={{
                  height: '80px'
                }}/>
              <Toolbar >
                <ToolbarGroup>
                  <ToolbarTitle text="Menu" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconButton tooltip="Close Menu">
                    <FontIcon className="fa fa-times" onTouchTap={this.toggleMenuDrawer}/>
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
              
              <List>
              <Subheader>Overlays</Subheader>
                <ListItem 
                  primaryText="Subway Lines" 
                  leftIcon={<FontAwesomeMuiIcon icon="fa-subway"/>} 
                  rightToggle={<Toggle toggled={this.state.overlays.subway} onToggle={this.handleOverlayToggle.bind(this, 'subway')} />} />
                <ListItem primaryText="Administrative Boundaries" leftIcon={<ContentInbox />} rightToggle={<Toggle />} />
                <ListItem primaryText="Flood Plains" leftIcon={<ContentInbox />} rightToggle={<Toggle />} />
             
              <Divider/>
              <Subheader>Data Layers</Subheader>
             
                <ListItem 
                  primaryText="Housing Pipeline" 
                  leftAvatar={<Avatar icon={<FontAwesomeMuiAvatar icon="fa-home"/>} backgroundColor="steelblue" />}
                  rightToggle={<Toggle />}/>
           
              <Divider/>
              <Subheader>Basemap</Subheader>
                <DropDownMenu
                  value={1}
                >
                  <MenuItem value={1} primaryText="Light" />
                  <MenuItem value={2} primaryText="Dark" />
                  <MenuItem value={3} primaryText="Aerial" />
                </DropDownMenu>
              </List>
            </Drawer>
          </div>
        </div>
      </div>
    )
  }
})

module.exports=MapComponent

var FontAwesomeMuiIcon = function(props) {
  return (
    <div 
      className={'fa ' + props.icon} 
      style={{
        color: '#757575',
        fontSize: '20px',
        position: 'absolute',
        top: '0',
        left: '7px',
        margin: '12px'
      }}/>
  )
}

var FontAwesomeMuiAvatar = function(props) {
  return (
    <div 
      className={'fa ' + props.icon} 
      style={{
        color: 'white',
        fontSize: '24px',
        position: 'absolute',
        top: '0',
        left: '1px',
        margin: '8px',
        height: '24px',
        width: '24px'
      }}/>
  )
}

//Tile Layer
var SubwayLayer = React.createClass({
  componentDidMount() {
    $.ajax({
      type: 'POST',
      url: 'https://cwhong.carto.com/api/v1/map/named/tpl_230e29ac_7640_11e6_89c5_0e05a8b3e3d7',
      dataType : "text",
      contentType: "application/json",
      success: function(data) { 
        data = JSON.parse(data);
        var layergroupid = data.layergroupid
        this.addLayer(layergroupid)
      }.bind(this)
    })
  },

  componentWillUnmount() {
    //remove the source and the layer
    this.props.map.removeLayer('subway-lines')
    this.props.map.removeSource('subway-lines')
  },

  addLayer(layergroupid) {
    this.props.map.addSource('subway-lines', {
      type: 'raster',
      tiles: ['https://cwhong.carto.com/api/v1/map/' + layergroupid + '/{z}/{x}/{y}.png'],
      tileSize: 256
    })

    this.props.map.addLayer({
      "id": "subway-lines",
      "type": "raster",
      "source": "subway-lines",
      "minzoom": 0,
      "maxzoom": 22
    })
  },

  render() {
    return null
  }
})
