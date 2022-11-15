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
    values: LabelHelper.get_labels('cd'),
  },
  geo_boro: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('borocode'),
  },
  geo_ntacode2020: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('nta2020'),
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
  job_status: {
    type: 'statusMultiSelect',
    values: [
      {
        label: 'Completed Construction',
        value: '5. Completed Construction',
        checked: true,
        color: '#238b45',
      },
      {
        label: 'Permitted for Construction',
        value: '3. Permitted for Construction',
        checked: true,
        color: '#74c476',
      },
      {
        label: 'Approved Application',
        value: '2. Approved Application',
        checked: true,
        color: '#bae4b3',
      },
      {
        label: 'Filed Application',
        value: '1. Filed Application',
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

  classanet: {
    type: 'numberRange',
    values: [-800, 1800],
  },

  datecomplt: {
    type: 'cofoDateRange',
    values: [moment('2010-01-01T19:00:00-05:00').format('X'), moment('2022-07-02T19:00:00-05:00').format('X')], // eslint-disable-line no-undef
    disabled: false,
  },

  datepermit: {
    type: 'statusDateRange',
    values: [moment('2000-01-01T19:00:00-05:00').format('X'), moment('2022-07-02T19:00:00-05:00').format('X')], // eslint-disable-line no-undef
    disabled: false,
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
  job_status: {
    property: 'job_status',
    type: 'categorical',
    stops: [
      ['1. Filed Application', getColor('job_status', '1. Filed Application')],
      ['2. Approved Application', getColor('job_status', '2. Approved Application')],
      ['3. Permitted for Construction', getColor('job_status', '3. Permitted for Construction')],
      ['5. Completed Construction', getColor('job_status', '5. Completed Construction')]
    ],
  },
};

export { defaultFilterDimensions, circleColors, getColor };
