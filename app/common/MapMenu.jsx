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

import CartoLayer from '../overlays/CartoLayer.jsx'
import GeoJsonLayer from '../overlays/GeoJsonLayer.jsx'




var MapMenu = function(props) {

  //map overlay objects to UI elements
  const listItems = props.overlays.map((section, i) => {
    const layers = section.layers.map((layer, j) => {
      return (
        <ListItem
          style={{
            fontWeight: 300
          }}
          primaryText={layer.name}
          rightToggle={
            <Toggle 
              toggled={layer.visible} 
              onToggle={() => props.onUpdate(layer.id)} 
            />
          } 
          key={j}
        />
      )
    })

    return (
      <ListItem 
        primaryText={section.name} 
        leftIcon={<FontAwesomeMuiIcon icon={section.iconClass}/>} 
        primaryTogglesNestedList={true}
        nestedItems={layers}
        key={i}
      />
    )
  })

  //also map overlay objects to actual layers
  const drawnLayers = props.overlays.map((section, i) => {
    return section.layers.map((layer, j) => {
     if(layer.visible) {
        if(layer.type=='carto') {
          return (
            <CartoLayer
              map={props.map}
              id={layer.name}
              options={layer.options}
              key={i}
            />
          )
        } else if (layer.type=='geojson') {
          return (
            <GeoJsonLayer
              map={props.map}
              source={layer.options.source}
              id={layer.id}
              layer={layer.options.layer}
              key={i}
            />
          )
        }
      } 
    })
  })

 return(
    <div>
      <Toolbar >
        <ToolbarGroup>
          <ToolbarTitle text="Map Menu" />
        </ToolbarGroup>
      </Toolbar>
      
      <List>
      <Subheader>Overlay Layers</Subheader>
        {listItems}
      </List>
      {drawnLayers} {/* None of the layers actually renders elements, but this causes them to mount */}
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