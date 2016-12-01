import React from 'react'
import { Tab as MuiTab } from 'material-ui/Tabs'

const Tab = (props) => {
  console.log(props)

  return(
    <MuiTab {...props} style={{
      backgroundColor: props.selected ? '#D96B27' : null
    }}/>
  )

}
Tab.muiName = 'Tab'

export default Tab