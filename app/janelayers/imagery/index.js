
module.exports = {
  id: 'aerials',
  name: 'Aerials Imagery',
  icon: 'camera',
  visible: false,
  sources: [
    {
      id: 'nyaerials',
      type: 'raster',
      tiles: 'http://www.orthos.dhses.ny.gov/arcgis/rest/services/2010/MapServer/tile/{z}/{y}/{x}' 
    } 
  ],
  mapLayers: [
    {
      "id": 'nyaerials',
      "type": "raster",
      "source": 'nyaerials'
    }
  ]
}