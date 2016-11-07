
import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'

import Agencies from '../../helpers/agencies.js'
import ModalMap from './ModalMap.jsx'
import config from './config.js'


var ModalContent = React.createClass({
  render() {
    var d = this.props.feature.properties

    function getAgencyName(acronym) {
       var match = config.sponsorAgencies.filter(function(agency) {
        return agency.value == acronym
      })
      return match[0].label
    }

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
                      style={{'backgroundColor': Agencies.getAgencyColor(d.magency)}}>{d.magency}
                    </span>
                  </div> :
                  null
                } 
              </div>
              <div id="projectdescription">{d.descriptio}</div> 
          </div>

          <div className={'col-md-6'}>
            <ModalMap data = {this.props.feature}/>
          </div>
          <div className={'col-md-6'}>
          <ul className="list-group">
            
            <li className="list-group-item">
              <h4>General</h4>
              <dl className="dl-horizontal">
                <dt>MA + Project ID</dt>
                <dd>{d.maprojid}</dd>
                <dt>Sponsor Agency</dt>
                <dd>{getAgencyName(d.sagency)}</dd>
                <dt>Managing Agency</dt>
                <dd>{getAgencyName(d.magency)}</dd>
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
                <dd>{(new Date(d.conend) > new Date(1970, 1, 1)) ? Moment(d.constart).format('MMMM YYYY') : 'unknown'}</dd>
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

module.exports=ModalContent
