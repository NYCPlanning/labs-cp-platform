import boroughs from './boroughs';
import community_districts from './community_districts';
import council from './council';
import nta from './nta';
import censtract from './censtract';
import congdist from './congdist';
import policeprecinct from './policeprecinct';
import schooldistrict from './schooldistrict';

class LabelHelper {
  static get_labels(label_category) {
    switch (label_category) {
      case 'commboard':
        return community_districts;
      case 'borocode':
        return boroughs;
      case 'nta':
        return nta;
      case 'censtract':
        return censtract;
      // case 'taz':
      //   return taz;
      case 'council':
        return council;
      // case 'cd':
      //   return cd;
      case 'congdist':
        return congdist;
      // case 'firediv':
      //   return firediv;
      // case 'firebn':
      //   return firebn;
      // case 'fireconum':
      //   return fireconum;
      // case 'municourt':
      //   return municourt;
      case 'policeprecinct':
        return policeprecinct;
      case 'schooldistrict':
        return schooldistrict;
      // case 'stateassemblydistrict':
      //   return stateassemblydistrict;
      // case 'statesenatedistrict':
      //   return statesenatedistrict;
      default:
        throw new Error('Invalid label category');
    }
  }
}

export default LabelHelper;
