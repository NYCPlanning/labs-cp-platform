import React from 'react'
import {Link} from 'react-router'
import FontIcon from 'material-ui/FontIcon'

import agencies from '../agencies.js'

const Item = (props) => {
  const d = props.feature.properties

  return (
  
      <div className={'capital-projects-list-item'} style={{
          borderLeft: '5px solid ' + agencies.getAgencyColor(d.agency)
        }}
      >
        <div className={'title'}>{d.descriptio}</div>
        <div className={'subtitle'}>Cost: ${d.totalcost}</div>
        
        <i className='fa fa-chevron-right'></i>
      </div>
   
  )
}

export default Item

