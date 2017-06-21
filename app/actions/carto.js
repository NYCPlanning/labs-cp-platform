import * as AT from '../constants/actionTypes';
import { dbStringToArray } from '../helpers/dbStrings';

export const getFeature = ({ tableName, column, value }, nextType) => {
  const requestFormat = 'geojson';
  const sql = typeof value === 'number'
    ? `SELECT * FROM ${tableName} WHERE ${column} = ${value}`
    : `SELECT * FROM ${tableName} WHERE ${column} = '${value}'`;

  return {
    type: AT.CARTO_REQUEST,
    payload: { sql, requestFormat, nextType },
  };
};

export const fetchAgencyValues = ({ properties }, nextType) => {
  // Assumes a structure to the string given by the database
  const pgTableIds = dbStringToArray(properties.pgtable);
  const pgTableSQL = pgTableIds.map(pg => `'${pg}'`).join(',');

  const requestFormat = 'json';
  const sql = `SELECT * FROM facdb_datasources WHERE pgtable IN (${pgTableSQL})`;

  return {
    type: AT.CARTO_REQUEST,
    payload: { sql, requestFormat, nextType },
  };
};
