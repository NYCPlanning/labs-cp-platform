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
http://localhost:3000/api/projecteditor/dot

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
    }
  }
}

module.exports = crud;