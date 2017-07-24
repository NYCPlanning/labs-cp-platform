import $ from 'jquery';
import * as AT from '../constants/actionTypes';
import appConfig from '../helpers/appConfig';
import { browserHistory } from 'react-router';

const generateUrlString = (sql, format, filename = 'download') => encodeURI(
  `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v2/sql?skipfields=cartodb_id&q=${sql}&format=${format}&filename=${filename}`,
);

let uniqueId = 0;
let requestCache = [];

browserHistory.listen(() => {
  requestCache = [];
});

const cartoMiddleware = ({ getState, dispatch }) => next => (action) => {
  if (action.type !== AT.CARTO_REQUEST) {
    return next(action);
  }

  const { sql, requestFormat, nextType } = action.payload;

  const requestId = uniqueId++;
  requestCache.push(requestId);

  $.getJSON(generateUrlString(sql, requestFormat))
    .done((data) => {
      if (requestCache.indexOf(requestId) === -1) {
        return;
      }

      return requestFormat === 'geojson'
        ? dispatch({ type: nextType.SUCCESS, payload: data })
        : dispatch({ type: nextType.SUCCESS, payload: data.rows });
    })
    .fail(error => dispatch({ type: nextType.FAILURE, payload: error }));

  dispatch({ type: nextType.PENDING });
};

export default cartoMiddleware;
