const appConfig = {

  auth0_client_id: '3bulG9YPLTsoujIHvFg91w04HNIODCu1',

  auth0_domain: 'cpmanage.auth0.com',

  mapbox_accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',

  otp_domain: 'otp.capitalplanning.nyc',

  carto_domain: 'carto.capitalplanning.nyc',

  carto_user: 'cpadmin',

  mapzen_api_key: 'mapzen-ZyMEp5H',

  api_domain: (process.env.NODE_ENV === 'production') ? 'api.capitalplanning.nyc' : 'localhost:3000',

};

module.exports = appConfig;
