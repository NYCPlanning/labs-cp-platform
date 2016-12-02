import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'

import MapMenu from './MapMenu.jsx'
import FontIcon from 'material-ui/FontIcon'

import '../../stylesheets/TabDrawer.scss'

var TabDrawer = React.createClass({

  render() {
    return(
      <div className="tabs-container" style={{
        width: '360px',
        position: 'absolute',
        top: 0,
        bottom:0,  
        left:0,
        backgroundColor: '#FFF',
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        transform: this.props.open ? 'translate(0,0)' : 'translate(-320px,0)'
      }}>
        <Tabs 
          tabItemContainerStyle={{
            width: '40px',
            backgroundColor: '#525252',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            display: 'initial',
            whiteSpace: 'initial'
          }}
          contentContainerStyle={{
            paddingRight:'40px'
          }} 
          initialSelectedIndex={1}
        >
          {this.props.children}
        </Tabs>
        <div style={{  /*Fixed Button to Close the Drawer*/
          position: 'absolute',
          bottom: 0,
          right: 0
        }}>
          <IconButton  
            style={{ width: '40px', color: '#fff', padding: 'none' }} 
            iconStyle={{ color: '#fff' }} 
            iconClassName={this.props.open ? "fa fa-angle-double-left" : "fa fa-angle-double-right"} 
            onTouchTap={this.props.toggle}
          />
        </div>
      </div>
    )
  }

})



module.exports = TabDrawer
 