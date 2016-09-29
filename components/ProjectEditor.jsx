import React from 'react'
import MapEditor from './MapEditor.jsx'
import ProjectForm from './ProjectForm.jsx'
import $ from 'jquery'
import {Modal, Button} from 'react-bootstrap'
import crud from '../helpers/crud.js'
import Auth from '../helpers/Auth.js'


var ProjectEditor = React.createClass({

  getInitialState() {
    return({
      valid: false,
      validationMessage: ''
    })
  },

  gatherData() {
    var geometry = this.refs.map.state.data
    var properties = this.refs.properties.state.data

    return({
      type: 'Feature',
      geometry: geometry,
      properties: properties
    })
  },

  postData() {
    console.log('posting...')
    var self=this
    crud.projects.update(this.state.validData)
      .done((res) => {
        console.log(res)
        self.props.onHide()
        self.props.refresh()
      })
  },

  validate() {
    var feature = this.gatherData()
    console.log(feature)

    //get rid of commitid, which will be autoincremented by the db
    delete feature.properties.commitid
    delete feature.properties.committime
    feature.properties.commituser = Auth.getProfile().email


    //if locationstatus is something other than discrete and geom is valid
    if(feature.properties.locationstatus != 'discrete' && !$.isEmptyObject(feature.geometry)) {
      this.setState({
        valid: false,
        validationMessage: 'This project cannot have a geometry when location status is ' + feature.properties.locationstatus
      })
    }

    else {
      console.log('This appears to be valid')
      this.setState({
        valid: true,
        validData: feature,
        validationMessage: ''
      })
    }
  },

  render() {
    var d = this.props.data

    return(
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Capital Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            d ? 
              <div>
                <div className="col-md-12">
                  <h3>{d.properties.sagency} - {d.properties.name}</h3>
                </div>
                <div className="col-md-6">
                  <MapEditor data={d.geometry} validate={this.validate} key={d.properties.mapprojectid} ref='map'/>
                </div>
                <div className="col-md-6">
                  <ProjectForm data={d.properties} validate={this.validate} ref='properties'/>
                </div>
              </div>: 
              null             
          }
        </Modal.Body>
        <Modal.Footer>
          <div className='validation-message'>{this.state.validationMessage}</div>
          <Button onClick={this.props.onHide} bsStyle="warning">Cancel</Button>
          <Button onClick={this.postData} bsStyle="primary" disabled={!this.state.valid}>Save & Close</Button>
        </Modal.Footer>
      </div>
    )
  }
})

module.exports=ProjectEditor