import appConfig from './appConfig';

// TODO: Use request.js or another library for HTTP calls below
const $ = require('jquery');
const moment = require('moment');

module.exports = {
  // get a full row from a table as geojson
  // returns a promise that when resolved yeilds a GeoJson feature
  getFeature(tableName, column, value) {
    const self = this;

    return new Promise((resolve, reject) => {
      const sql = typeof (value) === 'number' ?
        `SELECT * FROM ${tableName} WHERE ${column} = ${value}` :
        `SELECT * FROM ${tableName} WHERE ${column} = '${value}'`;

      self.SQL(sql)
        .then((data) => {
          resolve(data.features[0]);
        })
        .catch(err => reject(err));
    });
  },

  // gets the bounds of an nyc geometry such as a cd, nta, etc
  getNYCBounds(type, id) {
    return new Promise((resolve, reject) => {
      this.SQL(`SELECT ST_Extent(the_geom) FROM support_admin_ntaboundaries WHERE ntacode = '${id}'`, 'json')
        .then((data) => {
          const bounds = [];
          const pairs = data[0]
            .st_extent
            .match(/\(([^)]+)\)/)[1]
            .split(',');

          pairs.forEach((pair, i) => {
            bounds[i] = pair.split(' ');
          });

          resolve(bounds);
        })
        .catch(err => reject(err));
    });
  },

  getCount(sql) {
    const self = this;
    sql = `SELECT count(*) FROM (${sql}) a`;

    return new Promise((resolve, reject) => {
      self.SQL(sql, 'json')
        .then((data) => {
          resolve(data[0].count);
        })
        .catch(err => reject(err));
    });
  },

  getFilteredSql(sql) {
    return sql.replace(/SELECT (.*?) FROM/, 'SELECT * FROM');
  },

  getCompleteSql(sql) {
    return this.getFilteredSql(sql).replace(/ WHERE .*/, '');
  },

  generateUrlString(sql, fileType, filename = 'download') {
    const apiString = `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v2/sql?skipfields=cartodb_id&q=${sql}&format=${fileType}&filename=${filename}`;
    return encodeURI(apiString);
  },

  completeDownloadUrlString(sql, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    return this.generateUrlString(this.getCompleteSql(sql), fileType, `${filePrefix}_complete_${date}`);
  },

  filteredDownloadUrlString(sql, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    return this.generateUrlString(this.getFilteredSql(sql), fileType, `${filePrefix}_filtered_${date}`);
  },

  // does a carto SQL api call
  // pass in format as a valid SQL api export format (shp, csv, geojson)
  SQL(sql, format) {
    format = format || 'geojson';
    const apiCall = this.generateUrlString(sql, format);

    return new Promise((resolve, reject) => {
      $.getJSON(apiCall) // eslint-disable-line no-undef
        .done((data) => {
          if (format === 'geojson') {
            resolve(data);
          } else {
            resolve(data.rows);
          }
        })
        .fail(err => reject(err));
    });
  },
};
