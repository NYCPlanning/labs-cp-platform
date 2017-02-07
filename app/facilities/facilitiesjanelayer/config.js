const config = {

  operatorTypes: [
    {
      value: 'Public',
      label: 'Public',
    },
    {
      value: 'Non-public',
      label: 'Non-public',
    },
  ],

  propertyTypes: [
    {
      value: 'City Owned',
      label: 'City Owned',
    },
    {
      value: 'City Leased',
      label: 'City Leased',
    },
    {
      value: '',
      label: 'Not Owned or Leased by City',
    },
  ],

  agencies: [
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
      label: 'New York City Administration for Childrens Services',
    },
    {
      value: 'NYCBOE',
      label: 'New York City Board of Elections',
    },
    {
      value: 'NYCBSA',
      label: 'New York City Board of Standards and Appeals',
    },
    {
      value: 'NYCBP-BX',
      label: 'New York City Borough President - Bronx',
    },
    {
      value: 'NYCBP-BK',
      label: 'New York City Borough President - Brooklyn',
    },
    {
      value: 'NYCBP-MN',
      label: 'New York City Borough President - Manhattan',
    },
    {
      value: 'NYCBP-QN',
      label: 'New York City Borough President - Queens',
    },
    {
      value: 'NYCBP-SI',
      label: 'New York City Borough President - Staten Island',
    },
    {
      value: 'NYCBIC',
      label: 'New York City Business Integrity Commission',
    },
    {
      value: 'NYCCFB',
      label: 'New York City Campaign Finance Board',
    },
    {
      value: 'NYCCEO',
      label: 'New York City Center for Economic Opportunity',
    },
    {
      value: 'NYCCSC',
      label: 'New York City Civil Service Commission',
    },
    {
      value: 'NYCCCRB',
      label: 'New York City Civilian Complaint Review Board',
    },
    {
      value: 'NYCCCHR',
      label: 'New York City Commission on Human Rights',
    },
    {
      value: 'NYCCB102',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB103',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB104',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB105',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB106',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB107',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB108',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB109',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB110',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB111',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB112',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB201',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB202',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB203',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB204',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB205',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB206',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB207',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB208',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB209',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB210',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB211',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB212',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB301',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB303',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB304',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB305',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB306',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB307',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB308',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB309',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB310',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB311',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB312',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB313',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB314',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB315',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB316',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB317',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB318',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB401',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB402',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB403',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB404',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB405',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB406',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB408',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB409',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB410',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB411',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB412',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB413',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB414',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB501',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB502',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCB503',
      label: 'New York City Community Boards',
    },
    {
      value: 'NYCCOIB',
      label: 'New York City Conflict of Interest Board',
    },
    {
      value: 'NYCCOUNCIL',
      label: 'New York City Council',
    },
    {
      value: 'NYCDFTA',
      label: 'New York City Department for the Aging',
    },
    {
      value: 'NYCDOB',
      label: 'New York City Department of Buildings',
    },
    {
      value: 'NYCDCP',
      label: 'New York City Department of City Planning',
    },
    {
      value: 'NYCDCAS',
      label: 'New York City Department of Citywide Administrative Services',
    },
    {
      value: 'NYCDCA',
      label: 'New York City Department of Consumer Affairs',
    },
    {
      value: 'NYCDOC',
      label: 'New York City Department of Correction',
    },
    {
      value: 'NYCDCLA',
      label: 'New York City Department of Cultural Affairs',
    },
    {
      value: 'NYCDDC',
      label: 'New York City Department of Design and Construction',
    },
    {
      value: 'NYCDOE',
      label: 'New York City Department of Education',
    },
    {
      value: 'NYSED',
      label: 'New York State Education Department',
    },
    {
      value: 'NYCDEP',
      label: 'New York City Department of Environmental Protection',
    },
    {
      value: 'NYCDOF',
      label: 'New York City Department of Finance',
    },
    {
      value: 'NYCDOHMH',
      label: 'New York City Department of Health and Mental Hygiene',
    },
    {
      value: 'NYCDHS',
      label: 'New York City Department of Homeless Services',
    },
    {
      value: 'NYCHPD',
      label: 'New York City Department of Housing Preservation and Development',
    },
    {
      value: 'NYCDOITT',
      label: 'New York City Department of Information Technology and Telecommunications',
    },
    {
      value: 'NYCDOI',
      label: 'New York City Department of Investigation',
    },
    {
      value: 'NYCDPR',
      label: 'New York City Department of Parks and Recreation',
    },
    {
      value: 'NYCDOP',
      label: 'New York City Department of Probation',
    },
    {
      value: 'NYCDORIS',
      label: 'New York City Department of Records and Information Services',
    },
    {
      value: 'NYCDSNY',
      label: 'New York City Department of Sanitation',
    },
    {
      value: 'NYCSBS',
      label: 'New York City Department of Small Business Services',
    },
    {
      value: 'NYCDOT',
      label: 'New York City Department of Transportation',
    },
    {
      value: 'NYCDYCD',
      label: 'New York City Department of Youth and Community Development',
    },
    {
      value: 'NYCDA-BX',
      label: 'New York City District Attorney - Bronx ',
    },
    {
      value: 'NYCDA-BK',
      label: 'New York City District Attorney - Brooklyn',
    },
    {
      value: 'NYCDA-MN',
      label: 'New York City District Attorney - Manhattan',
    },
    {
      value: 'NYCDA-SNP',
      label: 'New York City District Attorney - Office Special Narcotics',
    },
    {
      value: 'NYCDA-QN',
      label: 'New York City District Attorney - Queens',
    },
    {
      value: 'NYCDA-SI',
      label: 'New York City District Attorney - Staten Island',
    },
    {
      value: 'NYCEDC',
      label: 'New York City Economic Development Corporation',
    },
    {
      value: 'NYCFDNY',
      label: 'New York City Fire Department',
    },
    {
      value: 'NYCHHC',
      label: 'New York City Health and Hospitals Corporation',
    },
    {
      value: 'NYCHA',
      label: 'New York City Housing Authority',
    },
    {
      value: 'NYCHRA/DSS',
      label: 'New York City Human Resources Administration/Department of Social Services',
    },
    {
      value: 'NYCIBO',
      label: 'New York City Independent Budget Office',
    },
    {
      value: 'NYCLPC',
      label: 'New York City Landmarks Preservation Commission',
    },
    {
      value: 'NYCLAW',
      label: 'New York City Law Department',
    },
    {
      value: 'NYCSBS',
      label: 'New York City New York City Department of Small Business Services',
    },
    {
      value: 'NYCOATH',
      label: 'New York City Office of Administrative Trials and Hearings',
    },
    {
      value: 'NYCOCB',
      label: 'New York City Office of Collective Bargaining',
    },
    {
      value: 'NYCOCA',
      label: 'New York City Office of Court Administration',
    },
    {
      value: 'NYCEM',
      label: 'New York City Office of Emergency Management',
    },
    {
      value: 'NYCOLR',
      label: 'New York City Office of Labor Relations',
    },
    {
      value: 'NYCOMB',
      label: 'New York City Office of Management and Budget',
    },
    {
      value: 'NYCOPA',
      label: 'New York City Office of Payroll Administration',
    },
    {
      value: 'NYCPA',
      label: 'New York City Office of Public Advocate',
    },
    {
      value: 'NYCACT',
      label: 'New York City Office of the Actuary',
    },
    {
      value: 'NYCCLERK',
      label: 'New York City Office of the City Clerk',
    },
    {
      value: 'NYCCOMP',
      label: 'New York City Office of the Comptroller',
    },
    {
      value: 'NYCMO',
      label: 'New York City Office of the Mayor',
    },
    {
      value: 'NYCOCME',
      label: 'New York City Office of the Medical Examiner',
    },
    {
      value: 'NYPD',
      label: 'New York City Police Department',
    },
    {
      value: 'NYCPA-BX',
      label: 'New York City Public Administrators Office - Bronx',
    },
    {
      value: 'NYCPA-BK',
      label: 'New York City Public Administrators Office - Brooklyn',
    },
    {
      value: 'NYCPA-MN',
      label: 'New York City Public Administrators Office - Manhattan',
    },
    {
      value: 'NYCPA-QN',
      label: 'New York City Public Administrators Office - Queens',
    },
    {
      value: 'NYCPA-SI',
      label: 'New York City Public Administrators Office - Staten Island',
    },
    {
      value: 'NYCTAXCM',
      label: 'New York City Tax Commission',
    },
    {
      value: 'NYCTLC',
      label: 'New York City Taxi and Limousine Commission',
    },
    {
      value: 'NYCUNKN',
      label: 'New York City Unknown',
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
      label: 'New York State Department of Corrections and Community Supervision',
    },
    {
      value: 'NYSDEC',
      label: 'New York State Department of Environmental Conservation',
    },
    {
      value: 'NYSDOH',
      label: 'New York State Department of Health',
    },
    {
      value: 'NYSDOT',
      label: 'New York State Department of Transportation',
    },
    {
      value: 'NYSED',
      label: 'New York State Education Department',
    },
    {
      value: 'NYSOPWDD',
      label: 'New York State Office for People With Developmental Disabilities',
    },
    {
      value: 'NYSOASAS',
      label: 'New York State Office of Alcoholism and Substance Abuse Services',
    },
    {
      value: 'NYSOCFS',
      label: 'New York State Office of Children and Family Services',
    },
    {
      value: 'NYSOMH',
      label: 'New York State Office of Mental Health',
    },
    {
      value: 'NYSOPRHP',
      label: 'New York State Office of Parks, Recreation and Historic Preservation',
    },
    {
      value: 'NYCOURTS',
      label: 'New York State Unified Court System',
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
      value: 'Non-public',
      label: 'Private',
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
      label: 'United States Coast Guard',
    },
    {
      value: 'USCOURTS',
      label: 'United States Courts',
    },
    {
      value: 'USDOT',
      label: 'United States Department of Transportation',
    },
    {
      value: 'USNPS',
      label: 'United States National Park Service',
    },
    {
      value: 'NYC-Unknown',
      label: 'Unspecified City Agency',
    },
  ],
};

export default config;
