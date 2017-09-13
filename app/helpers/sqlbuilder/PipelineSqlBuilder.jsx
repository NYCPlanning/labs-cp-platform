  /* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';

export const sqlConfig = {
  columns: 'cartodb_id, the_geom_webmercator, dcp_status, dcp_dev_category, u_net, address',
  tablename: 'housingdevdb_170906',
};

class PipelineSqlBuilder extends SqlBuilder {

  cofoDateRange(dimension, filters) {
    const range = filters[dimension].values;

    const dateRangeFormatted = {
      from: moment(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    return `NOT (c_date_earliest >= '${dateRangeFormatted.to}' OR c_date_latest <= '${dateRangeFormatted.from}')`;
  }

  // SQL WHERE partial builder for Checkboxes
  statusMultiSelect(dimension, filters) {
    const values = filters[dimension].values;
    // inject some additional values to handle the demolition use className
    // demolitions where permit is issued should also show up under searches for complete.
    const demolitionIsSelected = filters.dcp_dev_category.values.filter(d => (d.value === 'Demolition' && d.checked === true)).length > 0;
    const completeIsSelected = values.filter(d => (d.value === 'Complete' && d.checked === true)).length > 0;
    const permitIssuedIsSelected = values.filter(d => (d.value === 'Permit issued' && d.checked === true)).length > 0;

    const checkedValues = values.filter(value => value.checked === true);

    const subChunks = checkedValues.map(value => `${dimension} = '${value.value}'`);

    if (demolitionIsSelected && (completeIsSelected || permitIssuedIsSelected)) {
      subChunks.push('dcp_status = \'Complete (demolition)\'');
    }

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;
      return chunk;
    }

    return 'FALSE'; // if no options are cheked, make the resulting SQL return no rows
  }
}

Object.assign(PipelineSqlBuilder, SqlBuilder);

const sqlBuilder = new PipelineSqlBuilder(sqlConfig.columns, sqlConfig.tablename);

export const getSql = filterDimensions => sqlBuilder.buildSql(filterDimensions);
