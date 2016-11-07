import React from 'react'
import {browserHistory} from 'react-router'

import Nav from './Nav.jsx'
import CartoMap from './CartoMap.jsx'

var Component = React.createClass({
  handleFeatureClick(e, latlng, pos, data) {
    //redirect browser to /cd/:borocd
    //data.borocd
    browserHistory.push('/cd/' + data.borocd);
  },

  render() {
    return(
      <div className="full-height">
        <Nav title="Select a Region" auth={this.props.auth}>
        </Nav>
          <div id="main-container">
            <div id="sidebar">
              Sidebar
            </div>
            <div id="content">
              <CartoMap
                vizJson="http://reallysimpleopendata.org/user/cpadmin/api/v2/viz/46e64dc6-9217-11e6-b600-0242ac110002/viz.json"
                handleFeatureClick={this.handleFeatureClick}
                ref="map"/>
            </div>
          </div>
      </div>
    )
  }
})

module.exports=Component