// api.js - helper functions for the planning api

import appConfig from './appConfig';

const PlanningApi = {
  getCommitSpend(maprojid) {
    const maprojidTrimmed = maprojid.replace(/ /g, '');

    const apiCall = `//${appConfig.api_domain}/capitalprojects/commitspend/${maprojidTrimmed}`;
    return $.getJSON(apiCall); // eslint-disable-line no-undef
  },
};

export default PlanningApi;
