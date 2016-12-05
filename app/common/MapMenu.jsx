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
          <ToolbarTitle text="Map Menu" />
        </ToolbarGroup>
      </Toolbar>
      
      <List>
      <Subheader>Overlay Layers</Subheader>
        <ListItem 
          primaryText="Subway Lines" 
          leftIcon={<FontAwesomeMuiIcon icon="fa-subway"/>} 
          rightToggle={<Toggle toggled={props.overlays.subway} onToggle={() => props.onUpdate('subway')}/>} 
        />
      {/*<Divider/>
      <Subheader>Basemap</Subheader>
        <DropDownMenu
          value={props.basemap}
          onChange={props.onBasemapChange}
        >
          <MenuItem value={'light'} primaryText="Light" />
          <MenuItem value={'dark'} primaryText="Dark" />
          <MenuItem value={'satellite'} primaryText="Satellite" />
        </DropDownMenu>*/}
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