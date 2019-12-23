const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_19nov',
    commitments: 'cpdb_commitments_19nov',
    projects: 'cpdb_projects_19nov',
    projects_combined: 'cpdb_projects_combined_19nov',
    adminbounds: 'cpdb_adminbounds_19nov',
    points: 'cpdb_dcpattributes_pts_19nov',
    polygons: 'cpdb_dcpattributes_poly_19nov',
  },
  cb_budget_requests: {
    points: 'cbbr_fy19_pts_v1',
    polygons: 'cbbr_fy19_poly_v1',
  },
  facdb: {
    datasources: 'facdb_datasources_v2019_12',
    facilities: 'facdb_v2019_12',
    pops: 'pops_v201912_1',
  },
  housingdevdb: 'devdb_housing_pts_19v3',
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
