//choropleth.js
//given polygon geojson data and options, returns a GL fill style
//adaptation of Tim Wisniewskis' Leaflet Choropleth 

import _ from 'underscore'
import chroma from 'chroma-js'

const Choropleth = (geojson, opts) => {

  opts = opts || {}

  // Save what the user passed as the style property for later use (since we're overriding it)
  const userStyle = opts.style

  // Calculate limits
  const values = geojson.features.map(function (item) {
    if (typeof opts.valueProperty === 'function') {
      return opts.valueProperty(item)
    } else {
      return item.properties[opts.valueProperty]
    }
  })
  const limits = chroma.limits(values, opts.mode, opts.steps - 1)

  // Create color buckets
  const colors = opts.colors || chroma.scale(opts.scale).colors(opts.steps)

  console.log(limits, colors)
  // build stops

  const stops = limits.map((limit, i) => {
    return [ limits[i], colors[i] ]
  })


  return {
    'fill-color': {
        property: opts.valueProperty,
        stops: stops
    }
  }
}

export default Choropleth