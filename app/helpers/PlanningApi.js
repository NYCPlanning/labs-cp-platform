// api.js - helper functions for the planning api
import $ from 'jquery';

const PlanningApi = {
  getCapitalProjectExpenditures(maprojid) {
    const maprojidTrimmed = maprojid.replace(/ /g, '');

    const apiCall = `https://api.capitalplanning.nyc/api/spending/capitalprojects/${maprojidTrimmed}`;
    return $.getJSON(apiCall);
  },
};

export default PlanningApi;
