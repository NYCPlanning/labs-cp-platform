import React from 'react'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import { Tab as MuiTab} from 'material-ui/Tabs'
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu'


var MapMenu = function(props) {
 return(
    <div>
      <Toolbar >
        <ToolbarGroup>
          <ToolbarTitle text="Menu" />
        </ToolbarGroup>
      </Toolbar>
      
      <List>
      <Subheader>Overlays</Subheader>
        <ListItem 
          primaryText="Subway Lines" 
          leftIcon={<FontAwesomeMuiIcon icon="fa-subway"/>} 
          rightToggle={<Toggle toggled={props.overlays.subway} onToggle={props.onUpdate}/>} 
        />
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
    </div>
  )
}
  
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

module.exports = MapMenu