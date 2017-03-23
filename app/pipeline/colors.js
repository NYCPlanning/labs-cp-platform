const colors = {
  getStatusColor(status) {
    switch (status) {
      case 'New Building':
        return 'rgba(0, 228, 14, 0.7)';
      case 'Alteration':
        return 'rgba(81, 99, 230, 0.77)';
      case 'Demolition':
        return 'rgba(234, 62, 62, 1)';
      default:
        return null;
    }
  },
};

export default colors;
