  /* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';

class PipelineSqlBuilder extends SqlBuilder {

  cofoDateRange(dimension, filters) {
    const range = filters[dimension].values;

    const dateRangeFormatted = {
      from: moment(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    return `NOT (dob_cofo_date_first >= '${dateRangeFormatted.to}' OR dob_cofo_date_last <= '${dateRangeFormatted.from}')`;
  }

  // SQL WHERE partial builder for Checkboxes
  statusMultiSelect(dimension, filters) {
    const values = filters[dimension].values;
    // inject some additional values to handle the demolition use className
    // demolitions where permit is issued should also show up under searches for complete.
    const demolitionIsSelected = filters.dcp_permit_type.values.filter(d => d.value === 'Demolition').length > 0;
    const completeIsSelected = values.filter(d => d.value === 'Complete').length > 0;
    const permitIssuedIsSelected = values.filter(d => d.value === 'Permit issued').length > 0;

    const checkedValues = values.filter(value => value.checked === true);

    const subChunks = checkedValues.map(value => `${dimension} = '${value.value}'`);

    if (demolitionIsSelected && (completeIsSelected || permitIssuedIsSelected)) {
      subChunks.push('dcp_pipeline_status = \'Demolition (complete)\'');
    }

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;
      return chunk;
    }

    return 'FALSE'; // if no options are cheked, make the resulting SQL return no rows
  }
}

Object.assign(PipelineSqlBuilder, SqlBuilder);

export default PipelineSqlBuilder;
