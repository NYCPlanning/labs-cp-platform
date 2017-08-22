import boroughs from './boroughs';
import community_districts from './community_districts';

class LabelHelper {
  static get_labels(label_category) {
    switch (label_category) {
      case 'commboard':
        return community_districts;
      case 'borocode':
        return boroughs;
      default:
        throw new Error('Invalid label category');
    }
  }
}

export default LabelHelper;
