import appConfig from '../../helpers/appConfig';

const defaultFilterDimensions = {
  dcp_pipeline_status: [
    {
      label: 'Complete',
      value: 'Complete',
      color: '#238b45',
    },
    {
      label: 'Partial complete',
      value: 'Partial complete',
      color: '#74c476',
    },
    {
      label: 'Permit issued',
      value: 'Permit issued',
      color: '#bae4b3',
    },
    {
      label: 'Application filed',
      value: 'Application filed',
      color: '#edf8e9',
    },
  ],

  dcp_permit_type: [
    {
      label: 'New Building',
      value: 'New Building',
      color: 'rgba(0, 228, 14, 0.7)',
    },
    {
      label: 'Alteration',
      value: 'Alteration',
      color: 'rgba(81, 99, 230, 0.77)',
    },
    {
      label: 'Demolition',
      value: 'Demolition',
      color: 'rgba(234, 62, 62, 1)',
    },
  ],

  dcp_development_type: [
    {
      label: 'Residential',
      value: 'Residential',
    },
    {
      label: 'Non-residential',
      value: 'Non-residential',
    },
  ],

  dcp_units_use_map: [-1445, 1669],

  dob_cofo_date: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef

  dob_qdate: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef

};

function getColor(key, value) {
  return defaultFilterDimensions[key].filter(obj => obj.value === value)[0].color;
}

const LayerConfig = {
  points: {
    sources: [
      {
        type: 'cartovector',
        id: 'pipeline-points',
        options: {
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
        },
      },
    ],
    mapLayers: [
      {
        id: 'pipeline-points',
        source: 'pipeline-points',
        'source-layer': 'layer0',
        type: 'circle',
        paint: {
          'circle-radius': {
            property: 'dcp_units_use_map',
            stops: [
              [{ zoom: 10, value: -12 }, 1],
              [{ zoom: 10, value: 1669 }, 2],
              [{ zoom: 10, value: 1669 }, 4],
              [{ zoom: 14, value: -12 }, 5],
              [{ zoom: 14, value: 100 }, 10],
              [{ zoom: 14, value: 1669 }, 20],
            ],
          },
          'circle-color': {
            property: 'dcp_permit_type',
            type: 'categorical',
            stops: [
              ['New Building', getColor('dcp_permit_type', 'New Building')],
              ['Alteration', getColor('dcp_permit_type', 'Alteration')],
              ['Demolition', getColor('dcp_permit_type', 'Demolition')],
            ],
          },
          'circle-stroke-color': '#000',
          'circle-stroke-width': {
            stops: [
              [11, 0],
              [12, 1],
            ],
          },
          'circle-stroke-opacity': 0.5,
          'circle-opacity': 0.5,
        },
      },
    ],
  },

  polygons: {
    sources: [
      {
        type: 'cartovector',
        id: 'pipeline-polygons',
        options: {
          carto_user: appConfig.carto_user,
          carto_domain: appConfig.carto_domain,
        },
      },
    ],
    mapLayers: [
      {
        id: 'pipeline-polygons',
        source: 'pipeline-polygons',
        'source-layer': 'layer0',
        type: 'fill',
        paint: {
          'fill-color': 'steelblue',
          'fill-opacity': 0.75,
          'fill-outline-color': '#838763',
          'fill-antialias': true,
        },
      },
    ],
  },
};

export { defaultFilterDimensions, getColor, LayerConfig };
