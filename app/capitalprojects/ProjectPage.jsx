// /facilities/FacilityPage.jsx - This component builds an individual page for each facility in the database and compiles its databse lookup details
// Props:
//  params.id - Facility ID being shown based on the route being passed in from carto. Provides row of data.
//  auth - User's email login info based on auth0 login. Gets included in nav bar.
import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'

import ModalMap from '../common/ModalMap.jsx'

import Agencies from './agencies.js'
import Carto from '../helpers/carto.js'

var Component = React.createClass({

  getInitialState() {
    return({
      data: null
    })
  },

  componentDidMount() {
    var self=this

    var type = this.props.params.id.split('-')[1]
    var tableName = (type == '0') ? 'adoyle.capeprojectspoints' : 'adoyle.capeprojectspolygons'

    // after mount, fetch data and set state
    Carto.getRow(tableName, 'cartodb_id', parseInt(this.props.params.id.split('-')[0]))
      .then(function(data) { 
        self.setState({
          data: data
        })
      })
  },

  render() {

    var content = this.state.data ? this.renderContent(this.state.data) : null

    return(
      <div className="full-screen">
        {content}
      </div>
    )
  },

  renderContent(data) {
    var d = data.properties

    //pre-process funding to show a discrete value or a range
    var funding 
    if (d.fundamount != null) {
      funding = Numeral(d.fundamount).format('($ 0.0 a)')
    } else {
      funding = Numeral(d.fundmin).format('($ 0.0 a)') + ' - ' + Numeral(d.fundmax).format('($ 0.0 a)')
    }
   
    return(
      <div>
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
                  style={{'backgroundColor': Agencies.getAgencyColor(d.magency)}}>{d.magency}
                </span>
              </div> :
              null
            } 
          </div>
          <div id="projectdescription">{d.descriptio}</div> 
        </div>

        <div className={'col-md-6'}>
          <ModalMap data={this.state.data}/>
        </div>

        <div className={'col-md-6'}>
          <ul className="list-group">
            
            <li className="list-group-item">
              <h4>General</h4>
              <dl className="dl-horizontal">
                <dt>MA + Project ID</dt>
                <dd>{d.maprojid}</dd>
                <dt>Sponsor Agency</dt>
                <dd>{Agencies.getAgencyName(d.sagency)}</dd>
                <dt>Managing Agency</dt>
                <dd>{Agencies.getAgencyName(d.magency)}</dd>
                <dt>Contact</dt>
                <dd>{d.contact}</dd>
                <dt>Current Status</dt>
                <dd>{d.cpstatus}</dd>
                <dt>Type</dt>
                <dd>{d.type}</dd>

              </dl> 
            </li>

            <li className="list-group-item">
              <h4>Timeline</h4>
              <dl className="dl-horizontal">
                <dt>Construction Start</dt>
                <dd>{(new Date(d.constart) > new Date(1970, 1, 1)) ? Moment(d.constart).format('MMMM YYYY') : 'unknown'}</dd>  

                <dt>Construction End</dt>
                <dd>{(new Date(d.conend) > new Date(1970, 1, 1)) ? Moment(d.conend).format('MMMM YYYY') : 'unknown'}</dd>
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

              </dl>              
            </li>

          </ul>
        </div>
      </div>
    )
  }
})

module.exports=Component
