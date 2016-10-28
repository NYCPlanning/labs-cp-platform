module.exports={

  //expects an object of filters like
  // {
  //   field1:['value1', 'value2'],
  //   field2:['value1', 'value2']
  // }
  //generates combined filter for mapboxGL

  mapboxGL(filters) {

    //build an array of fields
    var fields = [] 
    for(var key in filters) {
      fields.push(key)
    }

    //create an OR filter for each key based on the values in its array
    var filters = fields.map(function(field) {

      var values = filters[field],
        filter

      if(values.length>0) {
        filter = [
          "in",
          field
        ]

        values.map(function(value) {
          filter.push(value.value)
        })
      } else {
        filter = []
      }

      return filter
    })


    //build a combined AND filter
    var allFilters = [
      'all'
    ]

    filters.map(function(filter) {
      if(filter.length>0) allFilters.push(filter)
    })

    return allFilters
  },


  SQL(filters) {

    //build an array of fields
    var fields = [] 
    for(var key in filters) {
      filters[key].length > 0 ? fields.push(key) : null
    }

    //return null if there are no filters
    if (fields.length < 1) return null

    //create an OR filter for each key based on the values in its array
    var ors = fields.map(function(field) {

      var values = filters[field]

      if(values.length>0) {
        var chunks = values.map(function(value) {
          return field + ' = \'' + value.value + '\''
        })

        return '(' + chunks.join(' OR ')  + ')'      
      }
    })

    var allFilters = ors.join(' AND ')
    return allFilters

  }
}