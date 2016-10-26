import Mustache from 'mustache'

module.exports = {
  autoComplete: function(value) {


    var sqlTemplate = "SELECT st_centroid(the_geom) as the_geom, sagency, projectid, name FROM adoyle.capeprojectspolygons WHERE name ILIKE '%{{value}}%' OR projectid ILIKE '%{{value}}%'"

    var sql = Mustache.render(sqlTemplate, {value: value})

    console.log(sql)

    return this.sqlAPICall(sql)

  },

  getVectorTileUrls: function(vizJsons) {
    //takes an array of vizJsons
    //returns an promise, resolve returns array of vector tile templates
    //TODO add logic so this works with both anonymous and named maps


    var promises = vizJsons.map(function(vizJson) {
      return new Promise(function(resolve, reject) {
        $.getJSON(vizJson, function(vizJsonData) {
          console.log(vizJsonData)
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

          console.log(layerConfig)
          console.log(JSON.stringify(layerConfig))

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
  getRow(tableName, cartodb_id) {

    var sqlTemplate = "SELECT *  FROM {{tableName}} WHERE cartodb_id = {{cartodb_id}}"

    var sql = Mustache.render(sqlTemplate, {
      tableName: tableName,
      cartodb_id: cartodb_id
    })

    console.log(sql)

    //returns a promise
    return this.sqlAPICall(sql)


  },

  sqlAPICall(sql) {

    var apiCallTemplate = "https://carto.capitalplanning.nyc/user/cpadmin/api/v2/sql?q={{{sql}}}&format=geojson"
    var apiCall = Mustache.render(apiCallTemplate, {sql:sql})
    apiCall=encodeURI(apiCall)

    return $.getJSON(apiCall)
  }
}