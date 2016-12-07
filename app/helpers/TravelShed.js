// travelShed.js - helper methods to fetch travelshed geojson

var TravelShed = {
  //getSimple() returns a simple 15, 30, 45 minute isochrone.  Requires an array like [lat,lng]
  getSimple: function( point ) {
    return new Promise( function( resolve, reject ) {
      var travelshedTemplate = 'https://otp.capitalplanning.nyc/otp/routers/default/isochrone?routeId=default&batch=true&fromPlace={{lat}},{{lon}}&date=2016/09/23&time=12:00:00&mode=TRANSIT,WALK&cutoffSec=900&cutoffSec=1800&cutoffSec=2700'

      var apiCall = Mustache.render(travelshedTemplate, {
        lat: point[0],
        lon: point[1]
      })

      $.getJSON( apiCall, function(data) {
        resolve(data)
      })
    })
  }
}

module.exports=TravelShed