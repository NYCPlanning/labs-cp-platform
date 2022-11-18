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
const db_tables = require('../app/config/db_tables').default;
const appConfig = require('../app/config/appConfig').default;

const sql = {
  cpMapped: `SELECT COUNT(a.*) FROM (SELECT * FROM ${db_tables.cpdb.points} UNION SELECT * FROM ${db_tables.cpdb.polygons}) a`,
  cpAll: `SELECT COUNT(*) FROM ${db_tables.cpdb.projects_combined}`,
  facilities: `SELECT COUNT(*) FROM ${db_tables.facdb.facilities}`,
  housing: `SELECT COUNT(*)
  FROM ${db_tables.housingdevdb}
  WHERE  ( job_status = '5. Completed Construction'
            OR job_status = '3. Permitted for Construction'
            OR job_status = '2. Approved Application'
            OR job_status = '1. Filed Application' )
          AND ( job_type = 'New Building'
                OR job_type = 'Alteration'
                OR job_type = 'Demolition' )
          AND ( classanet >= '-800'
                AND classanet <= '1800' )
          AND ( ( datecomplt >= '2010-01-01'
                  AND datecomplt <= '2022-07-31' )
                OR datecomplt IS NULL )
          AND ( ( datepermit >= '2000-01-01'
                  AND datepermit <= '2022-07-31' )
                OR datepermit IS NULL )
          AND job_inactv IS NULL`,
  housingRaw: `SELECT COUNT(*) FROM ${db_tables.housingdevdb}`,
  cbbr: `SELECT COUNT(a.*) FROM (SELECT * FROM ${db_tables.cb_budget_requests.points} UNION SELECT * FROM ${db_tables.cb_budget_requests.polygons}) a`,
  cpdbTotalCommitMin: `SELECT min(totalcommit) FROM ${db_tables.cpdb.projects_combined}`,
  cpdbTotalCommitMax: `SELECT max(totalcommit) FROM ${db_tables.cpdb.projects_combined}`,
  cpdbSpentToDateMax: `SELECT max(totalspend) FROM ${db_tables.cpdb.projects_combined}`,
};

const urlString = (s) => {
  const apiString = `https://${appConfig.carto_domain}/api/v2/sql?q=${s}`;
  return encodeURI(apiString);
};

const keys = [
  'cpMapped',
  'cpAll',
  'facilities',
  'housing',
  'housingRaw',
  'cbbr',
  'cpdbTotalCommitMin',
  'cpdbTotalCommitMax',
  'cpdbSpentToDateMax',
];
const results = {};

const requests = keys.map((key) => {
  return new Promise((resolve) => {
    request(urlString(sql[key]), (error, response, body) => {
      results[key] = JSON.parse(body).rows[0];
      resolve();
    });
  });
});

const roundUp = (number) => {
  const precision = -(parseInt(number).toString().length - 2);
  const factor = 10 ** precision;
  return Math.ceil(number * factor) / factor;
};

const roundDown = (number) => {
  const precision = -(parseInt(number).toString().length - 2);
  const factor = 10 ** precision;
  return Math.floor(number * factor) / factor;
};

Promise.all(requests).then(() => {
  const jsonfile = {
    cpMapped: results.cpMapped.count,
    cpAll: results.cpAll.count,
    facilities: results.facilities.count,
    housing: results.housing.count,
    housingRaw: results.housingRaw.count,
    cbbr: results.cbbr.count,
    cpdbTotalCommitMin: roundDown(results.cpdbTotalCommitMin.min),
    cpdbTotalCommitMax: roundUp(results.cpdbTotalCommitMax.max),
    cpdbSpentToDateMax: roundUp(results.cpdbSpentToDateMax.max),
  };

  fs.writeFile('./app/config/totalcounts.json', JSON.stringify(jsonfile), () => {
    console.log('Total Counts JSON file successfully created');
  });
});
