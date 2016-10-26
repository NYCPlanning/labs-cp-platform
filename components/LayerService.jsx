


export default class LayerService {

  constructor(mapObject, sqlMod) {
    this.map=mapObject
    this.addedLayers = {}
    this.sqlMod = sqlMod
    console.log(this.sqlMod)
  }

  update(layers) {
    var self=this

    console.log('in update, added layers are: ', this.addedLayers)

    layers.forEach(function(layerName) {
      if (!self.addedLayers[layerName]) {
        self.createLayer(layerName)
      }
    })

    //now check addedLayers for layers that are no longer selected, remove them
    for (var layerName in this.addedLayers) {
      if (layers.indexOf(layerName) == -1) {
        self.removeLayer(layerName)
      }
    }
  }

  createLayer(layerName) {

    var vizJson = this.getConfig(layerName)

    var self=this
    cartodb.createLayer(this.map, vizJson)
      .on('done', function(layer) {

        self.addedLayers[layerName] = layer
        self.map.addLayer(self.addedLayers[layerName])

        var originalSQL = layer.getSubLayer(0).getSQL()
        console.log(self.sqlMod)
        var newSQL = Mustache.render(self.sqlMod, {
          originalSQL: originalSQL
        })
        console.log('new SQL', newSQL)

        self.addedLayers[layerName].getSubLayer(0).setSQL(newSQL)

      })   
  }

  removeLayer(layerName) {
    //iterate over sublayers to hide
    var layer = this.addedLayers[layerName]
    console.log('removing', layer)
    layer.layers.forEach(function(subLayer, i) {
      layer.getSubLayer(i).hide()
    })


    this.map.removeLayer(layer)
    delete this.addedLayers[layerName]
  }

  getConfig(layerName) {
    if (layerName == 'pipeline') return 'https://carto.capitalplanning.nyc/user/nchatterjee/api/v2/viz/02c7c7e4-8be8-11e6-bc56-0242ac110002/viz.json'
    else if (layerName == 'facilities') return 'https://carto.capitalplanning.nyc/user/hkates/api/v2/viz/c8d2c9f6-7a00-11e6-85c0-0242ac110002/viz.json'
  }
}


 // var sql = 
 //          `SELECT a.* 
 //          FROM nchatterjee.residential_pipeline_100416_v1_users a, (
 //            SELECT the_geom 
 //            FROM cpadmin.dcp_cdboundaries 
 //            WHERE borocd='306'
 //          ) b 
 //          WHERE ST_Within(a.the_geom, b.the_geom)`

       

 //        layer.getSubLayer(0).setSQL(sql)

 //        layer
 //          .on('featureOver', function(e, latlng, pos, data) {
 //            $('#map').css('cursor','pointer');
 //          })
 //          .on('featureOut', function(e, latlng, pos, data) {
 //            $('#map').css('cursor','-webkit-grab'); 
 //          })
 //          //.on('featureClick', self.props.handleFeatureClick)

 //        layer.bind('loading', function() { $('.map-loader').fadeIn() });
 //        layer.bind('load',  function() { $('.map-loader').fadeOut(); });