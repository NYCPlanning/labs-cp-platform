/* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';
import db_tables from '../../db_tables';

export const sqlConfig = {
  columns: '*',
  tableName: 'tablenameplaceholder',
  pointsTablename: db_tables.cb_budget_requests.points,
  polygonsTablename: db_tables.cb_budget_requests.polygons,
};

// export const tableSqlConfig = {
//   columns: '*',
//   tableName: db_tables.cb_budget_requests.submissions,
// };

class CBBudgetRequestsSqlBuilder extends SqlBuilder {
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

Object.assign(CBBudgetRequestsSqlBuilder, SqlBuilder);

const sqlBuilder = new CBBudgetRequestsSqlBuilder(sqlConfig.columns, sqlConfig.tableName);
// const tableSqlBuilder = new CBBudgetRequestsSqlBuilder(tableSqlConfig.columns, tableSqlConfig.tableName);

export const getSql = filterDimensions => sqlBuilder.buildSql(filterDimensions);
// export const getTableSql = filterDimensions => tableSqlBuilder.buildSql(filterDimensions);
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
