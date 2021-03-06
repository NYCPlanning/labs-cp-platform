const mapboxStyle = {
  'version': 8,
  'name': 'NYCPlanning Positron',
  'metadata': {
    'attribution': 'Based on OpenMapTiles Positron style: https:\/\/github.com\/openmaptiles\/positron-gl-style'
  },
  'center': [
    -73.869324,
    40.815888
  ],
  'zoom': 9.72,
  'bearing': 0,
  'pitch': 0,
  'sources': {
    'openmaptiles': {
      'type': 'vector',
      'url': 'https:\/\/layers-api.planninglabs.nyc\/static\/v3.json'
    },
    'aerials-2016': {
      'id': 'aerials-2016',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2016\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-2014': {
      'id': 'aerials-2014',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2014\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-2012': {
      'id': 'aerials-2012',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2012\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-2010': {
      'id': 'aerials-2010',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2010\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-2008': {
      'id': 'aerials-2008',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2008\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-2006': {
      'id': 'aerials-2006',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2006\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-2004': {
      'id': 'aerials-2004',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2004\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-20012': {
      'id': 'aerials-20012',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/2001-2\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-1996': {
      'id': 'aerials-1996',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/1996\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-1951': {
      'id': 'aerials-1951',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/1951\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'aerials-1924': {
      'id': 'aerials-1924',
      'type': 'raster',
      'tiles': [
        'https:\/\/maps.nyc.gov\/xyz\/1.0.0\/photo\/1924\/{z}\/{x}\/{y}.png8'
      ],
      'tileSize': 256
    },
    'digital-citymap': {
      'type': 'vector',
      'tiles': [
        'https:\/\/cartocdn-gusc-a.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/cfd733118e756c12ca12b2e036e785ba:1533314325007\/{z}\/{x}\/{y}.mvt'
      ]
    },
    'supporting-zoning': {
      'type': 'vector',
      'id': 'supporting-zoning',
      'tiles': [
        'https:\/\/cartocdn-gusc-d.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/166f4d41feddd399bdacaa46f9dc66e1:1531772777417\/{z}\/{x}\/{y}.mvt'
      ],
      'minzoom': 0
    },
    'admin-boundaries': {
      'type': 'vector',
      'id': 'admin-boundaries',
      'tiles': [
        'https:\/\/cartocdn-gusc-b.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/ae461026356d0521fe5a4f60185cba3f:1525336751194\/{z}\/{x}\/{y}.mvt'
      ],
      'minzoom': 0
    },
    'zoning': {
      'type': 'vector',
      'tiles': [
        'https:\/\/cartocdn-gusc-b.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/4f406a89cdc00a788ac6461e308b4be2:1525336746959\/{z}\/{x}\/{y}.mvt'
      ]
    },
    'floodplains': {
      'type': 'vector',
      'tiles': [
        'https:\/\/cartocdn-gusc-c.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/0f2bf7ae0bc4dddcae9cc0fe0105b879:1525336736357\/{z}\/{x}\/{y}.mvt'
      ]
    },
    'preliminary-flood-insurance-rate': {
      'type': 'vector',
      'id': 'preliminary-flood-insurance-rate',
      'tiles': [
        'https:\/\/cartocdn-gusc-d.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/5d72f18dd7cff53aa4bfd1289ef12603:1525336736357\/{z}\/{x}\/{y}.mvt'
      ],
      'minzoom': 0
    },
    'landmark-historic': {
      'type': 'vector',
      'id': 'landmark-historic',
      'tiles': [
        'https:\/\/cartocdn-gusc-c.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/f75279b7a688a93f1d6dd2b88f2589d5:1526570453789\/{z}\/{x}\/{y}.mvt'
      ],
      'minzoom': 0
    },
    'transportation': {
      'type': 'vector',
      'id': 'transportation',
      'tiles': [
        'https:\/\/cartocdn-gusc-d.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/997ee4141d0c594ea9483c3d5e5da6ac:1525336734600\/{z}\/{x}\/{y}.mvt'
      ],
      'minzoom': 0
    },
    'pluto': {
      'type': 'vector',
      'tiles': [
        'https:\/\/cartocdn-gusc-c.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/ee9765feaa5383f4dd600773d48df4d9:1526920479852\/{z}\/{x}\/{y}.mvt'
      ]
    },
    'zoning-districts': {
      'type': 'vector',
      'tiles': [
        'https:\/\/cartocdn-gusc-d.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/ebc5bb9ee6e423eea48b205e4cec420c:1531773210424\/{z}\/{x}\/{y}.mvt'
      ]
    },
    'zoning-map-amendments': {
      'type': 'vector',
      'id': 'zoning-map-amendments',
      'tiles': [
        'https:\/\/cartocdn-gusc-c.global.ssl.fastly.net\/planninglabs\/api\/v1\/map\/d2a210c24197461ae9a74d4a0e3076b7:1531772739795\/{z}\/{x}\/{y}.mvt'
      ],
      'minzoom': 0
    }
  },
  'sprite': 'https:\/\/layers-api.planninglabs.nyc\/static\/sprite',
  'glyphs': 'https:\/\/tiles.planninglabs.nyc\/fonts\/{fontstack}\/{range}.pbf',
  'layers': [
    {
      'id': 'background',
      'type': 'background',
      'paint': {
        'background-color': 'rgb(242,243,240)'
      }
    },
    {
      'id': 'park',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'park',
      'filter': [
        '==',
        '$type',
        'Polygon'
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgb(230, 233, 229)'
      }
    },
    {
      'id': 'water',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'water',
      'filter': [
        '==',
        '$type',
        'Polygon'
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgb(194, 200, 202)',
        'fill-antialias': true
      }
    },
    {
      'id': 'landcover_ice_shelf',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'landcover',
      'maxzoom': 8,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Polygon'
        ],
        [
          '==',
          'subclass',
          'ice_shelf'
        ]
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'hsl(0, 0%, 98%)',
        'fill-opacity': 0.7
      }
    },
    {
      'id': 'landcover_glacier',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'landcover',
      'maxzoom': 8,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Polygon'
        ],
        [
          '==',
          'subclass',
          'glacier'
        ]
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'hsl(0, 0%, 98%)',
        'fill-opacity': {
          'base': 1,
          'stops': [
            [
              0,
              1
            ],
            [
              8,
              0.5
            ]
          ]
        }
      }
    },
    {
      'id': 'landuse_residential',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'landuse',
      'maxzoom': 16,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Polygon'
        ],
        [
          '==',
          'class',
          'residential'
        ]
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgb(234, 234, 230)',
        'fill-opacity': {
          'base': 0.6,
          'stops': [
            [
              8,
              0.8
            ],
            [
              9,
              0.6
            ]
          ]
        }
      }
    },
    {
      'id': 'landcover_wood',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'landcover',
      'minzoom': 10,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Polygon'
        ],
        [
          '==',
          'class',
          'wood'
        ]
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgb(220,224,220)',
        'fill-opacity': {
          'base': 1,
          'stops': [
            [
              8,
              0
            ],
            [
              12,
              1
            ]
          ]
        }
      }
    },
    {
      'id': 'waterway',
      'type': 'line',
      'source': 'openmaptiles',
      'source-layer': 'waterway',
      'filter': [
        '==',
        '$type',
        'LineString'
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'hsl(195, 17%, 78%)'
      }
    },
    {
      'id': 'water_name',
      'type': 'symbol',
      'source': 'openmaptiles',
      'source-layer': 'water_name',
      'filter': [
        '==',
        '$type',
        'LineString'
      ],
      'layout': {
        'text-field': '{name:latin}\n{name:nonlatin}',
        'symbol-placement': 'line',
        'text-rotation-alignment': 'map',
        'symbol-spacing': 500,
        'text-font': [
          'Metropolis Medium Italic',
          'Noto Sans Italic'
        ],
        'text-size': 12
      },
      'paint': {
        'text-color': 'rgb(157,169,177)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'building',
      'type': 'fill',
      'source': 'openmaptiles',
      'source-layer': 'building',
      'minzoom': 12,
      'paint': {
        'fill-color': 'rgb(234, 234, 229)',
        'fill-outline-color': 'rgb(219, 219, 218)',
        'fill-antialias': true
      }
    },
    {
      'id': 'tunnel_motorway_casing',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'brunnel',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      'layout': {
        'line-cap': 'butt',
        'line-join': 'miter',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(213, 213, 213)',
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              5.8,
              0
            ],
            [
              6,
              3
            ],
            [
              20,
              40
            ]
          ]
        },
        'line-opacity': 1
      }
    },
    {
      'id': 'tunnel_motorway_inner',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'brunnel',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(234,234,234)',
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      'id': 'aeroway-taxiway',
      'type': 'line',
      'metadata': {
        'mapbox:group': '1444849345966.4436'
      },
      'source': 'openmaptiles',
      'source-layer': 'aeroway',
      'minzoom': 12,
      'filter': [
        'all',
        [
          'in',
          'class',
          'taxiway'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'hsl(0, 0%, 88%)',
        'line-width': {
          'base': 1.55,
          'stops': [
            [
              13,
              1.8
            ],
            [
              20,
              20
            ]
          ]
        },
        'line-opacity': 1
      }
    },
    {
      'id': 'aeroway-runway-casing',
      'type': 'line',
      'metadata': {
        'mapbox:group': '1444849345966.4436'
      },
      'source': 'openmaptiles',
      'source-layer': 'aeroway',
      'minzoom': 11,
      'filter': [
        'all',
        [
          'in',
          'class',
          'runway'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'hsl(0, 0%, 88%)',
        'line-width': {
          'base': 1.5,
          'stops': [
            [
              11,
              6
            ],
            [
              17,
              55
            ]
          ]
        },
        'line-opacity': 1
      }
    },
    {
      'id': 'aeroway-area',
      'type': 'fill',
      'metadata': {
        'mapbox:group': '1444849345966.4436'
      },
      'source': 'openmaptiles',
      'source-layer': 'aeroway',
      'minzoom': 4,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Polygon'
        ],
        [
          'in',
          'class',
          'runway',
          'taxiway'
        ]
      ],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-opacity': {
          'base': 1,
          'stops': [
            [
              13,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        'fill-color': 'rgba(255, 255, 255, 1)'
      }
    },
    {
      'id': 'aeroway-runway',
      'type': 'line',
      'metadata': {
        'mapbox:group': '1444849345966.4436'
      },
      'source': 'openmaptiles',
      'source-layer': 'aeroway',
      'minzoom': 11,
      'maxzoom': 24,
      'filter': [
        'all',
        [
          'in',
          'class',
          'runway'
        ],
        [
          '==',
          '$type',
          'LineString'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgba(255, 255, 255, 1)',
        'line-width': {
          'base': 1.5,
          'stops': [
            [
              11,
              4
            ],
            [
              17,
              50
            ]
          ]
        },
        'line-opacity': 1
      }
    },
    {
      'id': 'highway_path',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'class',
          'path'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(234, 234, 234)',
        'line-width': {
          'base': 1.2,
          'stops': [
            [
              13,
              1
            ],
            [
              20,
              10
            ]
          ]
        },
        'line-opacity': 0.9
      }
    },
    {
      'id': 'highway_minor',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 8,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'in',
          'class',
          'minor',
          'service',
          'track'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'hsl(0, 0%, 88%)',
        'line-width': {
          'base': 1.55,
          'stops': [
            [
              13,
              1.8
            ],
            [
              20,
              20
            ]
          ]
        },
        'line-opacity': 0.9
      }
    },
    {
      'id': 'highway_major_casing',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 11,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'in',
          'class',
          'primary',
          'secondary',
          'tertiary',
          'trunk'
        ]
      ],
      'layout': {
        'line-cap': 'butt',
        'line-join': 'miter',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(213, 213, 213)',
        'line-dasharray': [
          12,
          0
        ],
        'line-width': {
          'base': 1.3,
          'stops': [
            [
              10,
              3
            ],
            [
              20,
              23
            ]
          ]
        }
      }
    },
    {
      'id': 'highway_major_inner',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 11,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'in',
          'class',
          'primary',
          'secondary',
          'tertiary',
          'trunk'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': '#fff',
        'line-width': {
          'base': 1.3,
          'stops': [
            [
              10,
              2
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      'id': 'highway_major_subtle',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'maxzoom': 11,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'in',
          'class',
          'primary',
          'secondary',
          'tertiary',
          'trunk'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'hsla(0, 0%, 85%, 0.69)',
        'line-width': 2
      }
    },
    {
      'id': 'highway_motorway_casing',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'brunnel',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      'layout': {
        'line-cap': 'butt',
        'line-join': 'miter',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(213, 213, 213)',
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              5.8,
              0
            ],
            [
              6,
              3
            ],
            [
              20,
              40
            ]
          ]
        },
        'line-dasharray': [
          2,
          0
        ],
        'line-opacity': 1
      }
    },
    {
      'id': 'highway_motorway_inner',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'brunnel',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': {
          'base': 1,
          'stops': [
            [
              5.8,
              'hsla(0, 0%, 85%, 0.53)'
            ],
            [
              6,
              '#fff'
            ]
          ]
        },
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      'id': 'highway_motorway_subtle',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'maxzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'class',
          'motorway'
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'hsla(0, 0%, 85%, 0.53)',
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ]
          ]
        }
      }
    },
    {
      'id': 'railway_transit',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 16,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'transit'
          ],
          [
            '!in',
            'brunnel',
            'tunnel'
          ]
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#dddddd',
        'line-width': 3
      }
    },
    {
      'id': 'railway_transit_dashline',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 16,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'transit'
          ],
          [
            '!in',
            'brunnel',
            'tunnel'
          ]
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fafafa',
        'line-width': 2,
        'line-dasharray': [
          3,
          3
        ]
      }
    },
    {
      'id': 'railway_service',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 16,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'rail'
          ],
          [
            'has',
            'service'
          ]
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#dddddd',
        'line-width': 3
      }
    },
    {
      'id': 'railway_service_dashline',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 16,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'class',
          'rail'
        ],
        [
          'has',
          'service'
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fafafa',
        'line-width': 2,
        'line-dasharray': [
          3,
          3
        ]
      }
    },
    {
      'id': 'railway',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 13,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!has',
            'service'
          ],
          [
            '==',
            'class',
            'rail'
          ]
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#dddddd',
        'line-width': {
          'base': 1.3,
          'stops': [
            [
              16,
              3
            ],
            [
              20,
              7
            ]
          ]
        }
      }
    },
    {
      'id': 'railway_dashline',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 13,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!has',
            'service'
          ],
          [
            '==',
            'class',
            'rail'
          ]
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fafafa',
        'line-width': {
          'base': 1.3,
          'stops': [
            [
              16,
              2
            ],
            [
              20,
              6
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ]
      }
    },
    {
      'id': 'highway_motorway_bridge_casing',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'brunnel',
            'bridge'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      'layout': {
        'line-cap': 'butt',
        'line-join': 'miter',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(213, 213, 213)',
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              5.8,
              0
            ],
            [
              6,
              5
            ],
            [
              20,
              45
            ]
          ]
        },
        'line-dasharray': [
          2,
          0
        ],
        'line-opacity': 1
      }
    },
    {
      'id': 'highway_motorway_bridge_inner',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation',
      'minzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'brunnel',
            'bridge'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': {
          'base': 1,
          'stops': [
            [
              5.8,
              'hsla(0, 0%, 85%, 0.53)'
            ],
            [
              6,
              '#fff'
            ]
          ]
        },
        'line-width': {
          'base': 1.4,
          'stops': [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      'id': 'highway_name_other',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation_name',
      'filter': [
        'all',
        [
          '!=',
          'class',
          'motorway'
        ],
        [
          '==',
          '$type',
          'LineString'
        ]
      ],
      'layout': {
        'text-size': 10,
        'text-max-angle': 30,
        'text-transform': 'uppercase',
        'symbol-spacing': 350,
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'symbol-placement': 'line',
        'visibility': 'visible',
        'text-rotation-alignment': 'map',
        'text-pitch-alignment': 'viewport',
        'text-field': '{name:latin} {name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': '#fff',
        'text-translate': [
          0,
          0
        ],
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'highway_name_motorway',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5'
      },
      'source': 'openmaptiles',
      'source-layer': 'transportation_name',
      'filter': [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'class',
          'motorway'
        ]
      ],
      'layout': {
        'text-size': 10,
        'symbol-spacing': 350,
        'text-font': [
          'Metropolis Light',
          'Noto Sans Regular'
        ],
        'symbol-placement': 'line',
        'visibility': 'visible',
        'text-rotation-alignment': 'viewport',
        'text-pitch-alignment': 'viewport',
        'text-field': '{ref}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-translate': [
          0,
          2
        ],
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'boundary_state',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f'
      },
      'source': 'openmaptiles',
      'source-layer': 'boundary',
      'filter': [
        '==',
        'admin_level',
        4
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
        'visibility': 'visible'
      },
      'paint': {
        'line-color': 'rgb(230, 204, 207)',
        'line-width': {
          'base': 1.3,
          'stops': [
            [
              3,
              1
            ],
            [
              22,
              15
            ]
          ]
        },
        'line-blur': 0.4,
        'line-dasharray': [
          2,
          2
        ],
        'line-opacity': 1
      }
    },
    {
      'id': 'boundary_country',
      'type': 'line',
      'metadata': {
        'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f'
      },
      'source': 'openmaptiles',
      'source-layer': 'boundary',
      'filter': [
        '==',
        'admin_level',
        2
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': 'rgb(230, 204, 207)',
        'line-width': {
          'base': 1.1,
          'stops': [
            [
              3,
              1
            ],
            [
              22,
              20
            ]
          ]
        },
        'line-blur': {
          'base': 1,
          'stops': [
            [
              0,
              0.4
            ],
            [
              22,
              4
            ]
          ]
        },
        'line-opacity': 1
      }
    },
    {
      'id': 'place_other',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 14,
      'filter': [
        'all',
        [
          'in',
          'class',
          'continent',
          'hamlet',
          'neighbourhood',
          'isolated_dwelling'
        ],
        [
          '==',
          '$type',
          'Point'
        ]
      ],
      'layout': {
        'text-size': 10,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-anchor': 'center',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_suburb',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 15,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'class',
          'suburb'
        ]
      ],
      'layout': {
        'text-size': 10,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-anchor': 'center',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_village',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 14,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'class',
          'village'
        ]
      ],
      'layout': {
        'text-size': 10,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-anchor': 'center',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_town',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 15,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'class',
          'town'
        ]
      ],
      'layout': {
        'text-size': 10,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-anchor': 'center',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_city',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 14,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          'all',
          [
            '!=',
            'capital',
            2
          ],
          [
            '==',
            'class',
            'city'
          ],
          [
            '>',
            'rank',
            3
          ]
        ]
      ],
      'layout': {
        'text-size': 10,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-anchor': 'center',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_capital',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 12,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          'all',
          [
            '==',
            'capital',
            2
          ],
          [
            '==',
            'class',
            'city'
          ]
        ]
      ],
      'layout': {
        'text-size': 14,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-anchor': 'center',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_city_large',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 12,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          'all',
          [
            '!=',
            'capital',
            2
          ],
          [
            '<=',
            'rank',
            3
          ],
          [
            '==',
            'class',
            'city'
          ]
        ]
      ],
      'layout': {
        'text-size': 14,
        'text-transform': 'uppercase',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-justify': 'center',
        'visibility': 'visible',
        'text-field': '{name:latin}\n{name:nonlatin}'
      },
      'paint': {
        'text-color': 'rgb(117, 129, 145)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_state',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 12,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'class',
          'state'
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'text-field': '{name:latin}\n{name:nonlatin}',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-transform': 'uppercase',
        'text-size': 10
      },
      'paint': {
        'text-color': 'rgb(113, 129, 144)',
        'text-halo-color': 'rgb(242,243,240)',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    },
    {
      'id': 'place_country_other',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 8,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'class',
          'country'
        ],
        [
          '!has',
          'iso_a2'
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'text-field': '{name:latin}',
        'text-font': [
          'Metropolis Light Italic',
          'Noto Sans Italic'
        ],
        'text-transform': 'uppercase',
        'text-size': {
          'base': 1,
          'stops': [
            [
              0,
              9
            ],
            [
              6,
              11
            ]
          ]
        }
      },
      'paint': {
        'text-halo-width': 1.4,
        'text-halo-color': 'rgba(236,236,234,0.7)',
        'text-color': {
          'base': 1,
          'stops': [
            [
              3,
              'rgb(157,169,177)'
            ],
            [
              4,
              'rgb(153, 153, 153)'
            ]
          ]
        }
      }
    },
    {
      'id': 'place_country_minor',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 8,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'class',
          'country'
        ],
        [
          '>=',
          'rank',
          2
        ],
        [
          'has',
          'iso_a2'
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'text-field': '{name:latin}',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-transform': 'uppercase',
        'text-size': {
          'base': 1,
          'stops': [
            [
              0,
              10
            ],
            [
              6,
              12
            ]
          ]
        }
      },
      'paint': {
        'text-halo-width': 1.4,
        'text-halo-color': 'rgba(236,236,234,0.7)',
        'text-color': {
          'base': 1,
          'stops': [
            [
              3,
              'rgb(157,169,177)'
            ],
            [
              4,
              'rgb(153, 153, 153)'
            ]
          ]
        }
      }
    },
    {
      'id': 'place_country_major',
      'type': 'symbol',
      'metadata': {
        'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f'
      },
      'source': 'openmaptiles',
      'source-layer': 'place',
      'maxzoom': 6,
      'filter': [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '<=',
          'rank',
          1
        ],
        [
          '==',
          'class',
          'country'
        ],
        [
          'has',
          'iso_a2'
        ]
      ],
      'layout': {
        'visibility': 'visible',
        'text-field': '{name:latin}',
        'text-font': [
          'Metropolis Regular',
          'Noto Sans Regular'
        ],
        'text-transform': 'uppercase',
        'text-size': {
          'base': 1.4,
          'stops': [
            [
              0,
              10
            ],
            [
              3,
              12
            ],
            [
              4,
              14
            ]
          ]
        },
        'text-anchor': 'center'
      },
      'paint': {
        'text-halo-width': 1.4,
        'text-halo-color': 'rgba(236,236,234,0.7)',
        'text-color': {
          'base': 1,
          'stops': [
            [
              3,
              'rgb(157,169,177)'
            ],
            [
              4,
              'rgb(153, 153, 153)'
            ]
          ]
        }
      }
    }
  ]
}

export default mapboxStyle;