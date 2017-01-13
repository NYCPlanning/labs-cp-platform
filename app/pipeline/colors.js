const colors = {
  getStatusColor(status) {
    switch (status) {
      case 'Complete':
        return '#136400';
      case 'Partial complete':
        return '#229A00';
      case 'Permit outstanding':
        return '#b2df8a';
      case 'Permit pending':
        return '#5CA2D1';
      case 'Demolition (complete)':
        return '#525252';
      default:
        return null;
    }
  },
};

export default colors;
