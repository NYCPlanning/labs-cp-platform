import appConfig from './appConfig';

const moment = require('moment');

export default {
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
};
