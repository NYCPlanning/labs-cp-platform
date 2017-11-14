import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

// Reducers
import currentUser from './reducers/currentUser';
import modal from './reducers/modal';
import facilities from './reducers/facilities';
import facilitiesCP from './reducers/facilitiesCP';
import pipeline from './reducers/pipeline';
import housingDevelopment from './reducers/housingDevelopment';
import capitalProjects from './reducers/capitalProjects';
import capitalProjectsTable from './reducers/capitalProjectsTable';
import cbBudgetRequests from './reducers/cbBudgetRequests';

// Middleware
import auth from './middleware/auth';
import carto from './middleware/carto';
import agencyValues from './middleware/agencyValues';
import analytics from './middleware/analytics';

const middleware = [createLogger({ collapsed: true }), carto, agencyValues, auth];

if (process.env.NODE_ENV === 'production') {
  middleware.push(analytics);
}

const store = createStore(
  combineReducers({
    currentUser,
    modal,
    facilities,
    facilitiesCP,
    pipeline,
    housingDevelopment,
    capitalProjects,
    capitalProjectsTable,
    cbBudgetRequests,
  }),
  applyMiddleware(...middleware),
);

// if (process.env.NODE_ENV === 'development') {
// Why? This should be removed
window.store = store;
// }

export default store;
