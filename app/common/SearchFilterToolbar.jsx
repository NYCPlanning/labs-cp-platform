import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import MapzenGeocoder from '../common/MapzenGeocoder.jsx'

import '../../stylesheets/common/SearchFilterToolbar.scss'

var SearchFilterToolbar = React.createClass({
  handleGeocoderSelection(feature) {
    this.props.map.showPoiMarker(feature)
  },

  render() {
    return (
      <div className={"mui-toolbar-container search-filter-toolbar"}>
         <Toolbar 
          className="mui-toolbar"
          noGutter={true}
          style={{
            backgroundColor: '#fff',
            height: '48px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2),0 -1px 0px rgba(0,0,0,0.02)',
            borderRadius: '2px'
          }}>
          <ToolbarGroup>
            <IconButton 
              tooltip="Map Menu"
            >
              <FontIcon className="fa fa-bars" onTouchTap={this.props.onToggleMenuDrawer}/>
            </IconButton> 
            <ToolbarSeparator style={{
                marginLeft: '0'
              }}/> 
            <MapzenGeocoder onSelection={this.handleGeocoderSelection}/>
            <IconButton>
              <FontIcon className="fa fa-search" /> 
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
})

module.exports = SearchFilterToolbar
