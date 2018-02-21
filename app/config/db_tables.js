const db_tables = {
  cpdb: {
    budgets: 'cpdb_budgets_201802_v1',
    commitments: 'cpdb_commitments_201802_v1',
    projects: 'cpdb_projects_201802_v1',
    projects_combined: 'cpdb_projects_combined_201802_v1',
    adminbounds: 'cpdb_adminbounds_201802_v1',
    points: 'cpdb_dcpattributes_pts_201802_v1',
    polygons: 'cpdb_dcpattributes_poly_201802_v1',
  },
  cb_budget_requests: {
    points: 'cbbr_fy18_pts_v5',
    polygons: 'cbbr_fy18_poly_v5',
  },
  facdb: {
    datasources: 'facdb_datasources_v201705',
    facilities: 'facdb_v201705',
    pops: 'pops_v201801',
  },
  housingdevdb: 'housingdev_v201709',
  sca: 'sca_pts_201702_v1',
};

export default db_tables;
