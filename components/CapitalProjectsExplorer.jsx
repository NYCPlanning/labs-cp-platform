import React from 'react'
import {Button} from 'react-bootstrap'
import Numeral from 'numeral'
import Moment from 'moment'

import Nav from './Nav.jsx'
import Modal from './Modal.jsx'
import ModalMap from './ModalMap.jsx'
import MapboxGLMap from './MapboxGLMap.jsx'
import Agencies from '../helpers/agencies.js'
import AgencySelector from './AgencySelector.jsx'
import carto from '../helpers/carto.js'



var CapitalProjectsExplorer = React.createClass({
  getInitialState() {
    return({
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentDidMount: function() {
    document.title = "NYC Capital Projects Map";

    this.showModal({
      modalHeading: 'Welcome!',
      modalContent: splashContent,
      modalCloseText: 'Got it.  Let me in!'
    }) 
  },

  reset() {
    dc.filterAll()
    dc.redrawAll()
  },

  update() {
    this.setState({
      mapData: this.store.everything.top(Number.POSITIVE_INFINITY)
    })
  },

  buildModalContent(feature) {
    console.log(feature)

    var d = feature.properties

    //pre-process funding to show a discrete value or a range
    var funding 
    if (d.fundamount != null) {
      funding = Numeral(d.fundamount).format('($ 0.0 a)')
    } else {
      funding = Numeral(d.fundmin).format('($ 0.0 a)') + ' - ' + Numeral(d.fundmax).format('($ 0.0 a)')
    }


    return (
        <div className={'row'}> 
          <div className={'col-md-12'}>
            <h3>
              {d.name} - {d.projectid}
            </h3>
              <div className="agencybadges">
                <span 
                  className={'badge'} 
                  style={{'backgroundColor': Agencies.getAgencyColor(d.sagency)}}>{d.sagency}
                </span>
                { d.sagency != d.magency ? 
                  <div className='managedby'> 
                  <div className='managedby-text'>managed by</div>
                    <span 
                      className={'badge'} 
                      style={{'backgroundColor': Agencies.getAgencyColor(d.sagency)}}>{d.maagency}
                    </span>
                  </div> :
                  null
                } 
              </div>
              <div id="projectdescription">{d.descriptio}</div> 
          </div>

          <div className={'col-md-6'}>
            <ModalMap data = {feature}/>
          </div>
          <div className={'col-md-6'}>
          <ul className="list-group">
            
            <li className="list-group-item">
              <h4>General</h4>
              <dl className="dl-horizontal">
                <dt>CurrentStatus</dt>
                <dd>{d.astatus}</dd>

                <dt>Contact</dt>
                <dd>{d.contact}</dd>

                <dt>MA + Project ID</dt>
                <dd>{d.maprojid}</dd>

                <dt>Contact</dt>
                <dd>{d.contact}</dd>

                <dt>Type</dt>
                <dd>{d.type}</dd>

                <dt>Category</dt>
                <dd>{d.type}</dd>

              </dl> 
            </li>

            <li className="list-group-item">
              <h4>Timeline</h4>
              <dl className="dl-horizontal">
                <dt>Construction Start</dt>
                <dd>{(new Date(d.constart) > new Date(1970, 1, 1)) ? Moment(d.constart).format('MMMM YYYY') : 'Agency does not report'}</dd>  

                <dt>Construction End</dt>
                <dd>{(new Date(d.conend) > new Date(1970, 1, 1)) ? Moment(d.constart).format('MMMM YYYY') : 'Agency does not report'}</dd>
              </dl>              
            </li>

            <li className="list-group-item">
              <h4>Funding</h4>
              <dl className="dl-horizontal">
                <dt>Funding</dt>
                <dd>{funding}</dd>

                <dt>Funding Source</dt>
                <dd>{d.fundsource}</dd> 

                <dt>Funding Status</dt>
                <dd>{d.fundstatus}</dd>  
              </dl>              
            </li>

            <li className="list-group-item">
              <h4>Data Source</h4>
              <dl className="dl-horizontal">
                <dt>Source Agency</dt>
                <dd>{d.source}</dd>

                <dt>Source Dataset</dt>
                <dd>{d.sourcedata}</dd>

                <dt>Source Link</dt>
                <dd>{d.sourcelink}</dd>
              </dl>              
            </li>

          </ul>


          </div>
        </div> 
      ) 
  },

  handleMapClick(feature) {
    var self=this
    console.log('handleMapClick', feature)

    var tableName = feature.layer.source == 'pointFeatures' ? 'adoyle.capeprojectspoints' : 'adoyle.capeprojectspolygons'

   //make an api call to carto to get the full feature, build content from it, show modal
   carto.getRow(tableName, feature.properties.cartodb_id)
    .done(function(data) {
      var feature = data.features[0]

      var modalContent = self.buildModalContent(feature)

      self.showModal({
        modalHeading: 'Capital Project Details',
        modalContent: modalContent,
        modalCloseText: 'Close'
      })

    })



  },

  showAbout() {
    this.showModal({
      modalHeading: 'About this Tool',
      modalContent: aboutContent,
      modalCloseText: 'Close'
    })
  },

  showModal(options) {
    this.setState(options)
    this.refs.modal.open()
  },

  updateFilters(values) {
    //takes an array of sponsor agency codes, filters map data by that array
    this.refs.map.applyFilters(values)
  },


  render() {
    var Iframe = 'iframe'

    return(
      <div className="full-height">
        <Nav title="NYC Capital Projects Map" auth={this.props.auth}>
          <li onClick={this.showAbout}><a><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="sidebar">
            <AgencySelector updateFilters={this.updateFilters}/>
          </div>
          <div id="content">
            <div className={'full-height'}>
              <MapboxGLMap data={this.state.mapData} handleClick={this.handleMapClick} ref='map'/>
            </div>
          </div>
        </div>
        <Modal
          heading={this.state.modalHeading}
          body={this.state.modalContent}
          closeText={this.state.modalCloseText}
          ref="modal"
        />
      </div>
    )
  }
})

module.exports=CapitalProjectsExplorer


var CountWidget=React.createClass({

  render() {
    var selected = this.props.group.value();
    var total = this.props.dimension.size();

    var all = (selected == total)

    return(
      <div>
        { all ? 
          'Showing all projects (' + total + '). Click the charts to filter the data.' :
          'Showing ' + selected + ' of ' + total + ' projects.' 
        }

        { all ? 
          null :
          <Button bsSize="xsmall" className="reset-button" onClick={this.props.reset}>Reset All</Button>
        }
        
         
      </div>
    )
  }
})

var splashContent = (
  <div>
    "Welcome Beta Tester!" 
    This interactive explorer of the XYZ dataset is currently under development by the Department of City Planning. 
    You are likely to find some bugs and even some less-than-accurate data. These are works in progress! 
    If you're here, it means we want to improve this data and this map with your help! Please get in touch...
  </div>
)

var aboutContent = (
  <div>About</div>
)