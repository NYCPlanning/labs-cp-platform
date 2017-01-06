import React from 'react'
import update from 'react/lib/update'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const layerConfig = {
  subway_lines: {
    sources: [ 
      {
        id: 'subway_lines',
        type: 'cartoraster',
        options: { 
          "cartocss": `
            #doitt_subwaylines {
                 line-width: 3;
                 line-opacity:0.9;
              }

              #doitt_subwaylines[rt_symbol="1"] {
                 line-color: #EE352E;
              }
              #doitt_subwaylines[rt_symbol="4"] {
                 line-color: #00933C;
              }
              #doitt_subwaylines[rt_symbol="7"] {
                 line-color: #B933AD ;
              }
              #doitt_subwaylines[rt_symbol="A"] {
                 line-color: #0039A6 ;
              }
              #doitt_subwaylines[rt_symbol="B"] {
                 line-color: #FF6319 ;
              }
              #doitt_subwaylines[rt_symbol="G"] {
                 line-color: #6CBE45 ;
              }
              #doitt_subwaylines[rt_symbol="J"] {
                 line-color: #996633 ;
              }
              #doitt_subwaylines[rt_symbol="L"] {
                 line-color: #A7A9AC ;
              }
              #doitt_subwaylines[rt_symbol="N"] {
                 line-color: #FCCC0A ;
              }
              #doitt_subwaylines[rt_symbol="SI"] {
                 line-color: #0F3B82 ;
              }`,
          "sql": "select * from doitt_subwaylines"    
        } 
      }
    ],
    mapLayers: [
      {
        "id": 'subway_lines',
        "type": "raster",
        "source": 'subway_lines'
      }
    ]
  }
}

const Transportation = React.createClass({

  componentDidMount() {

    this.updateMapElements(layerConfig.subway_lines)
  },

  updateMapElements(layerConfig) {
    //mutate the layer object and pass it up to jane

    const newLayer = update(this.props.layer, {
      sources: {$set: layerConfig.sources},
      mapLayers: {$set: layerConfig.mapLayers}
    })

    this.props.onUpdate(newLayer)
  },

  handleChange(e, key, value) {

  },

  render() {
    return (
      <div>
        Transportation Layer
      </div>
    )
  }
})

export default Transportation