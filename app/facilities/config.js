import defaultLayers from './defaultLayers';
import LabelHelper from '../helpers/labels/labelHelper';

function checkAllLayers(layers, checked = true) {
  return layers.map((l) => {
    l.checked = checked;
    if (l.children) { checkAllLayers(l.children, checked); }
    return l;
  });
}

function checkAllSelected(layers, context) {
  return layers.map((l) => {
    const keys = Object.keys(context);
    if (keys.includes(l.name)) {
      l.checked = true;
      if (l.children && context[l.name] === null) {
        checkAllLayers(l.children, true);
      } else if (l.children) {
        checkAllSelected(l.children, context[l.name]);
      }
    }
    return l;
  });
}

const getSelectedFacilitiesLayers = (selected) => {
  const defaultLayersCopy = JSON.parse(JSON.stringify(defaultLayers));

  switch (selected) {
    case 'all':
      return checkAllLayers(defaultLayersCopy, true);

    case 'none':
      return checkAllLayers(defaultLayersCopy, false);

    default:
      return selected ? checkAllSelected(defaultLayersCopy, selected) : defaultLayersCopy;
  }
};

const getDefaultFilterDimensions = ({ selected, values }) => ({
  radiusfilter: {
    type: 'radiusFilter',
    disabled: true,
    values: {
      coordinates: [],
      radius: 0,
    },
  },
  commboard: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('commboard'),
  },
  nta: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('nta'),
  },
  borocode: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('borocode'),
  },
  censtract: {
    type: 'multiSelect',
    disabled: true,
    values: LabelHelper.get_labels('censtract'),
  },
  council: {
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
  facsubgrp: {
    type: 'facilitiesLayerSelector',
    values: values || getSelectedFacilitiesLayers(selected),
  },
  optype: {
    type: 'multiSelect',
    disabled: true,
    values: [
      {
        value: 'Public',
        label: 'Public',
      },
      {
        value: 'Non-public',
        label: 'Non-public',
      },
    ],
  },
  overabbrev: {
    type: 'multiSelect',
    disabled: true,
    values: [
      {
        value: 'Amtrak',
        label: 'Amtrak',
      },
      {
        value: 'BBPC',
        label: 'Brooklyn Bridge Park Corporation',
      },
      {
        value: 'BPL',
        label: 'Brooklyn Public Library',
      },
      {
        value: 'CUNY',
        label: 'City University of New York',
      },
      {
        value: 'FBOP',
        label: 'Federal Bureau of Prisons',
      },
      {
        value: 'HRPT',
        label: 'Hudson River Park Trust',
      },
      {
        value: 'HYDC',
        label: 'Hudson Yards Development Corporation',
      },
      {
        value: 'MTA',
        label: 'Metropolitan Transportation Authority',
      },
      {
        value: 'NYCACS',
        label: 'NYC Administration for Childrens Services',
      },
      {
        value: 'NYCBOE',
        label: 'NYC Board of Elections',
      },
      {
        value: 'NYCBSA',
        label: 'NYC Board of Standards and Appeals',
      },
      {
        value: 'NYCBP-BX',
        label: 'NYC Borough President - Bronx',
      },
      {
        value: 'NYCBP-BK',
        label: 'NYC Borough President - Brooklyn',
      },
      {
        value: 'NYCBP-MN',
        label: 'NYC Borough President - Manhattan',
      },
      {
        value: 'NYCBP-QN',
        label: 'NYC Borough President - Queens',
      },
      {
        value: 'NYCBP-SI',
        label: 'NYC Borough President - Staten Island',
      },
      {
        value: 'NYCBIC',
        label: 'NYC Business Integrity Commission',
      },
      {
        value: 'NYCCFB',
        label: 'NYC Campaign Finance Board',
      },
      {
        value: 'NYCCEO',
        label: 'NYC Center for Economic Opportunity',
      },
      {
        value: 'NYCCSC',
        label: 'NYC Civil Service Commission',
      },
      {
        value: 'NYCCCRB',
        label: 'NYC Civilian Complaint Review Board',
      },
      {
        value: 'NYCCCHR',
        label: 'NYC Commission on Human Rights',
      },
      {
        value: 'NYCCB',
        label: 'NYC Community Boards',
      },
      {
        value: 'NYCCOIB',
        label: 'NYC Conflict of Interest Board',
      },
      {
        value: 'NYCCOUNCIL',
        label: 'NYC City Council',
      },
      {
        value: 'NYCDFTA',
        label: 'NYC Department for the Aging',
      },
      {
        value: 'NYCDOB',
        label: 'NYC Department of Buildings',
      },
      {
        value: 'NYCDCP',
        label: 'NYC Department of City Planning',
      },
      {
        value: 'NYCDCAS',
        label: 'NYC Department of Citywide Administrative Services',
      },
      {
        value: 'NYCDCA',
        label: 'NYC Department of Consumer Affairs',
      },
      {
        value: 'NYCDOC',
        label: 'NYC Department of Correction',
      },
      {
        value: 'NYCDCLA',
        label: 'NYC Department of Cultural Affairs',
      },
      {
        value: 'NYCDDC',
        label: 'NYC Department of Design and Construction',
      },
      {
        value: 'NYCDOE/SCA',
        label: 'NYC Department of Education/School Construction Authority',
      },
      {
        value: 'NYCDEP',
        label: 'NYC Department of Environmental Protection',
      },
      {
        value: 'NYCDOF',
        label: 'NYC Department of Finance',
      },
      {
        value: 'NYCDOHMH',
        label: 'NYC Department of Health and Mental Hygiene',
      },
      {
        value: 'NYCDHS',
        label: 'NYC Department of Homeless Services',
      },
      {
        value: 'NYCHPD',
        label: 'NYC Department of Housing Preservation and Development',
      },
      {
        value: 'NYCDOITT',
        label: 'NYC Department of Information Technology and Telecommunications',
      },
      {
        value: 'NYCDOI',
        label: 'NYC Department of Investigation',
      },
      {
        value: 'NYCDPR',
        label: 'NYC Department of Parks and Recreation',
      },
      {
        value: 'NYCDOP',
        label: 'NYC Department of Probation',
      },
      {
        value: 'NYCDORIS',
        label: 'NYC Department of Records and Information Services',
      },
      {
        value: 'NYCDSNY',
        label: 'NYC Department of Sanitation',
      },
      {
        value: 'NYCEDC',
        label: 'NYC Economic Development Corporation',
      },
      {
        value: 'NYCDOT',
        label: 'NYC Department of Transportation',
      },
      {
        value: 'NYCDYCD',
        label: 'NYC Department of Youth and Community Development',
      },
      {
        value: 'NYCDA-BX',
        label: 'NYC District Attorney - Bronx ',
      },
      {
        value: 'NYCDA-BK',
        label: 'NYC District Attorney - Brooklyn',
      },
      {
        value: 'NYCDA-MN',
        label: 'NYC District Attorney - Manhattan',
      },
      {
        value: 'NYCDA-SNP',
        label: 'NYC District Attorney - Office Special Narcotics',
      },
      {
        value: 'NYCDA-QN',
        label: 'NYC District Attorney - Queens',
      },
      {
        value: 'NYCDA-SI',
        label: 'NYC District Attorney - Staten Island',
      },
      {
        value: 'NYCEDC',
        label: 'NYC Economic Development Corporation',
      },
      {
        value: 'NYCFDNY',
        label: 'NYC Fire Department',
      },
      {
        value: 'NYCHHC',
        label: 'NYC Health and Hospitals Corporation',
      },
      {
        value: 'NYCHA',
        label: 'New York City Housing Authority',
      },
      {
        value: 'NYCHRA/DSS',
        label: 'NYC Human Resources Administration/Department of Social Services',
      },
      {
        value: 'NYCIBO',
        label: 'NYC Independent Budget Office',
      },
      {
        value: 'NYCLPC',
        label: 'NYC Landmarks Preservation Commission',
      },
      {
        value: 'NYCLAW',
        label: 'NYC Law Department',
      },
      {
        value: 'NYCOATH',
        label: 'NYC Office of Administrative Trials and Hearings',
      },
      {
        value: 'NYCOCB',
        label: 'NYC Office of Collective Bargaining',
      },
      {
        value: 'NYCOCA',
        label: 'NYC Office of Court Administration',
      },
      {
        value: 'NYCEM',
        label: 'NYC Office of Emergency Management',
      },
      {
        value: 'NYCOLR',
        label: 'NYC Office of Labor Relations',
      },
      {
        value: 'NYCOMB',
        label: 'NYC Office of Management and Budget',
      },
      {
        value: 'NYCOPA',
        label: 'NYC Office of Payroll Administration',
      },
      {
        value: 'NYCPA',
        label: 'NYC Office of Public Advocate',
      },
      {
        value: 'NYCACT',
        label: 'NYC Office of the Actuary',
      },
      {
        value: 'NYCCLERK',
        label: 'NYC Office of the City Clerk',
      },
      {
        value: 'NYCCOMP',
        label: 'NYC Office of the Comptroller',
      },
      {
        value: 'NYCMO',
        label: 'NYC Office of the Mayor',
      },
      {
        value: 'NYCOCME',
        label: 'NYC Office of the Medical Examiner',
      },
      {
        value: 'NYPD',
        label: 'NYC Police Department',
      },
      {
        value: 'NYCPA-BX',
        label: 'NYC Public Administrators Office - Bronx',
      },
      {
        value: 'NYCPA-BK',
        label: 'NYC Public Administrators Office - Brooklyn',
      },
      {
        value: 'NYCPA-MN',
        label: 'NYC Public Administrators Office - Manhattan',
      },
      {
        value: 'NYCPA-QN',
        label: 'NYC Public Administrators Office - Queens',
      },
      {
        value: 'NYCPA-SI',
        label: 'NYC Public Administrators Office - Staten Island',
      },
      {
        value: 'NYCTAXCM',
        label: 'NYC Tax Commission',
      },
      {
        value: 'NYCTLC',
        label: 'NYC Taxi and Limousine Commission',
      },
      {
        value: 'NYC-Unknown',
        label: 'NYC Unknown',
      },
      {
        value: 'NYPD',
        label: 'New York Police Department',
      },
      {
        value: 'NYPL',
        label: 'New York Public Library',
      },
      {
        value: 'NYSDOCCS',
        label: 'NYS Department of Corrections and Community Supervision',
      },
      {
        value: 'NYSDEC',
        label: 'NYS Department of Environmental Conservation',
      },
      {
        value: 'NYSDOH',
        label: 'NYS Department of Health',
      },
      {
        value: 'NYSDOT',
        label: 'NYS Department of Transportation',
      },
      {
        value: 'NYSED',
        label: 'NYS Education Department',
      },
      {
        value: 'NYSOPWDD',
        label: 'NYS Office for People With Developmental Disabilities',
      },
      {
        value: 'NYSOASAS',
        label: 'NYS Office of Alcoholism and Substance Abuse Services',
      },
      {
        value: 'NYSOCFS',
        label: 'NYS Office of Children and Family Services',
      },
      {
        value: 'NYSOMH',
        label: 'NYS Office of Mental Health',
      },
      {
        value: 'NYSOPRHP',
        label: 'NYS Office of Parks, Recreation and Historic Preservation',
      },
      {
        value: 'NYCOURTS',
        label: 'NYS Unified Court System',
      },
      {
        value: 'Non-public',
        label: 'Non-public',
      },
      {
        value: 'PANYNJ',
        label: 'Port Authority of New York and New Jersey',
      },
      {
        value: 'QPL',
        label: 'Queens Public Library',
      },
      {
        value: 'RIOC',
        label: 'Roosevelt Island Operating Corporation',
      },
      {
        value: 'TGI',
        label: 'Trust for Governors Island',
      },
      {
        value: 'USCG',
        label: 'US Coast Guard',
      },
      {
        value: 'USCOURTS',
        label: 'US Courts',
      },
      {
        value: 'USDOT',
        label: 'US Department of Transportation',
      },
      {
        value: 'USNPS',
        label: 'National Park Service',
      },
    ],
  },
});

export default getDefaultFilterDimensions;
