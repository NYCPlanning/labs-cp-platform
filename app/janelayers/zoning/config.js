const appConfig = {
  carto_user: 'cpp',
  carto_domain: 'cartoprod.capitalplanning.nyc',
};

const paint = {
  labels: {
    'text-color': '#626262',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
  co_labels: {
    'text-color': 'rgba(255, 0, 0, 1)',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
};

const config = {
  zd: {
    sources: [
      {
        id: 'zd',
        type: 'cartovector',
        options: {
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
          sql: ['SELECT *, LEFT(zonedist, 2) as primaryzone FROM support_zoning_zd'],
        },
      },
    ],
    mapLayers: [
      {
        id: 'zd',
        type: 'fill',
        source: 'zd',
        'source-layer': 'layer0',
        paint: {
          'fill-color': {
            property: 'primaryzone',
            type: 'categorical',
            stops: [
              ['BP', '#EEEEEE'],
              ['C1', '#FDBDBB'],
              ['C2', '#FDBDBB'],
              ['C3', '#FDBDBB'],
              ['C4', '#FDBDBB'],
              ['C5', '#FDBDBB'],
              ['C6', '#FDBDBB'],
              ['C7', '#FDBDBB'],
              ['C8', '#FDBDBB'],
              ['M1', '#B7D6FD'],
              ['M2', '#EDB7FD'],
              ['M3', '#EDB7FD'],
              ['PA', '#E7FDDC'],
              ['R1', '#FDFDDC'],
              ['R2', '#FDFDDC'],
              ['R3', '#FDFDDC'],
              ['R4', '#FDFDDC'],
              ['R5', '#FDFDDC'],
              ['R6', '#FDE7BD'],
              ['R7', '#FDE7BD'],
              ['R8', '#FDE7BD'],
              ['R9', '#FDE7BD'],
            ],
          },
          'fill-opacity': 0.6,
          'fill-antialias': true,
          'fill-outline-color': 'rgba(0, 0, 0, 1)',
        },
      },
      {
        id: 'zd_labels',
        source: 'zd',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: paint.labels,
        layout: {
          'symbol-placement': 'point',
          'text-field': '{zonedist}',
        },
        minzoom: 14,
      },
    ],
  },
  co: {
    sources: [
      {
        id: 'co',
        type: 'cartovector',
        options: {
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
          sql: ['SELECT * FROM support_zoning_co'],
        },
      },
    ],
    mapLayers: [
      {
        id: 'co',
        type: 'fill',
        source: 'co',
        'source-layer': 'layer0',
        paint: {
          'fill-opacity': 1,
          'fill-color': 'rgba(158, 0, 0, 0)',
          'fill-antialias': true,
          'fill-outline-color': 'rgba(255, 0, 0, 1)',
        },
      },
      {
        id: 'co_labels',
        source: 'co',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: paint.co_labels,
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}',
        },
        minzoom: 14,
      },
    ],
  },
};

export default config;
