// do an API call for all facilities ids, compose a sitemap.txt file with one url per line

const fs = require('fs');
const request = require('request');
const appConfig = require('../app/helpers/appConfig');

const sql = 'SELECT uid FROM facdb_facilities';
const apiCall = `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v2/sql?q=${sql}&format=json`;

const sitemap = fs.createWriteStream('../public/sitemap.txt');

request(apiCall, (err, response, body) => {
  const data = JSON.parse(body);
  const uids = data.rows;
  uids.forEach((uid) => {
    sitemap.write(`https://capitalplanning.nyc.gov/facility/${uid.uid}\n`);
  });
});
