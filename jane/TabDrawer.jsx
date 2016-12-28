import React from 'react'
import {Tabs} from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'

import MapMenu from './MapMenu.jsx'
import FontIcon from 'material-ui/FontIcon'

var TabDrawer = React.createClass({

  render() {

    //left-right dependent things
    let transform, angleIcon

    if (this.props.right) {
      transform = this.props.open ? 'translate(0,0)' : 'translate(320px,0)'
      angleIcon = this.props.open ? "fa fa-angle-double-right" : "fa fa-angle-double-left"

    } else {
      transform = this.props.open ? 'translate(0,0)' : 'translate(-320px,0)'
      angleIcon = this.props.open ? "fa fa-angle-double-left" : "fa fa-angle-double-right"
    }


    return(
      <div className="tabs-container" style={{
        width: '360px',
        position: 'absolute',
        top: 0,
        bottom:0,  
        left: this.props.right ? 'auto' : 0,
        right: this.props.right ? 0 : 'auto',
        backgroundColor: '#FFF',
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        transform: transform,
        zIndex: 10
      }}>
        <Tabs 
          tabItemContainerStyle={{
            width: '40px',
            backgroundColor: '#525252',
            position: 'absolute',
            top: 0,
            right: this.props.right ? 'auto' : 0,
            left: this.props.right ? 0 : 'auto',
            bottom: 0,
            display: 'initial',
            whiteSpace: 'initial'
          }}
          contentContainerStyle={{
            position: 'absolute',
            top: 0,
            right: this.props.right ? 0 : '40px',
            left: this.props.right ? '40px' : 0,
            bottom: 0,
            overflow: 'scroll'
          }} 
          initialSelectedIndex={1}
        >
          {this.props.children}
        </Tabs>
        <div style={{  /*Fixed Button to Close the Drawer*/
          position: 'absolute',
          bottom: 0,
          right: this.props.right ? 'auto' : 0,
          left: this.props.right ? 0 : 'auto',
        }}>
          <IconButton  
            style={{ width: '40px', height: '40px', color: '#fff', padding: 'none' }} 
            iconStyle={{ color: '#fff' }} 
            iconClassName={angleIcon} 
            onTouchTap={this.props.toggle}
          />
        </div>
      </div>
    )
  }

})

module.exports = TabDrawer
 