import dispatcher from '../dispatcher';

export default function filterChanged(filters) {
  dispatcher.dispatch({
    type: 'FILTER_CHANGED',
    filters,
  });
}
