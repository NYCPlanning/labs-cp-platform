const db_tables = {
  cpdb: {
    budgets: "cpdb_budgets_23executive",
    commitments: "cpdb_commitments_23executive",
    projects: "cpdb_projects_23executive",
    projects_combined: "cpdb_projects_combined_23executive",
    adminbounds: "cpdb_adminbounds_23executive",
    points: "cpdb_dcpattributes_pts_23executive",
    polygons: "cpdb_dcpattributes_poly_23executive",
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
  housingdevdb: "devdb_housing_pts_22q4",
  sca: "sca_capital_projects_v2019",
  support: {
    nta2020: "nta_boundaries",
    ih: "dcp_inclusionary_housing",
    mih: "dcp_mandatory_inclusionary_housing",
    dcp_studyareas: "support_dcp_studyareas",
    waterfront_pfirm15: "floodplain_pfirm2015",
    mta_subway_stops: "mta_subway_stops",
    mta_subway_routes: "mta_subway_routes",
    path_rail_stops: "path_rail_stops_v0",
    path_rail_routes: "path_rail_routes_v0",
    mta_bus_stops: "mta_bus_stops_v0",
    commerical_overlays: "dcp_commercial_overlays",
    zoning_districts: "dcp_zoning_districts",
    bike_routes: "bike_routes",
  },
};

export default db_tables;
