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
  admin_cd: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('commboard'),
  },
  admin_borocode: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('borocode'),
  },
  admin_nta: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('nta'),
  },
  admin_censtract: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('censtract'),
  },
  admin_council: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('council'),
  },
  admin_policeprecinct: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('policeprecinct'),
  },
  admin_schooldistrict: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('schooldistrict'),
  },
  dcp_status: {
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

  dcp_dev_category: {
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

  dcp_occ_category: {
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

  u_net: {
    type: 'numberRange',
    values: [-1100, 1700],
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
  dcp_dev_category: {
    property: 'dcp_dev_category',
    type: 'categorical',
    stops: [
      ['New Building', getColor('dcp_dev_category', 'New Building')],
      ['Alteration', getColor('dcp_dev_category', 'Alteration')],
      ['Demolition', getColor('dcp_dev_category', 'Demolition')],
    ],
  },
  dcp_status: {
    property: 'dcp_status',
    type: 'categorical',
    stops: [
      ['Application filed', getColor('dcp_status', 'Application filed')],
      ['Permit issued', getColor('dcp_status', 'Permit issued')],
      ['Partial complete', getColor('dcp_status', 'Partial complete')],
      ['Complete', getColor('dcp_status', 'Complete')],
    ],
  },
};

export { defaultFilterDimensions, circleColors, getColor };
