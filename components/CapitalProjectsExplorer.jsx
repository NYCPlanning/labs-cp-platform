import React from 'react'
import Crossfilter from 'crossfilter'
import dc from 'dc'
import {Button} from 'react-bootstrap'

import Nav from './Nav.jsx'
import Modal from './Modal.jsx'
import ModalMap from './ModalMap.jsx'
import MapboxGLMap from './MapboxGLMap.jsx'
import DcColumnChart from './DcColumnChart.jsx'


var CapitalProjectsExplorer = React.createClass({
  getInitialState() {
    return({
      mapData: this.props.data.features,
      modalHeading: null,
      modalContent: null,
      modalCloseText: null
    })
  },

  componentWillMount() {
    //set up crossfilters, add dimensions 
    this.store = {}

    var primaryAgencies = [
      'SCA', 'DOT', 'DEP', 'DCLA', 'NYPL', 'BPL', 'DPR', 'DCAS', 'FDNY'
    ]

    var filter = this.store.filter = Crossfilter(this.props.data.features);
    var all = this.store.all = filter.groupAll();
    
    //dimension that gets all, used for updating the map
    this.store.everything = filter.dimension(function(d) { return d });

    //not sure why, but counts are all off if you don't prepend something to the returned value
    //when making these dimensions.  I think it may be due to the existence of nulls.
    this.store.agency = filter.dimension(function (d) { 

      if(primaryAgencies.indexOf(d.properties.managingagency) > -1) {
        return d.properties.managingagency
      } else {
        return 'Others'
      }

    });
    this.store.agencyCount = this.store.agency.group();

    this.store.sponsorAgency = filter.dimension(function(d) {
      if(primaryAgencies.indexOf(d.properties.sponsoragency) > -1) {
        return d.properties.sponsoragency
      } else {
        return 'Others'
      }
    })
    this.store.sponsorAgencyCount = this.store.sponsorAgency.group()

    this.store.currentStatus = filter.dimension(function(d) {
      //add spaces to force custom ordering of columns
      switch(d.properties.currentstatus) {
        case 'Planning':
          return '        Planning'
          break
        case 'Proposed':
          return '       Proposed'
          break
        case 'Procurement':
          return '      Procurement'
          break
        case 'Design':
          return '     Design'
          break
        case 'Construction':
          return '    Construction'
          break
        case 'Complete':
          return '   Complete'
          break
        case 'Cancelled':
          return '  Cancelled'
          break
        case 'Other':
          return ' Other'
          break
        default:
          return ' Unknown'
      }
    })
    this.store.currentStatusCount = this.store.currentStatus.group()

    this.store.fundingAmount = filter.dimension(function(d) {
      var f = d.properties.fundingamount
      if(f != null) {
       return f == 0 ? '0' :
        f > 0 && f < 500000 ? '0-500k' :
        f >= 500000 && f < 1000000 ? '500k-1M' :
        f >= 1000000 && f < 5000000 ? '1M-5M' :
        f >= 5000000 && f < 10000000 ? '5M-10M' :
        '>10M'       
      } else {
        return 'Unknown'
      }
    })

    this.store.fundingAmountCount = this.store.fundingAmount.group() 
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
    var agencyColors = {
      property: 'sponsoragency',
      type: 'categorical',
      stops: [
        ['Others','#8dd3c7'],
        ['SCA','#ffffb3'],
        ['DOT','#bebada'],
        ['DEP','#fb8072'],
        ['DCLA','#80b1d3'],
        ['NYPL','#fdb462'],
        ['BPL','#b3de69'],
        ['DPR','#fccde5'],
        ['DCAS','#d9d9d9'],
        ['FDNY','#bc80bd']
      ]
    }

    //uses the agencyColors object for one-off color assignments
    //used for adding inline styles to non-map things
    function getAgencyColor(agency) {
      var match = agencyColors.stops.filter(function(stop) {
        return stop[0] == agency;
      })
      return match.length>0 ? match[0][1] : '#8dd3c7';
    }

    var d = feature.properties
    return (
        <div className={'row'}> 
          <div className={'col-md-12'}>
            <h3>
              {d.projectname} - {d.idfms}
            </h3>
              <div className="agencybadges">
                <span 
                  className={'badge'} 
                  style={{'backgroundColor': getAgencyColor(d.sponsoragency)}}>{d.sponsoragency}
                </span>
                { d.sponsoragency != d.managingagency ? 
                  <div className='managedby'> 
                  <div className='managedby-text'>managed by</div>
                    <span 
                      className={'badge'} 
                      style={{'backgroundColor': getAgencyColor(d.managingagency)}}>{d.managingagency}
                    </span>
                  </div> :
                  null
                } 
              </div>
              <div id="projectdescription">{d.projectdescription}</div> 
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
                <dd>{d.currentstatus}</dd>
                <dt>Contact</dt>
                <dd>{d.contact}</dd>
                <dt>FMS Project ID</dt>
                <dd>{d.idfms}</dd>
                <dt>Location Status</dt>
                <dd>{d.locationstatus}</dd>
                <dt>Source Agency</dt>
                <dd>{d.sourceagency}</dd>
                <dt>Source Dataset</dt>
                <dd>{d.sourcedataset}</dd>
           
              </dl> 
            </li>

            <li className="list-group-item">
              <h4>Timeline</h4>
              <dl className="dl-horizontal">
                <dt>Construction Start</dt>
                <dd>{d.constructionstart}</dd>   
                <dt>Construction Complete</dt>
                <dd>{d.constructioncomplete}</dd>
                <dt>Construction Complete FY</dt>
                <dd>{d.fyconstructioncomplete}</dd>

              </dl>              
            </li>

            <li className="list-group-item">
              <h4>Funding</h4>
              <dl className="dl-horizontal">
                <dt>Funding Amount</dt>
                <dd>{d.fundingamount}</dd>
                <dt>Funding Maximum</dt>
                <dd>{d.fundingmax}</dd> 
                <dt>Funding Minimum</dt>
                <dd>{d.fundingmin}</dd> 
                <dt>Funding Source</dt>
                <dd>{d.fundingsource}</dd> 
                <dt>Funding Status</dt>
                <dd>{d.fundingstatus}</dd>  
              </dl>              
            </li>

          </ul>


          </div>
        </div> 
      ) 
  },

  handleMapClick(guid) {
    console.log('in dashboard', guid)

    //get feature for this guid
    var feature = this.props.data.features.filter(function(feature) {
      return feature.properties.guid == guid
    })[0]

   

    var modalContent = this.buildModalContent(feature)

    this.showModal({
      modalHeading: 'Capital Project Details',
      modalContent: modalContent,
      modalCloseText: 'Close'
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


  render() {
    var Iframe = 'iframe'

    return(
      <div className="full-height">
        <Nav title="NYC Capital Projects Map" auth={this.props.auth}>
          <li onClick={this.showAbout}><a><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About</a></li>
        </Nav>
        <div id="main-container">
          <div id="sidebar">
            <div className='chart-menu'>
               <CountWidget
                dimension={this.store.filter}
                group={this.store.all}
                reset={this.reset}
              />             
            </div>
              <div className='chartPane'>
              <DcColumnChart 
                title={'Sponsor Agency'}
                dimension={this.store.sponsorAgency}
                group={this.store.sponsorAgencyCount}
                margins={{top: 10, right: 10, bottom: 30, left: 30}}
                update={this.update}
              />
              <DcColumnChart 
                title={'Current Status'}
                dimension={this.store.currentStatus}
                group={this.store.currentStatusCount}
                margins={{top: 10, right: 10, bottom: 40, left: 30}}
                update={this.update}
              />
              <DcColumnChart 
                title={'Funding Amount'}
                dimension={this.store.fundingAmount}
                group={this.store.fundingAmountCount}
                margins={{top: 10, right: 10, bottom: 30, left: 30}}
                update={this.update}
              />

              <DcColumnChart 
                title={'Managing Agency'}
                dimension={this.store.agency}
                group={this.store.agencyCount}
                margins={{top: 10, right: 10, bottom: 25, left: 30}}
                update={this.update}
              />
            </div>
          </div>
          <div id="content">
            <div className={'full-height'}>
              <MapboxGLMap data={this.state.mapData} handleClick={this.handleMapClick} ref={'Map'}/>
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