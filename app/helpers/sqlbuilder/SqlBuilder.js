// helper for building sql from filterDimensions
// buildSql() builds chunks of SQL WHERE clause text based on the filterDimension objects passed in
// this class includes handlers (chunkers) for various "default" filterDimension types, such as multiSelects, number ranges, and date ranges
// it can be extended if you have a custom filterDimension type

/* eslint-disable class-methods-use-this */

class SqlBuilder {
  constructor(columns, tablename) {
    this.columns = columns;
    this.tablename = tablename;
  }

  // creates a SQL statement from a filterDimensions object
  buildSql(filters) {
    const chunks = [];
    // iterate over all filters, building WHERE clause chunks for each
    Object.keys(filters).forEach((dimension) => {
      const filter = filters[dimension];

      // iterate over all enabled filterDimensions
      if (!filter.disabled) {
        if (filter.type === undefined) throw new Error(`filterDimension ${dimension} does not have a type property`);
        if (this[filter.type] === undefined) throw new Error(`Can't parse filterDimension of type '${filter.type}'`);

        const chunker = this[filter.type].bind(this);
        chunks.push(chunker(dimension, filters)); // pass the current dimension AND the entire filters object to each chunker
      }
    });

    // build the final sql string
    const sqlTemplate = `SELECT ${this.columns} FROM ${this.tablename} WHERE `;
    // if there are no chunks, use 'WHERE TRUE' to select all
    const chunksString = chunks.length > 0 ? chunks.join(' AND ') : 'TRUE';
    const sql = sqlTemplate + chunksString;

    return sql;
  }

  // generic chunker for Checkboxes and Multiselects
  multiSelect(dimension, filters) {
    const values = filters[dimension].values;

    const checkedValues = values.filter(value => value.checked === true);
    const subChunks = checkedValues.map(value => `${dimension} = '${value.value}'`);

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      return chunk;
    }

    return 'FALSE'; // if no options are checked, make the resulting SQL return no rows
  }

  // generic chunker for Date Range Sliders
  dateRange(dimension, filters) {
    const range = filters[dimension].values;

    const dateRangeFormatted = {
      from: moment(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
      to: moment(range[1], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
    };

    return `(dob_qdate >= '${dateRangeFormatted.from}' AND dob_qdate <= '${dateRangeFormatted.to}')`;
  }

  // generic chunker for number range sliders
  numberRange(dimension, filters) {
    const range = filters[dimension].values;
    return `(${dimension} >= '${range[0]}' AND ${dimension} <= '${range[1]}')`;
  }
}

export default SqlBuilder;
