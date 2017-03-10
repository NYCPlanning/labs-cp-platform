# Facilities Database
`facdb_facilities`
`facdb_datasources`
# Capital Projects

`cpdb_commitments`
`cpdb_budgets`
`cpdb_projects`
`cpdb_spending`
`cpdb_dcpattributes_poly`
`cpdb_dcpattributes_pts`

## Capital Projects Materialized Views
`cpdb_project_details`
`cpdb_map_poly`
`cpdb_summary_pts`
`cpdb_spending_grouped` - Checkbook NYC Transactions grouped on maprojectid, with first and last payment date, and sum of $ amounts.  See below
`cpdb_projecttypes_grouped` - projecttypes from `cpdb_budgets` grouped by maprojectid

# Housing Pipeline
`pipeline_projects`

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

## cpdb_map_pts
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
    d.*
  FROM cpdb_dcpattributes_pts a
  LEFT JOIN cpdb_projects b ON a.maprojid = b.maprojid
  LEFT JOIN cpdb_projecttypes_grouped c ON a.maprojid = c.maprojid
  LEFT JOIN cpdb_spending_grouped d ON a.maprojid = d.maprojid
);

GRANT SELECT on cpdb_map_pts to publicuser;
```

## cpdb_map_pts
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
    d.*
  FROM cpdb_dcpattributes_poly a
  LEFT JOIN cpdb_projects b ON a.maprojid = b.maprojid
  LEFT JOIN cpdb_projecttypes_grouped c ON a.maprojid = c.maprojid
  LEFT JOIN cpdb_spending_grouped d ON a.maprojid = d.maprojid
);

GRANT SELECT on cpdb_map_poly to publicuser;

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
DROP MATERIALIZED VIEW IF EXISTS cpdb_projecttypes_grouped;

CREATE MATERIALIZED VIEW cpdb_projecttypes_grouped AS (
  SELECT
    maprojid,
    array_agg(DISTINCT projecttype) AS projecttype
  FROM cpdb_budgets
  GROUP BY maprojid
)

```

# Updating cpdb_spending
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

CHANGE column type of issue_date to date

DELETE all records from cpdb_spending, INSERT from temporary table
```
INSERT INTO cpdb_spending (agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor)
SELECT agency, associated_prime_vendor,calendar_year, capital_project, check_amount, contract_id, contract_purpose, department, document_id, expense_category, fiscal_year,industry, issue_date, m_wbe_category, payee_name, spending_category, sub_contract_reference_id, sub_vendor FROM cpdb_spending_import
```
