// MapComponent.jsx - A Common Web Mapping Component with some built-in overlay layers, extensible to include various data layers as children components
// Props: 
//   leftDrawerOpen - boolean - whether the left drawer should be open on mount
//   title - string - title to be passed into the nav component
//   children - data layers
//   overlays - array of overlay configuration objects

import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {List} from 'material-ui/List'
import {Tab, Tabs} from 'material-ui/Tabs'

import MapboxGLMap from './MapboxGLMap.jsx'
import SearchFilterToolbar from './SearchFilterToolbar.jsx'
import SubwayLayer from '../overlays/SubwayLayer.jsx'
import CdLayer from '../overlays/CdLayer.jsx'
import NtaLayer from '../overlays/NtaLayer.jsx'
import CustomTab from './CustomTab.jsx'
import TabDrawer from './TabDrawer.jsx'
import MapMenu from './MapMenu.jsx'

import overlays from '../overlays/overlayConfig.js'

import '../../stylesheets/common/MapComponent.scss'

var MapComponent = React.createClass({
  getInitialState() {
    return({
      leftDrawerOpen: this.props.leftDrawerOpen ? this.props.leftDrawerOpen : false,
      rightDrawerOpen: this.props.rightDrawerOpen ? this.props.rightDrawerOpen : false,
      overlays: overlays,
      basemap: 'light',
      legendContent: {}, 
      selections: []
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

  toggleRightDrawer() {
    this.setState({
      rightDrawerOpen: !this.state.rightDrawerOpen
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

  handleOverlayToggle(id) {
    var sections = this.state.overlays

    //find the matching layer in the overlays data
    sections.forEach((section) => {
      const thisLayer = section.layers.find((layer) => {
        return layer.id===id
      })

      if (thisLayer) thisLayer.visible = !thisLayer.visible
    }) 

    this.setState({
      overlays: sections
    })
  },

  updateLegend(layer, content) {
    this.state.legendContent[layer] = content

    this.setState({
      legendContent: this.state.legendContent
    })
  },

  showSelections(content) {
    console.log('showSelections')
    this.setState({
      rightDrawerOpen: true,
      selections: content
    })
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this Tool',
      modalContent: content.about,
      modalCloseText: 'Close'
    })
  },

  render() {
    var self=this

    //add the MapComponent to all children as a prop
    const childrenWithProps = React.Children.map(this.props.children, 
      (child) => React.cloneElement(child, {
        map: this.refs.map ? this.refs.map : null,
        updateLegend: this.updateLegend,
        showSelections: this.showSelections
      })
    )

    //create Tab for each child
    var childrenTabs = childrenWithProps.map(function(child, i) {
      return (
        <CustomTab 
          key={i+1}
          icon={
            <FontIcon className={child.props.icon}/> 
          } 
          tooltipText={child.props.tooltipText}
          onActive={self.openLeftDrawer} 
          style={{
            height: 'auto',
            width: '40px'
          }}>
          {child}
        </CustomTab>
      )
    })

    //insert the global map menu to the top of the array of tabs
    if (this.refs.map) {

      childrenTabs.unshift(
        <CustomTab 
          icon={<FontIcon className="fa fa-bars"/>} 
          tooltipText='Map Menu'
          key={0} 
          onActive={self.openLeftDrawer}
          style={{
            height: 'auto',
            width: '40px'
          }}
        >
          <MapMenu
            overlays={this.state.overlays}
            map={this.refs.map.map}
            onUpdate={this.handleOverlayToggle}
          />
        </CustomTab>
      )
    }

    // //build an array of visible overlay layers
    // const overlays = []

    // if (this.state.overlays.subway) { overlays.push(<SubwayLayer/>) }
    // if (this.state.overlays.cdboundaries) { overlays.push(<CdLayer/>) } 
    // if (this.state.overlays.ntaboundaries) { overlays.push(<NtaLayer/>) } 

    //turn state.legendContent into an array of components
    var legendChildren = Object.keys(this.state.legendContent).map(function (key, i) { 
      return (
        <div key={i}> 
          {self.state.legendContent[key]}
        </div>
      ) 
    })


    const tabDrawer = (
      <TabDrawer 
        open={this.state.leftDrawerOpen}
        toggle={this.toggleLeftDrawer}
      >
        {childrenTabs}
      </TabDrawer>
    )

    const rightTabDrawer = (
      <TabDrawer 
        open={this.state.rightDrawerOpen}
        toggle={this.toggleRightDrawer}
        right={true}
      >
        <Tab 
          icon={<FontIcon className="fa fa-bars"/>} 
          tooltipText='Map Menu'
          key={0} 
          onActive={self.openLeftDrawer}
          style={{
            height: 'auto',
            width: '40px'
          }}
        >
          <Tabs>
            <Tab 
            icon={<FontIcon className="fa fa-filter"/>}
            label="List"
            >
              <List>
                {this.state.selections}
              </List>
            </Tab>
            <Tab 
              icon={<FontIcon className="fa fa-filter"/>}
              label="Metrics"
            >
            </Tab>
          </Tabs>
         
        </Tab>
      </TabDrawer>
    )

    return(
      <div className="full-height">
        <div id="main-container">
          <div id="content">
            <div className = {"left-overlay-bar " + (this.state.leftDrawerOpen ? 'open-left' : null)}>
              <SearchFilterToolbar 
                map={this.refs.map}
                onToggleMenuDrawer={this.toggleMenuDrawer}
                />
              <Legend>
                {legendChildren}
              </Legend>
            </div>
            <MapboxGLMap
              ref="map"
              >
            </MapboxGLMap>
            {this.refs.map ? tabDrawer : null}
            {this.refs.map ? rightTabDrawer : null}            
          </div>
        </div>
      </div>
    )
  }
})

var Legend = function(props) {

  return(
    <div className='legend mapOverlay'>
      {props.children}
    </div>
  )
}

module.exports=MapComponent