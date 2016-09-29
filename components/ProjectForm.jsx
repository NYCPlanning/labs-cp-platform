
import React from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import $ from 'jquery'

var ProjectForm = React.createClass({
  getInitialState() {
    return({
      data: this.props.data
    })
  },

  render() {
    var d = this.props.data
    
    return(
      <div className="col-md-12">
        <dl className="dl-horizontal">
          <dt>MA + Project ID</dt>
          <dd>{d.maprojectid}</dd>
          <dt>Name</dt>
          <dd>{d.name}</dd>
          <dt>Sponsor Agency</dt>
          <dd>{d.sagency}</dd>
          <dt>Managing Agency</dt>
          <dd>{d.magency}</dd>
          <dt>Type</dt>
          <dd>{d.type}</dd>
        </dl> 
        <form className="form-horizontal">
          <FormGroup controlId="locationstatus">
            <ControlLabel>Location Status</ControlLabel>
            <FormControl 
              componentClass="select" 
              placeholder="select" 
              onChange={this.handleChange} 
              defaultValue={d.locationstatus}
            >
              <option value="null">Null</option>
              <option value="discrete">discrete</option>
              <option value="nondiscrete">nondiscrete</option>
              <option value="tbd">tbd</option>
              <option value="nonspatial">nonspatial</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="neighborhooddevelopment">
            <ControlLabel>Neighborhood Development</ControlLabel>
            <FormControl 
              componentClass="select" 
              placeholder="select" 
              onChange={this.handleChange} 
              defaultValue={d.neighborhooddevelopment}
            >
              <option value="null">Null</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
     
            </FormControl>
          </FormGroup>

  

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="No Description" defaultValue={d.description} onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup controlId="commitnote">
            <ControlLabel>Commit Note</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter your commit message" defaultValue={d.commitnote} onChange={this.handleChange}/>
          </FormGroup>
        
        </form>
      </div>
    )
  },

  handleChange(e) {
    this.state.data[e.target.id] = e.target.value
    this.props.validate()
  }
})

module.exports=ProjectForm;