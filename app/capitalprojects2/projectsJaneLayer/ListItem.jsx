import React from 'react'
import {Link} from 'react-router'

import FontIcon from 'material-ui/FontIcon'

import colors from '../colors.js'

const Item = (props) => {
  const d = props.feature.properties

  return (
    <Link
      to={{
        pathname: `/facilities/${d.cartodb_id}`,
        state: { modal: true, returnTo: '/facilities/all'}
      }}
    >
      <div className={'facilities-list-item'} style={{
          borderLeft: '5px solid ' + colors.getColor(d.domain)
        }}
      >
        <div className={'title'}>{d.facilityname}</div>
        <div className={'subtitle'}>{d.address}</div>
        <div className={'subtitle'}>{d.facilitytype}</div>
        <i className='fa fa-chevron-right'></i>
      </div>
    </Link>
  )
}

export default Item

