import appConfig from '../../helpers/appConfig';

const defaultFilterDimensions = {
  dcp_pipeline_status: [
    {
      label: 'Complete',
      value: 'Complete',
      checked: true,
      color: '#238b45',
    },
    {
      label: 'Partial complete',
      value: 'Partial complete',
      checked: true,
      color: '#74c476',
    },
    {
      label: 'Permit issued',
      value: 'Permit issued',
      checked: true,
      color: '#bae4b3',
    },
    {
      label: 'Application filed',
      value: 'Application filed',
      checked: true,
      color: '#edf8e9',
    },
  ],

  dcp_permit_type: [
    {
      label: 'New Building',
      value: 'New Building',
      checked: true,
      color: 'rgba(0, 228, 14, 0.7)',
    },
    {
      label: 'Alteration',
      value: 'Alteration',
      checked: true,
      color: 'rgba(81, 99, 230, 0.77)',
    },
    {
      label: 'Demolition',
      value: 'Demolition',
      checked: true,
      color: 'rgba(234, 62, 62, 1)',
    },
  ],

  dcp_development_type: [
    {
      label: 'Residential',
      value: 'Residential',
      checked: true,
    },
    {
      label: 'Non-residential',
      value: 'Non-residential',
      checked: true,
    },
  ],

  dcp_units_use_map: [-1445, 1669],

  dob_cofo_date: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef

  dob_qdate: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef

};

function getColor(key, value) {
  return defaultFilterDimensions[key].filter(obj => obj.value === value)[0].color;
}

const circleColors = {
  dcp_permit_type: {
    property: 'dcp_permit_type',
    type: 'categorical',
    stops: [
      ['New Building', getColor('dcp_permit_type', 'New Building')],
      ['Alteration', getColor('dcp_permit_type', 'Alteration')],
      ['Demolition', getColor('dcp_permit_type', 'Demolition')],
    ],
  },
  dcp_pipeline_status: {
    property: 'dcp_pipeline_status',
    type: 'categorical',
    stops: [
      ['Application filed', getColor('dcp_pipeline_status', 'Application filed')],
      ['Permit issued', getColor('dcp_pipeline_status', 'Permit issued')],
      ['Partial complete', getColor('dcp_pipeline_status', 'Partial complete')],
      ['Complete', getColor('dcp_pipeline_status', 'Complete')],
    ],
  },
};

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
          'circle-color': '#FFF',
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

export { defaultFilterDimensions, circleColors, getColor, LayerConfig };
