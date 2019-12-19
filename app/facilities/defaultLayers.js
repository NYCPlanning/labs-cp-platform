const defaultLayers = [
  {
    name: 'EDUCATION, CHILD WELFARE, AND YOUTH',
    description: 'Providers of children and youth services and all schools, including higher education facilities',
    slug: 'education_child_welfare_and_youth',
    color: '#f7ca00',
    subColor: '#fff8dd',
    icon: 'graduation-cap',
    children: [
      {
        name: 'SCHOOLS (K-12)',
        description: 'K-12 and alternative equivalency programs overseen by NYC Dept. of Education and NYS Education Department',
        color: '#f7ca00',
        children: [
          {
            name: 'PUBLIC K-12 SCHOOLS',
            description: 'Public elementary, middle, and high schools',
          },
          {
            name: 'CHARTER K-12 SCHOOLS',
            description: 'Publically funded charter elementary, middle, and high schools',
          },
          {
            name: 'NON-PUBLIC K-12 SCHOOLS',
            description: 'Private elementary, middle, and high schools',
          },
          {
            name: 'PUBLIC AND PRIVATE SPECIAL EDUCATION SCHOOLS',
            description: 'Specialized schools and educational services for students with disabilities',
          },
          {
            name: 'GED AND ALTERNATIVE HIGH SCHOOL EQUIVALENCY',
            description: 'Alternative programs for obtaining high school equivalency degree',
          },
        ],
      },
      {
        name: 'DAY CARE AND PRE-KINDERGARTEN',
        description: 'Childcare centers overseen by NYC Administration for Childrens Services and NYC Dept. of Mental Health and Hygiene',
        color: '#b0dae8',
        children: [
          {
            name: 'DOE UNIVERSAL PRE-KINDERGARTEN',
            description: 'NYC DOE designated Universal Pre-K center',
          },
          {
            name: 'DAY CARE',
            description: 'Group and school-based child care centers for infants, toddlers, and preschoolers',
          },
          {
            name: 'PRESCHOOLS FOR STUDENTS WITH DISABILITIES',
            description: 'Center specialized on preschool students with disabilities',
          },
        ],
      },
      {
        name: 'CHILD SERVICES AND WELFARE',
        description: 'Services overseen by NYC Health and Human Services and NYC Administration for Children\'s Services',
        color: '#da664f',
        children: [
          {
            name: 'FOSTER CARE SERVICES AND RESIDENTIAL CARE',
            description: 'Foster care services and juvenile non-secure placement',
          },
          {
            name: 'CHILD NUTRITION',
            description: 'Summer and year-round child feeding centers, either based at NYC Dept of Education schools or tracked by New York State Education Department',
          },
        ],
      },
      {
        name: 'YOUTH SERVICES',
        description: 'Services overseen by NYC Dept. of Youth and Community Development',
        color: '#b67eb7',
        children: [
          {
            name: 'YOUTH CENTERS, LITERACY PROGRAMS, AND JOB TRAINING SERVICES',
            description: 'Youth Centers, Literacy Programs, and Job Training Services',
          },
        ],
      },
      {
        name: 'CAMPS',
        description: 'Camps overseen by NYC Dept. of Mental Health and Hygiene',
        color: '#3182bd',
        children: [
          {
            name: 'CAMPS',
            description: 'Preschool age and all age camps',
          },
        ],
      },
      {
        name: 'HIGHER EDUCATION',
        description: 'Public and privately operated 2 and 4 year colleges and universities',
        color: '#a7b1f9',
        children: [
          {
            name: 'COLLEGES OR UNIVERSITIES',
            description: 'Public and privately operated 2 and 4 year colleges and universities',
          },
        ],
      },
      {
        name: 'VOCATIONAL AND PROPRIETARY SCHOOLS',
        description: 'ESL schools and trade colleges',
        color: '#bcba76',
        children: [
          {
            name: 'PROPRIETARY SCHOOLS',
            description: 'ESL schools and trade colleges',
          },
        ],
      },
    ],
  },
  {
    name: 'PARKS, GARDENS, AND HISTORICAL SITES',
    description: 'Historic sites, recreational areas, parks, and nature preserves',
    slug: 'parks_gardens_and_historical_sites',
    color: '#4CAF50',
    subColor: '#dfeddc',
    icon: 'pagelines',
    children: [
      {
        name: 'PARKS AND PLAZAS',
        description: 'Properties operated by NYC Parks, NYC Dept. of Transportation, NYS Office of Parks, Recreation and Historic Preservation, NYS Dept. of Conservation, and City-State corporations and trusts',
        color: '#6f9568',
        children: [
          {
            name: 'PARKS',
            description: 'Flagship parks, community parks, state parks, and city-state parks',
          },
          {
            name: 'RECREATION AND WATERFRONT SITES',
            description: 'Playgrounds, waterfront facilities, and recreation fields and courts',
          },
          {
            name: 'STREETSCAPES, PLAZAS, AND MALLS',
            description: 'Pedestrian plazas, malls, triangle plazas, and parkways',
          },
          {
            name: 'GARDENS',
            description: 'Community gardens',
          },
          {
            name: 'PRIVATELY OWNED PUBLIC SPACE',
            description: 'Plazas, arcades, and other open space provided for public use by a private office or residential building owner',
          },
          {
            name: 'PRESERVES AND CONSERVATION AREAS',
            description: 'Nature areas, preserves, wetlands, and state forests',
          },
          {
            name: 'CEMETERIES',
            description: 'Cemeteries operated by NYC Parks',
          },
        ],
      },
      {
        name: 'HISTORICAL SITES',
        description: 'Sites operated by NYC Parks, NYS Office of Parks, Recreation and Historic Preservation, and US National Park Service',
        color: '#da664f',
        children: [
          {
            name: 'HISTORICAL SITES',
            description: 'Historic house parks, State historic places, national monuments, and national memorials',
          },
        ],
      },
    ],
  },
  {
    name: 'LIBRARIES AND CULTURAL PROGRAMS',
    description: 'Public Libraries and Cultural Institutions',
    slug: 'libraries_and_cultural_progams',
    color: '#73E5F4',
    subColor: '#E0F7FA',
    icon: 'book',
    children: [
      {
        name: 'LIBRARIES',
        description: 'Libraries operated by New York Public Libraries, Queens Public Libraries, and Brooklyn Public Libraries and academic institutions',
        color: '#b67eb7',
        children: [
          {
            name: 'PUBLIC LIBRARIES',
            description: 'All public libaries',
          },
          {
            name: 'ACADEMIC AND SPECIAL LIBRARIES',
            description: 'Libraries operated by academic institutions or other specialized organizations',
          },
        ],
      },
      {
        name: 'CULTURAL INSTITUTIONS',
        description: 'Institutions licensed or funded by the NYC Dept. of Cultural Affairs',
        color: '#f7ca00',
        children: [
          {
            name: 'MUSEUMS',
            description: 'Publicly and privately operated museums',
          },
          {
            name: 'HISTORICAL SOCIETIES',
            description: 'Historical societies',
          },
          {
            name: 'OTHER CULTURAL INSTITUTIONS',
            description: 'Zoos, botanical gardens, performing arts centers, and multi-disciplinary art centers',
          },
        ],
      },
    ],
  },
  {
    name: 'PUBLIC SAFETY, EMERGENCY SERVICES, AND ADMINISTRATION OF JUSTICE',
    description: 'Police services, emergency response, courthouses, and correctional facilities',
    slug: 'public_safety_emergency_services_and_administration_of_justice',
    color: '#2979FF',
    subColor: '#BBDEFB',
    icon: 'ambulance',
    children: [
      {
        name: 'EMERGENCY SERVICES',
        description: 'Services provided by Fire Dept. of New York',
        color: 'rgba(49,130,189,0.9)',
        children: [
          {
            name: 'FIRE SERVICES',
            description: 'Firehouses',
          },
          {
            name: 'OTHER EMERGENCY SERVICES',
            description: 'Ambulance and Emergency Medical Stations',
          },
        ],
      },
      {
        name: 'PUBLIC SAFETY',
        description: 'Services provided by New York Police Dept. and New York Housing Authority Police',
        color: '#b67eb7',
        children: [
          {
            name: 'POLICE SERVICES',
            description: 'NYPD and NYCHA police stations',
          },
          {
            name: 'OTHER PUBLIC SAFETY',
            description: 'Other public safety related support centers',
          },
        ],
      },
      {
        name: 'JUSTICE AND CORRECTIONS',
        description: 'Courts and correctional facilities operated by NYC. Dept. of Correction, NYS Unified Court System, NYS Dept. of Corrections and Community Supervision, US Courts, and Federal Bureau of Prisons',
        color: '#da664f',
        children: [
          {
            name: 'COURTHOUSES AND JUDICIAL',
            description: 'Courthouses, clerk offices, and court librarians',
          },
          {
            name: 'DETENTION AND CORRECTIONAL',
            description: 'Correctional and dentention centers',
          },
        ],
      },
    ],
  },
  {
    name: 'HEALTH AND HUMAN SERVICES',
    description: 'Health and social service providers, including hospitals, legal services, and homeless shelters',
    slug: 'health_and_human_services',
    color: '#BA68C8',
    subColor: '#f7e6f7',
    icon: 'heart',
    children: [
      {
        name: 'HEALTH CARE',
        description: 'Health facilities overseen by NYC Health and Hospitals Corporation, NYC Health and Human Services, NYS Dept. of Health, NYS Office of Mental Health, and NYS Office of Alcoholism and Substance Abuse Services',
        color: '#b67eb7',
        children: [
          {
            name: 'HOSPITALS AND CLINICS',
            description: 'Urgent care hospitals, diagnostic and treatment centers, and school-based health facilities',
          },
          {
            name: 'MENTAL HEALTH',
            description: 'Inpatient, outpatient, and emergency mental health services',
          },
          {
            name: 'RESIDENTIAL HEALTH CARE',
            description: 'Nursing homes, hospice care, and supportive housing',
          },
          {
            name: 'CHEMICAL DEPENDENCY',
            description: 'Monitored support, inpatient, outpatient, and crisis services',
          },
          {
            name: 'HEALTH PROMOTION AND DISEASE PREVENTION',
            description: 'Programs focused on improving health through education and disease prevention',
          },
          {
            name: 'OTHER HEALTH CARE',
            description: 'Rehab, respite servies, vaccination services, AIDS counseling, and home health centers',
          },
        ],
      },
      {
        name: 'HUMAN SERVICES',
        description: 'Services overseen by NYC Dept. of Homeless Services, NYC Dept. of Human Resources, NYC Mayorality, and others',
        color: '#3182bd',
        children: [
          {
            name: 'SENIOR SERVICES',
            description: 'Neighborhood senior centers, meal delivery programs, and other services for seniors',
          },
          {
            name: 'COMMUNITY CENTERS AND COMMUNITY SCHOOL PROGRAMS',
            description: 'Community centers that provide multiple social services at one site',
          },
          {
            name: 'FINANCIAL ASSISTANCE AND SOCIAL SERVICES',
            description: 'SNAP, Child Support, and Medicaid Centers operated by NYC Human Resources Administration',
          },
          {
            name: 'WORKFORCE DEVELOPMENT',
            description: 'Workforce 1 Centers and other vocational services for adults',
          },
          {
            name: 'LEGAL AND INTERVENTION SERVICES',
            description: 'Early intervention, criminal defense, and mediation services',
          },
          {
            name: 'PROGRAMS FOR PEOPLE WITH DISABILITIES',
            description: 'Specialized child care, caregiver support, and recreational services',
          },
          {
            name: 'NON-RESIDENTIAL HOUSING AND HOMELESS SERVICES',
            description: 'Non-residential homelessness prevention services',
          },
          {
            name: 'SOUP KITCHENS AND FOOD PANTRIES',
            description: 'Soup kitchens and food pantries',
          },
        ],
      },
    ],
  },
  {
    name: 'CORE INFRASTRUCTURE AND TRANSPORTATION',
    description: 'Train and bus yards, parking lots, solid waste processors, and wastewater treatment plants',
    slug: 'core_infrastructure_and_transportation',
    color: '#8D8EAA',
    subColor: '#e3eef2',
    icon: 'bus',
    children: [
      {
        name: 'SOLID WASTE',
        description: 'Sites overseen and operated by NYC Dept. of Sanitation, NYC Business Integrity Commission, and NYS Dept. of Conservation',
        color: '#da664f',
        children: [
          {
            name: 'SOLID WASTE PROCESSING',
            description: 'Material recovery, composting, landfill gas recovery, and scrap metal processing facilities',
          },
          {
            name: 'SOLID WASTE TRANSFER AND CARTING',
            description: 'Waste carter sites and transfer stations',
          },
        ],
      },
      {
        name: 'WATER AND WASTEWATER',
        description: 'Sites overseen and operated by NYC Dept. of Environmental Protection',
        color: '#b0dae8',
        children: [
          {
            name: 'WASTEWATER AND POLLUTION CONTROL',
            description: 'Wastewater treatment plants and other sites related to wastewater conveyance and pollution control',
          },
          {
            name: 'WATER SUPPLY',
            description: 'Sites related to water supply',
          },
        ],
      },
      {
        name: 'TRANSPORTATION',
        description: 'Sites operated or overseen by Metropolitan Transportation Authority, Port Authority of NY and NJ, NYC Dept. of Transportation, NYC Dept. of Consumer Affairs, US Dept. of Transportation, and others',
        color: '#f7ca00',
        children: [
          {
            name: 'PARKING LOTS AND GARAGES',
            description: 'Publicly and commerially operated parking lots and garages',
          },
          {
            name: 'BUS DEPOTS AND TERMINALS',
            description: 'School bus depots, MTA bus depots, and Port Authority bus terminals',
          },
          {
            name: 'RAIL YARDS AND MAINTENANCE',
            description: 'Rail yards and maintenance facilities',
          },
          {
            name: 'PORTS AND FERRY LANDINGS',
            description: 'Ferry landings, cruise terminals, and ports',
          },
          {
            name: 'AIRPORTS AND HELIPORTS',
            description: 'Publicly and privately operated airports, heliports, and seaplane bases',
          },
          {
            name: 'OTHER TRANSPORTATION',
            description: 'Uncategorized transportation related sites',
          },
        ],
      },
      {
        name: 'TELECOMMUNICATIONS',
        description: 'Sites operated or overseen by Dept. of Information Technology and Telecommunications and other City telecommunications services',
        color: '#3182bd',
        children: [
          {
            name: 'TELECOMMUNICATIONS',
            description: 'Antennas and other telecommunications sites',
          },
        ],
      },
      {
        name: 'MATERIAL SUPPLIES AND MARKETS',
        description: 'Sites operated or overseen by Dept. of Information Technology and Telecommunications and other City telecommunications services',
        color: '#b67eb7',
        children: [
          {
            name: 'MATERIAL SUPPLIES',
            description: 'Asphalt plants and other material processing facilities',
          },
          {
            name: 'WHOLESALE MARKETS',
            description: 'Wholesale food and commercial markets',
          },
        ],
      },
    ],
  },
  {
    name: 'ADMINISTRATION OF GOVERNMENT',
    description: 'Sites owned or leased by the City for administration, operations, and maintenance',
    slug: 'administration_of_government',
    color: '#CBCBD6',
    subColor: '#07284B',
    icon: 'bar-chart',
    children: [
      {
        name: 'OFFICES, TRAINING, AND TESTING',
        description: 'All City owned or leased offices overseen by Dept. of Citywide Administrative Services',
        color: '#da664f',
        children: [
          {
            name: 'CITY GOVERNMENT OFFICES',
            description: 'Offices used by City agencies',
          },
          {
            name: 'TRAINING AND TESTING',
            description: 'Training and testing sites used by City agencies',
          },
        ],
      },
      {
        name: 'CITY AGENCY PARKING, MAINTENANCE, AND STORAGE',
        description: 'City owned or leased properites used for City vehicle and equipment-related operations by Dept. of Citywide Administrative Services',
        color: '#b0dae8',
        children: [
          {
            name: 'CUSTODIAL',
            description: 'City agency custodial sites',
          },
          {
            name: 'MAINTENANCE AND GARAGES',
            description: 'City agency vehicle maintenance sites',
          },
          {
            name: 'CITY AGENCY PARKING',
            description: 'City agency parking lots',
          },
          {
            name: 'STORAGE',
            description: 'City agency storage sites',
          },
        ],
      },
      {
        name: 'OTHER PROPERTY',
        description: 'City owned or leased property without a categorized use overseen by Dept. of Citywide Administrative Services',
        color: '#b67eb7',
        children: [
          {
            name: 'MISCELLANEOUS USE',
            description: 'Property without a categorized use',
          },
          {
            name: 'PROPERTIES LEASED OR LICENSED TO NON-PUBLIC ENTITIES',
            description: 'Properties Leased or Licensed to Non-public Entities',
          },
        ],
      },
    ],
  },
];

export default defaultLayers;
