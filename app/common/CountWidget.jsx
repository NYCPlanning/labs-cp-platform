import React from 'react'
import Numeral from 'numeral'

import Divider from 'material-ui/Divider'
import {ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import FontIcon from 'material-ui/FontIcon'

var CountWidget = function(props) {

  const totalCount = Numeral(props.totalCount).format('0,0')
  const selectedCount = Numeral(props.selectedCount).format('0,0')

  let countText = ''

  if (props.selectedCount == props.totalCount) {
    countText = (
      <span>Showing all <span className='bigNumber'>{totalCount}</span> {props.units}</span>
    )
  } else {
    countText = (
      <span>
        <span className='bigNumber'>{selectedCount}</span> of <span className='bigNumber'>{totalCount}</span> {props.units} showing
      </span>
    )
  }

  return(
    <div className="countWidget">
      <Subheader>
        Current Filters
      </Subheader>
      <ListItem 
        leftIcon={<FontIcon className="fa fa-filter" />} 
        disabled={true}
      >
        {countText}
      </ListItem>
      <Divider/>
    </div>
  )
}

module.exports=CountWidget