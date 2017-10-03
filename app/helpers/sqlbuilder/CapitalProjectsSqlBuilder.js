/* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';

export const sqlConfig = {
  columns: '*',
  combinedTable: `(
      SELECT the_geom, magency, magencyacro, magencyname, description, totalcommit, maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype FROM (
        SELECT magency, magencyacro, magencyname, description, totalcommit, maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype
        FROM cpdb_projects_combined_170911
      ) a LEFT JOIN (
        SELECT the_geom, maprojid as projid FROM cpdb_dcpattributes_pts_170911
        UNION ALL
        SELECT the_geom, maprojid as projid FROM cpdb_dcpattributes_poly_170911
      ) b ON a.maprojid = b.projid
    )x`,
  tableName: 'tablenameplaceholder',
  pointsTablename: '(SELECT a.the_geom, a.the_geom_webmercator, a.magency, magencyacro, description, totalcommit, b.maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype FROM cpdb_dcpattributes_pts_170911 a LEFT JOIN cpdb_projects_combined_170911 b ON a.maprojid = b.maprojid) x',
  polygonsTablename: '(SELECT a.the_geom, a.the_geom_webmercator, a.magency, magencyacro, description, totalcommit, b.maprojid, totalspend, sagencyacro, maxdate, mindate, projecttype FROM cpdb_dcpattributes_poly_170911 a LEFT JOIN cpdb_projects_combined_170911 b ON a.maprojid = b.maprojid) x',
};

export const tableSqlConfig = {
  columns: 'magency, magencyacro, sagencyacro, maprojid, description, totalcommit, totalspend, projecttype',
  tableName: 'cpdb_projects_combined_170911',
};

class CapitalProjectsSqlBuilder extends SqlBuilder {
  // chunker for "active years"
  capitalProjectsDateRange(dimension, filters) {
    const range = filters[dimension].values;
    return `NOT (maxdate <= to_date('${range[0] - 1}-07-01', 'YYYY-MM-DD') OR mindate >= to_date('${range[1]}-06-30', 'YYYY-MM-DD'))`;
  }

  // chunker for projecttype
  projectTypeMultiSelect(dimension, filters) {
    const values = filters[dimension].values;

    const checkedValues = values.filter(value => value.checked === true);
    const subChunks = checkedValues.map(value => `array_to_string(projecttype, ', ') LIKE '%${value.value}%'`);

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      return chunk;
    }

    return 'FALSE'; // if no options are checked, make the resulting SQL return no rows
  }

  // chunker for sagency
  sagencyMultiSelect(dimension, filters) {
    const values = filters[dimension].values;

    const checkedValues = values.filter(value => value.checked === true);
    const subChunks = checkedValues.map(value => `array_to_string(sagencyacro, ', ') = '${value.value}'`);

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      return chunk;
    }

    return 'FALSE'; // if no options are checked, make the resulting SQL return no rows
  }

}

Object.assign(CapitalProjectsSqlBuilder, SqlBuilder);

const sqlBuilder = new CapitalProjectsSqlBuilder(sqlConfig.columns, sqlConfig.tableName);
const tableSqlBuilder = new CapitalProjectsSqlBuilder(tableSqlConfig.columns, tableSqlConfig.tableName);

export const getSql = filterDimensions => sqlBuilder.buildSql(filterDimensions);
export const getTableSql = filterDimensions => tableSqlBuilder.buildSql(filterDimensions);
export const getPointsSql = filterDimensions => getSql(filterDimensions).replace(sqlConfig.tableName, sqlConfig.pointsTablename);
export const getPolygonsSql = filterDimensions => getSql(filterDimensions).replace(sqlConfig.tableName, sqlConfig.polygonsTablename);

export const unionSql = (filterDimensions) => {
  const pointsSql = getSql(filterDimensions).replace(sqlConfig.tableName, sqlConfig.pointsTablename);
  const polygonsSql = getSql(filterDimensions).replace(sqlConfig.tableName, sqlConfig.polygonsTablename);

  return `
    ${pointsSql}
    UNION ALL
    ${polygonsSql}
  `;
};
