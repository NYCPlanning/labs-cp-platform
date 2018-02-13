/*
  Total Counts
  - CP Table
  - CP Map
  - Facilities
  - Housing
  - Housing Raw
  - CBBR
*/

const fs = require('fs');
const request = require('request');
const db_tables = require('../app/db_tables').default;
const appConfig = require('../app/helpers/appConfig').default;

const sql = {
  cpMapped: `SELECT COUNT(a.*) FROM (SELECT * FROM ${db_tables.cpdb.points} UNION SELECT * FROM ${db_tables.cpdb.polygons}) a`,
  cpAll: `SELECT COUNT(*) FROM ${db_tables.cpdb.projects_combined}`,
  facilities: `SELECT COUNT(*) FROM ${db_tables.facdb.facilities}`,
  housing: `SELECT COUNT(*)
  FROM ${db_tables.housingdevdb}
  WHERE
    the_geom IS NOT NULL
    AND
    u_net IS NOT NULL
    AND
    (
      dcp_status = 'Complete'
      OR dcp_status = 'Partial complete'
      OR dcp_status = 'Permit issued'
      OR dcp_status = 'Application filed'
      OR dcp_status = 'Complete (demolition)'
    )
    AND
    (
      dcp_dev_category = 'New Building'
      OR dcp_dev_category = 'Alteration'
      OR dcp_dev_category = 'Demolition'
    )
    AND
    (
      dcp_occ_category = 'Residential'
      OR dcp_occ_category = 'Other Accommodations'
    )
    AND x_outlier <> 'true'
    AND x_dup_flag = ''`,
  housingRaw: `SELECT COUNT(*) FROM ${db_tables.housingdevdb}`,
  cbbr: `SELECT COUNT(a.*) FROM (SELECT * FROM ${db_tables.cb_budget_requests.points} UNION SELECT * FROM ${db_tables.cb_budget_requests.polygons}) a`,
};

const urlString = (s) => {
  const apiString = `https://${appConfig.carto_domain}/api/v2/sql?q=${s}`;
  return encodeURI(apiString);
};

const keys = ['cpMapped', 'cpAll', 'facilities', 'housing', 'housingRaw', 'cbbr'];
const exportObject = {};

const requests = keys.map((key) => {
  return new Promise((resolve) => {
    request(urlString(sql[key]), (error, response, body) => {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log(key, JSON.parse(body).rows[0].count); // Print the HTML for the Google homepage.
      exportObject[key] = JSON.parse(body).rows[0].count;
      resolve();
    });
  });
});

Promise.all(requests).then(() => {
  fs.writeFile('./app/totalcounts.json', JSON.stringify(exportObject), () => {
    console.log('Total Counts JSON file successfully created');
  });
});
