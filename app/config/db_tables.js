const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_20apr',
    commitments: 'cpdb_commitments_20apr',
    projects: 'cpdb_projects_20apr',
    projects_combined: 'cpdb_projects_combined_20apr',
    adminbounds: 'cpdb_adminbounds_20apr',
    points: 'cpdb_dcpattributes_pts_20apr',
    polygons: 'cpdb_dcpattributes_poly_20apr',
  },
  cb_budget_requests: {
    points: 'cbbr_fy20_pts_v2',
    polygons: 'cbbr_fy20_poly_v2',
  },
  facdb: {
    datasources: 'facdb_datasources_v2019_12',
    facilities: 'facdb_v2019_12',
    pops: 'pops_v201912_1',
  },
  housingdevdb: 'devdb_housing_pts_20v1',
  sca: 'sca_capital_projects_v2019',
  support: {
    nta: 'nta_boundaries_v0',
    ih: 'inclusionary_housing_v201709',
    mih: 'mandatory_inclusionary_housing_v0',
    dcp_studyareas: 'support_dcp_studyareas',
    waterfront_pfirm15: 'floodplain_pfirm2015_v0',
    mta_subway_stops: 'mta_subway_stops_v0',
    mta_subway_routes: 'mta_subway_routes_v0',
    path_rail_stops: 'path_rail_stops_v0',
    path_rail_routes: 'path_rail_routes_v0',
    mta_bus_stops: 'mta_bus_stops_v0',
    commerical_overlays: 'commercial_overlays_v201710',
    zoning_districts: 'zoning_districts_v201710',
    bike_routes: 'support_trans_dot_bike_routes',
  },
};

export default db_tables;
