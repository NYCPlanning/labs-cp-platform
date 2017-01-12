import React from 'react'
import update from 'react/lib/update'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import {Tabs, Tab} from 'material-ui/Tabs'

import appConfig from '../../helpers/appConfig.js'


const layerConfig = {
  subway_lines: {
    sources: [ 
      {
        id: 'subway_lines',
        type: 'cartoraster',

        options: { 
          "carto_user": appConfig.carto_user,
          "carto_domain": appConfig.carto_domain,
          "cartocss": `
            #doitt_subwaylines {
                 line-width: 2;
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
  },

  subway_stations: {
    sources: [
      {
        id: "subway_stations",
        type: 'cartoraster',
        options: { 
          "carto_user": appConfig.carto_user,
          "carto_domain": appConfig.carto_domain,
          "cartocss": `
            #doitt_subwaystations{
              marker-fill-opacity: 0.9;
              marker-line-color: #000000;
              marker-line-width: 1;
              marker-line-opacity: 1;
              marker-placement: point;
              marker-type: ellipse;
              marker-width: 5;
              marker-fill: #FFFFFF;
              marker-allow-overlap: true;
            }`,
          "sql": "select * from doitt_subwaystations"    
        }
      }
    ],
    mapLayers: [
      {
        "id": 'subway_stations',
        "type": "raster",
        "source": 'subway_stations'
      }
    ]
  }
}

const Transportation = React.createClass({
  getInitialState() {
    return({
      activeCheckboxes: ['subway_lines']
    })
  },



  componentDidMount() {
    this.updateMapElements()
  },

  updateMapElements() {
  
    let sources=[], mapLayers=[]

    console.log(this.state.activeCheckboxes)

    this.state.activeCheckboxes.map((id) => {
      console.log(layerConfig[id])
      const config = layerConfig[id]
      config.sources.map((source) => { sources.push(source)})
      config.mapLayers.map((mapLayer) => { mapLayers.push(mapLayer)})
    })

    this.props.onUpdate('transportation', {
      sources: sources,
      mapLayers: mapLayers
    })
  },

  handleCheck(id) {
    let found = this.state.activeCheckboxes.includes(id)
    if (found) {
      this.setState({ 
        activeCheckboxes: this.state.activeCheckboxes.filter(x => x !== id)
      }, this.updateMapElements)
    } else {
      this.setState({ 
        activeCheckboxes: [ ...this.state.activeCheckboxes, id ]
      }, this.updateMapElements)
    }

    
  },

  render() {
    return (
      <div>
        <Tabs className='sidebar-tabs'>
          <Tab label='Data'>
            <div className="sidebar-tab-content">
              <h4>Transportation Layers</h4> 

              <Checkbox
                label="Subway Lines"
                checked={this.state.activeCheckboxes.includes('subway_lines')}
                onCheck={this.handleCheck.bind(this, 'subway_lines')}
              />
              <Checkbox
                label="Subway Stations"
                checked={this.state.activeCheckboxes.includes('subway_stations')}
                onCheck={this.handleCheck.bind(this, 'subway_stations')}
              />
            </div>
          </Tab>
          <Tab label='About'>
            <div className="sidebar-tab-content">
              <h4>Transportation Layers</h4> 
              <p>These layers are provided by the DoITT GIS Team, and are available on their <a href="https://nycdoittpublicdata.carto.com/u/nycpublicdata/">public carto server</a>.</p>
            </div>
          </Tab>
        </Tabs>

      </div>
    )
  }
})

export default Transportation