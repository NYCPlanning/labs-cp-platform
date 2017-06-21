import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

// Reducers
import modal from './reducers/modal';
import facilities from './reducers/facilities';
import pipeline from './reducers/pipeline';
import capitalProjects from './reducers/capitalProjects';
import capitalProjectsTable from './reducers/capitalProjectsTable';

// Middleware
import carto from './middleware/carto';
import agencyValues from './middleware/agencyValues';
import analytics from './middleware/analytics';

const middleware = [createLogger({ collapsed: true }), carto, agencyValues];

if (process.env.NODE_ENV === 'production') {
  middleware.push(analytics);
}

const store = createStore(
  combineReducers({
    modal,
    facilities,
    pipeline,
    capitalProjects,
    capitalProjectsTable,
  }),
  applyMiddleware(...middleware),
);

// if (process.env.NODE_ENV === 'development') {
window.store = store;
// }

export default store;
