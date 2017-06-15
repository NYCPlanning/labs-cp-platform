const defaultFilterDimensions = {
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
        value: 'DOE',
        label: 'Department of Education - DOE',
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
        value: 'SBS',
        label: 'Department of Small Business Services - SBS',
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
        value: 'DOE',
        label: 'Department of Education - DOE',
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
        value: 'SBS',
        label: 'Department of Small Business Services - SBS',
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
        value: 'HRA',
        label: 'Human Resources Administration - HRA',
      },
      {
        value: 'DSS',
        label: 'Department of Social Services - DSS',
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
    values: [0, 10000000000],
  },

  totalcommit: {
    type: 'numberRange',
    values: [-20000000, 10000000000],
  },

  activeyears: {
    type: 'capitalProjectsDateRange',
    values: [2010, 2027],
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
