import Mustache from 'mustache'

module.exports = {
  autoComplete: function(value) {


    var sqlTemplate = "SELECT st_centroid(the_geom) as the_geom, sponsorage as sponsoragency, cartodb_id, idfms, projectnam as projectname FROM adoyle.capeprojectspolygons WHERE projectnam ILIKE '%{{value}}%' OR idfms ILIKE '%{{value}}%'"

    var sql = Mustache.render(sqlTemplate, {value: value})

    console.log(sql)

    var apiCallTemplate = "https://reallysimpleopendata.org/user/cpadmin/api/v2/sql?q={{{sql}}}&format=geojson"
    var apiCall = Mustache.render(apiCallTemplate, {sql:sql})
    apiCall=encodeURI(apiCall)

    return $.getJSON(apiCall)

  }
}