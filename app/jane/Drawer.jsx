import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import Toggle from 'material-ui/Toggle';

const Drawer = React.createClass({

  handleLayerToggle(layerid) {
    this.props.onLayerToggle(layerid)
  },

  render() {
    const style = {
      fontIcon: {
        fontSize: '18px',
        margin: '8px',
        height: '18px',
        width: '18px',
        left: 0
      },
      toggle: {
        position: 'absolute',
        display: 'initial',
        width: 'auto',
        right: '8px',
        top: '7px'
      }
    }

    let layers = this.props.mapConfig.layers.map((layer, i) => {
      return (
        <div
          className={this.props.mapConfig.selectedLayer == layer.id ? 'list-item active' : 'list-item'}
          key={layer.id}
        >
          <FontIcon className="fa fa-home" style={style.fontIcon}/> 
          {layer.id}
          <Toggle 
            style={style.toggle}
            toggled={layer.visible}
            onToggle={this.handleLayerToggle.bind(this, layer.id)}
          />
        </div>
      )
    })

    //reverse layers so the list reflects the map (first in array will be bottom on map)
    layers = layers.slice().reverse()

    return(
      <div className='jane-drawer'>
        {layers}
      </div>
    )
  }
})

export default Drawer