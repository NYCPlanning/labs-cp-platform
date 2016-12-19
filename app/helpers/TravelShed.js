// travelShed.js - helper methods to fetch travelshed geojson

import appConfig from './appConfig.js'

var travelshed = {
  //getSimple() returns a simple 15, 30, 45 minute isochrone.  Requires an array like [lat,lng]
  getSimple: function( point ) {
    return new Promise( function( resolve, reject ) {
      var apiCall = `https://${appConfig.otp_domain}/otp/routers/default/isochrone?routeId=default&batch=true&fromPlace=${point[0]},${point[1]}&date=2016/09/23&time=12:00:00&mode=TRANSIT,WALK&cutoffSec=900&cutoffSec=1800&cutoffSec=2700`

      $.getJSON( apiCall, function(data) {
        resolve(data)
      })
    })
  }
}

module.exports=travelshed