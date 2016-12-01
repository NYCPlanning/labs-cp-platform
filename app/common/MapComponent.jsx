// MapComponent.jsx - A Common Web Mapping Component with some built-in overlay layers, extensible to include various data layers as children components

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
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';

import MapboxGLMap from './MapboxGLMap.jsx'
import Nav from './Nav.jsx'
import SearchFilterToolbar from './SearchFilterToolbar.jsx'
import SubwayLayer from '../overlays/SubwayLayer.jsx'

import '../../stylesheets/tabDrawer.scss'

import {Tabs} from 'material-ui/Tabs'

import Tab from '../Tab.jsx'


import '../../stylesheets/pipeline/PipelineExplorer.scss'

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

    this.forceUpdate()
  },

  toggleMenuDrawer() {

    this.setState({menuDrawerOpen: !this.state.menuDrawerOpen})
  },

  toggleDockedDrawer() {

    this.setState({
      dockedDrawerOpen: !this.state.dockedDrawerOpen
    })
  },

  openDockedDrawer() {
    this.setState({
      dockedDrawerOpen: true
    })
  },

  closeDockedDrawer() {
    this.setState({
      dockedDrawerOpen: false
    })
  },

  handleOverlayToggle(overlay) {
    //toggles an overlay layer.  overlayState contains a boolean for each overlay
    var overlayState = this.state.overlays 
    overlayState[overlay] = !overlayState[overlay]

    this.setState({
      overlays: overlayState,
      menuDrawerOpen: false
    })
  },

  render() {
    var self=this

    //add the MapComponent to all children as a prop
    const childrenWithProps = React.Children.map(this.props.children, 
      (child) => React.cloneElement(child, {
        map: this.refs.map ? this.refs.map : null
      })
    )

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    }

  
    const childrenTabs =  childrenWithProps.map(function(child) {
      return (
        <Tab icon={<FontIcon className="fa fa-home"/>} onActive={self.openDockedDrawer}>
          {child}
        </Tab>
      )
    })
  

    return(
      <div className="full-height">
        <Nav title={this.props.title} auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="content">
            <div className = {"left-overlay-bar " + (this.state.dockedDrawerOpen ? 'open-left' : null)}>
              <SearchFilterToolbar 
                map={this.refs.map}
                onToggleMenuDrawer={this.toggleMenuDrawer}
                />
            </div>
            <MapboxGLMap
              ref="map">
              {this.state.overlays.subway ? <SubwayLayer/> : null}
            </MapboxGLMap>
            <Drawer className="dockedDrawer"
              open={this.state.dockedDrawerOpen}
              docked={true}
              width={320} 
              containerStyle={{overflow: 'visible', marginTop: '80px'}}
            >
              <div 
                className="menu-header-filler" 
                style={{
                  height: '80px'
                }}/>
              <div className='tabDrawer' style={{
                marginRight: '40px'
              }}>
                <Tabs
                  >
                  <Tab icon={<FontIcon className="fa fa-bars"/>} onActive={this.openDockedDrawer} >
                    <div>
                      <Toolbar >
                        <ToolbarGroup>
                          <ToolbarTitle text="Menu" />
                        </ToolbarGroup>
                        {/*<ToolbarGroup>
                          <IconButton tooltip="Close Menu">
                            <FontIcon className="fa fa-times" onTouchTap={this.toggleMenuDrawer}/>
                          </IconButton>
                        </ToolbarGroup>*/}
                      </Toolbar>
                      
                      <List>
                      <Subheader>Overlays</Subheader>
                        <ListItem 
                          primaryText="Subway Lines" 
                          leftIcon={<FontAwesomeMuiIcon icon="fa-subway"/>} 
                          rightToggle={<Toggle toggled={this.state.overlays.subway} onToggle={this.handleOverlayToggle.bind(this, 'subway')} />} 
                        />
                      <Divider/>
                      {/*<Subheader>Data Layers</Subheader>
                     
                        <ListItem 
                          primaryText="Housing Pipeline" 
                          leftAvatar={<Avatar icon={<FontAwesomeMuiAvatar icon="fa-home"/>} backgroundColor="steelblue" />}
                          rightToggle={<Toggle />}/>
                   
                      <Divider/>*/}
                      <Subheader>Basemap</Subheader>
                        <DropDownMenu
                          value={1}
                        >
                          <MenuItem value={1} primaryText="Light" />
                          <MenuItem value={2} primaryText="Dark" />
                          <MenuItem value={3} primaryText="Aerial" />
                        </DropDownMenu>
                      </List>

                    </div>
                  </Tab>
                  { childrenTabs }
                  <Tab 
                    icon={
                      <FontIcon className={this.state.dockedDrawerOpen ? "fa fa-angle-double-left" : "fa fa-angle-double-right"}/>
                    } 
                    onActive={ this.state.dockedDrawerOpen ? this.closeDockedDrawer : this.openDockedDrawer }
                  >
                  </Tab>
                </Tabs>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    )
  }
})

//TODO just do all of this in CSS
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

module.exports=MapComponent