const labels = [
  {
    value: "BK0104",
    label: "BK0104 - East Williamsburg"
  },
  {
    value: "BK0504",
    label: "BK0504 - Spring Creek-Starrett City"
  },
  {
    value: "BK0601",
    label: "BK0601 - Carroll Gardens-Cobble Hill-Gowanus-Red Hook"
  },
  {
    value: "BK0702",
    label: "BK0702 - Sunset Park (West)"
  },
  {
    value: "BK1302",
    label: "BK1302 - Coney Island-Sea Gate"
  },
  {
    value: "BK1771",
    label: "BK1771 - Holy Cross Cemetery"
  },
  {
    value: "BK1802",
    label: "BK1802 - Marine Park-Mill Basin-Bergen Beach"
  },
  {
    value: "BX1003",
    label: "BX1003 - Pelham Bay-Country Club-City Island"
  },
  {
    value: "BX2891",
    label: "BX2891 - Pelham Bay Park"
  },
  {
    value: "MN0191",
    label: "MN0191 - The Battery-Governors Island-Ellis Island-Liberty Island"
  },
  {
    value: "MN1001",
    label: "MN1001 - Harlem (South)"
  },
  {
    value: "MN1203",
    label: "MN1203 - Inwood"
  },
  {
    value: "MN1292",
    label: "MN1292 - Inwood Hill Park"
  },
  {
    value: "QN0101",
    label: "QN0101 - Astoria (North)-Ditmars-Steinway"
  },
  {
    value: "QN0201",
    label: "QN0201 - Long Island City-Hunters Point"
  },
  {
    value: "QN0501",
    label: "QN0501 - Maspeth"
  },
  {
    value: "QN0701",
    label: "QN0701 - College Point"
  },
  {
    value: "QN0702",
    label: "QN0702 - Whitestone-Beechhurst"
  },
  {
    value: "SI0107",
    label: "SI0107 - Mariner's Harbor-Arlington-Graniteville"
  },
  {
    value: "SI0203",
    label: "SI0203 - Todt Hill-Emerson Hill-Lighthouse Hill-Manor Heights"
  },
  {
    value: "SI0204",
    label: "SI0204 - New Springville-Willowbrook-Bulls Head-Travis"
  },
  {
    value: "SI0302",
    label: "SI0302 - Great Kills-Eltingville"
  },
  {
    value: "BK1201",
    label: "BK1201 - Sunset Park (East)-Borough Park (West)"
  },
  {
    value: "SI9593",
    label: "SI9593 - Great Kills Park"
  },
  {
    value: "BK0771",
    label: "BK0771 - Green-Wood Cemetery"
  },
  {
    value: "BK0901",
    label: "BK0901 - Crown Heights (South)"
  },
  {
    value: "BK1061",
    label: "BK1061 - Fort Hamilton"
  },
  {
    value: "BK1091",
    label: "BK1091 - Dyker Beach Park"
  },
  {
    value: "BK1503",
    label: "BK1503 - Sheepshead Bay-Manhattan Beach-Gerritsen Beach"
  },
  {
    value: "BK1701",
    label: "BK1701 - East Flatbush-Erasmus"
  },
  {
    value: "MN0101",
    label: "MN0101 - Financial District-Battery Park City"
  },
  {
    value: "MN0502",
    label: "MN0502 - Midtown-Times Square"
  },
  {
    value: "QN0571",
    label: "QN0571 - Mount Olivet & All Faiths Cemeteries"
  },
  {
    value: "QN0705",
    label: "QN0705 - East Flushing"
  },
  {
    value: "QN1002",
    label: "QN1002 - Ozone Park"
  },
  {
    value: "QN1204",
    label: "QN1204 - Springfield Gardens (North)-Rochdale Village"
  },
  {
    value: "QN1206",
    label: "QN1206 - Hollis"
  },
  {
    value: "QN8491",
    label: "QN8491 - Jamaica Bay (East)"
  },
  {
    value: "QN8492",
    label: "QN8492 - Jacob Riis Park-Fort Tilden-Breezy Point Tip"
  },
  {
    value: "SI0305",
    label: "SI0305 - Tottenville-Charleston"
  },
  {
    value: "SI0391",
    label: "SI0391 - Freshkills Park (South)"
  },
  {
    value: "BK0471",
    label: "BK0471 - The Evergreens Cemetery"
  },
  {
    value: "BK0503",
    label: "BK0503 - East New York-New Lots"
  },
  {
    value: "BK0571",
    label: "BK0571 - Highland Park-Cypress Hills Cemeteries (South)"
  },
  {
    value: "BK0891",
    label: "BK0891 - Lincoln Terrace Park"
  },
  {
    value: "BK0902",
    label: "BK0902 - Prospect Lefferts Gardens-Wingate"
  },
  {
    value: "BK1502",
    label: "BK1502 - Madison"
  },
  {
    value: "BK1803",
    label: "BK1803 - Canarsie"
  },
  {
    value: "BK1891",
    label: "BK1891 - Marine Park-Plumb Island"
  },
  {
    value: "BK1892",
    label: "BK1892 - McGuire Fields"
  },
  {
    value: "BK5691",
    label: "BK5691 - Barren Island-Floyd Bennett Field"
  },
  {
    value: "BK5692",
    label: "BK5692 - Jamaica Bay (West)"
  },
  {
    value: "BK5693",
    label: "BK5693 - Shirley Chisholm State Park"
  },
  {
    value: "BX0602",
    label: "BX0602 - Tremont"
  },
  {
    value: "BX0603",
    label: "BX0603 - Belmont"
  },
  {
    value: "BX0801",
    label: "BX0801 - Kingsbridge Heights-Van Cortlandt Village"
  },
  {
    value: "BX1002",
    label: "BX1002 - Throgs Neck-Schuylerville"
  },
  {
    value: "MN0604",
    label: "MN0604 - East Midtown-Turtle Bay"
  },
  {
    value: "BX1004",
    label: "BX1004 - Co-op City"
  },
  {
    value: "BX1161",
    label: "BX1161 - Hutchinson Metro Center"
  },
  {
    value: "BX1271",
    label: "BX1271 - Woodlawn Cemetery"
  },
  {
    value: "MN0202",
    label: "MN0202 - Greenwich Village"
  },
  {
    value: "MN0303",
    label: "MN0303 - East Village"
  },
  {
    value: "MN0501",
    label: "MN0501 - Midtown South-Flatiron-Union Square"
  },
  {
    value: "MN0601",
    label: "MN0601 - Stuyvesant Town-Peter Cooper Village"
  },
  {
    value: "MN0702",
    label: "MN0702 - Upper West Side (Central)"
  },
  {
    value: "MN0802",
    label: "MN0802 - Upper East Side-Carnegie Hill"
  },
  {
    value: "MN0903",
    label: "MN0903 - Hamilton Heights-Sugar Hill"
  },
  {
    value: "BK0103",
    label: "BK0103 - South Williamsburg"
  },
  {
    value: "MN1101",
    label: "MN1101 - East Harlem (South)"
  },
  {
    value: "MN1191",
    label: "MN1191 - Randall's Island"
  },
  {
    value: "QN0105",
    label: "QN0105 - Queensbridge-Ravenswood-Dutch Kills"
  },
  {
    value: "QN0161",
    label: "QN0161 - Sunnyside Yards (North)"
  },
  {
    value: "QN0171",
    label: "QN0171 - St. Michael's Cemetery"
  },
  {
    value: "QN0191",
    label: "QN0191 - Astoria Park"
  },
  {
    value: "QN0572",
    label: "QN0572 - Middle Village Cemetery"
  },
  {
    value: "QN0573",
    label: "QN0573 - St. John Cemetery"
  },
  {
    value: "QN0704",
    label: "QN0704 - Murray Hill-Broadway Flushing"
  },
  {
    value: "QN0871",
    label: "QN0871 - Mount Hebron & Cedar Grove Cemeteries"
  },
  {
    value: "QN1003",
    label: "QN1003 - Howard Beach-Lindenwood"
  },
  {
    value: "QN1091",
    label: "QN1091 - Spring Creek Park"
  },
  {
    value: "QN1103",
    label: "QN1103 - Douglaston-Little Neck"
  },
  {
    value: "BK0201",
    label: "BK0201 - Brooklyn Heights"
  },
  {
    value: "QN1104",
    label: "QN1104 - Oakland Gardens-Hollis Hills"
  },
  {
    value: "QN1191",
    label: "QN1191 - Alley Pond Park"
  },
  {
    value: "QN1307",
    label: "QN1307 - Rosedale"
  },
  {
    value: "QN1371",
    label: "QN1371 - Montefiore Cemetery"
  },
  {
    value: "QN1401",
    label: "QN1401 - Far Rockaway-Bayswater"
  },
  {
    value: "QN1402",
    label: "QN1402 - Rockaway Beach-Arverne-Edgemere"
  },
  {
    value: "QN1403",
    label: "QN1403 - Breezy Point-Belle Harbor-Rockaway Park-Broad Channel"
  },
  {
    value: "QN1491",
    label: "QN1491 - Rockaway Community Park"
  },
  {
    value: "QN8081",
    label: "QN8081 - LaGuardia Airport"
  },
  {
    value: "QN8191",
    label: "QN8191 - Flushing Meadows-Corona Park"
  },
  {
    value: "QN8381",
    label: "QN8381 - John F. Kennedy International Airport"
  },
  {
    value: "BK0204",
    label: "BK0204 - Clinton Hill"
  },
  {
    value: "SI0102",
    label: "SI0102 - Tompkinsville-Stapleton-Clifton-Fox Hills"
  },
  {
    value: "SI0291",
    label: "SI0291 - Freshkills Park (North)"
  },
  {
    value: "SI0304",
    label: "SI0304 - Annadale-Huguenot-Prince's Bay-Woodrow"
  },
  {
    value: "BK0102",
    label: "BK0102 - Williamsburg"
  },
  {
    value: "BK0703",
    label: "BK0703 - Sunset Park (Central)"
  },
  {
    value: "BK0802",
    label: "BK0802 - Crown Heights (North)"
  },
  {
    value: "BK0101",
    label: "BK0101 - Greenpoint"
  },
  {
    value: "BK0202",
    label: "BK0202 - Downtown Brooklyn-DUMBO-Boerum Hill"
  },
  {
    value: "BK0203",
    label: "BK0203 - Fort Greene"
  },
  {
    value: "BK0261",
    label: "BK0261 - Brooklyn Navy Yard"
  },
  {
    value: "BK0301",
    label: "BK0301 - Bedford-Stuyvesant (West)"
  },
  {
    value: "BK0801",
    label: "BK0801 - Prospect Heights"
  },
  {
    value: "BK0302",
    label: "BK0302 - Bedford-Stuyvesant (East)"
  },
  {
    value: "BK0401",
    label: "BK0401 - Bushwick (West)"
  },
  {
    value: "BK0402",
    label: "BK0402 - Bushwick (East)"
  },
  {
    value: "BK0501",
    label: "BK0501 - Cypress Hills"
  },
  {
    value: "BK0502",
    label: "BK0502 - East New York (North)"
  },
  {
    value: "BK0701",
    label: "BK0701 - Windsor Terrace-South Slope"
  },
  {
    value: "BK0505",
    label: "BK0505 - East New York-City Line"
  },
  {
    value: "BK0602",
    label: "BK0602 - Park Slope"
  },
  {
    value: "BK1001",
    label: "BK1001 - Bay Ridge"
  },
  {
    value: "BK1002",
    label: "BK1002 - Dyker Heights"
  },
  {
    value: "BK1101",
    label: "BK1101 - Bensonhurst"
  },
  {
    value: "BK1102",
    label: "BK1102 - Bath Beach"
  },
  {
    value: "BK1103",
    label: "BK1103 - Gravesend (West)"
  },
  {
    value: "BK1202",
    label: "BK1202 - Borough Park"
  },
  {
    value: "BK1203",
    label: "BK1203 - Kensington"
  },
  {
    value: "BK1204",
    label: "BK1204 - Mapleton-Midwood (West)"
  },
  {
    value: "BK1391",
    label: "BK1391 - Calvert Vaux Park"
  },
  {
    value: "BK1301",
    label: "BK1301 - Gravesend (South)"
  },
  {
    value: "BK1303",
    label: "BK1303 - Brighton Beach"
  },
  {
    value: "BK1401",
    label: "BK1401 - Flatbush"
  },
  {
    value: "BK1402",
    label: "BK1402 - Flatbush (West)-Ditmas Park-Parkville"
  },
  {
    value: "BK1403",
    label: "BK1403 - Midwood"
  },
  {
    value: "BK1501",
    label: "BK1501 - Gravesend (East)-Homecrest"
  },
  {
    value: "BK1702",
    label: "BK1702 - East Flatbush-Farragut"
  },
  {
    value: "BK1601",
    label: "BK1601 - Ocean Hill"
  },
  {
    value: "BK1602",
    label: "BK1602 - Brownsville"
  },
  {
    value: "BK1703",
    label: "BK1703 - East Flatbush-Rugby"
  },
  {
    value: "BK1704",
    label: "BK1704 - East Flatbush-Remsen Village"
  },
  {
    value: "BK1801",
    label: "BK1801 - Flatlands"
  },
  {
    value: "BK1893",
    label: "BK1893 - Canarsie Park & Pier"
  },
  {
    value: "BK5591",
    label: "BK5591 - Prospect Park"
  },
  {
    value: "BX0202",
    label: "BX0202 - Longwood"
  },
  {
    value: "BX0291",
    label: "BX0291 - North & South Brother Islands"
  },
  {
    value: "BX0101",
    label: "BX0101 - Mott Haven-Port Morris"
  },
  {
    value: "BX0102",
    label: "BX0102 - Melrose"
  },
  {
    value: "BX0201",
    label: "BX0201 - Hunts Point"
  },
  {
    value: "BX0301",
    label: "BX0301 - Morrisania"
  },
  {
    value: "BX0302",
    label: "BX0302 - Claremont Village-Claremont (East)"
  },
  {
    value: "BX0492",
    label: "BX0492 - Claremont Park"
  },
  {
    value: "BX1103",
    label: "BX1103 - Pelham Gardens"
  },
  {
    value: "BX0303",
    label: "BX0303 - Crotona Park East"
  },
  {
    value: "BX0391",
    label: "BX0391 - Crotona Park"
  },
  {
    value: "BX0401",
    label: "BX0401 - Concourse-Concourse Village"
  },
  {
    value: "BX0402",
    label: "BX0402 - Highbridge"
  },
  {
    value: "BX0403",
    label: "BX0403 - Mount Eden-Claremont (West)"
  },
  {
    value: "BX0491",
    label: "BX0491 - Yankee Stadium-Macombs Dam Park"
  },
  {
    value: "BX0501",
    label: "BX0501 - University Heights (South)-Morris Heights"
  },
  {
    value: "BX0502",
    label: "BX0502 - Mount Hope"
  },
  {
    value: "BX0503",
    label: "BX0503 - Fordham Heights"
  },
  {
    value: "BX0991",
    label: "BX0991 - Soundview Park"
  },
  {
    value: "BX0601",
    label: "BX0601 - West Farms"
  },
  {
    value: "BX0701",
    label: "BX0701 - University Heights (North)-Fordham"
  },
  {
    value: "BX0702",
    label: "BX0702 - Bedford Park"
  },
  {
    value: "BX0703",
    label: "BX0703 - Norwood"
  },
  {
    value: "QN0905",
    label: "QN0905 - Woodhaven"
  },
  {
    value: "BX0802",
    label: "BX0802 - Kingsbridge-Marble Hill"
  },
  {
    value: "BX1102",
    label: "BX1102 - Morris Park"
  },
  {
    value: "BX0803",
    label: "BX0803 - Riverdale-Spuyten Duyvil"
  },
  {
    value: "BX0901",
    label: "BX0901 - Soundview-Bruckner-Bronx River"
  },
  {
    value: "BX0902",
    label: "BX0902 - Soundview-Clason Point"
  },
  {
    value: "BX0903",
    label: "BX0903 - Castle Hill-Unionport"
  },
  {
    value: "BX0904",
    label: "BX0904 - Parkchester"
  },
  {
    value: "BX1001",
    label: "BX1001 - Westchester Square"
  },
  {
    value: "BX1071",
    label: "BX1071 - Hart Island"
  },
  {
    value: "BX1091",
    label: "BX1091 - Ferry Point Park-St. Raymond Cemetery"
  },
  {
    value: "BX1101",
    label: "BX1101 - Pelham Parkway-Van Nest"
  },
  {
    value: "BX1104",
    label: "BX1104 - Allerton"
  },
  {
    value: "BX1201",
    label: "BX1201 - Williamsbridge-Olinville"
  },
  {
    value: "MN0203",
    label: "MN0203 - West Village"
  },
  {
    value: "BX1202",
    label: "BX1202 - Eastchester-Edenwald-Baychester"
  },
  {
    value: "MN0201",
    label: "MN0201 - SoHo-Little Italy-Hudson Square"
  },
  {
    value: "BX1203",
    label: "BX1203 - Wakefield-Woodlawn"
  },
  {
    value: "BX2691",
    label: "BX2691 - Van Cortlandt Park"
  },
  {
    value: "BX2791",
    label: "BX2791 - Bronx Park"
  },
  {
    value: "MN0102",
    label: "MN0102 - Tribeca-Civic Center"
  },
  {
    value: "MN0301",
    label: "MN0301 - Chinatown-Two Bridges"
  },
  {
    value: "MN0302",
    label: "MN0302 - Lower East Side"
  },
  {
    value: "MN0703",
    label: "MN0703 - Upper West Side-Manhattan Valley"
  },
  {
    value: "MN0401",
    label: "MN0401 - Chelsea-Hudson Yards"
  },
  {
    value: "MN0402",
    label: "MN0402 - Hell's Kitchen"
  },
  {
    value: "MN0602",
    label: "MN0602 - Gramercy"
  },
  {
    value: "MN0701",
    label: "MN0701 - Upper West Side-Lincoln Square"
  },
  {
    value: "MN0603",
    label: "MN0603 - Murray Hill-Kips Bay"
  },
  {
    value: "MN0661",
    label: "MN0661 - United Nations"
  },
  {
    value: "MN0901",
    label: "MN0901 - Morningside Heights"
  },
  {
    value: "MN0801",
    label: "MN0801 - Upper East Side-Lenox Hill-Roosevelt Island"
  },
  {
    value: "MN0803",
    label: "MN0803 - Upper East Side-Yorkville"
  },
  {
    value: "MN0902",
    label: "MN0902 - Manhattanville-West Harlem"
  },
  {
    value: "QN0104",
    label: "QN0104 - Astoria (East)-Woodside (North)"
  },
  {
    value: "MN1002",
    label: "MN1002 - Harlem (North)"
  },
  {
    value: "QN0574",
    label: "QN0574 - Highland Park-Cypress Hills Cemeteries (North)"
  },
  {
    value: "MN1102",
    label: "MN1102 - East Harlem (North)"
  },
  {
    value: "QN0102",
    label: "QN0102 - Old Astoria-Hallets Point"
  },
  {
    value: "MN1201",
    label: "MN1201 - Washington Heights (South)"
  },
  {
    value: "QN0103",
    label: "QN0103 - Astoria (Central)"
  },
  {
    value: "MN1202",
    label: "MN1202 - Washington Heights (North)"
  },
  {
    value: "MN1291",
    label: "MN1291 - Highbridge Park"
  },
  {
    value: "MN6491",
    label: "MN6491 - Central Park"
  },
  {
    value: "QN0202",
    label: "QN0202 - Sunnyside"
  },
  {
    value: "QN0601",
    label: "QN0601 - Rego Park"
  },
  {
    value: "QN0151",
    label: "QN0151 - Rikers Island"
  },
  {
    value: "QN0203",
    label: "QN0203 - Woodside"
  },
  {
    value: "QN0261",
    label: "QN0261 - Sunnyside Yards (South)"
  },
  {
    value: "QN0271",
    label: "QN0271 - Calvary & Mount Zion Cemeteries"
  },
  {
    value: "QN0301",
    label: "QN0301 - Jackson Heights"
  },
  {
    value: "QN0302",
    label: "QN0302 - East Elmhurst"
  },
  {
    value: "QN0303",
    label: "QN0303 - North Corona"
  },
  {
    value: "QN0401",
    label: "QN0401 - Elmhurst"
  },
  {
    value: "QN0402",
    label: "QN0402 - Corona"
  },
  {
    value: "QN0502",
    label: "QN0502 - Ridgewood"
  },
  {
    value: "QN0503",
    label: "QN0503 - Glendale"
  },
  {
    value: "QN0504",
    label: "QN0504 - Middle Village"
  },
  {
    value: "QN0602",
    label: "QN0602 - Forest Hills"
  },
  {
    value: "QN0703",
    label: "QN0703 - Bay Terrace-Clearview"
  },
  {
    value: "QN0904",
    label: "QN0904 - Ozone Park (North)"
  },
  {
    value: "QN0706",
    label: "QN0706 - Queensboro Hill"
  },
  {
    value: "QN0707",
    label: "QN0707 - Flushing-Willets Point"
  },
  {
    value: "QN0761",
    label: "QN0761 - Fort Totten"
  },
  {
    value: "QN0791",
    label: "QN0791 - Kissena Park"
  },
  {
    value: "QN0801",
    label: "QN0801 - Kew Gardens Hills"
  },
  {
    value: "QN0802",
    label: "QN0802 - Pomonok-Electchester-Hillcrest"
  },
  {
    value: "QN0803",
    label: "QN0803 - Fresh Meadows-Utopia"
  },
  {
    value: "QN0804",
    label: "QN0804 - Jamaica Estates-Holliswood"
  },
  {
    value: "QN1202",
    label: "QN1202 - South Jamaica"
  },
  {
    value: "QN0805",
    label: "QN0805 - Jamaica Hills-Briarwood"
  },
  {
    value: "QN0891",
    label: "QN0891 - Cunningham Park"
  },
  {
    value: "QN0901",
    label: "QN0901 - Kew Gardens"
  },
  {
    value: "QN0902",
    label: "QN0902 - Richmond Hill"
  },
  {
    value: "QN0903",
    label: "QN0903 - South Richmond Hill"
  },
  {
    value: "QN1001",
    label: "QN1001 - South Ozone Park"
  },
  {
    value: "QN1101",
    label: "QN1101 - Auburndale"
  },
  {
    value: "QN1102",
    label: "QN1102 - Bayside"
  },
  {
    value: "SI9591",
    label: "SI9591 - Hoffman & Swinburne Islands"
  },
  {
    value: "QN1201",
    label: "QN1201 - Jamaica"
  },
  {
    value: "SI9592",
    label: "SI9592 - Miller Field"
  },
  {
    value: "QN1203",
    label: "QN1203 - Baisley Park"
  },
  {
    value: "QN1205",
    label: "QN1205 - St. Albans"
  },
  {
    value: "QN1301",
    label: "QN1301 - Glen Oaks-Floral Park-New Hyde Park"
  },
  {
    value: "QN1302",
    label: "QN1302 - Bellerose"
  },
  {
    value: "QN1303",
    label: "QN1303 - Queens Village"
  },
  {
    value: "QN1304",
    label: "QN1304 - Cambria Heights"
  },
  {
    value: "QN1305",
    label: "QN1305 - Laurelton"
  },
  {
    value: "QN1306",
    label: "QN1306 - Springfield Gardens (South)-Brookville"
  },
  {
    value: "QN8291",
    label: "QN8291 - Forest Park"
  },
  {
    value: "SI0101",
    label: "SI0101 - St. George-New Brighton"
  },
  {
    value: "SI0103",
    label: "SI0103 - Rosebank-Shore Acres-Park Hill"
  },
  {
    value: "SI0104",
    label: "SI0104 - West New Brighton-Silver Lake-Grymes Hill"
  },
  {
    value: "SI0105",
    label: "SI0105 - Westerleigh-Castleton Corners"
  },
  {
    value: "SI0106",
    label: "SI0106 - Port Richmond"
  },
  {
    value: "SI0191",
    label: "SI0191 - Snug Harbor"
  },
  {
    value: "SI0201",
    label: "SI0201 - Grasmere-Arrochar-South Beach-Dongan Hills"
  },
  {
    value: "SI0202",
    label: "SI0202 - New Dorp-Midland Beach"
  },
  {
    value: "SI0301",
    label: "SI0301 - Oakwood-Richmondtown"
  },
  {
    value: "SI0303",
    label: "SI0303 - Arden Heights-Rossville"
  },
  {
    value: "SI9561",
    label: "SI9561 - Fort Wadsworth"
  }
];

export default labels;
