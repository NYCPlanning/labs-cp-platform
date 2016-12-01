import React from 'react'

import '../stylesheets/tabDrawer.scss'

import {Tabs} from 'material-ui/Tabs'

import Tab from './Tab.jsx'
import FontIcon from 'material-ui/FontIcon'
import Drawer from 'material-ui/Drawer';

module.exports=React.createClass({
  getInitialState() {
    return({open:true})
  },

  handleToggle() {
    this.setState({open: !this.state.open}) 
  }, 

  render() {
  const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };

    return (
      <Drawer open={this.state.open} width={290} containerStyle={{overflow: 'visible'}}>
          <div className='tabDrawer' style={{
            marginRight: '40px'
          }}>
            <Tabs
              >
              <Tab icon={<FontIcon className="fa fa-times"/>} onActive={this.handleToggle} >
                <div>
                  <h2 style={styles.headline}>Tab One</h2>
                  <p>
                    This is an example tab.
                  </p>
                  <p>
                    You can put any sort of HTML or react component in here. It even keeps the component state!
                  </p>
                  
                </div>
              </Tab>
              <Tab icon={<FontIcon className="fa fa-times"/>} >
                <div>
                  <h2 style={styles.headline}>Tab Two</h2>
                  <p>
                    This is another example tab.
                  </p>
                </div>
              </Tab>
              <Tab icon={<FontIcon className="fa fa-times"/>} onActive={this.handleToggle}>
                <div>
                  <h2 style={styles.headline}>Tab Three</h2>
                  <p>
                    This is a third example tab.
                  </p>
                </div>
              </Tab>
            </Tabs>
          </div>
      </Drawer>
    )
  }
})

// var TabDrawer = React.createClass({
//   render() {
//     return(
//       <div className='tabDrawer'>
        
//       </div>
//     )
//   }
// })

// var Tab = React.createClass({
//   render() {
//     return(
//       <div>
        
//       </div>
//     )
//   }
// })



