  /* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';
import db_tables from '../../config/db_tables';

export const sqlConfig = {
  columns: '*',
  tablename: db_tables.housingdevdb,
};

class HousingSqlBuilder extends SqlBuilder {

  cofoDateRange(dimension, filters) {
    const range = filters[dimension].values;

    const dateRangeFormatted = {
      from: moment(range[0], 'X').startOf('month').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').endOf('month').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    return `((datecomplt >= '${dateRangeFormatted.from}' AND datecomplt <= '${dateRangeFormatted.to}') OR datecomplt IS NULL)`;
  }

  statusDateRange(dimension, filters) {
    const range = filters[dimension].values;

    const dateRangeFormatted = {
      from: moment(range[0], 'X').startOf('month').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').endOf('month').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    return `((datepermit >= '${dateRangeFormatted.from}' AND datepermit <= '${dateRangeFormatted.to}') OR datepermit IS NULL)`;
  }

  // SQL WHERE partial builder for Checkboxes
  statusMultiSelect(dimension, filters) {
    const values = filters[dimension].values;
    // inject some additional values to handle the demolition use className
    // demolitions where permit is issued should also show up under searches for complete.
    const demolitionIsSelected = filters.job_type.values.filter(d => (d.value === 'Demolition' && d.checked === true)).length > 0;

    // NOTE: how will these change with the new schema?
    const completeIsSelected = values.filter(d => (d.value === 'Complete' && d.checked === true)).length > 0;
    const inProgressIsSelected = values.filter(d => (d.value === 'In progress' && d.checked === true)).length > 0;
    const permitIssuedIsSelected = values.filter(d => (d.value === 'Permit issued' && d.checked === true)).length > 0;

    const checkedValues = values.filter(value => value.checked === true);

    const subChunks = checkedValues.map(value => `${dimension} = '${value.value}'`);

    if (demolitionIsSelected && (completeIsSelected || permitIssuedIsSelected)) {
      subChunks.push('job_status = \'Complete (demolition)\'');
    }

    if (inProgressIsSelected) {
      subChunks.push('job_status = \'In progress (last plan disapproved)\'');
    }

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;
      return chunk;
    }

    return 'FALSE'; // if no options are cheked, make the resulting SQL return no rows
  }

  housingBuildSql(filterDimensions) {
    const sql = this.buildSql(filterDimensions);
    return `${sql} AND job_inactv IS DISTINCT FROM 'Inactive'`;
  }
}

Object.assign(HousingSqlBuilder, SqlBuilder);

const sqlBuilder = new HousingSqlBuilder(sqlConfig.columns, sqlConfig.tablename);

export const getSql = filterDimensions => sqlBuilder.housingBuildSql(filterDimensions);
