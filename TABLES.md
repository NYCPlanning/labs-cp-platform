All production databases sit on `carto.planninglabs.nyc`.

# Facilities DB
`facdb_YYMMDD`

# Capital Projects DB
`cpdb_commitments_YYMMDD`
`cpdb_budgets_YYMMDD`
`cpdb_dcpattributes_poly_YYMMDD`
`cpdb_dcpattributes_pts_YYMMDD`
`cpdb_projects_YYMMDD`

# Housing Pipeline
`housingdevdb_YYMMDD`

# SCA Capital Projects
`cpdb_sca_pts_YYMMDD`

# Supporting Data
`support_water_pfirm15` - 2015 Preliminary Flood Insurance Risk Map
`support_trans_mta_bus_stops` - mta bus stops
`support_trans_mta_bus_routes` - mta bus routes
`support_trans_path_rail_stops` - path rail stops
`support_trans_path_rail_routes` - mta rail routes
`support_trans_dot_bike_routes` - dot bike lanes
`support_trans_mta_subway_stops` - mta subway stops
`support_trans_mta_subway_routes` - mta subway lines
`support_admin_ntaboundaries` - NTA boundaries from DCP

# View Definitions

-- Old --
`pipeline_projets_prod` - Materialized View with only those permits that will be included in the "total count" for the pipeline explorer.  Why?  `pipeline_projects` includes two statuses that we do not have filters for.


CREATE MATERIALIZED VIEW pipeline_projects_prod AS (
  SELECT * FROM pipeline_projects WHERE dcp_pipeline_status <> 'Application pre-filed' AND dcp_pipeline_status <> 'Disapproved or Suspended'
)

GRANT SELECT on pipeline_projects_prod to publicuser;

## cpdb_map_pts
Used to generate vector tile of point data. TODO this can be trimmed down to only include the data we need in the explorer, it is no longer used on detail pages

```
DROP VIEW IF EXISTS cpdb_map_pts;

CREATE VIEW cpdb_map_pts AS (
  SELECT
    a.the_geom,
    a.the_geom_webmercator,
    b.magencyacro,
    b.magency,
    b.magencyname,
    b.description,
    b.projectid,
    c.projecttype,
    c.sagencyacro,
    d.*
  FROM cpdb_dcpattributes_pts a
  LEFT JOIN cpdb_projects b ON a.maprojid = b.maprojid
  LEFT JOIN cpdb_projecttypes_grouped_1 c ON a.maprojid = c.maprojid
  LEFT JOIN cpdb_spending_grouped d ON a.maprojid = d.maprojid
);

GRANT SELECT on cpdb_map_pts to publicuser;
```

## cpdb_map_poly
Used to generate vector tile of polygon data. TODO this can be trimmed down to only include the data we need in the explorer, it is no longer used on detail pages

```
DROP VIEW IF EXISTS cpdb_map_poly;

CREATE VIEW cpdb_map_poly AS (
  SELECT
    a.the_geom,
    a.the_geom_webmercator,
    b.magencyacro,
    b.magency,
    b.magencyname,
    b.description,
    b.projectid,
    c.projecttype,
    c.sagencyacro,
    d.*
  FROM cpdb_dcpattributes_poly a
  LEFT JOIN cpdb_projects b ON a.maprojid = b.maprojid
  LEFT JOIN cpdb_projecttypes_grouped_1 c ON a.maprojid = c.maprojid
  LEFT JOIN cpdb_spending_grouped d ON a.maprojid = d.maprojid
);

GRANT SELECT on cpdb_map_poly to publicuser;

```

## cpdb_map_combined

Combined view that includes projects without spatial data.  This view is used by the capital projects detail pages AND the table view

```
DROP VIEW IF EXISTS cpdb_map_combined;

CREATE VIEW cpdb_map_combined AS (
  SELECT
  	b.magencyacro,
      b.magency,
      b.magencyname,
      b.description,
      b.projectid,
      b.citycost,
      b.noncitycost,
      b.totalcost,
      c.projecttype,
      c.sagencyacro,
      d.*,
      CASE
      	WHEN e.the_geom IS NOT NULL THEN e.the_geom
      	WHEN f.the_geom IS NOT NULL THEN f.the_geom
      	ELSE NULL
     	END as the_geom
  FROM cpdb_projects b
  LEFT JOIN cpdb_projecttypes_grouped_1 c ON b.maprojid = c.maprojid
  LEFT JOIN cpdb_spending_grouped d ON b.maprojid = d.maprojid
  LEFT JOIN cpdb_dcpattributes_pts e ON b.maprojid = e.maprojid
  LEFT JOIN cpdb_dcpattributes_poly f ON b.maprojid = f.maprojid
);

GRANT SELECT on cpdb_map_combined to publicuser;
```

## cpdb_spending_grouped
```
-- Group all spending by maprojid, get mindate, maxdate, totalcommitspend, totalcommit, totalspend for each
DROP MATERIALIZED VIEW IF EXISTS cpdb_spending_grouped;

CREATE MATERIALIZED VIEW cpdb_spending_grouped AS
SELECT  
  a.maprojid,
  min(a.date) mindate,
  max(a.date) maxdate,
  sum(a.commitspend) as totalcommitspend,
  sum(a.commit) as totalcommit,
  sum(a.spend) as totalspend
FROM (
SELECT TRIM(LEFT(capital_project,12)) as maprojid,
    issue_date as date,
    0 as commit,
    check_amount::double precision as spend,
    check_amount::double precision as commitspend
  FROM cpdb_spending
  UNION ALL
  SELECT maprojid,
    to_date(plancommdate,'YY-Mon') as date,
    totalcost as commit,
  0 as spend,
    totalcost as commitspend
  FROM cpdb_commitments
) a
GROUP BY a.maprojid
```

## cpdb_projecttypes_grouped
```
DROP MATERIALIZED VIEW IF EXISTS cpdb_projecttypes_grouped_1;

CREATE MATERIALIZED VIEW cpdb_projecttypes_grouped_1 AS (
  SELECT
    maprojid,
    array_agg(DISTINCT projecttype) AS projecttype,
    array_agg(DISTINCT sagencyacro) AS sagencyacro
  FROM cpdb_budgets
  GROUP BY maprojid
)

```


# Updating cpdb_spending

Spending data comes from checkbook nyc.  A bulk export must be requested (request capital contracts spending for all years), you will be notified via email when the file is ready to download.

When you get it, it will be a zip of two csvs.  These cannot be uploaded to carto as-is because one is too large, so chunking them into files with 200k rows each or so, zipping the chunks, and uploading separately works.  Then UNION ALL into `cpdb_spending`.

This is quite involved, and we should figure out a way to automate it.  I think the first step will always be painful because we can't get a bulk download from Checkbook NYC without some clicking.  It may be possible to do many API calls to get the whole dataset.

Upload chunks.  Be sure to turn off column type guessing
UNION ALL with this query, save as new table:
```
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM part1
UNION ALL
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM part2
UNION ALL
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM part3
UNION ALL
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM part4
UNION ALL
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM part5
UNION ALL
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM part6
```

CHANGE column type of issue_date to date, and check_amount to double precision.  Everything else can stay strings

DELETE all records from cpdb_spending, INSERT from temporary table
```
INSERT INTO cpdb_spending (agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor)
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM cpdb_spending_import
```
