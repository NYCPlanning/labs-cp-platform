import appConfig from '../config/appConfig.js'
import Mustache from 'mustache'


function ajax(options) {
  //var token = auth.getToken();
  var token = 'testToken'

  return $.ajax({
    type: options.type,
    url: options.url,
    contentType: options.contentType,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    data: options.data
  })
}

var crud = {
  projects: {
    getMany: function(agency) {
      return ajax({
        type: 'GET',
        url: Mustache.render("{{{api_host}}}/api/projecteditor/{{agency}}", {
          api_host: appConfig,
          agency: agency
        })
      })
    },

    update: function(data) {
      return ajax({
        type: 'PUT',
        url: Mustache.render("{{{api_host}}}/api/projecteditor", {
          api_host: appConfig
        }),
        contentType: "application/json",
        data: JSON.stringify(data)
      }) 
    },

    getStats: function() {
      return ajax({
        type: 'GET',
        url: Mustache.render("{{{api_host}}}/api/projecteditor/allstats", {
          api_host: appConfig
        }),
        contentType: "application/json",
      }) 
    }

  }
}

module.exports = crud;