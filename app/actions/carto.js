import * as AT from '../constants/actionTypes';
import db_tables from '../config/db_tables';

export const getFeature = ({ tableName, column, value }, nextType) => {
  console.log(typeof value);
  const requestFormat = 'geojson';
  const sql = typeof value === 'number'
    ? `SELECT * FROM ${tableName} WHERE ${column} = ${value}`
    : `SELECT * FROM ${tableName} WHERE ${column} = '${value}'`;

  return {
    type: AT.CARTO_REQUEST,
    payload: { sql, requestFormat, nextType },
  };
};

export const getPopsDetails = (popsId, nextType) => {
  const requestFormat = 'geojson';
  const sql = `SELECT * FROM ${db_tables.facdb.pops} WHERE popsnumber = '${popsId}'`;

  return {
    type: AT.CARTO_REQUEST,
    payload: { sql, requestFormat, nextType },
  };
};

export const fetchAgencyValues = ({ properties }, nextType) => {
  const sql = `SELECT * FROM ${db_tables.facdb.datasources} WHERE data_source = '${properties.datasource}'`;

  return {
    type: AT.CARTO_REQUEST,
    payload: { sql, requestFormat: 'json', nextType },
  };
};
