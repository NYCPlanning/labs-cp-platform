/* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';
import db_tables from '../../db_tables';

export const sqlConfig = {
  columns: '*',
  tableName: 'tablenameplaceholder',
  pointsTablename: db_tables.cb_budget_requests.points,
  polygonsTablename: db_tables.cb_budget_requests.polygons,
};

class CBBudgetRequestsSqlBuilder extends SqlBuilder {
  top10(dimension, filters) {
    const checked = filters[dimension].values;

    if (checked === true) {
      return 'priority <= 10';
    }
  }
}

Object.assign(CBBudgetRequestsSqlBuilder, SqlBuilder);

const sqlBuilder = new CBBudgetRequestsSqlBuilder(sqlConfig.columns, sqlConfig.tableName);
// const tableSqlBuilder = new CBBudgetRequestsSqlBuilder(tableSqlConfig.columns, tableSqlConfig.tableName);

export const getSql = filterDimensions => sqlBuilder.buildSql(filterDimensions);
// export const getTableSql = filterDimensions => tableSqlBuilder.buildSql(filterDimensions);
export const getPointsSql = filterDimensions => getSql(filterDimensions).replace(sqlConfig.tableName, sqlConfig.pointsTablename);
export const getPolygonsSql = filterDimensions => getSql(filterDimensions).replace(sqlConfig.tableName, sqlConfig.polygonsTablename);

export const unionSql = () => {
  const pointsSql = getSql({}).replace(sqlConfig.tableName, sqlConfig.pointsTablename);
  const polygonsSql = getSql({}).replace(sqlConfig.tableName, sqlConfig.polygonsTablename);

  return `
    (${pointsSql}
    UNION ALL
    ${polygonsSql}) a
  `;
};
