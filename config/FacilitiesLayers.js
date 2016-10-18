var FacilitiesLayers = [
  {
    name: 'Health and Human Services',
    slug: 'health_and_human_services',
    color: '#bebada',
    subColor: 'rgba(190, 186, 218, 0.3)',
    children: [
      {
        name: 'Health Care',
        children: [
          {
            name: 'Chemical Dependency'
          },
          {
            name: 'Hospitals and Clinics'
          },
          {
            name: 'Mental Health'
          },
          {
            name: 'Other Health Care'
          },
          {
            name: 'Residential Health Care'
          }
        ]
      },
      {
        name: 'Human Services',
        children: [
          {
            name: 'Housing and Homeless Services'
          },
          {
            name: 'Legal and Intervention Services'
          },
          {
            name: 'Programs for People with Disabilities'
          },
          {
            name: 'Senior Services'
          },
          {
            name: 'Soup Kitchens and Food Pantries'
          },
          {
            name: 'Workforce Development'
          }
        ]
      }
    ]
  }, 
  {
    name: 'Education, Child Welfare, and Youth',
    slug: 'education_child_welfare_and_youth',
    color: '#fdb462',
    subColor: 'rgba(253, 180, 98, 0.3)',
    children: [
      {
        name: 'Camps',
        children: [
          {
            name: 'Camps'
          }
        ]
      },
      {
        name: 'Child Welfare',
        children: [
          {
            name: 'Child Nutrition'
          }
        ]
      },
      {
        name: 'Childcare',
        children: [
          {
            name: 'Childcare'
          }
        ]
      },
      {
        name: 'Childrens Services',
        children: [
          {
            name: 'Childrens Services'
          }
        ]
      },
      {
        name: 'Schools',
        children: [
          {
            name: 'Colleges or Universities'
          },
          {
            name: 'Non-public Schools'
          },
          {
            name: 'Other Schools Serving Students with Disabilities'
          },
          {
            name: 'Preschools'
          },
          {
            name: 'Proprietary Schools'
          },
          {
            name: 'Public Schools'
          }
        ]
      },
      {
        name: 'Youth Services',
        children: [
          {
            name: 'Youth Services'
          }
        ]
      },
    ]
  },
  {
    name: 'Parks, Cultural, and Other Community Facilities',
    slug: 'parks_cultural_institutions_and_other_community_facilities',
    color: '#8dd3c7',
    subColor: 'rgba(141, 211, 199, 0.29)',
    children: [
      {
        name: 'Cultural Institutions',
        children: [
          {
            name: 'Historical Societies'
          },
          {
            name: 'Museums'
          },
          {
            name: 'Other Cultural Institutions'
          }
        ]
      },
      {
        name: 'Historical Sites',
        children: [
          {
            name: 'Historical Sites'
          }
        ]
      },
      {
        name: 'Libraries',
        children: [
          {
            name: 'Academic Libraries'
          },
          {
            name: 'Public Libraries'
          }
        ]
      },
      {
        name: 'Parks and Plazas',
        children: [
          {
            name: 'Cemeteries'
          },
          {
            name: 'Gardens'
          },
          {
            name: 'Parks'
          },
          {
            name: 'Preserves and Conservation Areas'
          },
          {
            name: 'Recreation and Waterfront Sites'
          },
          {
            name: 'Streetscapes, Plazas, and Malls'
          }
        ]
      }
    ]
  },
  {
    name: 'Public Safety, Emergency Services, and Administration of Justice',
    slug: 'public_safety_emergency_services_and_administration_of_justice',
    color: '#80b1d3',
    subColor: 'rgba(128, 177, 211, 0.3)',
    children: [
      {
        name: 'Emergency Services',
        children: [
          {
            name: 'Emergency Services'
          }
        ]
      },
      {
        name: 'Justice and Corrections',
        children: [
          {
            name: 'Courthouses and Judicial'
          },
          {
            name: 'Detention and Correctional'
          }
        ]
      },
      {
        name: 'Public Safety',
        children: [
          {
            name: 'Police Services'
          }
        ]
      }
    ]
  }, 
  {
    name: 'Core Infrastructure and Transportation',
    slug: 'core_infrastructure_and_transportation',
    color: '#ffff36',
    subColor: 'rgba(255, 255, 54, 0.29)',
    children: [
      {
        name: 'Transportation',
        children: [
          {
            name: 'Airports and Heliports'
          },
          {
            name: 'Bus Depots and Terminals'
          },
          {
            name: 'Parking Lots and Garages'
          },
          {
            name: 'Ports and Ferry Landings'
          },
          {
            name: 'Rail Yards and Maintenance'
          }
        ]
      },
      {
        name: 'Wastewater and Waste Management',
        children: [
          {
            name: 'Solid Waste Processing'
          },
          {
            name: 'Solid Waste Transfer and Carting'
          },
          {
            name: 'Wastewater Treatment Plant'
          }
        ]
      }
    ]
  },
  {
    name: 'Administration of Government',
    slug: 'administration_of_government',
    color: '#fb8072',
    subColor: 'rgba(251, 128, 114, 0.3)',
    children: [
      {
        name: 'Offices',
        children: [
          {
            name: 'Offices'
          }
        ]
      },
      {
        name: 'Other Property',
        children: [
          {
            name: 'Miscellaneous Use'
          },
          {
            name: 'No Use'
          },
          {
            name: 'Undeveloped'
          }
        ]
      },
      {
        name: 'Parking, Maintenance, and Storage',
        children: [
          {
            name: 'Maintenance'
          },
          {
            name: 'Parking'
          },
          {
            name: 'Storage'
          }
        ]
      }
    ]
  }
]

module.exports=FacilitiesLayers