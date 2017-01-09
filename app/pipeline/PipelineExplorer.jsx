// PipeLineExplorer.jsx - Top level Component for the Pipeline Explorer Map
import React from 'react'

import Nav from '../common/Nav.jsx'
import appConfig from '../helpers/appConfig.js'
import content from './content.jsx'

import Jane from '../../jane-maps/src'
import PipelineJaneLayer from './pipelinejanelayer'

import AdminBoundariesJaneLayer from '../janelayers/adminboundaries'
import TransportationJaneLayer from '../janelayers/transportation'
import GrayOutsideNyc from '../janelayers/grayoutsidenyc'

var PipeLineExplorer = React.createClass({
  componentDidMount() {
    document.title = "NYC Housing Development Explorer"

    var modalShown = JSON.parse(localStorage.getItem('pipeline-splash'))
    if (!modalShown) {
      this.props.showModal({
        modalHeading: 'Welcome!',
        modalContent: content.splash,
        modalCloseText: 'Got it.  Let me in!'
      })

      localStorage.setItem('pipeline-splash', 'true');
    }
  },

  render() {
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

    const mapConfig = {
      selectedLayer: 'pipeline',
      layers: [
        AdminBoundariesJaneLayer,
        TransportationJaneLayer,
        PipelineJaneLayer,
        GrayOutsideNyc
      ]
    }

    return(
      <div className='full-screen'>
        <Jane
          mapInit={mapInit}
          search={true}
          searchConfig={searchConfig}
          mapConfig={mapConfig}
        />
      </div>
    )
  }
})

module.exports=PipeLineExplorer
