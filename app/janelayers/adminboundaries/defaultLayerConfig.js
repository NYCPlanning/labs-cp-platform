const paint = {
  lines: {
    'line-color': '#626262',
    'line-opacity': 0.7,
    'line-width': 4,
    'line-dasharray': [2, 2],
  },
  labels: {
    'text-color': '#626262',
  },
};

const defaultLayerConfig = {
  nta: {
    sources: [
      {
        id: 'ntaboundaries',
        type: 'geojson',
        source: '/data/ntaboundaries.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'ntaboundaries',
        source: 'ntaboundaries',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'ntaboundaries-labels',
        source: 'ntaboundaries',
        type: 'symbol',
        minzoom: 13,
        paint: paint.labels,
        layout: {
          'text-field': '{ntaname}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  cd: {
    sources: [
      {
        id: 'cdboundaries',
        type: 'geojson',
        source: '/data/cdboundaries.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'cdboundaries',
        source: 'cdboundaries',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'cdboundaries-labels',
        source: 'cdboundaries',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{displaynam}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  schooldistricts: {
    sources: [
      {
        id: 'schooldistricts',
        type: 'geojson',
        source: '/data/schooldistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'schooldistricts',
        source: 'schooldistricts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'schooldistricts-labels',
        source: 'schooldistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{SchoolDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  boroughboundaries: {
    sources: [
      {
        id: 'boroughboundaries',
        type: 'geojson',
        source: '/data/BoroughBoundaries.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'boroughboundaries',
        source: 'boroughboundaries',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'boroughboundaries-labels',
        source: 'boroughboundaries',
        minzoom: 10,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{BoroName}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  citycouncildistricts: {
    sources: [
      {
        id: 'citycouncildistricts',
        type: 'geojson',
        source: '/data/CityCouncilDistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'citycouncildistricts',
        source: 'citycouncildistricts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'citycouncildistricts-labels',
        source: 'citycouncildistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{CounDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  firebattalions: {
    sources: [
      {
        id: 'firebattalions',
        type: 'geojson',
        source: '/data/FireBattalions.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'firebattalions',
        source: 'firebattalions',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'firebattalions-labels',
        source: 'firebattalions',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{FireBN}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  firecompanies: {
    sources: [
      {
        id: 'firecompanies',
        type: 'geojson',
        source: '/data/FireCompanies.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'firecompanies',
        source: 'firecompanies',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'firecompanies-labels',
        source: 'firecompanies',
        minzoom: 12,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{FireCoNum}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  firedivisions: {
    sources: [
      {
        id: 'firedivisions',
        type: 'geojson',
        source: '/data/FireDivisions.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'firedivisions',
        source: 'firedivisions',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'firedivisions-labels',
        source: 'firedivisions',
        minzoom: 10,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{FireDiv}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  healtharea: {
    sources: [
      {
        id: 'healtharea',
        type: 'geojson',
        source: '/data/HealthArea.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'healtharea',
        source: 'healtharea',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'healtharea-labels',
        source: 'healtharea',
        minzoom: 12,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{HealthArea}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  healthcenter: {
    sources: [
      {
        id: 'healthcenter',
        type: 'geojson',
        source: '/data/HealthCenter.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'healthcenter',
        source: 'healthcenter',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'healthcenter-labels',
        source: 'healthcenter',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{HCentDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  municipalcourtdistricts: {
    sources: [
      {
        id: 'municipalcourtdistricts',
        type: 'geojson',
        source: '/data/MunicipalCourtDistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'municipalcourtdistricts',
        source: 'municipalcourtdistricts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'municipalcourtdistricts-labels',
        source: 'municipalcourtdistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{MuniCourt}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  policeprecincts: {
    sources: [
      {
        id: 'policeprecincts',
        type: 'geojson',
        source: '/data/PolicePrecincts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'policeprecincts',
        source: 'policeprecincts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'policeprecincts-labels',
        source: 'policeprecincts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{Precinct}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  stateassemblydistricts: {
    sources: [
      {
        id: 'stateassemblydistricts',
        type: 'geojson',
        source: '/data/StateAssemblyDistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'stateassemblydistricts',
        source: 'stateassemblydistricts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'stateassemblydistricts-labels',
        source: 'stateassemblydistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{AssemDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  statesenatedistricts: {
    sources: [
      {
        id: 'statesenatedistricts',
        type: 'geojson',
        source: '/data/StateSenateDistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'statesenatedistricts',
        source: 'statesenatedistricts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'statesenatedistricts-labels',
        source: 'statesenatedistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{StSenDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },

  uscongressionaldistricts: {
    sources: [
      {
        id: 'uscongressionaldistricts',
        type: 'geojson',
        source: '/data/USCongressionalDistricts.geojson',
      },
    ],
    mapLayers: [
      {
        id: 'uscongressionaldistricts',
        source: 'uscongressionaldistricts',
        type: 'line',
        paint: paint.lines,
      },
      {
        id: 'uscongressionaldistricts-labels',
        source: 'uscongressionaldistricts',
        minzoom: 11,
        type: 'symbol',
        paint: paint.labels,
        layout: {
          'text-field': '{CongDist}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        },
      },
    ],
  },
};

module.exports = defaultLayerConfig;
