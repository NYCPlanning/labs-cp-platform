import appConfig from '../config/appConfig';

const moment = require('moment');

export default {
  getFilteredSql(sql) {
    return sql.replace(/SELECT (.*?) FROM/, 'SELECT * FROM');
  },

  getCompleteSql(sql) {
    return this.getFilteredSql(sql).replace(/ WHERE .*/, '');
  },

  generateUrlString(sql, fileType, filename = 'download') {
    const apiString = `https://${appConfig.carto_domain}/api/v2/sql?skipfields=cartodb_id&q=${sql}&format=${fileType}&filename=${filename}`;
    return encodeURI(apiString);
  },

  completeDownloadUrlString(sql, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    return this.generateUrlString(this.getCompleteSql(sql), fileType, `${filePrefix}_complete_${date}`);
  },

  completeCommitmentsDownloadUrlString(sql, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    return this.generateUrlString(sql, fileType, `${filePrefix}_complete_${date}`);
  },

  filteredDownloadUrlString(sql, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    return this.generateUrlString(this.getFilteredSql(sql), fileType, `${filePrefix}_filtered_${date}`);
  },

  completeDownloadUrlStringPtsPoly(sqls, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    const sql = `${this.getCompleteSql(sqls.points)} UNION ${this.getCompleteSql(sqls.polygons)}`;
    return this.generateUrlString(sql, fileType, `${filePrefix}_complete_${date}`);
  },

  filteredDownloadUrlStringPtsPoly(sqls, filePrefix, fileType) {
    const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef
    // const sql = `${this.getFilteredSql(sqls.points)} UNION ${this.getFilteredSql(sqls.polygons)}`;
    let sql;
    if(fileType === 'csv') {
      console.log('raw sql points', sqls.points);
      console.log('filtered sql points', this.getFilteredSql(sqls.points));
      console.log('raw sql polygons', sqls.polygons);
      console.log('filtered sql polygons', this.getFilteredSql(sqls.polygons));
      sql = "SELECT magency, magencyacro, description, totalcommit, maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype, the_geom_webmercator, the_geom FROM (SELECT a.magency, magencyacro, description, totalcommit, b.maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype, a.the_geom_webmercator, a.the_geom FROM cpdb_dcpattributes_pts_22adopted a LEFT JOIN cpdb_projects_combined_22adopted b ON a.maprojid = b.maprojid) x WHERE maprojid IN (SELECT feature_id FROM cpdb_adminbounds_22adopted WHERE admin_boundary_type = 'commboard' AND (admin_boundary_id = '101')) AND (totalspend >= '0' AND totalspend <= '3400000000') AND (totalcommit >= '-6000000' AND totalcommit <= '5200000000') AND NOT (maxdate <= to_date('2009-07-01', 'YYYY-MM-DD') OR mindate >= to_date('2040-06-30', 'YYYY-MM-DD')) UNION SELECT magency, magencyacro, description, totalcommit, maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype, the_geom_webmercator, the_geom FROM (SELECT a.magency, magencyacro, description, totalcommit, b.maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype, a.the_geom_webmercator, a.the_geom FROM cpdb_dcpattributes_poly_22adopted a LEFT JOIN cpdb_projects_combined_22adopted b ON a.maprojid = b.maprojid) x WHERE maprojid IN (SELECT feature_id FROM cpdb_adminbounds_22adopted WHERE admin_boundary_type = 'commboard' AND (admin_boundary_id = '101')) AND (totalspend >= '0' AND totalspend <= '3400000000') AND (totalcommit >= '-6000000' AND totalcommit <= '5200000000') AND NOT (maxdate <= to_date('2009-07-01', 'YYYY-MM-DD') OR mindate >= to_date('2040-06-30', 'YYYY-MM-DD'))"
      console.log('combined sql', sql);
    }
    return this.generateUrlString(sql, fileType, `${filePrefix}_complete_${date}`);
  },
};
