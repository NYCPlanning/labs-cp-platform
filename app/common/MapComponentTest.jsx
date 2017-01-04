// PipeLineTest - Custom config/code for the pipeline explorer should go here.  This component will make use of MapTest.jsx, a global map component that all "explorers" can use
import React from 'react' 

import Jane from '../../jane/index.jsx'


import DummyDataLayer from './DummyDataLayer.jsx'
import FacLayerSelector from '../facilities/FacLayerSelector.jsx'

const Test = () => {
  return (
    <div>Hello, World!</div>
  )
}

const layerComponents = {
  facilities: {
    dataLayer: DummyDataLayer,
    primaryContent: FacLayerSelector
  }
}


const mapConfig = {
  layers: [
    {
      name: 'facilities'
    }
  ],

  overlays: [
    'subways'
  ]
}


var MapComponentTest = React.createClass({ 
  render() {
    return(
      <div className='full-screen'>
        <Jane leftDrawerOpen={true} config={mapConfig} layerComponents={layerComponents}/>
      </div>
    )
  }
})

module.exports=MapComponentTest