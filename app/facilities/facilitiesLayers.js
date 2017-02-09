const facilitiesLayers = [
  {
    name: 'Health and Human Services',
    slug: 'health_and_human_services',
    color: '#BA68C8',
    subColor: '#f7e6f7',
    children: [
      {
        name: 'Health Care',
        description: 'Health facilities overseen by NYC Health and Hospitals Corporation, NYC Health and Human Services, NYS Dept. of Health, NYS Office of Mental Health, and NYS Office of Alcoholism and Substance Abuse Services',
        color: '#b67eb7',
        icon: 'heart',
        children: [
          {
            name: 'Hospitals and Clinics',
            description: 'Urgent care hospitals, diagnostic and treatment centers, and school-based health facilities',
          },
          {
            name: 'Mental Health',
            description: 'Inpatient, outpatient, and emergency mental health services',
          },
          {
            name: 'Residential Health Care',
            description: 'Nursing homes, hospice care, and supportive housing',
          },
          {
            name: 'Chemical Dependency',
            description: 'Monitored support, inpatient, outpatient, and crisis services',
          },
          {
            name: 'Health Promotion and Disease Prevention',
            description: '...',
          },
          {
            name: 'Other Health Care',
            description: 'Rehab, respite servies, vaccination services, AIDS counseling, and home health centers',
          },
        ],
      },
      {
        name: 'Human Services',
        description: 'Services overseen by NYC Dept. of Homeless Services, NYC Dept. of Human Resources, NYC Mayorality, and others',
        color: '#3182bd',
        children: [
          {
            name: 'Shelters and Transitional Housing',
            description: 'Homeless shelters and transitional houseing',
          },
          {
            name: 'Non-residential Housing and Homeless Services',
            description: 'Non-residential homelessness prevention services',
          },
          {
            name: 'Senior Services',
            description: 'Neighborhood senior centers, meal delivery programs, and other services for seniors',
          },
          {
            name: 'Programs for People with Disabilities',
            description: 'Specialized child care, caregiver support, and recreational services',
          },
          {
            name: 'Workforce Development',
            description: 'Workforce 1 Centers and other vocational services for adults',
          },
          {
            name: 'Legal and Intervention Services',
            description: 'Early intervention, criminal defense, and mediation services',
          },
          {
            name: 'Soup Kitchens and Food Pantries',
            description: 'Soup kitchens and food pantries',
          },
          {
            name: 'Community Centers and Community School Programs',
            description: 'Community centers that provide multiple social services at one site',
          },
          {
            name: 'School-Based Drug Prevention Programs',
            description: 'Substance Abuse Prevention and Intervention programs at schools',
          },
        ],
      },
    ],
  },
  {
    name: 'Education, Child Welfare, and Youth',
    slug: 'education_child_welfare_and_youth',
    color: '#f7ca00',
    subColor: '#fff8dd',
    icon: 'graduation-cap',
    children: [
      {
        name: 'Schools (K-12)',
        description: 'Preschools, K-12 schools, and higher education overseen by NYC Dept. of Education and NYS Education Department',
        color: '#f7ca00',
        children: [
          {
            name: 'Public Schools',
            description: 'Public and charter elementary, middle, and high schools',
          },
          {
            name: 'Non-public Schools',
            description: 'Private elementary, middle, and high schools',
          },
          {
            name: 'Other Schools Serving Students with Disabilities',
            description: 'Specialized schools and educational services for students with disabilities',
          },
        ],
      },
      {
        name: 'Child Care and Pre-Kindergarten',
        description: 'Childcare centers overseen by NYC Administration for Childrens Services and NYC Dept. of Mental Health and Hygiene',
        color: '#b0dae8',
        children: [
          {
            name: 'DOE Universal Pre-Kindergarten',
            description: 'NYC DOE designated Universal Pre-K center',
          },
          {
            name: 'Dual Child Care and Universal Pre-K',
            description: 'Center that offers both a NYC DOE desgiated Universal Pre-K services and other child care services',
          },
          {
            name: 'Child Care',
            description: 'Group and school-based child care centers for infants, toddlers, and preschoolers',
          },
          {
            name: 'Preschools for Students with Disabilities',
            description: 'Center specialized on preschool students with disabilities',
          },
        ],
      },
      {
        name: 'Childrens Services',
        description: 'Services overseen by NYC Health and Human Services',
        color: '#da664f',
        children: [
          {
            name: 'Foster Care Services and Residential Care',
            description: 'Foster care services, preventative care, and juvenile non-secure placement',
          },
          {
            name: 'Preventative Care, Evaluation Services, and Respite',
            description: 'Foster care services, preventative care, and juvenile non-secure placement',
          },
        ],
      },
      {
        name: 'Child Welfare',
        description: 'Child feeding centers tracked by New York State Education Department',
        color: '#5bb12f',
        children: [
          {
            name: 'Child Nutrition',
            description: 'Summer and year-round child feeding sites',
          },
        ],
      },
      {
        name: 'Youth Services',
        description: 'Services overseen by NYC Dept. of Youth and Community Development',
        color: '#b67eb7',
        children: [
          {
            name: 'Comprehensive After School System (COMPASS) Sites',
            description: 'Comprehensive After School System (COMPASS) Sites',
          },
          {
            name: 'Youth Centers, Literacy Programs, Job Training, and Immigrant Services',
            description: 'Youth Centers, Literacy Programs, Job Training, and Immigrant Services',
          },
        ],
      },
      {
        name: 'Camps',
        description: 'Camps overseen by NYC Dept. of Mental Health and Hygiene',
        color: '#3182bd',
        children: [
          {
            name: 'Camps',
            description: 'Preschool age and all age camps',
          },
        ],
      },
      {
        name: 'Higher Education',
        description: 'Public and privately operated 2 and 4 year colleges and universities',
        color: '#a7b1f9',
        children: [
          {
            name: 'Colleges or Universities',
            description: 'Public and privately operated 2 and 4 year colleges and universities',
          },
        ],
      },
      {
        name: 'Vocational and Proprietary Schools',
        description: 'ESL schools and trade colleges',
        color: '#bcba76',
        children: [
          {
            name: 'Proprietary Schools',
            description: 'ESL schools and trade colleges',
          },
        ],
      },
    ],
  },
  {
    name: 'Parks, Gardens, and Historical Sites',
    slug: 'parks_gardens_and_historical_sites',
    color: '#4CAF50',
    subColor: '#dfeddc',
    icon: 'pagelines',
    children: [
      {
        name: 'Parks and Plazas',
        description: 'Properties operated by NYC Parks, NYC Dept. of Transportation, NYS Office of Parks, Recreation and Historic Preservation, NYS Dept. of Conservation, and City-State corporations and trusts',
        color: '#6f9568',
        children: [
          {
            name: 'Parks',
            description: 'Flagship parks, community parks, state parks, and city-state parks',
          },
          {
            name: 'Recreation and Waterfront Sites',
            description: 'Playgrounds, waterfront facilities, and recreation fields and courts',
          },
          {
            name: 'Streetscapes, Plazas, and Malls',
            description: 'Pedestrian plazas, malls, triangle plazas, and parkways',
          },
          {
            name: 'Gardens',
            description: 'Community gardens',
          },
          {
            name: 'Preserves and Conservation Areas',
            description: 'Nature areas, preserves, wetlands, and state forests',
          },
          {
            name: 'Cemeteries',
            description: 'Cemeteries operated by NYC Parks',
          },
        ],
      },
      {
        name: 'Historical Sites',
        description: 'Sites operated by NYC Parks, NYS Office of Parks, Recreation and Historic Preservation, and US National Park Service',
        color: '#da664f',
        children: [
          {
            name: 'Historical Sites',
            description: 'Historic house parks, State historic places, national monuments, and national memorials',
          },
        ],
      },
    ],
  },
  {
    name: 'Libraries and Cultural Programs',
    slug: 'libraries_and_cultural_progams',
    color: '#80DEEA',
    subColor: '#E0F7FA',
    children: [
      {
        name: 'Libraries',
        description: 'Libraries operated by New York Public Libraries, Queens Public Libraries, and Brooklyn Public Libraries and academic institutions',
        color: '#b67eb7',
        children: [
          {
            name: 'Public Libraries',
            description: 'All public libaries',
          },
          {
            name: 'Academic and Special Libraries',
            description: 'Libraries operated by academic institutions or other specialized organizations',
          },
        ],
      },
      {
        name: 'Cultural Institutions',
        description: 'Institutions licensed or funded by the NYC Dept. of Cultural Affairs',
        color: '#f7ca00',
        children: [
          {
            name: 'Museums',
            description: 'Publicly and privately operated museums',
          },
          {
            name: 'Historical Societies',
            description: 'Historical societies',
          },
          {
            name: 'Other Cultural Institutions',
            description: 'Zoos, botanical gardens, performing arts centers, and multi-disciplinary art centers',
          },
        ],
      },
    ],
  },
  {
    name: 'Public Safety, Emergency Services, and Administration of Justice',
    slug: 'public_safety_emergency_services_and_administration_of_justice',
    color: '#2979FF',
    subColor: '#BBDEFB',
    icon: 'ambulance',
    children: [
      {
        name: 'Emergency Services',
        description: 'Services provided by Fire Dept. of New York',
        color: 'rgba(49,130,189,0.9)',
        children: [
          {
            name: 'Fire Services',
            description: 'Firehouses',
          },
          {
            name: 'Other Emergency Services',
            description: 'Ambulance and Emergency Medical Stations',
          },
        ],
      },
      {
        name: 'Public Safety',
        description: 'Services provided by New York Police Dept. and New York Housing Authority Police',
        color: '#b67eb7',
        children: [
          {
            name: 'Police Services',
            description: 'NYPD and NYCHA police stations',
          },
          {
            name: 'Other Public Safety',
            description: 'Other public safety related support centers',
          },
        ],
      },
      {
        name: 'Justice and Corrections',
        description: 'Courts and correctional facilities operated by NYC. Dept. of Correction, NYS Unified Court System, NYS Dept. of Corrections and Community Supervision, US Courts, and Federal Bureau of Prisons',
        color: '#da664f',
        children: [
          {
            name: 'Courthouses and Judicial',
            description: 'Courthouses, clerk offices, and court librarians',
          },
          {
            name: 'Detention and Correctional',
            description: 'Correctional and dentention centers',
          },
        ],
      },
    ],
  },
  {
    name: 'Core Infrastructure and Transportation',
    slug: 'core_infrastructure_and_transportation',
    color: '#78909C',
    subColor: '#e3eef2',
    icon: 'bus',
    children: [
      {
        name: 'Solid Waste',
        description: 'Sites overseen and operated by NYC Dept. of Sanitation, NYC Business Integrity Commission, and NYS Dept. of Conservation',
        color: '#da664f',
        children: [
          {
            name: 'Solid Waste Processing',
            description: 'Material recovery, composting, landfill gas recovery, and scrap metal processing facilities',
          },
          {
            name: 'Solid Waste Transfer and Carting',
            description: 'Waste carter sites and transfer stations',
          },
        ],
      },
      {
        name: 'Water and Wastewater',
        description: 'Sites overseen and operated by NYC Dept. of Environmental Protection',
        color: '#b0dae8',
        children: [
          {
            name: 'Wastewater and Pollution Control',
            description: 'Wastewater treatment plants and other sites related to wastewater conveyance and pollution control',
          },
          {
            name: 'Water Supply',
            description: 'Sites related to water supply',
          },
        ],
      },
      {
        name: 'Transportation',
        description: 'Sites operated or overseen by Metropolitan Transportation Authority, Port Authority of NY and NJ, NYC Dept. of Transportation, NYC Dept. of Consumer Affairs, US Dept. of Transportation, and others',
        color: '#f7ca00',
        children: [
          {
            name: 'Public Parking Lots and Garages',
            description: 'Public parking lots and garages',
          },
          {
            name: 'Commercial Parking Lots and Garages',
            description: 'Commercial parking lots and garages',
          },
          {
            name: 'Bus Depots and Terminals',
            description: 'School bus depots, MTA bus depots, and Port Authority bus terminals',
          },
          {
            name: 'Rail Yards and Maintenance',
            description: 'Rail yards and maintenance facilities',
          },
          {
            name: 'Ports and Ferry Landings',
            description: 'Ferry landings, cruise terminals, and ports',
          },
          {
            name: 'Airports and Heliports',
            description: 'Publicly and privately operated airports, heliports, and seaplane bases',
          },
          {
            name: 'Other Transportation',
            description: 'Uncategorized transportation related sites',
          },
        ],
      },
      {
        name: 'Telecommunications',
        description: 'Sites operated or overseen by Dept. of Information Technology and Telecommunications and other City telecommunications services',
        color: '#3182bd',
        children: [
          {
            name: 'Telecommunications',
            description: 'Antennas and other telecommunications sites',
          },
        ],
      },
      {
        name: 'Material Supplies and Markets',
        description: 'Sites operated or overseen by Dept. of Information Technology and Telecommunications and other City telecommunications services',
        color: '#b67eb7',
        children: [
          {
            name: 'Material Supplies',
            description: 'Asphalt plants and other material processing facilities',
          },
          {
            name: 'Wholesale Markets',
            description: 'Wholesale food and commercial markets',
          },
        ],
      },
    ],
  },
  {
    name: 'Administration of Government',
    slug: 'administration_of_government',
    color: '#da664f',
    subColor: 'rgba(251, 128, 114, 0.3)',
    icon: 'bar-chart',
    children: [
      {
        name: 'Offices, Training, and Testing',
        description: 'All City owned or leased offices overseen by Dept. of Citywide Administrative Services',
        color: '#da664f',
        children: [
          {
            name: 'Offices',
            description: 'Offices used by City agencies',
          },
          {
            name: 'Training and Testing',
            description: 'Training and testing sites used by City agencies',
          },
        ],
      },
      {
        name: 'Parking, Maintenance, and Storage',
        description: 'City owned or leased properites used for City vehicle and equipment-related operations by Dept. of Citywide Administrative Services',
        color: '#b0dae8',
        children: [
          {
            name: 'Custodial',
            description: 'City agency custodial sites',
          },
          {
            name: 'Maintenance and Garages',
            description: 'City agency vehicle maintenance sites',
          },
          {
            name: 'Parking',
            description: 'City agency parking lots',
          },
          {
            name: 'Storage',
            description: 'City agency storage sites',
          },
        ],
      },
      {
        name: 'Other Property',
        description: 'City owned or leased property without a categorized use overseen by Dept. of Citywide Administrative Services',
        color: '#b67eb7',
        children: [
          {
            name: 'Undeveloped or No Use',
            description: 'Property and structures without a designated use',
          },
          {
            name: 'Miscellaneous Use',
            description: 'Property without a categorized use',
          },
          {
            name: 'Properties Leased or Licensed to Non-public Entities',
            description: 'Properties Leased or Licensed to Non-public Entities',
          },
        ],
      },
    ],
  },
];
module.exports = facilitiesLayers;
