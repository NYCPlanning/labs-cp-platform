import boroughs from './boroughs';
import community_districts from './community_districts';
import council from './council';
import nta2020  from './nta2020';
import censtract from './censtract';
import congdist from './congdist';
import policeprecinct from './policeprecinct';
import schooldistrict from './schooldistrict';
import schooldistricthousing from './schooldistricthousing';

class LabelHelper {
  static get_labels(label_category) {
    switch (label_category) {
      case 'cd':
        return community_districts;
      case 'borocode':
        return boroughs;
      case 'nta2020':
        return nta2020;
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
      case 'schooldistricthousing':
        return schooldistricthousing;
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
