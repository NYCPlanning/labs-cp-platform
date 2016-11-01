import Mustache from 'mustache'

module.exports = {
  autoComplete: function(value) {


    var sqlTemplate = "SELECT st_centroid(the_geom) as the_geom, sagency, projectid, name FROM (SELECT * FROM adoyle.capeprojectspolygons UNION ALL SELECT * FROM adoyle.capeprojectspoints) a WHERE name ILIKE '%{{value}}%' OR projectid ILIKE '%{{value}}%'"

    var sql = Mustache.render(sqlTemplate, {value: value})

    return this.SQL(sql)

  },

  getVectorTileUrls: function(vizJsons) {
    //takes an array of vizJsons
    //returns an promise, resolve returns array of vector tile templates
    //TODO add logic so this works with both anonymous and named maps


    var promises = vizJsons.map(function(vizJson) {
      return new Promise(function(resolve, reject) {
        $.getJSON(vizJson, function(vizJsonData) {
          var sourceOptions = vizJsonData.layers[1].options.layer_definition.layers[0].options


          var layerConfig = {
            version: "1.0.1",
            layers: [
              {
                type: 'cartodb',
                options: {
                  sql: sourceOptions.sql,
                  cartocss: sourceOptions.cartocss,
                  cartocss_version: sourceOptions.cartocss_version
                }
              }
            ]
          }

          $.ajax({
            type: 'POST',
            url: 'https://carto.capitalplanning.nyc/user/cpadmin/api/v1/map',
            data: JSON.stringify(layerConfig),
            dataType: 'text',
            contentType: "application/json",
            success: function(data) { 
              data = JSON.parse(data);
              var layergroupid = data.layergroupid

              var template = "https://carto.capitalplanning.nyc/user/cpadmin/api/v1/map/" + layergroupid + "/0/{z}/{x}/{y}.mvt"

              resolve(template)
            }
          })
        })
      })
    })

    return Promise.all(promises)

  },

  //get a full row from a table as geojson
  getRow(tableName, column, value) {

    var sqlTemplate = "SELECT *  FROM {{tableName}} WHERE {{column}} = '{{value}}'"

    var sql = Mustache.render(sqlTemplate, {
      tableName: tableName,
      column: column,
      value: value
    })

    //returns a promise
    return this.SQL(sql)


  },

  SQL(sql, format) {

    format = format ? format : 'geojson'

    var apiCallTemplate = "https://carto.capitalplanning.nyc/user/cpadmin/api/v2/sql?q={{{sql}}}&format={{format}}"
    var apiCall = Mustache.render(apiCallTemplate, {
      sql:sql, 
      format:format
    })

    apiCall=encodeURI(apiCall)

    return new Promise(function(resolve, reject) {
      $.getJSON(apiCall)
        .done(function(data) {
          format=='geojson'? resolve(data) : resolve(data.rows)
        })
    })
  }
}