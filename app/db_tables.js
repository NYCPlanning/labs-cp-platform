const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_18adoptedv1',
    commitments: 'cpdb_commitments_18adoptedv1',
    projects: 'cpdb_projects_18adoptedv1',
    projects_combined: 'cpdb_projects_combined_18adoptedv1',
    adminbounds: 'cpdb_adminbounds_18adoptedv2',
    points: 'cpdb_dcpattributes_pts_18adoptedv2',
    polygons: 'cpdb_dcpattributes_poly_18adoptedv2',
  },
  cb_budget_requests: {
    points: 'cbbr_submissions_pts_fy18v5',
    polygons: 'cbbr_submissions_poly_fy18v5',
  },
  facdb: {
    datasources: 'facdb_datasources_170522',
    facilities: 'facdb_170522',
    pops: 'pops_170920',
  },
  housingdevdb: 'housingdevdb_170906',
  sca: 'cpdb_sca_pts_170201',
};

export default db_tables;
