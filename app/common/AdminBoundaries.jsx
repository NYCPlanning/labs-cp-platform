import React from 'react'
import update from 'react/lib/update'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const layerConfig = {
  nta: {
    sources: [ 
      {
        id: 'ntaboundaries',
        type: 'geojson',
        source: 'data/ntaboundaries.geojson'
      }
    ],
    mapLayers: [
      {
        id: 'ntaboundaries',
        source: 'ntaboundaries',
        type: 'line',
        "paint": {
          "line-color": "#888",
          "line-width": 3,
          "line-dasharray": [2,2]
        }
      }
    ]
  },
  cd: {
    sources: [
      {
        id: 'cdboundaries',
        type: 'geojson',
        source: 'data/cdboundaries.geojson'
      }
    ],
    mapLayers: [
      {
        id: 'cdboundaries',
        source: 'cdboundaries',
        type: 'line',
        "paint": {
          "line-color": "#888",
          "line-width": 3,
          "line-dasharray": [2,2]
        }
      }
    ]
  }
}

const AdminBoundaries = React.createClass({

  getInitialState() {
    return({
      value: 'nta'
    })
  },

  componentDidMount() {

    this.updateMapElements(layerConfig.nta)
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

    this.setState({
      value: value
    })

    this.updateMapElements(layerConfig[value])
  },

  render() {
    return (
      <div>
        Admin Boundaries

         <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={false}
        >
          <MenuItem value={'nta'} primaryText="Neighborhood Tabulation Areas" />
          <MenuItem value={'cd'} primaryText="Community Districts" />

        </DropDownMenu>

      </div>
    )
  }
})

export default AdminBoundaries