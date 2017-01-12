//Agency color mapping for agencies in the capital projects explorer
//includes 4 major capital agencies and "Others"

import config from './config.js'

var agencies = [
    {
      name: 'All Other Agencies',
      acronym: 'Others',
      color: '#ffcc00'
    },
    {
      name: 'Dept. of Parks and Recreation',
      acronym: 'DPR',
      color: '#33a02c'
    },
    {
      name: 'Dept. of Transportation',
      acronym: 'DOT',
      color: '#cab2d6'
    },
    {
      name: 'Dept. of Environmental Protection',
      acronym: 'DEP',
      color: '#1f78b4'
    },
    {
      name: 'School Construction Authority',
      acronym: 'SCA',
      color: '#ff7f00'
    }
  ]



const AgencyHelper = {
  agencies: agencies,

  mapboxGLStyle: {
    property: 'agency',
    type: 'categorical',
    stops: agencies.map(function( agency ) {
      return [agency.acronym, agency.color]
    })
  },

  getAgencyColor: function( acronym ) {
    var match = agencies.filter(function( agency ) {
      return agency.acronym == acronym;
    })

    return match.length>0 ? match[0].color : '#ffcc00';
  },

  getAgencyName: function( acronym ) {
    var match = config.sponsorAgencies.filter(function( agency ) {
      return agency.value == acronym
    })
    return match[0].label
  } 
}

console.log(AgencyHelper.mapboxGLStyle)

export default AgencyHelper