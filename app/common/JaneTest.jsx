import React from 'react'
import Jane from '../jane'

import appConfig from '../helpers/appConfig.js'

const mapInit = {
  mapbox_accessToken: appConfig.mapbox_accessToken,
  center: [-74.0079, 40.7315],
  zoom: 12,
  minZoom: null,
  maxZoom: null,
  pitch: 0,
  hash: true,
  navigationControlPosition: 'bottom-right'
}

const searchConfig = {
  mapzen_api_key: appConfig.mapzen_api_key,
  bounds: {
    minLon: -74.292297,
    maxLon: -73.618011,
    minLat: 40.477248,
    maxLat: 40.958123
  }
}

const JaneTest = React.createClass({
  render() {
    return(
      <div style={{
          position: 'absolute',
          top: '100px',
          right: '100px',
          bottom: '100px',
          left: '100px',
          background: 'lightgray'
        }}
      >
        <Jane 
          mapInit={mapInit}
          search={true}
          searchConfig={searchConfig}
        />
      </div>
    )
  }
})

export default JaneTest