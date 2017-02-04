# Facilities Database

# Capital Projects

`commitmentspoints` - Geocoded capital projects with points
`commitmentspolygons` - Geocoded capital projects with polygons

`commitscommitments` - Table of all committed amounts and time amount was committed. Includes `maprojid` (project ID) that points to one of `commitmentspolygons` or `commitmentspoints`.
`budgetcommitments` - Table of all budget line items for different projects. Includes `projecttype`, which a project can occasionally have more then one of.

`commitmentsnogeom` - All Capital Project commitments that have no geometry associated with them.
