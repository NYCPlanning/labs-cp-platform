
let api_domain;

switch (process.env.NODE_ENV) {
  case 'production':
    api_domain = 'api.capitalplanning.nyc';
    break;
  case 'staging':
    api_domain = 'api-staging.capitalplanning.nyc';
    break;
  default:
    api_domain = 'localhost:3000';
}


const appConfig = {

  auth0_client_id: '3bulG9YPLTsoujIHvFg91w04HNIODCu1',

  auth0_domain: 'cpmanage.auth0.com',

  mapbox_accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',

  otp_domain: 'otp.capitalplanning.nyc',

  carto_domain: 'carto.capitalplanning.nyc',

  carto_user: 'cpadmin',

  mapzen_api_key: 'mapzen-ZyMEp5H',

  api_domain,

  // Using the getter syntax to access the object 'this'
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
  get mapInit() {
    return {
      mapbox_accessToken: this.mapbox_accessToken,
      center: [-74.0058, 40.7094],
      zoom: 13.62,
      minZoom: 9,
      maxZoom: null,
      pitch: 0,
      hash: true,
      navigationControlPosition: 'bottom-right',
    };
  },

  get searchConfig() {
    return {
      mapzen_api_key: this.mapzen_api_key,
      bounds: {
        minLon: -74.292297,
        maxLon: -73.618011,
        minLat: 40.477248,
        maxLat: 40.958123,
      },
    };
  },
};

module.exports = appConfig;
