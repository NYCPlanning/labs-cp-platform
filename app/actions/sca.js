import * as AT from '../constants/actionTypes';
import * as cartoActions from './carto';

import db_tables from '../db_tables';

const fetchDetails = cartodbId =>
  cartoActions.getFeature({
    tableName: db_tables.sca,
    column: 'cartodb_id',
    value: cartodbId,
  }, AT.FETCH_SCA_DETAILS);

export default fetchDetails;
