import moment from 'moment';
import LabelHelper from '../helpers/labels/labelHelper';

const defaultFilterDimensions = {
  radiusfilter: {
    type: 'radiusFilter',
    disabled: true,
    values: {
      coordinates: [],
      radius: 0,
    },
  },
  geo_cd: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('commboard'),
  },
  geo_boro: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('borocode'),
  },
  geo_ntacode2010: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('nta'),
  },
  geo_censustract2010: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('censtract'),
  },
  geo_council: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('council'),
  },
  geo_csd: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('schooldistrict'),
  },
  status: {
    type: 'statusMultiSelect',
    values: [
      {
        label: 'Complete',
        value: 'Complete',
        checked: true,
        color: '#238b45',
      },
      {
        label: 'Complete (demolition)',
        value: 'Complete (demolition)',
        checked: true,
        color: '#238b45',
      },
      {
        label: 'In progress',
        value: 'In progress',
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
        label: 'Filed',
        value: 'Filed',
        checked: true,
        color: '#edf8e9',
      },
    ],
  },

  job_type: {
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
        color: 'rgba(179, 0, 0, 0.77)',
      },
    ],
  },

  occ_category: {
    type: 'multiSelect',
    values: [
      {
        label: 'Residential',
        value: 'Residential',
        checked: true,
      },
      {
        label: 'Other Accommodations',
        value: 'Other Accommodations',
        checked: true,
      },
    ],
  },

  units_net: {
    type: 'numberRange',
    values: [-800, 1800],
  },

  co_earliest_effectivedate: {
    type: 'cofoDateRange',
    values: [moment('2010-12-31T19:00:00-05:00').format('X'), moment('2018-01-01T19:00:00-05:00').format('X')], // eslint-disable-line no-undef
    disabled: true,
  },

  status_q: {
    type: 'dateRange',
    values: [moment('2010-12-31T19:00:00-05:00').format('X'), moment('2018-01-01T19:00:00-05:00').format('X')], // eslint-disable-line no-undef
    disabled: true,
  },
};

function getColor(key, value) {
  return defaultFilterDimensions[key].values.filter(obj => obj.value === value)[0].color;
}

const circleColors = {
  job_type: {
    property: 'job_type',
    type: 'categorical',
    stops: [
      ['New Building', getColor('job_type', 'New Building')],
      ['Alteration', getColor('job_type', 'Alteration')],
      ['Demolition', getColor('job_type', 'Demolition')],
    ],
  },
  status: {
    property: 'status',
    type: 'categorical',
    stops: [
      ['Filed', getColor('status', 'Filed')],
      ['Permit issued', getColor('status', 'Permit issued')],
      ['In progress', getColor('status', 'In progress')],
      ['Complete', getColor('status', 'Complete')],
      ['Complete (demolition)', getColor('status', 'Complete (demolition)')],
    ],
  },
};

export { defaultFilterDimensions, circleColors, getColor };
