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

import {Tabs, Tab} from 'material-ui/Tabs'
import TabDrawer from '../TabDrawer.jsx'

import MapMenu from '../MapMenu.jsx'

import '../../stylesheets/pipeline/PipelineExplorer.scss'

var MapComponent = React.createClass({
  getInitialState() {
    return({
      leftDrawerOpen: this.props.leftDrawerOpen ? this.props.leftDrawerOpen : false,
      overlays: {
        subways: false
      }
    })
  },

  componentDidMount: function() {
    this.forceUpdate()
  },

  toggleLeftDrawer() {
    this.setState({
      leftDrawerOpen: !this.state.leftDrawerOpen
    })
  },

  openLeftDrawer() {
    this.setState({
      leftDrawerOpen: true
    })
  },

  closeLeftDrawer() {
    this.setState({
      leftDrawerOpen: false
    })
  },

  handleOverlayToggle(overlay) {
    //toggles an overlay layer.  overlayState contains a boolean for each overlay
    var overlayState = this.state.overlays 
    overlayState[overlay] = !overlayState[overlay]

    this.setState({
      overlays: overlayState,
      leftDrawerOpen: false
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

    //create Tab for each child
    var childrenTabs = childrenWithProps.map(function(child, i) {
      return (
        <Tab 
          key={i+1}
          icon={<FontIcon className="fa fa-home"/>} 
          onActive={self.openLeftDrawer} 
          style={{
            height: 'auto',
            width: '40px'
          }}>
          {child}
        </Tab>
      )
    })

    //insert the global map menu to the top of the array of tabs
    childrenTabs.unshift(
      <Tab 
        icon={<FontIcon className="fa fa-bars"/>} 
        key={0} 
        onActive={self.openLeftDrawer}
        style={{
        height: 'auto',
        width: '40px'
      }}>
        <MapMenu/>
      </Tab>
    )


    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    }

    return(
      <div className="full-height">
        <Nav title={this.props.title} auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="content">
            <div className = {"left-overlay-bar " + (this.state.leftDrawerOpen ? 'open-left' : null)}>
              <SearchFilterToolbar 
                map={this.refs.map}
                onToggleMenuDrawer={this.toggleMenuDrawer}
                />
            </div>
            <MapboxGLMap
              ref="map">
              {this.state.overlays.subway ? <SubwayLayer/> : null}
            </MapboxGLMap>
            <TabDrawer 
              open={this.state.leftDrawerOpen}
              toggle={this.toggleLeftDrawer}
            >
              {childrenTabs}
            </TabDrawer>
          </div>
        </div>
      </div>
    )
  }
})



module.exports=MapComponent