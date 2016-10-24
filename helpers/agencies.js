module.exports={
  agencyColors: {
    property: 'sagency',
    type: 'categorical',
    stops: [
      ['Others','#ffcc00'],
      ['SCA','#ff7f00'],
      ['DOT','#cab2d6'],
      ['DEP','#1f78b4'],
      ['DPR','#33a02c']
    ]
  },

  getAgencyColor: function(agency) {
    var match = this.agencyColors.stops.filter(function(stop) {
      return stop[0] == agency;
    })

    return match.length>0 ? match[0][1] : '#ffcc00';
  } 
}