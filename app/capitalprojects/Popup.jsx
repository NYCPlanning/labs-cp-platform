//Popup.jsx - The map popup for the Capital Projects Explorer
//Props:
//  map - mapboxGL map object that this popup is being displayed in, used to project the lngLat into an x/y offset
//  handleClick() - function to call when one of the popup elements is clicked
//  features - an array of features to render in the popup
//  lngLat - the map coordinates the popup should render beside

import React from 'react'

import Agencies from '../helpers/agencies.js'

var Popup = React.createClass({
  getInitialState() {
    return({
      visible:true
    })
  },

  componentWillReceiveProps() {
    this.setState({
      visible: true
    })
  },

  showDetails(feature) {
    this.props.handleClick(feature)
  },

  hide() {
    this.setState({
      visible: false
    })
  },

  render() {
    var self=this

    var point = this.props.map.project(this.props.lngLat)
    var rows=this.props.features.map(function(feature, i) {
      var d=feature.properties
      return (
        <div className='popupRow' key={i} onClick={self.showDetails.bind(self, feature)}>
          
          <span className={'badge'} style={{'backgroundColor': Agencies.getAgencyColor(d.sagency)}}>{d.sagency}</span> 
          {d.projectid} - {d.name} <i className="fa fa-angle-right" aria-hidden="true"></i> 
          
        </div>
      ) 
    })

    if(this.state.visible) {
      return (
        <div className={'popup mapOverlay'} style={{'left': point.x, 'top': point.y}}>
          <div className='popupRowContainer'>
            <div className="closeButton" onClick={this.hide}>&#10006;</div>
           {rows}
          </div>
        </div>
      )      
    } else {
      return <div></div>
    }
  }
})

module.exports=Popup