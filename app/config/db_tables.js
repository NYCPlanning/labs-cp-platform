const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_21june',
    commitments: 'cpdb_commitments_21june',
    projects: 'cpdb_projects_21june',
    projects_combined: 'cpdb_projects_combined_21june',
    adminbounds: 'cpdb_adminbounds_21june',
    points: 'cpdb_dcpattributes_pts_21june',
    polygons: 'cpdb_dcpattributes_poly_21june',
  },
  cb_budget_requests: {
    points: 'cbbr_fy22_pts',
    polygons: 'cbbr_fy22_poly',
  },
  facdb: {
    datasources: 'facdb_datasources_v2019_12',
    facilities: 'facilities_production',
    pops: 'pops_production',
  },
  housingdevdb: 'devdb_housing_pts_20v2',
  sca: 'sca_capital_projects_v2019',
  support: {
    nta: 'nta_boundaries',
    ih: 'inclusionary_housing',
    mih: 'mandatory_inclusionary_housing',
    dcp_studyareas: 'support_dcp_studyareas',
    waterfront_pfirm15: 'floodplain_pfirm2015',
    mta_subway_stops: 'mta_subway_stops',
    mta_subway_routes: 'mta_subway_routes',
    path_rail_stops: 'path_rail_stops_v0',
    path_rail_routes: 'path_rail_routes_v0',
    mta_bus_stops: 'mta_bus_stops_v0',
    commerical_overlays: 'commercial_overlays',
    zoning_districts: 'zoning_districts',
    bike_routes: 'bike_routes',
  },
};

export default db_tables;
