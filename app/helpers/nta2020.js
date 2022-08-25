// nta2020.js - helper methods for Neighborhood Tabulation Areas
// use getNtaName(ntacode) to get an NTA neighborhood name for a given ntacode

const ntas = [
  {
    ntacode: "BK0104",
    ntaname: "East Williamsburg"
  },
  {
    ntacode: "BK0504",
    ntaname: "Spring Creek-Starrett City"
  },
  {
    ntacode: "BK0601",
    ntaname: "Carroll Gardens-Cobble Hill-Gowanus-Red Hook"
  },
  {
    ntacode: "BK0702",
    ntaname: "Sunset Park (West)"
  },
  {
    ntacode: "BK1302",
    ntaname: "Coney Island-Sea Gate"
  },
  {
    ntacode: "BK1771",
    ntaname: "Holy Cross Cemetery"
  },
  {
    ntacode: "BK1802",
    ntaname: "Marine Park-Mill Basin-Bergen Beach"
  },
  {
    ntacode: "BX1003",
    ntaname: "Pelham Bay-Country Club-City Island"
  },
  {
    ntacode: "BX2891",
    ntaname: "Pelham Bay Park"
  },
  {
    ntacode: "MN0191",
    ntaname: "The Battery-Governors Island-Ellis Island-Liberty Island"
  },
  {
    ntacode: "MN1001",
    ntaname: "Harlem (South)"
  },
  {
    ntacode: "MN1203",
    ntaname: "Inwood"
  },
  {
    ntacode: "MN1292",
    ntaname: "Inwood Hill Park"
  },
  {
    ntacode: "QN0101",
    ntaname: "Astoria (North)-Ditmars-Steinway"
  },
  {
    ntacode: "QN0201",
    ntaname: "Long Island City-Hunters Point"
  },
  {
    ntacode: "QN0501",
    ntaname: "Maspeth"
  },
  {
    ntacode: "QN0701",
    ntaname: "College Point"
  },
  {
    ntacode: "QN0702",
    ntaname: "Whitestone-Beechhurst"
  },
  {
    ntacode: "SI0107",
    ntaname: "Mariner's Harbor-Arlington-Graniteville"
  },
  {
    ntacode: "SI0203",
    ntaname: "Todt Hill-Emerson Hill-Lighthouse Hill-Manor Heights"
  },
  {
    ntacode: "SI0204",
    ntaname: "New Springville-Willowbrook-Bulls Head-Travis"
  },
  {
    ntacode: "SI0302",
    ntaname: "Great Kills-Eltingville"
  },
  {
    ntacode: "BK1201",
    ntaname: "Sunset Park (East)-Borough Park (West)"
  },
  {
    ntacode: "SI9593",
    ntaname: "Great Kills Park"
  },
  {
    ntacode: "BK0771",
    ntaname: "Green-Wood Cemetery"
  },
  {
    ntacode: "BK0901",
    ntaname: "Crown Heights (South)"
  },
  {
    ntacode: "BK1061",
    ntaname: "Fort Hamilton"
  },
  {
    ntacode: "BK1091",
    ntaname: "Dyker Beach Park"
  },
  {
    ntacode: "BK1503",
    ntaname: "Sheepshead Bay-Manhattan Beach-Gerritsen Beach"
  },
  {
    ntacode: "BK1701",
    ntaname: "East Flatbush-Erasmus"
  },
  {
    ntacode: "MN0101",
    ntaname: "Financial District-Battery Park City"
  },
  {
    ntacode: "MN0502",
    ntaname: "Midtown-Times Square"
  },
  {
    ntacode: "QN0571",
    ntaname: "Mount Olivet & All Faiths Cemeteries"
  },
  {
    ntacode: "QN0705",
    ntaname: "East Flushing"
  },
  {
    ntacode: "QN1002",
    ntaname: "Ozone Park"
  },
  {
    ntacode: "QN1204",
    ntaname: "Springfield Gardens (North)-Rochdale Village"
  },
  {
    ntacode: "QN1206",
    ntaname: "Hollis"
  },
  {
    ntacode: "QN8491",
    ntaname: "Jamaica Bay (East)"
  },
  {
    ntacode: "QN8492",
    ntaname: "Jacob Riis Park-Fort Tilden-Breezy Point Tip"
  },
  {
    ntacode: "SI0305",
    ntaname: "Tottenville-Charleston"
  },
  {
    ntacode: "SI0391",
    ntaname: "Freshkills Park (South)"
  },
  {
    ntacode: "BK0471",
    ntaname: "The Evergreens Cemetery"
  },
  {
    ntacode: "BK0503",
    ntaname: "East New York-New Lots"
  },
  {
    ntacode: "BK0571",
    ntaname: "Highland Park-Cypress Hills Cemeteries (South)"
  },
  {
    ntacode: "BK0891",
    ntaname: "Lincoln Terrace Park"
  },
  {
    ntacode: "BK0902",
    ntaname: "Prospect Lefferts Gardens-Wingate"
  },
  {
    ntacode: "BK1502",
    ntaname: "Madison"
  },
  {
    ntacode: "BK1803",
    ntaname: "Canarsie"
  },
  {
    ntacode: "BK1891",
    ntaname: "Marine Park-Plumb Island"
  },
  {
    ntacode: "BK1892",
    ntaname: "McGuire Fields"
  },
  {
    ntacode: "BK5691",
    ntaname: "Barren Island-Floyd Bennett Field"
  },
  {
    ntacode: "BK5692",
    ntaname: "Jamaica Bay (West)"
  },
  {
    ntacode: "BK5693",
    ntaname: "Shirley Chisholm State Park"
  },
  {
    ntacode: "BX0602",
    ntaname: "Tremont"
  },
  {
    ntacode: "BX0603",
    ntaname: "Belmont"
  },
  {
    ntacode: "BX0801",
    ntaname: "Kingsbridge Heights-Van Cortlandt Village"
  },
  {
    ntacode: "BX1002",
    ntaname: "Throgs Neck-Schuylerville"
  },
  {
    ntacode: "MN0604",
    ntaname: "East Midtown-Turtle Bay"
  },
  {
    ntacode: "BX1004",
    ntaname: "Co-op City"
  },
  {
    ntacode: "BX1161",
    ntaname: "Hutchinson Metro Center"
  },
  {
    ntacode: "BX1271",
    ntaname: "Woodlawn Cemetery"
  },
  {
    ntacode: "MN0202",
    ntaname: "Greenwich Village"
  },
  {
    ntacode: "MN0303",
    ntaname: "East Village"
  },
  {
    ntacode: "MN0501",
    ntaname: "Midtown South-Flatiron-Union Square"
  },
  {
    ntacode: "MN0601",
    ntaname: "Stuyvesant Town-Peter Cooper Village"
  },
  {
    ntacode: "MN0702",
    ntaname: "Upper West Side (Central)"
  },
  {
    ntacode: "MN0802",
    ntaname: "Upper East Side-Carnegie Hill"
  },
  {
    ntacode: "MN0903",
    ntaname: "Hamilton Heights-Sugar Hill"
  },
  {
    ntacode: "BK0103",
    ntaname: "South Williamsburg"
  },
  {
    ntacode: "MN1101",
    ntaname: "East Harlem (South)"
  },
  {
    ntacode: "MN1191",
    ntaname: "Randall's Island"
  },
  {
    ntacode: "QN0105",
    ntaname: "Queensbridge-Ravenswood-Dutch Kills"
  },
  {
    ntacode: "QN0161",
    ntaname: "Sunnyside Yards (North)"
  },
  {
    ntacode: "QN0171",
    ntaname: "St. Michael's Cemetery"
  },
  {
    ntacode: "QN0191",
    ntaname: "Astoria Park"
  },
  {
    ntacode: "QN0572",
    ntaname: "Middle Village Cemetery"
  },
  {
    ntacode: "QN0573",
    ntaname: "St. John Cemetery"
  },
  {
    ntacode: "QN0704",
    ntaname: "Murray Hill-Broadway Flushing"
  },
  {
    ntacode: "QN0871",
    ntaname: "Mount Hebron & Cedar Grove Cemeteries"
  },
  {
    ntacode: "QN1003",
    ntaname: "Howard Beach-Lindenwood"
  },
  {
    ntacode: "QN1091",
    ntaname: "Spring Creek Park"
  },
  {
    ntacode: "QN1103",
    ntaname: "Douglaston-Little Neck"
  },
  {
    ntacode: "BK0201",
    ntaname: "Brooklyn Heights"
  },
  {
    ntacode: "QN1104",
    ntaname: "Oakland Gardens-Hollis Hills"
  },
  {
    ntacode: "QN1191",
    ntaname: "Alley Pond Park"
  },
  {
    ntacode: "QN1307",
    ntaname: "Rosedale"
  },
  {
    ntacode: "QN1371",
    ntaname: "Montefiore Cemetery"
  },
  {
    ntacode: "QN1401",
    ntaname: "Far Rockaway-Bayswater"
  },
  {
    ntacode: "QN1402",
    ntaname: "Rockaway Beach-Arverne-Edgemere"
  },
  {
    ntacode: "QN1403",
    ntaname: "Breezy Point-Belle Harbor-Rockaway Park-Broad Channel"
  },
  {
    ntacode: "QN1491",
    ntaname: "Rockaway Community Park"
  },
  {
    ntacode: "QN8081",
    ntaname: "LaGuardia Airport"
  },
  {
    ntacode: "QN8191",
    ntaname: "Flushing Meadows-Corona Park"
  },
  {
    ntacode: "QN8381",
    ntaname: "John F. Kennedy International Airport"
  },
  {
    ntacode: "BK0204",
    ntaname: "Clinton Hill"
  },
  {
    ntacode: "SI0102",
    ntaname: "Tompkinsville-Stapleton-Clifton-Fox Hills"
  },
  {
    ntacode: "SI0291",
    ntaname: "Freshkills Park (North)"
  },
  {
    ntacode: "SI0304",
    ntaname: "Annadale-Huguenot-Prince's Bay-Woodrow"
  },
  {
    ntacode: "BK0102",
    ntaname: "Williamsburg"
  },
  {
    ntacode: "BK0703",
    ntaname: "Sunset Park (Central)"
  },
  {
    ntacode: "BK0802",
    ntaname: "Crown Heights (North)"
  },
  {
    ntacode: "BK0101",
    ntaname: "Greenpoint"
  },
  {
    ntacode: "BK0202",
    ntaname: "Downtown Brooklyn-DUMBO-Boerum Hill"
  },
  {
    ntacode: "BK0203",
    ntaname: "Fort Greene"
  },
  {
    ntacode: "BK0261",
    ntaname: "Brooklyn Navy Yard"
  },
  {
    ntacode: "BK0301",
    ntaname: "Bedford-Stuyvesant (West)"
  },
  {
    ntacode: "BK0801",
    ntaname: "Prospect Heights"
  },
  {
    ntacode: "BK0302",
    ntaname: "Bedford-Stuyvesant (East)"
  },
  {
    ntacode: "BK0401",
    ntaname: "Bushwick (West)"
  },
  {
    ntacode: "BK0402",
    ntaname: "Bushwick (East)"
  },
  {
    ntacode: "BK0501",
    ntaname: "Cypress Hills"
  },
  {
    ntacode: "BK0502",
    ntaname: "East New York (North)"
  },
  {
    ntacode: "BK0701",
    ntaname: "Windsor Terrace-South Slope"
  },
  {
    ntacode: "BK0505",
    ntaname: "East New York-City Line"
  },
  {
    ntacode: "BK0602",
    ntaname: "Park Slope"
  },
  {
    ntacode: "BK1001",
    ntaname: "Bay Ridge"
  },
  {
    ntacode: "BK1002",
    ntaname: "Dyker Heights"
  },
  {
    ntacode: "BK1101",
    ntaname: "Bensonhurst"
  },
  {
    ntacode: "BK1102",
    ntaname: "Bath Beach"
  },
  {
    ntacode: "BK1103",
    ntaname: "Gravesend (West)"
  },
  {
    ntacode: "BK1202",
    ntaname: "Borough Park"
  },
  {
    ntacode: "BK1203",
    ntaname: "Kensington"
  },
  {
    ntacode: "BK1204",
    ntaname: "Mapleton-Midwood (West)"
  },
  {
    ntacode: "BK1391",
    ntaname: "Calvert Vaux Park"
  },
  {
    ntacode: "BK1301",
    ntaname: "Gravesend (South)"
  },
  {
    ntacode: "BK1303",
    ntaname: "Brighton Beach"
  },
  {
    ntacode: "BK1401",
    ntaname: "Flatbush"
  },
  {
    ntacode: "BK1402",
    ntaname: "Flatbush (West)-Ditmas Park-Parkville"
  },
  {
    ntacode: "BK1403",
    ntaname: "Midwood"
  },
  {
    ntacode: "BK1501",
    ntaname: "Gravesend (East)-Homecrest"
  },
  {
    ntacode: "BK1702",
    ntaname: "East Flatbush-Farragut"
  },
  {
    ntacode: "BK1601",
    ntaname: "Ocean Hill"
  },
  {
    ntacode: "BK1602",
    ntaname: "Brownsville"
  },
  {
    ntacode: "BK1703",
    ntaname: "East Flatbush-Rugby"
  },
  {
    ntacode: "BK1704",
    ntaname: "East Flatbush-Remsen Village"
  },
  {
    ntacode: "BK1801",
    ntaname: "Flatlands"
  },
  {
    ntacode: "BK1893",
    ntaname: "Canarsie Park & Pier"
  },
  {
    ntacode: "BK5591",
    ntaname: "Prospect Park"
  },
  {
    ntacode: "BX0202",
    ntaname: "Longwood"
  },
  {
    ntacode: "BX0291",
    ntaname: "North & South Brother Islands"
  },
  {
    ntacode: "BX0101",
    ntaname: "Mott Haven-Port Morris"
  },
  {
    ntacode: "BX0102",
    ntaname: "Melrose"
  },
  {
    ntacode: "BX0201",
    ntaname: "Hunts Point"
  },
  {
    ntacode: "BX0301",
    ntaname: "Morrisania"
  },
  {
    ntacode: "BX0302",
    ntaname: "Claremont Village-Claremont (East)"
  },
  {
    ntacode: "BX0492",
    ntaname: "Claremont Park"
  },
  {
    ntacode: "BX1103",
    ntaname: "Pelham Gardens"
  },
  {
    ntacode: "BX0303",
    ntaname: "Crotona Park East"
  },
  {
    ntacode: "BX0391",
    ntaname: "Crotona Park"
  },
  {
    ntacode: "BX0401",
    ntaname: "Concourse-Concourse Village"
  },
  {
    ntacode: "BX0402",
    ntaname: "Highbridge"
  },
  {
    ntacode: "BX0403",
    ntaname: "Mount Eden-Claremont (West)"
  },
  {
    ntacode: "BX0491",
    ntaname: "Yankee Stadium-Macombs Dam Park"
  },
  {
    ntacode: "BX0501",
    ntaname: "University Heights (South)-Morris Heights"
  },
  {
    ntacode: "BX0502",
    ntaname: "Mount Hope"
  },
  {
    ntacode: "BX0503",
    ntaname: "Fordham Heights"
  },
  {
    ntacode: "BX0991",
    ntaname: "Soundview Park"
  },
  {
    ntacode: "BX0601",
    ntaname: "West Farms"
  },
  {
    ntacode: "BX0701",
    ntaname: "University Heights (North)-Fordham"
  },
  {
    ntacode: "BX0702",
    ntaname: "Bedford Park"
  },
  {
    ntacode: "BX0703",
    ntaname: "Norwood"
  },
  {
    ntacode: "QN0905",
    ntaname: "Woodhaven"
  },
  {
    ntacode: "BX0802",
    ntaname: "Kingsbridge-Marble Hill"
  },
  {
    ntacode: "BX1102",
    ntaname: "Morris Park"
  },
  {
    ntacode: "BX0803",
    ntaname: "Riverdale-Spuyten Duyvil"
  },
  {
    ntacode: "BX0901",
    ntaname: "Soundview-Bruckner-Bronx River"
  },
  {
    ntacode: "BX0902",
    ntaname: "Soundview-Clason Point"
  },
  {
    ntacode: "BX0903",
    ntaname: "Castle Hill-Unionport"
  },
  {
    ntacode: "BX0904",
    ntaname: "Parkchester"
  },
  {
    ntacode: "BX1001",
    ntaname: "Westchester Square"
  },
  {
    ntacode: "BX1071",
    ntaname: "Hart Island"
  },
  {
    ntacode: "BX1091",
    ntaname: "Ferry Point Park-St. Raymond Cemetery"
  },
  {
    ntacode: "BX1101",
    ntaname: "Pelham Parkway-Van Nest"
  },
  {
    ntacode: "BX1104",
    ntaname: "Allerton"
  },
  {
    ntacode: "BX1201",
    ntaname: "Williamsbridge-Olinville"
  },
  {
    ntacode: "MN0203",
    ntaname: "West Village"
  },
  {
    ntacode: "BX1202",
    ntaname: "Eastchester-Edenwald-Baychester"
  },
  {
    ntacode: "MN0201",
    ntaname: "SoHo-Little Italy-Hudson Square"
  },
  {
    ntacode: "BX1203",
    ntaname: "Wakefield-Woodlawn"
  },
  {
    ntacode: "BX2691",
    ntaname: "Van Cortlandt Park"
  },
  {
    ntacode: "BX2791",
    ntaname: "Bronx Park"
  },
  {
    ntacode: "MN0102",
    ntaname: "Tribeca-Civic Center"
  },
  {
    ntacode: "MN0301",
    ntaname: "Chinatown-Two Bridges"
  },
  {
    ntacode: "MN0302",
    ntaname: "Lower East Side"
  },
  {
    ntacode: "MN0703",
    ntaname: "Upper West Side-Manhattan Valley"
  },
  {
    ntacode: "MN0401",
    ntaname: "Chelsea-Hudson Yards"
  },
  {
    ntacode: "MN0402",
    ntaname: "Hell's Kitchen"
  },
  {
    ntacode: "MN0602",
    ntaname: "Gramercy"
  },
  {
    ntacode: "MN0701",
    ntaname: "Upper West Side-Lincoln Square"
  },
  {
    ntacode: "MN0603",
    ntaname: "Murray Hill-Kips Bay"
  },
  {
    ntacode: "MN0661",
    ntaname: "United Nations"
  },
  {
    ntacode: "MN0901",
    ntaname: "Morningside Heights"
  },
  {
    ntacode: "MN0801",
    ntaname: "Upper East Side-Lenox Hill-Roosevelt Island"
  },
  {
    ntacode: "MN0803",
    ntaname: "Upper East Side-Yorkville"
  },
  {
    ntacode: "MN0902",
    ntaname: "Manhattanville-West Harlem"
  },
  {
    ntacode: "QN0104",
    ntaname: "Astoria (East)-Woodside (North)"
  },
  {
    ntacode: "MN1002",
    ntaname: "Harlem (North)"
  },
  {
    ntacode: "QN0574",
    ntaname: "Highland Park-Cypress Hills Cemeteries (North)"
  },
  {
    ntacode: "MN1102",
    ntaname: "East Harlem (North)"
  },
  {
    ntacode: "QN0102",
    ntaname: "Old Astoria-Hallets Point"
  },
  {
    ntacode: "MN1201",
    ntaname: "Washington Heights (South)"
  },
  {
    ntacode: "QN0103",
    ntaname: "Astoria (Central)"
  },
  {
    ntacode: "MN1202",
    ntaname: "Washington Heights (North)"
  },
  {
    ntacode: "MN1291",
    ntaname: "Highbridge Park"
  },
  {
    ntacode: "MN6491",
    ntaname: "Central Park"
  },
  {
    ntacode: "QN0202",
    ntaname: "Sunnyside"
  },
  {
    ntacode: "QN0601",
    ntaname: "Rego Park"
  },
  {
    ntacode: "QN0151",
    ntaname: "Rikers Island"
  },
  {
    ntacode: "QN0203",
    ntaname: "Woodside"
  },
  {
    ntacode: "QN0261",
    ntaname: "Sunnyside Yards (South)"
  },
  {
    ntacode: "QN0271",
    ntaname: "Calvary & Mount Zion Cemeteries"
  },
  {
    ntacode: "QN0301",
    ntaname: "Jackson Heights"
  },
  {
    ntacode: "QN0302",
    ntaname: "East Elmhurst"
  },
  {
    ntacode: "QN0303",
    ntaname: "North Corona"
  },
  {
    ntacode: "QN0401",
    ntaname: "Elmhurst"
  },
  {
    ntacode: "QN0402",
    ntaname: "Corona"
  },
  {
    ntacode: "QN0502",
    ntaname: "Ridgewood"
  },
  {
    ntacode: "QN0503",
    ntaname: "Glendale"
  },
  {
    ntacode: "QN0504",
    ntaname: "Middle Village"
  },
  {
    ntacode: "QN0602",
    ntaname: "Forest Hills"
  },
  {
    ntacode: "QN0703",
    ntaname: "Bay Terrace-Clearview"
  },
  {
    ntacode: "QN0904",
    ntaname: "Ozone Park (North)"
  },
  {
    ntacode: "QN0706",
    ntaname: "Queensboro Hill"
  },
  {
    ntacode: "QN0707",
    ntaname: "Flushing-Willets Point"
  },
  {
    ntacode: "QN0761",
    ntaname: "Fort Totten"
  },
  {
    ntacode: "QN0791",
    ntaname: "Kissena Park"
  },
  {
    ntacode: "QN0801",
    ntaname: "Kew Gardens Hills"
  },
  {
    ntacode: "QN0802",
    ntaname: "Pomonok-Electchester-Hillcrest"
  },
  {
    ntacode: "QN0803",
    ntaname: "Fresh Meadows-Utopia"
  },
  {
    ntacode: "QN0804",
    ntaname: "Jamaica Estates-Holliswood"
  },
  {
    ntacode: "QN1202",
    ntaname: "South Jamaica"
  },
  {
    ntacode: "QN0805",
    ntaname: "Jamaica Hills-Briarwood"
  },
  {
    ntacode: "QN0891",
    ntaname: "Cunningham Park"
  },
  {
    ntacode: "QN0901",
    ntaname: "Kew Gardens"
  },
  {
    ntacode: "QN0902",
    ntaname: "Richmond Hill"
  },
  {
    ntacode: "QN0903",
    ntaname: "South Richmond Hill"
  },
  {
    ntacode: "QN1001",
    ntaname: "South Ozone Park"
  },
  {
    ntacode: "QN1101",
    ntaname: "Auburndale"
  },
  {
    ntacode: "QN1102",
    ntaname: "Bayside"
  },
  {
    ntacode: "SI9591",
    ntaname: "Hoffman & Swinburne Islands"
  },
  {
    ntacode: "QN1201",
    ntaname: "Jamaica"
  },
  {
    ntacode: "SI9592",
    ntaname: "Miller Field"
  },
  {
    ntacode: "QN1203",
    ntaname: "Baisley Park"
  },
  {
    ntacode: "QN1205",
    ntaname: "St. Albans"
  },
  {
    ntacode: "QN1301",
    ntaname: "Glen Oaks-Floral Park-New Hyde Park"
  },
  {
    ntacode: "QN1302",
    ntaname: "Bellerose"
  },
  {
    ntacode: "QN1303",
    ntaname: "Queens Village"
  },
  {
    ntacode: "QN1304",
    ntaname: "Cambria Heights"
  },
  {
    ntacode: "QN1305",
    ntaname: "Laurelton"
  },
  {
    ntacode: "QN1306",
    ntaname: "Springfield Gardens (South)-Brookville"
  },
  {
    ntacode: "QN8291",
    ntaname: "Forest Park"
  },
  {
    ntacode: "SI0101",
    ntaname: "St. George-New Brighton"
  },
  {
    ntacode: "SI0103",
    ntaname: "Rosebank-Shore Acres-Park Hill"
  },
  {
    ntacode: "SI0104",
    ntaname: "West New Brighton-Silver Lake-Grymes Hill"
  },
  {
    ntacode: "SI0105",
    ntaname: "Westerleigh-Castleton Corners"
  },
  {
    ntacode: "SI0106",
    ntaname: "Port Richmond"
  },
  {
    ntacode: "SI0191",
    ntaname: "Snug Harbor"
  },
  {
    ntacode: "SI0201",
    ntaname: "Grasmere-Arrochar-South Beach-Dongan Hills"
  },
  {
    ntacode: "SI0202",
    ntaname: "New Dorp-Midland Beach"
  },
  {
    ntacode: "SI0301",
    ntaname: "Oakwood-Richmondtown"
  },
  {
    ntacode: "SI0303",
    ntaname: "Arden Heights-Rossville"
  },
  {
    ntacode: "SI9561",
    ntaname: "Fort Wadsworth"
  }
];

export default {
  getNtaName(ntacode) {
    const match = ntas.filter(nta => nta.ntacode === ntacode);

    return match[0].ntaname;
  },
};
