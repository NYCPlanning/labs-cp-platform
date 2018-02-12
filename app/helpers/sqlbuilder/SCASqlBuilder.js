import SqlBuilder from './SqlBuilder';
import db_tables from '../../db_tables';

const sqlBuilder = new SqlBuilder('*', db_tables.sca);
const getSql = filterDimensions => sqlBuilder.housingBuildSql(filterDimensions);

export default getSql;
