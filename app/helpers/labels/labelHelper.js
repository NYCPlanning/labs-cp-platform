import boroughs from './boroughs';
import community_districts from './community_districts';

import nta from './js/nta';
import censtract from './js/censtract';

// import taz from './json/taz';
// import council from './json/council';
// import congdist from './json/congdist';
// import firediv from './json/firediv';
// import firebn from './json/firebn';
// import fireconum from './json/fireconum';
// import municourt from './json/municourt';
// import policeprecinct from './json/policeprecinct';
// import schooldistrict from './json/schooldistrict';
// import stateassemblydistrict from './json/stateassemblydistrict';
// import statesenatedistrict from './json/statesenatedistrict';

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
      // case 'council':
      //   return council;
      // case 'cd':
      //   return cd;
      // case 'congdist':
      //   return congdist;
      // case 'firediv':
      //   return firediv;
      // case 'firebn':
      //   return firebn;
      // case 'fireconum':
      //   return fireconum;
      // case 'municourt':
      //   return municourt;
      // case 'policeprecinct':
      //   return policeprecinct;
      // case 'schooldistrict':
      //   return schooldistrict;
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
