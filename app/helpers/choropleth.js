// choropleth.js
// given polygon geojson data and options, returns a GL fill style
// adaptation of Tim Wisniewskis' Leaflet Choropleth

import chroma from 'chroma-js';

const Choropleth = (geojson, opts) => {
  opts = opts || {};


  // Calculate limits
  const values = geojson.features.map((item) => {
    if (typeof opts.valueProperty === 'function') {
      return opts.valueProperty(item);
    }

    return item.properties[opts.valueProperty];
  });
  const limits = chroma.limits(values, opts.mode, opts.steps - 1);

  // Create color buckets
  const colors = opts.colors || chroma.scale(opts.scale).colors(opts.steps);

  // build stops
  const stops = limits.map((limit, i) => [limits[i], colors[i]]);


  return {
    'fill-color': {
      property: opts.valueProperty,
      stops,
    },
  };
};

export default Choropleth;
