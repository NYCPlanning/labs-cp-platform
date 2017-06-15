const defaultFilterDimensions = {
  dcp_pipeline_status: {
    type: 'statusMultiSelect',
    values: [
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
  },

  dcp_permit_type: {
    type: 'multiSelect',
    values: [
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
  },

  dcp_development_type: {
    type: 'multiSelect',
    values: [
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
  },

  dcp_units_use_map: {
    type: 'numberRange',
    values: [-1445, 1669],
  },

  dob_cofo_date: {
    type: 'cofoDateRange',
    values: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef
    disabled: true,
  },

  dob_qdate: {
    type: 'dateRange',
    values: [moment('2010-12-31T19:00:00-05:00').format('X'), moment().format('X')], // eslint-disable-line no-undef
    disabled: true,
  },
};

function getColor(key, value) {
  return defaultFilterDimensions[key].values.filter(obj => obj.value === value)[0].color;
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

export { defaultFilterDimensions, circleColors, getColor };
