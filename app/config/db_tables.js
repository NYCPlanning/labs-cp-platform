const db_tables = {
  cpdb: {
    budgets: "cpdb_budgets_22adopted",
    commitments: "cpdb_commitments_22adopted",
    projects: "cpdb_projects_22adopted",
    projects_combined: "cpdb_projects_combined_22adopted",
    adminbounds: "cpdb_adminbounds_22adopted",
    points: "cpdb_dcpattributes_pts_22adopted",
    polygons: "cpdb_dcpattributes_poly_22adopted",
  },
  cb_budget_requests: {
    points: "cbbr_fy22_pts",
    polygons: "cbbr_fy22_poly",
  },
  facdb: {
    datasources: "facdb_datasources_v2019_12",
    facilities: "dcp_facilities",
    pops: "dcp_pops",
  },
  housingdevdb: "devdb_housing_pts_22q2",
  sca: "sca_capital_projects_v2019",
  support: {
    nta2020: "nta_boundaries",
    ih: "inclusionary_housing",
    mih: "mandatory_inclusionary_housing",
    dcp_studyareas: "support_dcp_studyareas",
    waterfront_pfirm15: "floodplain_pfirm2015",
    mta_subway_stops: "mta_subway_stops",
    mta_subway_routes: "mta_subway_routes",
    path_rail_stops: "path_rail_stops_v0",
    path_rail_routes: "path_rail_routes_v0",
    mta_bus_stops: "mta_bus_stops_v0",
    commerical_overlays: "commercial_overlays",
    zoning_districts: "zoning_districts",
    bike_routes: "bike_routes",
  },
};

export default db_tables;
