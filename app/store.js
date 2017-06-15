import { createStore, applyMiddleware, combineReducers } from 'redux';

// Reducers
import facilities from './reducers/facilities';
import capitalProjects from './reducers/capitalProjects';
import capitalProjectsTable from './reducers/capitalProjectsTable';

// Middleware
import carto from './middleware/carto';
import agencyValues from './middleware/agencyValues';
import analytics from './middleware/analytics';

const middleware = [carto, agencyValues];

if (process.env.NODE_ENV === 'production') {
  middleware.push(analytics);
}

const store = createStore(
  combineReducers({
    facilities,
    capitalProjects,
    capitalProjectsTable
  }),
  applyMiddleware(...middleware)
);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
