const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_18adoptedv1',
    commitments: 'cpdb_commitments_18adoptedv1',
    projects: 'cpdb_projects_18adoptedv1',
    projects_combined: 'cpdb_projects_combined_18adoptedv1',
    adminbounds: 'cpdb_adminbounds_18adoptedv1',
    points: 'cpdb_dcpattributes_pts_18adoptedv1',
    polygons: 'cpdb_dcpattributes_poly_18adoptedv1',
  },
  cb_budget_requests: {
    points: 'cbbr_submissions_pts_fy18v2',
    polygons: 'cbbr_submissions_poly_fy18v2',
  },
  facdb: {
    datasources: 'facdb_datasources_170522',
    facilities: 'facdb_170522',
  },
  housingdevdb: 'housingdevdb_170906',
};

export default db_tables;
