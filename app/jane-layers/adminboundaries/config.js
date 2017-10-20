const paint = {
  lines: {
    'line-color': '#717171',
    'line-opacity': 0.7,
    'line-width': {
      stops: [
        [9, 1],
        [14, 4],
      ],
    },
  },
  labels: {
    'text-color': '#626262',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
};

const layout = {
  lines: {
    'line-join': 'round',
    'line-cap': 'round',
  },
};

const mapLayers = {
  ntaboundaries: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  ntaboundaries_labels: {
    type: 'symbol',
    minzoom: 13,
    paint: paint.labels,
    layout: {
      'text-field': '{ntaname}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  censustracts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  censustracts_labels: {
    type: 'symbol',
    minzoom: 13,
    paint: paint.labels,
    layout: {
      'text-field': '{ct_2010}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 9],
          [14, 14],
        ],
      },
    },
  },
  puma: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  puma_labels: {
    type: 'symbol',
    minzoom: 13,
    paint: paint.labels,
    layout: {
      'text-field': '{puma}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  taz: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  taz_labels: {
    type: 'symbol',
    minzoom: 13,
    paint: paint.labels,
    layout: {
      'text-field': '{TAZCE10}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 9],
          [14, 14],
        ],
      },
    },
  },
  cd: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  cd_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{displaynam}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  schooldistricts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  schooldistricts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{SchoolDist}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  boroughboundaries: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  boroughboundaries_labels: {
    minzoom: 10,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{BoroName}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  citycouncildistricts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  citycouncildistricts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{CounDist}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  firebattalions: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  firebattalions_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{FireBN}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  firecompanies: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  firecompanies_labels: {
    minzoom: 12,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{FireCoNum}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  firedivisions: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  firedivisions_labels: {
    minzoom: 10,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{FireDiv}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  municipalcourtdistricts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  municipalcourtdistricts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{MuniCourt}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  policeprecincts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  policeprecincts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{Precinct}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  stateassemblydistricts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  stateassemblydistricts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{AssemDist}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  statesenatedistricts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  statesenatedistricts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{StSenDist}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
  uscongressionaldistricts: {
    type: 'line',
    paint: paint.lines,
    layout: layout.lines,
  },
  uscongressionaldistricts_labels: {
    minzoom: 11,
    type: 'symbol',
    paint: paint.labels,
    layout: {
      'text-field': '{CongDist}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': {
        stops: [
          [11, 12],
          [14, 16],
        ],
      },
    },
  },
};

export default mapLayers;
