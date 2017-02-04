// api.js - helper functions for the planning api
import $ from 'jquery';

import appConfig from './appConfig';

const PlanningApi = {
  getCommitSpend(maprojid) {
    const maprojidTrimmed = maprojid.replace(/ /g, '');

    const apiCall = `//${appConfig.api_domain}/api/capitalprojects/commitspend/${maprojidTrimmed}`;
    return $.getJSON(apiCall);
  },
};

export default PlanningApi;

