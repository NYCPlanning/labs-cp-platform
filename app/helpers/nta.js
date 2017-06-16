// nta.js - helper methods for Neighborhood Tabulation Areas
// use getNtaName(ntacode) to get an NTA neighborhood name for a given ntacode

const ntas = [
  {
    ntacode: 'BX98',
    ntaname: 'Rikers Island',
  },
  {
    ntacode: 'SI99',
    ntaname: 'park-cemetery-etc-Staten Island',
  },
  {
    ntacode: 'BX52',
    ntaname: 'Schuylerville-Throgs Neck-Edgewater Park',
  },
  {
    ntacode: 'QN49',
    ntaname: 'Whitestone',
  },
  {
    ntacode: 'SI54',
    ntaname: 'Great Kills',
  },
  {
    ntacode: 'BK17',
    ntaname: 'Sheepshead Bay-Gerritsen Beach-Manhattan Beach',
  },
  {
    ntacode: 'BX10',
    ntaname: 'Pelham Bay-Country Club-City Island',
  },
  {
    ntacode: 'BK45',
    ntaname: 'Georgetown-Marine Park-Bergen Beach-Mill Basin',
  },
  {
    ntacode: 'SI12',
    ntaname: "Mariner's Harbor-Arlington-Port Ivory-Graniteville",
  },
  {
    ntacode: 'BK90',
    ntaname: 'East Williamsburg',
  },
  {
    ntacode: 'BK93',
    ntaname: 'Starrett City',
  },
  {
    ntacode: 'BX40',
    ntaname: 'Fordham South',
  },
  {
    ntacode: 'QN72',
    ntaname: 'Steinway',
  },
  {
    ntacode: 'QN23',
    ntaname: 'College Point',
  },
  {
    ntacode: 'BX27',
    ntaname: 'Hunts Point',
  },
  {
    ntacode: 'MN99',
    ntaname: 'park-cemetery-etc-Manhattan',
  },
  {
    ntacode: 'MN25',
    ntaname: 'Battery Park City-Lower Manhattan',
  },
  {
    ntacode: 'BX09',
    ntaname: 'Soundview-Castle Hill-Clason Point-Harding Park',
  },
  {
    ntacode: 'BX99',
    ntaname: 'park-cemetery-etc-Bronx',
  },
  {
    ntacode: 'MN17',
    ntaname: 'Midtown-Midtown South',
  },
  {
    ntacode: 'QN41',
    ntaname: 'Fresh Meadows-Utopia',
  },
  {
    ntacode: 'QN18',
    ntaname: 'Rego Park',
  },
  {
    ntacode: 'QN26',
    ntaname: 'North Corona',
  },
  {
    ntacode: 'BK28',
    ntaname: 'Bensonhurst West',
  },
  {
    ntacode: 'SI01',
    ntaname: "Annadale-Huguenot-Prince's Bay-Eltingville",
  },
  {
    ntacode: 'SI11',
    ntaname: 'Charleston-Richmond Valley-Tottenville',
  },
  {
    ntacode: 'QN45',
    ntaname: 'Douglas Manor-Douglaston-Little Neck',
  },
  {
    ntacode: 'BK27',
    ntaname: 'Bath Beach',
  },
  {
    ntacode: 'QN33',
    ntaname: 'Cambria Heights',
  },
  {
    ntacode: 'MN21',
    ntaname: 'Gramercy',
  },
  {
    ntacode: 'BX31',
    ntaname: 'Allerton-Pelham Gardens',
  },
  {
    ntacode: 'QN31',
    ntaname: 'Hunters Point-Sunnyside-West Maspeth',
  },
  {
    ntacode: 'BK77',
    ntaname: 'Bushwick North',
  },
  {
    ntacode: 'SI22',
    ntaname: 'West New Brighton-New Brighton-St. George',
  },
  {
    ntacode: 'QN10',
    ntaname: 'Breezy Point-Belle Harbor-Rockaway Park-Broad Channel',
  },
  {
    ntacode: 'QN12',
    ntaname: 'Hammels-Arverne-Edgemere',
  },
  {
    ntacode: 'MN22',
    ntaname: 'East Village',
  },
  {
    ntacode: 'BX01',
    ntaname: 'Claremont-Bathgate',
  },
  {
    ntacode: 'BX43',
    ntaname: 'Norwood',
  },
  {
    ntacode: 'BX13',
    ntaname: 'Co-op City',
  },
  {
    ntacode: 'QN15',
    ntaname: 'Far Rockaway-Bayswater',
  },
  {
    ntacode: 'QN57',
    ntaname: 'Lindenwood-Howard Beach',
  },
  {
    ntacode: 'QN05',
    ntaname: 'Rosedale',
  },
  {
    ntacode: 'QN98',
    ntaname: 'Airport',
  },
  {
    ntacode: 'QN53',
    ntaname: 'Woodhaven',
  },
  {
    ntacode: 'BK09',
    ntaname: 'Brooklyn Heights-Cobble Hill',
  },
  {
    ntacode: 'MN04',
    ntaname: 'Hamilton Heights',
  },
  {
    ntacode: 'SI05',
    ntaname: 'New Springville-Bloomfield-Travis',
  },
  {
    ntacode: 'SI24',
    ntaname: 'Todt Hill-Emerson Hill-Heartland Village-Lighthouse Hill',
  },
  {
    ntacode: 'BK21',
    ntaname: 'Seagate-Coney Island',
  },
  {
    ntacode: 'BK82',
    ntaname: 'East New York',
  },
  {
    ntacode: 'BK50',
    ntaname: 'Canarsie',
  },
  {
    ntacode: 'MN01',
    ntaname: 'Marble Hill-Inwood',
  },
  {
    ntacode: 'MN11',
    ntaname: 'Central Harlem South',
  },
  {
    ntacode: 'BK32',
    ntaname: 'Sunset Park West',
  },
  {
    ntacode: 'BK99',
    ntaname: 'park-cemetery-etc-Brooklyn',
  },
  {
    ntacode: 'QN99',
    ntaname: 'park-cemetery-etc-Queens',
  },
  {
    ntacode: 'MN28',
    ntaname: 'Lower East Side',
  },
  {
    ntacode: 'QN07',
    ntaname: 'Hollis',
  },
  {
    ntacode: 'BX33',
    ntaname: 'Longwood',
  },
  {
    ntacode: 'BK44',
    ntaname: 'Madison',
  },
  {
    ntacode: 'BK72',
    ntaname: 'Williamsburg',
  },
  {
    ntacode: 'BK69',
    ntaname: 'Clinton Hill',
  },
  {
    ntacode: 'QN56',
    ntaname: 'Ozone Park',
  },
  {
    ntacode: 'BK60',
    ntaname: 'Prospect Lefferts Gardens-Wingate',
  },
  {
    ntacode: 'BK25',
    ntaname: 'Homecrest',
  },
  {
    ntacode: 'BK88',
    ntaname: 'Borough Park',
  },
  {
    ntacode: 'QN52',
    ntaname: 'East Flushing',
  },
  {
    ntacode: 'QN48',
    ntaname: 'Auburndale',
  },
  {
    ntacode: 'QN51',
    ntaname: 'Murray Hill',
  },
  {
    ntacode: 'QN27',
    ntaname: 'East Elmhurst',
  },
  {
    ntacode: 'BX35',
    ntaname: 'Morrisania-Melrose',
  },
  {
    ntacode: 'MN06',
    ntaname: 'Manhattanville',
  },
  {
    ntacode: 'QN02',
    ntaname: 'Springfield Gardens North',
  },
  {
    ntacode: 'QN71',
    ntaname: 'Old Astoria',
  },
  {
    ntacode: 'QN46',
    ntaname: 'Bayside-Bayside Hills',
  },
  {
    ntacode: 'QN38',
    ntaname: 'Pomonok-Flushing Heights-Hillcrest',
  },
  {
    ntacode: 'MN15',
    ntaname: 'Clinton',
  },
  {
    ntacode: 'BX59',
    ntaname: 'Westchester-Unionport',
  },
  {
    ntacode: 'MN19',
    ntaname: 'Turtle Bay-East Midtown',
  },
  {
    ntacode: 'QN08',
    ntaname: 'St. Albans',
  },
  {
    ntacode: 'QN54',
    ntaname: 'Richmond Hill',
  },
  {
    ntacode: 'QN25',
    ntaname: 'Corona',
  },
  {
    ntacode: 'QN47',
    ntaname: 'Ft. Totten-Bay Terrace-Clearview',
  },
  {
    ntacode: 'BK41',
    ntaname: 'Kensington-Ocean Parkway',
  },
  {
    ntacode: 'QN55',
    ntaname: 'South Ozone Park',
  },
  {
    ntacode: 'BK95',
    ntaname: 'Erasmus',
  },
  {
    ntacode: 'QN37',
    ntaname: 'Kew Gardens Hills',
  },
  {
    ntacode: 'QN06',
    ntaname: 'Jamaica Estates-Holliswood',
  },
  {
    ntacode: 'BK40',
    ntaname: 'Windsor Terrace',
  },
  {
    ntacode: 'BK76',
    ntaname: 'Greenpoint',
  },
  {
    ntacode: 'QN30',
    ntaname: 'Maspeth',
  },
  {
    ntacode: 'QN35',
    ntaname: 'Briarwood-Jamaica Hills',
  },
  {
    ntacode: 'QN61',
    ntaname: 'Jamaica',
  },
  {
    ntacode: 'QN76',
    ntaname: 'Baisley Park',
  },
  {
    ntacode: 'SI45',
    ntaname: 'New Dorp-Midland Beach',
  },
  {
    ntacode: 'QN63',
    ntaname: 'Woodside',
  },
  {
    ntacode: 'QN01',
    ntaname: 'South Jamaica',
  },
  {
    ntacode: 'BK34',
    ntaname: 'Sunset Park East',
  },
  {
    ntacode: 'QN70',
    ntaname: 'Astoria',
  },
  {
    ntacode: 'QN34',
    ntaname: 'Queens Village',
  },
  {
    ntacode: 'QN66',
    ntaname: 'Laurelton',
  },
  {
    ntacode: 'BK43',
    ntaname: 'Midwood',
  },
  {
    ntacode: 'BK26',
    ntaname: 'Gravesend',
  },
  {
    ntacode: 'BK29',
    ntaname: 'Bensonhurst East',
  },
  {
    ntacode: 'SI28',
    ntaname: 'Port Richmond',
  },
  {
    ntacode: 'MN32',
    ntaname: 'Yorkville',
  },
  {
    ntacode: 'BK19',
    ntaname: 'Brighton Beach',
  },
  {
    ntacode: 'SI48',
    ntaname: 'Arden Heights',
  },
  {
    ntacode: 'BK85',
    ntaname: 'East New York (Pennsylvania Ave)',
  },
  {
    ntacode: 'SI32',
    ntaname: 'Rossville-Woodrow',
  },
  {
    ntacode: 'BK58',
    ntaname: 'Flatlands',
  },
  {
    ntacode: 'BK75',
    ntaname: 'Bedford',
  },
  {
    ntacode: 'BK81',
    ntaname: 'Brownsville',
  },
  {
    ntacode: 'BK79',
    ntaname: 'Ocean Hill',
  },
  {
    ntacode: 'MN20',
    ntaname: 'Murray Hill-Kips Bay',
  },
  {
    ntacode: 'BK35',
    ntaname: 'Stuyvesant Heights',
  },
  {
    ntacode: 'BK61',
    ntaname: 'Crown Heights North',
  },
  {
    ntacode: 'BK63',
    ntaname: 'Crown Heights South',
  },
  {
    ntacode: 'BK96',
    ntaname: 'Rugby-Remsen Village',
  },
  {
    ntacode: 'BX07',
    ntaname: 'Bronxdale',
  },
  {
    ntacode: 'BX44',
    ntaname: 'Williamsbridge-Olinville',
  },
  {
    ntacode: 'BX03',
    ntaname: 'Eastchester-Edenwald-Baychester',
  },
  {
    ntacode: 'SI37',
    ntaname: 'Stapleton-Rosebank',
  },
  {
    ntacode: 'QN62',
    ntaname: 'Queensboro Hill',
  },
  {
    ntacode: 'MN23',
    ntaname: 'West Village',
  },
  {
    ntacode: 'MN13',
    ntaname: 'Hudson Yards-Chelsea-Flatiron-Union Square',
  },
  {
    ntacode: 'BK91',
    ntaname: 'East Flatbush-Farragut',
  },
  {
    ntacode: 'SI07',
    ntaname: 'Westerleigh',
  },
  {
    ntacode: 'BK78',
    ntaname: 'Bushwick South',
  },
  {
    ntacode: 'QN20',
    ntaname: 'Ridgewood',
  },
  {
    ntacode: 'QN43',
    ntaname: 'Bellerose',
  },
  {
    ntacode: 'QN44',
    ntaname: 'Glen Oaks-Floral Park-New Hyde Park',
  },
  {
    ntacode: 'BX41',
    ntaname: 'Mount Hope',
  },
  {
    ntacode: 'BK46',
    ntaname: 'Ocean Parkway South',
  },
  {
    ntacode: 'QN22',
    ntaname: 'Flushing',
  },
  {
    ntacode: 'MN24',
    ntaname: 'SoHo-TriBeCa-Civic Center-Little Italy',
  },
  {
    ntacode: 'BK68',
    ntaname: 'Fort Greene',
  },
  {
    ntacode: 'MN27',
    ntaname: 'Chinatown',
  },
  {
    ntacode: 'MN50',
    ntaname: 'Stuyvesant Town-Cooper Village',
  },
  {
    ntacode: 'SI14',
    ntaname: 'Grasmere-Arrochar-Ft. Wadsworth',
  },
  {
    ntacode: 'BK42',
    ntaname: 'Flatbush',
  },
  {
    ntacode: 'SI36',
    ntaname: 'Old Town-Dongan Hills-South Beach',
  },
  {
    ntacode: 'BX22',
    ntaname: 'North Riverdale-Fieldston-Riverdale',
  },
  {
    ntacode: 'BX29',
    ntaname: 'Spuyten Duyvil-Kingsbridge',
  },
  {
    ntacode: 'BX62',
    ntaname: 'Woodlawn-Wakefield',
  },
  {
    ntacode: 'BX36',
    ntaname: 'University Heights-Morris Heights',
  },
  {
    ntacode: 'SI25',
    ntaname: 'Oakwood-Oakwood Beach',
  },
  {
    ntacode: 'BX30',
    ntaname: 'Kingsbridge Heights',
  },
  {
    ntacode: 'BX34',
    ntaname: 'Melrose South-Mott Haven North',
  },
  {
    ntacode: 'BX17',
    ntaname: 'East Tremont',
  },
  {
    ntacode: 'QN60',
    ntaname: 'Kew Gardens',
  },
  {
    ntacode: 'BX37',
    ntaname: 'Van Nest-Morris Park-Westchester Square',
  },
  {
    ntacode: 'QN17',
    ntaname: 'Forest Hills',
  },
  {
    ntacode: 'MN34',
    ntaname: 'East Harlem North',
  },
  {
    ntacode: 'BX49',
    ntaname: 'Pelham Parkway',
  },
  {
    ntacode: 'MN31',
    ntaname: 'Lenox Hill-Roosevelt Island',
  },
  {
    ntacode: 'QN68',
    ntaname: 'Queensbridge-Ravenswood-Long Island City',
  },
  {
    ntacode: 'BX39',
    ntaname: 'Mott Haven-Port Morris',
  },
  {
    ntacode: 'BX55',
    ntaname: 'Soundview-Bruckner',
  },
  {
    ntacode: 'QN42',
    ntaname: 'Oakland Gardens',
  },
  {
    ntacode: 'BX14',
    ntaname: 'East Concourse-Concourse Village',
  },
  {
    ntacode: 'BK38',
    ntaname: 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill',
  },
  {
    ntacode: 'BX08',
    ntaname: 'West Farms-Bronx River',
  },
  {
    ntacode: 'BX46',
    ntaname: 'Parkchester',
  },
  {
    ntacode: 'BX05',
    ntaname: 'Bedford Park-Fordham North',
  },
  {
    ntacode: 'BX75',
    ntaname: 'Crotona Park East',
  },
  {
    ntacode: 'BK30',
    ntaname: 'Dyker Heights',
  },
  {
    ntacode: 'SI08',
    ntaname: 'Grymes Hill-Clifton-Fox Hills',
  },
  {
    ntacode: 'SI35',
    ntaname: 'New Brighton-Silver Lake',
  },
  {
    ntacode: 'BK64',
    ntaname: 'Prospect Heights',
  },
  {
    ntacode: 'BK31',
    ntaname: 'Bay Ridge',
  },
  {
    ntacode: 'BX28',
    ntaname: 'Van Cortlandt Village',
  },
  {
    ntacode: 'QN29',
    ntaname: 'Elmhurst',
  },
  {
    ntacode: 'QN50',
    ntaname: 'Elmhurst-Maspeth',
  },
  {
    ntacode: 'QN03',
    ntaname: 'Springfield Gardens South-Brookville',
  },
  {
    ntacode: 'QN28',
    ntaname: 'Jackson Heights',
  },
  {
    ntacode: 'BK33',
    ntaname: 'Carroll Gardens-Columbia Street-Red Hook',
  },
  {
    ntacode: 'BK73',
    ntaname: 'North Side-South Side',
  },
  {
    ntacode: 'QN19',
    ntaname: 'Glendale',
  },
  {
    ntacode: 'MN03',
    ntaname: 'Central Harlem North-Polo Grounds',
  },
  {
    ntacode: 'BK23',
    ntaname: 'West Brighton',
  },
  {
    ntacode: 'QN21',
    ntaname: 'Middle Village',
  },
  {
    ntacode: 'BX06',
    ntaname: 'Belmont',
  },
  {
    ntacode: 'MN40',
    ntaname: 'Upper East Side-Carnegie Hill',
  },
  {
    ntacode: 'BK37',
    ntaname: 'Park Slope-Gowanus',
  },
  {
    ntacode: 'BK83',
    ntaname: 'Cypress Hills-City Line',
  },
  {
    ntacode: 'MN14',
    ntaname: 'Lincoln Square',
  },
  {
    ntacode: 'MN33',
    ntaname: 'East Harlem South',
  },
  {
    ntacode: 'MN09',
    ntaname: 'Morningside Heights',
  },
  {
    ntacode: 'MN12',
    ntaname: 'Upper West Side',
  },
  {
    ntacode: 'BX26',
    ntaname: 'Highbridge',
  },
  {
    ntacode: 'MN35',
    ntaname: 'Washington Heights North',
  },
  {
    ntacode: 'MN36',
    ntaname: 'Washington Heights South',
  },
  {
    ntacode: 'BX63',
    ntaname: 'West Concourse',
  },
];

export default {
  getNtaName(ntacode) {
    const match = ntas.filter(nta => nta.ntacode === ntacode);

    return match[0].ntaname;
  },
};
