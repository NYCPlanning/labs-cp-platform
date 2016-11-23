// /facilities/PipelineExplorer.jsx - This component builds the Facilities Explorer map interface, establishes the connection with Carto, and dynamically changes content depending on what is being shown based on the query results
// Props:
//  auth - User's email login info based on auth0 login. Gets included in nav bar.

import React from 'react'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Popover from 'material-ui/Popover'
import Drawer from 'material-ui/Drawer'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Nav from '../common/Nav.jsx'
import CartoMap from '../common/CartoMap.jsx'
import PipelineLayerSelector from './PipelineLayerSelector.jsx'
import SearchFilterToolbar from '../common/SearchFilterToolbar.jsx'
import ChoroplethLayer from '../common/ChoroplethLayer.jsx'

import ModalContent from './ModalContent.jsx'
import content from './content.jsx'

import '../../stylesheets/pipeline/PipelineExplorer.scss'

var PipelineExplorer = React.createClass({
  getInitialState() {
    return({
      drawerOpen: false,
      optionsOpen: false,
      mapMode: 'discrete',
      aggregateGeom: 'cd',
      sql: 'SELECT * FROM nchatterjee.dob_permits_cofos_hpd_geocode WHERE (dcp_pipeline_status = \'Complete\' OR dcp_pipeline_status = \'Partial complete\') '
    })
  },

  componentDidMount: function() {
    document.title = "Housing Development Explorer"

    this.mapObject = this.refs.map.map

    // this.props.showModal({
    //   modalHeading: 'Welcome!',
    //   modalContent: content.splash,
    //   modalCloseText: 'Got it.  Let me in!'
    // }) 
  },

  //called by the filtering UI with resulting sql
  updateSQL(sql) {
    this.setState({
      sql: sql
    })
    this.refs.map.setSQL(sql)
  },

  showAbout() {
    this.props.showModal({
      modalHeading: 'About this Tool',
      modalContent: content.about,
      modalCloseText: 'Got it!'
    })
  },

  handleFeatureClick(e, latlng, pos, data) {
    this.props.showModal({
      modalHeading: 'Pipeline Project Details',
      modalContent: <ModalContent data={data} latlng={latlng}/>,
      modalCloseText: 'Close'
    })
  },

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  },

  handleGeocoderSelection(feature) {
    this.refs.map.setViewToFeature(feature)
  },

  toggleMapMode() {
    this.setState({
      mapMode: this.state.mapMode == 'discrete' ? 'aggregate' : 'discrete'
    }, function() {
      this.state.mapMode == 'discrete' ?
        this.refs.map.showLayer() : 
        this.refs.map.hideLayer()
    })

    //manually hide the layer
    //TODO make cartomap listen for a visbile prop and hide itself
  },

  handleGeomChange(event, index, value) {
    this.setState({
      aggregateGeom: value
    })
  },

  toggleOptions(e) {
    this.setState({
      optionsOpen: !this.state.optionsOpen,
      anchorEl: e.currentTarget
    })
  },

  closeOptions() {
    this.setState({
      optionsOpen: false
    })
  },

  render() {
    const styles = {
      customWidth: {
        width: 277,
      },
    }

    return(
      <div className="full-height">
        <Nav title='Housing Development Explorer' auth={this.props.auth} showModal={this.props.showModal}>
          <li onClick={this.showAbout}><a> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="content">
            <SearchFilterToolbar 
              onFilter={this.toggleDrawer}
              onSelection={this.handleGeocoderSelection}/>
              <div className="mui-toolbar-container choropleth-menu">
                <Toolbar 
                  className="mui-toolbar"
               
                  style={{
                    backgroundColor: '#fff',
                    height: '48px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2),0 -1px 0px rgba(0,0,0,0.02)',
                    borderRadius: '2px'
                  }}>
                  
                  {this.state.mapMode == 'discrete' ?
                   <ToolbarGroup>
                      <IconButton tooltip="Aggregate by District">
                        <FontIcon 
                          className="fa fa-map-o"
                          onTouchTap={this.toggleMapMode}/>
                        Aggregate
                      </IconButton> 
                    </ToolbarGroup> : 
                    <ToolbarGroup>
                      <DropDownMenu
                        value={this.state.aggregateGeom}
                        onChange={this.handleGeomChange}
                        style={styles.customWidth}
                        autoWidth={false}
                      >
                        <MenuItem value={'cd'} primaryText="Community Districts" />
                        <MenuItem value={'nta'} primaryText="Neighborhood Tabulation Areas" />
                      </DropDownMenu> 
                      <ToolbarSeparator />
                      <IconButton tooltip="Map Options">
                        <FontIcon 
                          className="fa fa-cog"
                          onTouchTap={this.toggleOptions}/>
                      </IconButton>
                      <Popover
                        open={this.state.optionsOpen}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        useLayerForClickAway={false}
                      >
                        Options Here
                        <Toolbar>
                          <ToolbarGroup>
                            <FlatButton 
                              label="Apply"
                              onTouchTap={this.closeOptions} />
                          </ToolbarGroup>
                        </Toolbar>
                      </Popover>
                      <IconButton tooltip="Show Points">
                        <FontIcon 
                          className="fa fa-map-marker"
                          onTouchTap={this.toggleMapMode}/>
                      </IconButton>
                      </ToolbarGroup>

                  }
                </Toolbar>
              </div> 
            {/*<div className="messageOverlay mapOverlay">
              <div className="message">Hover over a property, or click for full details</div>
              <div className="message">Data Freshness:</div>
              <div className="message-mini">DOB Permits-10/20/2016</div>
              <div className="message-mini">DOB Certificates of Occupancy-9/30/2016</div>
              <div className="message-mini">HPD Projects-10/11/2016</div>
            </div>*/}
            <CartoMap
              vizJson="https://carto.capitalplanning.nyc/user/nchatterjee/api/v2/viz/27f505b4-9fab-11e6-ab61-0242ac110002/viz.json"
              handleFeatureClick={this.handleFeatureClick}
              ref="map"/>
            <ChoroplethLayer 
              mapObject={this.mapObject}
              visible={this.state.mapMode=='aggregate'}
              sql={this.state.sql}
              geom={this.state.aggregateGeom}
              />
            <Drawer className="mapDrawer"
              open={this.state.drawerOpen}
              docked={true}
              width={409}
              style={{
                zIndex: 999,
                position: 'absolute'
              }}>
              <Toolbar noGutter={true}>
                <ToolbarGroup>
                  <ToolbarTitle text="Filter Pipeline Projects" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <IconButton tooltip="Close Filters">
                    <FontIcon className="fa fa-times" onTouchTap={this.toggleDrawer}/>
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
              <PipelineLayerSelector
                updateSQL={this.updateSQL} />
            </Drawer>
          </div>
        </div>
      </div>
    )
  }
})

module.exports=PipelineExplorer


