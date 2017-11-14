import * as AT from '../constants/actionTypes';
import { getSql, getPointsSql, getPolygonsSql } from '../helpers/sqlbuilder/CBBudgetRequestsSqlBuilder';

const initialState = {
  filterDimensions: {},
  sql: getSql({}),
  pointsSql: getPointsSql({}),
  polygonsSql: getPolygonsSql({}),
};

const cbBudgetRequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case AT.SET_CAPITAL_PROJECTS_FILTER_DIMENSION:
    //   const { filterDimension, values } = action.payload;
    //   const dimension = state.filterDimensions[filterDimension];
    //
    //   if (filterDimension === 'radiusfilter') {
    //     dimension.disabled = !values.coordinates.length;
    //   }
    //
    //   const shouldChangeDisabledValue = [
    //     'magencyacro',
    //     'sagencyacro',
    //     'projecttype',
    //     'censtract',
    //     'nta',
    //     'taz',
    //     'council',
    //     'firediv',
    //     'firebn',
    //     'fireconum',
    //     'municourt',
    //     'policeprecinct',
    //     'schooldistrict',
    //     'stateassemblydistrict',
    //     'statesenatedistrict',
    //     'congdist',
    //     'borocode',
    //     'commboard',
    //   ];
    //
    //   const newDisabledValue = shouldChangeDisabledValue.includes(filterDimension)
    //     ? values.filter(value => value.checked === true).length <= 0
    //     : dimension.disabled;
    //
    //   const filterDimensions = Object.assign({}, state.filterDimensions, {
    //     [filterDimension]: Object.assign({}, dimension, { values, disabled: newDisabledValue }),
    //   });
    //
    //   return Object.assign({}, state, {
    //     filterDimensions,
    //     sql: getSql(filterDimensions),
    //     pointsSql: getPointsSql(filterDimensions),
    //     polygonsSql: getPolygonsSql(filterDimensions),
    //   });

    default:
      return state;
  }
};

export default cbBudgetRequestsReducer;
