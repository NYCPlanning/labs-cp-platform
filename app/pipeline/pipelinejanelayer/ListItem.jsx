import React from 'react'
import {Link} from 'react-router'

import FontIcon from 'material-ui/FontIcon'

import colors from '../colors.js'

const Item = (props) => {
  const d = props.feature.properties

  return (
    <Link
      to={{
        pathname: `/pipeline/${d.cartodb_id}`,
        state: { modal: true, returnTo: '/pipeline'}
      }}
    >
      <div className={'facilities-list-item'} style={{
          borderLeft: '5px solid ' + colors.getStatusColor(d.dcp_pipeline_status)
        }}
      >
        <div className={'title'}>{d.dob_permit_address}</div>
        <div className={'subtitle'}>{d.dcp_pipeline_status + ' | ' + d.dcp_units_use_map + ' units'}</div>
        <i className='fa fa-chevron-right'></i>
      </div>
    </Link>
  )
}

export default Item
