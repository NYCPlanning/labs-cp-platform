var FacilitiesLayers = [
  {
    name: 'Health and Human Services',
    slug: 'health_and_human_services',
    color: '#b67eb7',
    subColor: '#f7e6f7',
    children: [
      {
        name: 'Health Care',
        description: 'Health facilities overseen by NYC Health and Hospitals Corporation, NYC Health and Human Services, NYS Dept. of Health, NYS Office of Mental Health, and NYS Office of Alcoholism and Substance Abuse Services',
        color: '#b67eb7',
        children: [
          {
            name: 'Hospitals and Clinics',
            description: 'Urgent care hospitals, diagnostic and treatment centers, and school-based health facilities'
          },
          {
            name: 'Mental Health',
            description: 'Inpatient, outpatient, and emergency mental health services'
          },
          {
            name: 'Residential Health Care',
            description: 'Nursing homes, hospice care, and supportive housing'
          },
          {
            name: 'Chemical Dependency',
            description: 'Monitored support, inpatient, outpatient, and crisis services'
          },
          {
            name: 'Other Health Care',
            description: 'Rehab, respite servies, vaccination services, AIDS counseling, and home health centers'
          }        
        ]
      },
      {
        name: 'Human Services',
        description: 'Services overseen by NYC Dept. of Homeless Services, NYC Dept. of Human Resources, NYC Mayorality, and others',
        color: '#3182bd',
        children: [
          {
            name: 'Housing and Homeless Services',
            description: 'Shelters and homelessness prevention services'
          },
          {
            name: 'Senior Services',
            description: 'Neighborhood senior centers, meal delivery programs, and other services for seniors'
          },
          {
            name: 'Programs for People with Disabilities',
            description: 'Specialized child care, caregiver support, and recreational services'
          },
          {
            name: 'Workforce Development',
            description: 'Workforce 1 Centers and other vocational services for adults'
          },
          {
            name: 'Soup Kitchens and Food Pantries',
            description: 'Soup kitchens and food pantries'
          },
          {
            name: 'Legal and Intervention Services',
            description: 'Early intervention, criminal defense, and mediation services'
          }
        ]
      }
    ]
  }, 
  {
    name: 'Education, Child Welfare, and Youth',
    slug: 'education_child_welfare_and_youth',
    color: '#f7ca00',
    subColor: '#fff8dd',
    children: [
      {
        name: 'Schools',
        description: 'Preschools, K-12 schools, and higher education overseen by NYC Dept. of Education and NYS Education Department',
        color: '#f7ca00',
        children: [
          {
            name: 'Public Schools',
            description: 'Public and charter elementary, middle, and high schools'
          },
          {
            name: 'Non-public Schools',
            description: 'Private elementary, middle, and high schools'
          },
          {
            name: 'Preschools',
            description: 'Early Learn NYC and Universal Pre-K sites'
          },
          {
            name: 'Other Schools Serving Students with Disabilities',
            description: 'Specialized schools and educational services for students with disabilities'
          },
          {
            name: 'Colleges or Universities',
            description: 'Public and privately operated 2 and 4 year colleges and universities'
          },
          {
            name: 'Proprietary Schools',
            description: 'ESL schools and trade colleges'
          }
        ]
      },
      {
        name: 'Childcare',
        description: 'Childcare centers overseen by NYC Administration for Childrens Services and NYC Dept. of Mental Health and Hygiene',
        color: '#e0fc83',
        children: [
          {
            name: 'Childcare',
            description: 'Group and school-based child care centers for infants, toddlers, and preschoolers'
          }
        ]
      },
      {
        name: 'Childrens Services',
        description: 'Services overseen by NYC Health and Human Services',
        color: '#da664f',
        children: [
          {
            name: 'Childrens Services',
            description: 'Foster care services, preventative care, and juvenile non-secure placement'
          }
        ]
      },
      {
        name: 'Child Welfare',
        description: 'Child feeding centers tracked by New York State Education Department',
        color: '#5bb12f',
        children: [
          {
            name: 'Child Nutrition',
            description: 'Summer and year-round child feeding sites'
          }
        ]
      },
      {
        name: 'Youth Services',
        description: 'Services overseen by NYC Dept. of Youth and Community Development',
        color: '#b67eb7',
        children: [
          {
            name: 'Youth Services',
            description: 'COMPASS Programs, youth literacy, and youth employment programs'
          }
        ]
      },
      {
        name: 'Camps',
        description: 'Camps overseen by NYC Dept. of Mental Health and Hygiene',
        color: '#3182bd',
        children: [
          {
            name: 'Camps',
            description: 'Preschool age and all age camps'
          }
        ]
      }
    ]
  },
  {
    name: 'Parks, Cultural, and Other Community Facilities',
    slug: 'parks_cultural_institutions_and_other_community_facilities',
    color: '#6f9568',
    subColor: '#dfeddc',
    children: [
      {
        name: 'Parks and Plazas',
        description: 'Properties operated by NYC Parks, NYC Dept. of Transportation, NYS Office of Parks, Recreation and Historic Preservation, NYS Dept. of Conservation, and City-State corporations and trusts',
        color: '#6f9568',
        children: [
          {
            name: 'Parks',
            description: 'Flagship parks, community parks, state parks, and city-state parks'
          },
          {
            name: 'Recreation and Waterfront Sites',
            description: 'Playgrounds, waterfront facilities, and recreation fields and courts'
          },
          {
            name: 'Streetscapes, Plazas, and Malls',
            description: 'Pedestrian plazas, malls, triangle plazas, and parkways'
          },
          {
            name: 'Gardens',
            description: 'Community gardens'
          },
          {
            name: 'Preserves and Conservation Areas',
            description: 'Nature areas, preserves, wetlands, and state forests'
          },
          {
            name: 'Cemeteries',
            description: 'Cemeteries operated by NYC Parks'
          }
        ]
      },
      {
        name: 'Libraries',
        description: 'Libraries operated by New York Public Libraries, Queens Public Libraries, and Brooklyn Public Libraries and academic institutions',
        color: '#b67eb7',
        children: [
          {
            name: 'Public Libraries',
            description: 'All public libaries'
          },
          {
            name: 'Academic Libraries',
            description: 'Libraries operated by academic institutions'
          }
        ]
      },
      {
        name: 'Cultural Institutions',
        description: 'Institutions licensed or funded by the NYC Dept. of Cultural Affairs',
        color: '#f7ca00',
        children: [
          {
            name: 'Museums',
            description: 'Publicly and privately operated museums'
          },
          {
            name: 'Historical Societies',
            description: 'Historical societies'
          },
          {
            name: 'Other Cultural Institutions',
            description: 'Zoos, botanical gardens, performing arts centers, and multi-disciplinary art centers'
          }
        ]
      },
      {
        name: 'Historical Sites',
        description: 'Sites operated by NYC Parks, NYS Office of Parks, Recreation and Historic Preservation, and US National Park Service',
        color: '#da664f',
        children: [
          {
            name: 'Historical Sites',
            description: 'Historic house parks, State historic places, national monuments, and national memorials'
          }
        ]
      }
    ]
  },
  {
    name: 'Public Safety, Emergency Services, and Administration of Justice',
    slug: 'public_safety_emergency_services_and_administration_of_justice',
    color: 'rgba(49,130,189,0.9)',
    subColor: 'rgba(128, 177, 211, 0.3)',
    children: [
      {
        name: 'Emergency Services',
        description: 'Services provided by Fire Dept. of New York',
        color: 'rgba(49,130,189,0.9)',
        children: [
          {
            name: 'Emergency Services',
            description: 'Firehouses, ambulance stations, training facilites, and others related to providing emergency services'
          }
        ]
      },
      {
        name: 'Public Safety',
        description: 'Services provided by New York Police Dept. and New York Housing Authority Police',
        color: '#b67eb7',
        children: [
          {
            name: 'Police Services',
            description: 'Police stations, training facilities, and other support centers'
          }
        ]
      },
      {
        name: 'Justice and Corrections',
        description: 'Courts and correctional facilities operated by NYC. Dept. of Correction, NYS Unified Court System, NYS Dept. of Corrections and Community Supervision, US Courts, and Federal Bureau of Prisons',
        color: '#da664f',
        children: [
          {
            name: 'Courthouses and Judicial',
            description: 'Courthouses, clerk offices, and court librarians'
          },
          {
            name: 'Detention and Correctional',
            description: 'Correctional and dentention centers'
          }
        ]
      }
    ]
  }, 
  {
    name: 'Core Infrastructure and Transportation',
    slug: 'core_infrastructure_and_transportation',
    color: '#e0fc83',
    subColor: '#f7ffe0',
    children: [
      {
        name: 'Transportation',
        description: 'Sites operated or overseen by Metropolitan Transportation Authority, Port Authority of NY and NJ, NYC Dept. of Transportation, NYC Dept. of Consumer Affairs, US Dept. of Transportation, and others',
        color: '#e0fc83',
        children: [
          {
            name: 'Parking Lots and Garages',
            description: 'Public and commercial parking lots and garages'
          },
          {
            name: 'Bus Depots and Terminals',
            description: 'School bus depots, MTA bus depots, and Port Authority bus terminals'
          },
          {
            name: 'Rail Yards and Maintenance',
            description: 'Rail yards and maintenance facilities'
          },
          {
            name: 'Ports and Ferry Landings',
            description: 'Ferry landings, cruise terminals, and ports'
          },
          {
            name: 'Airports and Heliports',
            description: 'Publicly and privately operated airports, heliports, and seaplane bases'
          }
        ]
      },
      {
        name: 'Wastewater and Waste Management',
        description: 'Sites overseen and operated by NYC Dept. of Sanitation, NYC Dept. of Environmental Protection, NYC Business Integrity Commission, and NYS Dept. of Conservation',
        color: '#da664f',
        children: [
          {
            name: 'Solid Waste Processing',
            description: 'Material recovery, composting, landfill gas recovery, and scrap metal processing facilities'
          },
          {
            name: 'Solid Waste Transfer and Carting',
            description: 'Waste carter sites and transfer stations'
          },
          {
            name: 'Wastewater Treatment Plant',
            description: 'Wastewater treatment plants'
          }
        ]
      }
    ]
  },
  {
    name: 'Administration of Government',
    slug: 'administration_of_government',
    color: '#da664f',
    subColor: 'rgba(251, 128, 114, 0.3)',
    children: [
      {
        name: 'Offices',
        description: 'All City owned or leased offices overseen by Dept. of Citywide Administrative Services',
        color: '#da664f',
        children: [
          {
            name: 'Offices',
            description: 'Offices used by City agencies'
          }
        ]
      },
      {
        name: 'Parking, Maintenance, and Storage',
        description: 'City owned or leased properites used for City vehicle and equipment-related operations by Dept. of Citywide Administrative Services',
        color: '#e0fc83',
        children: [
          {
            name: 'Maintenance',
            description: 'City agency vehicle maintenance sites'
          },
          {
            name: 'Parking',
            description: 'City agency parking lots'
          },
          {
            name: 'Storage',
            description: 'City agency storage sites'
          }
        ]
      },
      {
        name: 'Other Property',
        description: 'City owned or leased property without a categorized use overseen by Dept. of Citywide Administrative Services',
        color: '#b67eb7',
        children: [
          {
            name: 'No Use',
            description: 'Property and structures without a designated use'
          },
          {
            name: 'Miscellaneous Use',
            description: 'Property without a categorized use'
          },
          {
            name: 'Undeveloped',
            description: 'Undeveloped property'
          }
        ]
      }
    ]
  }
]

module.exports=FacilitiesLayers