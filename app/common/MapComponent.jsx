// MapComponent.jsx - A Common Web Mapping Component with some built-in overlay layers, extensible to include various data layers as children components
// Props: 
//   leftDrawerOpen - boolean - whether the left drawer should be open on mount
//   title - string - title to be passed into the nav component
//   children - data layers

import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import MapboxGLMap from './MapboxGLMap.jsx'
import SearchFilterToolbar from './SearchFilterToolbar.jsx'
import SubwayLayer from '../overlays/SubwayLayer.jsx'
import CdLayer from '../overlays/CdLayer.jsx'
import Tab from './CustomTab.jsx'
import TabDrawer from './TabDrawer.jsx'
import MapMenu from './MapMenu.jsx'

import '../../stylesheets/common/MapComponent.scss'

var MapComponent = React.createClass({
  getInitialState() {
    return({
      leftDrawerOpen: this.props.leftDrawerOpen ? this.props.leftDrawerOpen : false,
      overlays: {
        subway: false,
        cdboundaries: false
      }, 
      basemap: 'light',
      legendContent: {}
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
      overlays: overlayState
    })
  },

  updateLegend(layer, content) {
    this.state.legendContent[layer] = content

    this.setState({
      legendContent: this.state.legendContent
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
        updateLegend: this.updateLegend
      })
    )

    //create Tab for each child
    var childrenTabs = childrenWithProps.map(function(child, i) {
      return (
        <Tab 
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
        </Tab>
      )
    })

    //insert the global map menu to the top of the array of tabs
    childrenTabs.unshift(
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
        <MapMenu
          overlays={this.state.overlays}
          onUpdate={this.handleOverlayToggle}
          basemap={this.state.basemap}
          onBasemapChange={this.handleBasemapChange}
        />
      </Tab>
    )

    //build an array of visible overlay layers
    const overlays = []

    if (this.state.overlays.subway) { overlays.push(<SubwayLayer/>) }
    if (this.state.overlays.cdboundaries) { overlays.push(<CdLayer/>) } 

    //turn state.legendContent into an array of components
    var legendChildren = Object.keys(this.state.legendContent).map(function (key, i) { 
      return (
        <div key={i}> 
          {self.state.legendContent[key]}
        </div>
      ) 
    });

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
              {overlays}
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

var Legend = function(props) {

  return(
    <div className='legend mapOverlay'>
      {props.children}
    </div>
  )
}

module.exports=MapComponent