const colors = {
  getStatusColor(status) {
    switch(status) {
      case 'Complete':
          return '#136400'
          break
      case 'Partial complete':
          return '#229A00'
          break
      case 'Permit outstanding':
          return '#b2df8a'
          break
      case 'Permit pending':
          return '#5CA2D1'
          break
      case 'Demolition (complete)':
          return '#525252'
          break
    }
  }
}

export default colors
