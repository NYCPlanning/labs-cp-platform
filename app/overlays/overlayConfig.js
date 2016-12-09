const overlayConfig = [
  {
    name: "Administrative Boundaries",
    iconClass: 'fa fa-flag',
    layers: [
    //Community Districts
      {
        id: 'cdboundaries',
        name: 'Community Districts',
        visible: false,
        type: 'carto',
        options: { 
          "cartocss": `
            #dcp_cdboundaries{ 
              polygon-fill: #FF5C00; 
              polygon-opacity: 0; 
              line-color: #000000; 
              line-width: 3; 
              line-opacity: 0.5; 
              line-dasharray: 10, 5; 
            } 
            #dcp_cdboundaries::labels { 
              text-name: [borocd]; 
              text-face-name: 'DejaVu Sans Book'; 
              text-size: 15; 
              text-label-position-tolerance: 10; 
              text-fill: #000; 
              text-halo-fill: #FFF; 
              text-halo-radius: 2.5; 
              text-dy: 0; 
              text-allow-overlap: true; 
              text-placement: point; 
              text-placement-type: simple; 
            }`,
          "sql": "select * from dcp_cdboundaries"    
        }
      },
      //NTAs
      {
        id: 'ntaboundaries',
        name: 'Neighborhood Tabulation Areas',
        visible: false,
        type: 'carto',
        options: { 
          "cartocss": `
            #dcp_ntaboundaries{ 
              polygon-fill: #FF5C00; 
              polygon-opacity: 0; 
              line-color: #000000; 
              line-width: 3; 
              line-opacity: 0.5; 
              line-dasharray: 10, 5; 
            } 
            #dcp_cdboundaries::labels { 
              text-name: [ntaname]; 
              text-face-name: 'DejaVu Sans Book'; 
              text-size: 15; 
              text-label-position-tolerance: 10; 
              text-fill: #000; 
              text-halo-fill: #FFF; 
              text-halo-radius: 2.5; 
              text-dy: 0; 
              text-allow-overlap: true; 
              text-placement: point; 
              text-placement-type: simple; }`,
          "sql": "select * from dcp_ntaboundaries"    
        }
      }
    ]
  },

  {
    name: "Zoning and Land Use",
    iconClass: 'fa fa-flag',
    layers: [
      {
        id: 'zoningdistricts',
        name: 'Zoning Districts',
        visible: false,
        type: 'carto',
        options: { 
          "cartocss": `
            #nyzd {
             polygon-opacity: 0.4;
             line-color: #FFF;
             line-width: 0.5;
             line-opacity: 0;
          }

          #nyzd[zonetype="B"] {
             polygon-fill: #A6CEE3;
          }
          #nyzd[zonetype="C"] {
             polygon-fill: #D6301D;
          }
          #nyzd[zonetype="M"] {
             polygon-fill: #A53ED5;
          }
          #nyzd[zonetype="P"] {
             polygon-fill: #33A02C;
          }
          #nyzd[zonetype="R"] {
             polygon-fill: #FF9900;
          }`,
          "sql": "SELECT *, LEFT(zonedist, 1) as zonetype FROM cpadmin.nyzd WHERE LEFT(zonedist, 1) <> 'P'"    
        }
      }

    ]
  },

  {
    name: 'Transportation',
    iconClass: 'fa-subway',
    layers: [
      {
        id: 'subways',
        name: 'MTA Subways',
        visible: false,
        type: 'carto',
        options: { 
          "cartocss": `
            #doitt_subwaylines {
                 line-width: 3;
                 line-opacity:0.9;
              }

              #doitt_subwaylines[rt_symbol="1"] {
                 line-color: #EE352E;
              }
              #doitt_subwaylines[rt_symbol="4"] {
                 line-color: #00933C;
              }
              #doitt_subwaylines[rt_symbol="7"] {
                 line-color: #B933AD ;
              }
              #doitt_subwaylines[rt_symbol="A"] {
                 line-color: #0039A6 ;
              }
              #doitt_subwaylines[rt_symbol="B"] {
                 line-color: #FF6319 ;
              }
              #doitt_subwaylines[rt_symbol="G"] {
                 line-color: #6CBE45 ;
              }
              #doitt_subwaylines[rt_symbol="J"] {
                 line-color: #996633 ;
              }
              #doitt_subwaylines[rt_symbol="L"] {
                 line-color: #A7A9AC ;
              }
              #doitt_subwaylines[rt_symbol="N"] {
                 line-color: #FCCC0A ;
              }
              #doitt_subwaylines[rt_symbol="SI"] {
                 line-color: #0F3B82 ;
              }`,
          "sql": "select * from doitt_subwaylines"    
        }
      }
    ]
  },

  {
    name: "Waterfront, Flood Zones, Watersheds",
    iconClass: 'fa fa-flag',
    layers: [
      {
        id: 'hurricaneevac',
        name: 'Hurricane Evacuation Zones',
        visible: false,
        type: 'carto',
        options: { 
          "cartocss": `
            #nyhez {
              polygon-opacity: 0.5;
              line-color: #FFF;
              line-width: 0.5;
              line-opacity: 0;
            }

            #nyhez[hurricane_="0"] {
               line-opacity: 0; 
               polygon-opacity: 0;
            }
            #nyhez[hurricane_="1"] {
               polygon-fill: #045a8d;
            }
            #nyhez[hurricane_="2"] {
               polygon-fill: #2b8cbe;
            }
            #nyhez[hurricane_="3"] {
               polygon-fill: #74a9cf;
            }
            #nyhez[hurricane_="4"] {
               polygon-fill: #a6bddb;
            }
            #nyhez[hurricane_="5"] {
               polygon-fill: #d0d1e6;
            }
            #nyhez[hurricane_="6"] {
               polygon-fill: #f1eef6;
            }
            #nyhez[hurricane_="X"] {
               line-opacity: 0; 
               polygon-opacity: 0; 
            }`,
          "sql": "select * from nyhez"    
        }
      }
    ]
  },

  {
    name: "Trees and Parks",
    iconClass: 'fa fa-flag',
    layers: []
  },

  {
    name: "Economic Incentive Zones",
    iconClass: 'fa fa-flag',
    layers: []
  }
]
  


module.exports=overlayConfig


