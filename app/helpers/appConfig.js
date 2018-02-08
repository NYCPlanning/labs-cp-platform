
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
  carto_domain: 'planninglabs.carto.com',
  ga_tracking_code: 'UA-84250233-2',
  api_domain,

  // Using the getter syntax to access the object 'this'
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
  get mapboxGLOptions() {
    return {
      mapbox_accessToken: this.mapbox_accessToken,
      center: [-74.0807, 40.7128],
      zoom: 10,
      minZoom: 9,
      maxZoom: null,
      pitch: 0,
      hash: true,
      navigationControlPosition: 'bottom-right',
    };
  },
};

export default appConfig;
