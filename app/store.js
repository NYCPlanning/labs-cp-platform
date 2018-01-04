import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

// Reducers
import currentUser from './reducers/currentUser';
import modal from './reducers/modal';
import facilities from './reducers/facilities';
import housingDevelopment from './reducers/housingDevelopment';
import capitalProjects from './reducers/capitalProjects';
import capitalProjectsTable from './reducers/capitalProjectsTable';
import cbBudgetRequests from './reducers/cbBudgetRequests';
import selected from './reducers/selected';

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
    housingDevelopment,
    capitalProjects,
    capitalProjectsTable,
    cbBudgetRequests,
    selected,
  }),
  applyMiddleware(...middleware),
);

// if (process.env.NODE_ENV === 'development') {
// Why? This should be removed
window.store = store;
// }

export default store;
