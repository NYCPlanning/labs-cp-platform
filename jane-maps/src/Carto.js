// carto.js - helper methods for interacting with the carto APIs


module.exports = {
  //given a string, get matches from capitalprojects based on name or projectid
  //TODO make this generic
  autoComplete: function(value) {


    var sql= `SELECT st_centroid(the_geom) as the_geom, sagency, projectid, name FROM (SELECT * FROM adoyle.capeprojectspolygons UNION ALL SELECT * FROM adoyle.capeprojectspoints) a WHERE name ILIKE '%${value}%' OR projectid ILIKE '%${value}%'`

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
            url: `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v1/map`,
            data: JSON.stringify(layerConfig),
            dataType: 'text',
            contentType: "application/json",
            success: function(data) { 
              data = JSON.parse(data);
              var layergroupid = data.layergroupid

              var template = `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v1/map/${layergroupid}/0/{z}/{x}/{y}.mvt`

              resolve(template)
            }
          })
        })
      })
    })

    return Promise.all(promises)

  },

  getVectorTileTemplate(mapConfig, options) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'POST',
        url: `https://${options.carto_domain}/user/${options.carto_user}/api/v1/map`,
        data: JSON.stringify(mapConfig),
        dataType: 'text',
        contentType: "application/json",
        success: function(data) { 
          data = JSON.parse(data);
          var layergroupid = data.layergroupid

          var template = `https://${options.carto_domain}/user/${options.carto_user}/api/v1/map/${layergroupid}/0/{z}/{x}/{y}.mvt`

          resolve(template)
        }
      })
    })
  },

  //get a full row from a table as geojson
  //returns a promise that when resolved yeilds a GeoJson feature
  getRow( tableName, column, value ) {
    var self=this 

    return new Promise(function( resolve, reject ) {

      var sql = typeof(value)=='number' ? 
        `SELECT * FROM ${tableName} WHERE ${column} = ${value}` :
        `SELECT * FROM ${tableName} WHERE ${column} = '${value}'`

      //returns a promise
      self.SQL(sql)
        .then(function(data) {
          resolve(data.features[0])
        })
    })

  },

  getCount(sql) {
    var self=this
    sql = `SELECT count(*) FROM (${sql}) a`

    return new Promise(function( resolve, reject ) {
      self.SQL(sql, 'json')
        .then(function(data) {
          resolve(data[0].count)
        })
    })
  },

  //does a carto SQL api call
  //pass in format as a valid SQL api export format (shp, csv, geojson)
  //TODO store host, user, etc in a central config
  SQL(sql, format) {

    format = format ? format : 'geojson'

    var apiCall = `https://${appConfig.carto_domain}/user/${appConfig.carto_user}/api/v2/sql?q=${sql}&format=${format}`

    apiCall=encodeURI(apiCall)

    return new Promise(function(resolve, reject) {
      $.getJSON(apiCall)
        .done(function(data) {
          format=='geojson'? resolve(data) : resolve(data.rows)
        })
    })
  }
}