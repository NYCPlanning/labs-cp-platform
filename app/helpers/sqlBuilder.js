// helper for building sql from filterDimensions

class SqlBuilder {
  constructor(columns, tablename) {
    this.columns = columns;
    this.tablename = tablename;
  }

  // creates a SQL statement from a filterDimensions object
  buildSql(filterDimensions) {
    this.filterDimensions = filterDimensions;
    this.sqlChunks = {}; // clear sql chunks

    Object.keys(this.filterDimensions).forEach((key) => {
      const dimension = this.filterDimensions[key];

      if (!dimension.disabled) {
        if (dimension.type === 'multiSelect') this.getMultiSelectChunk(key);
        if (dimension.type === 'numberRange') this.getNumberRangeChunk(key);
        if (dimension.type === 'dateRange') this.getDateRangeChunk(key);
      }
    });

    const sqlTemplate = `SELECT ${this.columns} FROM ${this.tablename} WHERE `;

    const chunksArray = [];

    // convert chunks object to array
    Object.keys(this.sqlChunks).forEach(key => chunksArray.push(this.sqlChunks[key]));

    const chunksString = chunksArray.join(' AND ');

    const sql = sqlTemplate + chunksString;

    console.log(sql);
    return sql;
  }

  // SQL WHERE partial builder for Checkboxes
  getMultiSelectChunk(dimension) {
    const values = this.filterDimensions[dimension].values;
    // inject some additional values to handle the demolition use className
    // demolitions where permit is issued should also show up under searches for complete.
    const demolitionIsSelected = this.filterDimensions.dcp_permit_type.values.filter(d => d.value === 'Demolition').length > 0;
    const completeIsSelected = values.filter(d => d.value === 'Complete').length > 0;
    const permitIssuedIsSelected = values.filter(d => d.value === 'Permit issued').length > 0;

    const checkedValues = values.filter(value => value.checked === true);

    const subChunks = checkedValues.map(value => `${dimension} = '${value.value}'`);

    if (dimension === 'dcp_pipeline_status' && demolitionIsSelected && (completeIsSelected || permitIssuedIsSelected)) {
      subChunks.push('dcp_pipeline_status = \'Demolition (complete)\'');
    }

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      this.sqlChunks[dimension] = chunk;
    } else {
      this.sqlChunks[dimension] = 'FALSE'; // if no options are cheked, make the resulting SQL return no rows
    }
  }

  // SQL WHERE partial builder for Date Range Sliders
  getDateRangeChunk(dimension) {
    const range = this.filterDimensions[dimension].values;

    const dateRangeFormatted = {
      from: moment(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    if (dimension === 'dob_cofo_date') {
      this.sqlChunks[dimension] = `NOT (dob_cofo_date_first >= '${dateRangeFormatted.to}' OR dob_cofo_date_last <= '${dateRangeFormatted.from}')`;
    }

    if (dimension === 'dob_qdate') {
      this.sqlChunks[dimension] = `(dob_qdate >= '${dateRangeFormatted.from}' AND dob_qdate <= '${dateRangeFormatted.to}')`;
    }
  }
  
  getNumberRangeChunk(dimension) {
    const range = this.filterDimensions[dimension].values;
    this.sqlChunks[dimension] = `(${dimension} >= '${range[0]}' AND ${dimension} <= '${range[1]}')`;
  }
}

export default SqlBuilder;
