const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_201812_v1',
    commitments: 'cpdb_commitments_201812_v1',
    projects: 'cpdb_projects_201812_v1',
    projects_combined: 'cpdb_projects_combined_201812_v1',
    adminbounds: 'cpdb_adminbounds_201812_v1',
    points: 'cpdb_dcpattributes_pts_201812_v1',
    polygons: 'cpdb_dcpattributes_poly_201812_v1',
  },
  cb_budget_requests: {
    points: 'cbbr_fy19_pts_v1',
    polygons: 'cbbr_fy19_poly_v1',
  },
  facdb: {
    datasources: 'facdb_datasources_v201811',
    facilities: 'facdb_v201811',
    pops: 'pops_v201808',
  },
  housingdevdb: 'dobdev_jobs_20180316',
  sca: 'sca_pts_201807_v1',
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
