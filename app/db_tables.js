const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_201802v1',
    commitments: 'cpdb_commitments_201802v1',
    projects: 'cpdb_projects_201802v1',
    projects_combined: 'cpdb_projects_combined_201802v1',
    adminbounds: 'cpdb_adminbounds_201802v1',
    points: 'cpdb_dcpattributes_pts_201802v1',
    polygons: 'cpdb_dcpattributes_poly_201802v1',
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
