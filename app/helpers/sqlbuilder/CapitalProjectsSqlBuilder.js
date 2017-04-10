/* eslint-disable class-methods-use-this */
import SqlBuilder from './SqlBuilder';

class FacilitiesSqlBuilder extends SqlBuilder {

  // chunker for "active years"
  capitalProjectsDateRange(dimension, filters) {
    const range = filters[dimension].values;
    return `NOT (maxdate <= to_date('${range[0] - 1}-07-01', 'YYYY-MM-DD') OR mindate >= to_date('${range[1]}-06-30', 'YYYY-MM-DD'))`;
  }

  // chunker for projecttype
  projectTypeMultiSelect(dimension, filters) {
    const values = filters[dimension].values;

    const checkedValues = values.filter(value => value.checked === true);
    const subChunks = checkedValues.map(value => `array_to_string(projecttype, ', ') like '%${value.value}%'`);

    if (subChunks.length > 0) { // don't set sqlChunks if nothing is selected
      const chunk = `(${subChunks.join(' OR ')})`;

      return chunk;
    }

    return 'FALSE'; // if no options are checked, make the resulting SQL return no rows
  }

}

Object.assign(FacilitiesSqlBuilder, SqlBuilder);

export default FacilitiesSqlBuilder;
