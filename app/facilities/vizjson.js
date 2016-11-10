var vizJson = {  
   "type":"layergroup",
   "options":{  
      "user_name":"hkates",
      "maps_api_template":"https://carto.capitalplanning.nyc:443/user/{user}",
      "sql_api_template":"https://carto.capitalplanning.nyc:443/user/{user}",
      "tiler_protocol":"https",
      "tiler_domain":"carto.capitalplanning.nyc",
      "tiler_port":"443",
      "sql_api_protocol":"https",
      "sql_api_domain":"carto.capitalplanning.nyc",
      "sql_api_endpoint":"/api/v2/sql",
      "sql_api_port":443,
      "filter":"mapnik",
      "layer_definition":{  
         "version":"1.0.1",
         "layers":[  
            {  
               "id":"751e70d2-77dc-4db8-b310-824fcb00e27a",
               "type":"CartoDB",
               "tooltip": {
                  "fields":[  
                     {  
                        "position":1.7976931348623157e+308,
                        "name":"facilityname",
                        "title":true
                     },
                     {  
                        "position":1.7976931348623157e+308,
                        "name":"facilitytype",
                        "title":true
                     },
                     {  
                        "position":1.7976931348623157e+308,
                        "name":"operatortype",
                        "title":true
                     }
                    
                  ],
                "template":
                ` <div class=\"cartodb-tooltip-content-wrapper\">
                  <div class=\"cartodb-tooltip-content\">
                  <div class='name'>{{facilityname}}</div>
                  <div class='classification'><b>Facility Type:</b></div>
                  <div class='classification'>{{facilitytype}}</div>
                  <div class='classification'><b>Operator:</b></div>
                  <div class='classification'>{{operatorname}}</div>
                `
               },
               "order":1,
               "visible":true,
               "options":{  
                  "sql":"select * from facilities_data",
                  "layer_name":"facilities_data",
                  "cartocss":
                  `
                  /** this cartoCSS has been processed in order to be compatible with the new cartodb 2.0 */

                  /** category visualization */
                  #facilities_data {
                       marker-fill-opacity: 0.9;
                       marker-line-color: #012700;
                       marker-line-width: 0.5;
                       marker-line-opacity: 0.9;
                       marker-placement: point;
                       marker-type: ellipse;
                       marker-width: 7;
                       marker-allow-overlap: true;
                     }
                  #facilities_data[domain=\"Core Infrastructure and Transportation\"] {
                       marker-fill: #b0dae8;
                     }
                  #facilities_data[domain=\"Administration of Government\"] {
                       marker-fill: #da664f;
                     }
                  #facilities_data[domain=\"Health and Human Services\"] {
                       marker-fill: #b67eb7;
                     }
                  #facilities_data[domain=\"Parks, Cultural, and Other Community Facilities\"] {
                       marker-fill: #6f9568;
                     }
                  #facilities_data[domain=\"Public Safety, Emergency Services, and Administration of Justice\"] {
                       marker-fill: #3182bd;
                     }
                  #facilities_data[domain=\"Education, Child Welfare, and Youth\"] {
                       marker-fill: #f7ca00;
                     }
                  `,
                  "cartocss_version":"2.1.1",
                  "interactivity":"cartodb_id,address,addressnumber,agencyclass1,agencyclass2,agencysource,area,areatype,bbl,bin,borough,boroughcode,buildingid,buildingname,capacity,capacitytype,children,city,colpusetype,creator,datatype,dateactive,datecreated,dateedited,dateinactive,datesourcereceived,datesourceupdated,disabilities,domain,dropouts,editor,facilitygroup,facilityname,facilitysubgroup,facilitytype,family,groupquarters,guid,homeless,id,idagency,idold,immigrants,inactivestatus,latitude,linkdata,linkdownload,longitude,notes,operatorabbrev,operatorname,operatortype,oversightabbrev,oversightagency,parkid,processingflag,refreshfrequency,refreshmeans,schoolorganizationlevel,senior,servicearea,sourcedatasetname,streetname,tags,unemployed,utilization,utilizationrate,xcoord,ycoord,youth,zipcode"
               }
            }
         ]
      },
      "attribution":""
   }
}

module.exports=vizJson