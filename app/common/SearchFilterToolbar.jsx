import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import MapzenGeocoder from '../common/MapzenGeocoder.jsx'

var SearchFilterToolbar = React.createClass({
  render() {
    return (
      <div className="mui-toolbar-container">
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
            <MapzenGeocoder onSelection={this.props.onSelection}/>
            <FontIcon className="fa fa-search" />
            <ToolbarSeparator />
            <IconButton tooltip="Show Filters">
              <FontIcon className="fa fa-filter" onTouchTap={this.props.onFilter}/>
            </IconButton>
            <ToolbarSeparator style={{marginLeft: '0'}}/>
            
             
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
})

module.exports = SearchFilterToolbar
