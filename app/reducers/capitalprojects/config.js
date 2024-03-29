import LabelHelper from '../../helpers/labels/labelHelper';
import db_tables from '../../config/db_tables';

const totalcounts = require('../../config/totalcounts.json');

const defaultFilterDimensions = {
  radiusfilter: {
    type: 'radiusFilter',
    disabled: true,
    values: {
      coordinates: [],
      radius: 0,
    },
  },
  cd: {
    type: 'joinMultiSelect',
    disabled: true,
    values: LabelHelper.get_labels('cd'),
    lookupTable: db_tables.cpdb.adminbounds,
    idColumn: 'maprojid',
  },
  borocode: {
    type: 'joinMultiSelect',
    disabled: true,
    values: LabelHelper.get_labels('borocode'),
    lookupTable: db_tables.cpdb.adminbounds,
    idColumn: 'maprojid',
  },
  nta2020: {
    type: 'joinMultiSelect',
    disabled: true,
    values: LabelHelper.get_labels('nta2020'),
    lookupTable: db_tables.cpdb.adminbounds,
    idColumn: 'maprojid',
  },
  censtract: {
    type: 'joinMultiSelect',
    disabled: true,
    values: LabelHelper.get_labels('censtract'),
    lookupTable: db_tables.cpdb.adminbounds,
    idColumn: 'maprojid',
  },
  council: {
    type: 'joinMultiSelect',
    disabled: true,
    values: LabelHelper.get_labels('council'),
    lookupTable: db_tables.cpdb.adminbounds,
    idColumn: 'maprojid',
  },
  schooldistrict: {
    type: 'joinMultiSelect',
    disabled: true,
    values: LabelHelper.get_labels('schooldistrict'),
    lookupTable: db_tables.cpdb.adminbounds,
    idColumn: 'maprojid',
  },
  magencyacro: {
    type: 'multiSelect',
    disabled: true,
    values: [
      {
        value: 'ACS',
        label: "Administration for Children's Services - ACS",
      },
      {
        value: 'BPL',
        label: 'Brooklyn Public Library - BPL',
      },
      {
        value: 'CUNY',
        label: 'City University of New York - CUNY',
      },
      {
        value: 'DFTA',
        label: 'Department for the Aging - DFTA',
      },
      {
        value: 'DCAS',
        label: 'Department of Citywide Administrative Services - DCAS',
      },
      {
        value: 'DOC',
        label: 'Department of Correction - DOC',
      },
      {
        value: 'DCLA',
        label: 'Department of Cultural Affairs - DCLA',
      },
      {
        value: 'DDC',
        label: 'Department of Design and Construction - DDC',
      },
      {
        value: 'DOE/SCA',
        label: 'Department of Education - DOE/School Construction Authority - SCA',
      },
      {
        value: 'DEP',
        label: 'Department of Environmental Protection - DEP',
      },
      {
        value: 'DOHMH',
        label: 'Department of Health and Mental Hygiene - DOHMH',
      },
      {
        value: 'DHS',
        label: 'Department of Homeless Services - DHS',
      },
      {
        value: 'HPD',
        label: 'Department of Housing Preservation and Development - HPD',
      },
      {
        value: 'DOITT',
        label: 'Department of Info Tech and Telecom - DOITT',
      },
      {
        value: 'DPR',
        label: 'Department of Parks and Recreation - DPR',
      },
      {
        value: 'DSNY',
        label: 'Department of Sanitation - DNSY',
      },
      {
        value: 'EDC',
        label: 'Economic Development Corporation - EDC',
      },
      {
        value: 'DOT',
        label: 'Department of Transportation - DOT',
      },
      {
        value: 'EDC',
        label: 'Economic Development Corporation - EDC',
      },
      {
        value: 'FDNY',
        label: 'Fire Department - FDNY',
      },
      {
        value: 'HHC',
        label: 'Health and Hospitals Corporation - HHC',
      },
      {
        value: 'NYPL',
        label: 'New York Public Library - NYPL',
      },
      {
        value: 'NYRL',
        label: 'New York Research Library - NYRL',
      },
      {
        value: 'NYPD',
        label: 'Police Department - NYPD',
      },
      {
        value: 'QBPL',
        label: 'Queens Borough Public Library - QBPL',
      },
      {
        value: 'UK',
        label: 'Unknown Agency Code',
      },
    ],
  },

  sagencyacro: {
    type: 'sagencyMultiSelect',
    disabled: true,
    values: [
      {
        value: 'ACS',
        label: "Administration for Children's Services - ACS",
      },
      {
        value: 'BPL',
        label: 'Brooklyn Public Library - BPL',
      },
      {
        value: 'CUNY',
        label: 'City University of New York - CUNY',
      },
      {
        value: 'DFTA',
        label: 'Department for the Aging - DFTA',
      },
      {
        value: 'DCAS',
        label: 'Department of Citywide Administrative Services - DCAS',
      },
      {
        value: 'DOC',
        label: 'Department of Correction - DOC',
      },
      {
        value: 'DCLA',
        label: 'Department of Cultural Affairs - DCLA',
      },
      {
        value: 'DOE/SCA',
        label: 'Department of Education - DOE/School Construction Authority - SCA',
      },
      {
        value: 'DEP',
        label: 'Department of Environmental Protection - DEP',
      },
      {
        value: 'DOHMH',
        label: 'Department of Health and Mental Hygiene - DOHMH',
      },
      {
        value: 'DHS',
        label: 'Department of Homeless Services - DHS',
      },
      {
        value: 'HPD',
        label: 'Department of Housing Preservation and Development - HPD',
      },
      {
        value: 'DOITT',
        label: 'Department of Info Tech and Telecom - DOITT',
      },
      {
        value: 'DPR',
        label: 'Department of Parks and Recreation - DPR',
      },
      {
        value: 'DSNY',
        label: 'Department of Sanitation - DNSY',
      },
      {
        value: 'EDC',
        label: 'Economic Development Corporation - EDC',
      },
      {
        value: 'DOT',
        label: 'Department of Transportation - DOT',
      },
      {
        value: 'FDNY',
        label: 'Fire Department - FDNY',
      },
      {
        value: 'HHC',
        label: 'Health and Hospitals Corporation - HHC',
      },
      {
        value: 'NYCHA',
        label: 'Housing Authority - NYCHA',
      },
      {
        value: 'HRA/DSS',
        label: 'Human Resources Administration - HRA / Department of Social Services - DSS',
      },
      {
        value: 'MTA',
        label: 'Metropolitan Transportation Authority - MTA',
      },
      {
        value: 'NYPL',
        label: 'New York Public Library - NYPL',
      },
      {
        value: 'NYRL',
        label: 'New York Research Library - NYRL',
      },
      {
        value: 'OCA',
        label: 'Office of Court Administration - OCA',
      },
      {
        value: 'NYPD',
        label: 'Police Department - NYPD',
      },
      {
        value: 'QBPL',
        label: 'Queens Borough Public Library - QBPL',
      },
    ],
  },

  projecttype: {
    type: 'projectTypeMultiSelect',
    disabled: true,
    values: [
      {
        value: 'Aging',
        label: 'Aging',
      },
      {
        value: 'Brooklyn Public Library',
        label: 'Brooklyn Public Library',
      },
      {
        value: 'Childrens Services',
        label: 'Childrens Services',
      },
      {
        value: 'City University of New York',
        label: 'City University of New York',
      },
      {
        value: 'Correction',
        label: 'Correction',
      },
      {
        value: 'Courts',
        label: 'Courts',
      },
      {
        value: 'Cultural Affairs',
        label: 'Cultural Affairs',
      },
      {
        value: 'Dept. of Information Technology \& Telecomm', // eslint-disable-line no-useless-escape
        label: 'Dept. of Information Technology & Telecomm',
      },
      {
        value: 'Economic Development',
        label: 'Economic Development',
      },
      {
        value: 'EDP Equipment and Finance Costs',
        label: 'EDP Equipment and Finance Costs',
      },
      {
        value: 'Education',
        label: 'Education',
      },
      {
        value: 'Environmental Protection-Equipment',
        label: 'Environmental Protection-Equipment',
      },
      {
        value: 'Ferries and Aviation',
        label: 'Ferries and Aviation',
      },
      {
        value: 'Fire Department',
        label: 'Fire Department',
      },
      {
        value: 'Health and Hospitals Corporation',
        label: 'Health and Hospitals Corporation',
      },
      {
        value: 'Health and Mental Hygiene',
        label: 'Health and Mental Hygiene',
      },
      {
        value: 'Highway Bridges',
        label: 'Highway Bridges',
      },
      {
        value: 'Highways',
        label: 'Highways',
      },
      {
        value: 'Homeless Services',
        label: 'Homeless Services',
      },
      {
        value: 'Housing Authority',
        label: 'Housing Authority',
      },
      {
        value: 'Housing Preservation and Development',
        label: 'Housing Preservation and Development',
      },
      {
        value: 'Human Resources',
        label: 'Human Resources',
      },
      {
        value: 'MTA Bus Company',
        label: 'MTA Bus Company',
      },
      {
        value: 'New York Public Library',
        label: 'New York Public Library',
      },
      {
        value: 'New York Research Library',
        label: 'New York Research Library',
      },
      {
        value: 'Parks and Recreation',
        label: 'Parks and Recreation',
      },
      {
        value: 'Police',
        label: 'Police',
      },
      {
        value: 'Public Buildings',
        label: 'Public Buildings',
      },
      {
        value: 'Queens Borough Public Library',
        label: 'Queens Borough Public Library',
      },
      {
        value: 'Real Property',
        label: 'Real Property',
      },
      {
        value: 'Sanitation',
        label: 'Sanitation',
      },
      {
        value: 'Sewers',
        label: 'Sewers',
      },
      {
        value: 'Staten Island Rapid Transit',
        label: 'Staten Island Rapid Transit',
      },
      {
        value: 'Traffic',
        label: 'Traffic',
      },
      {
        value: 'Transit Authority',
        label: 'Transit Authority',
      },
      {
        value: 'Transportation - Equipment',
        label: 'Transportation - Equipment',
      },
      {
        value: 'Water Mains',
        label: 'Water Mains',
      },
      {
        value: 'Sources and Treatment',
        label: 'Sources and Treatment',
      },
      {
        value: 'Water Pollution Control',
        label: 'Water Pollution Control',
      },
      {
        value: 'Water Supply',
        label: 'Water Supply',
      },
      {
        value: 'Waterway Bridges',
        label: 'Waterway Bridges',
      },
    ],
  },

  totalspend: {
    type: 'numberRange',
    values: [0, totalcounts.cpdbSpentToDateMax],
  },

  totalcommit: {
    type: 'numberRange',
    values: [totalcounts.cpdbTotalCommitMin, totalcounts.cpdbTotalCommitMax],
  },

  activeyears: {
    type: 'capitalProjectsDateRange',
    values: [2010, 2040],
  },
};

const defaultTableFilterDimensions = {
  magencyacro: defaultFilterDimensions.magencyacro,
  sagencyacro: defaultFilterDimensions.sagencyacro,
  projecttype: defaultFilterDimensions.projecttype,
  totalspend: defaultFilterDimensions.totalspend,
  totalcommit: defaultFilterDimensions.totalcommit,
  activeyears: defaultFilterDimensions.activeyears,
};

export { defaultFilterDimensions, defaultTableFilterDimensions };
