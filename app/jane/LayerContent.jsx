import React from 'react'
import FontIcon from 'material-ui/FontIcon'

const LayerContent = React.createClass({
  render() {
    const { layers, selectedLayer } = this.props

    const activeLayer = layers.filter((layer) => {
      return layer.id == selectedLayer
    })[0]

    const style = {
      fontIcon: {
        fontSize: '18px',
        margin: '8px',
        height: '18px',
        width: '18px',
        left: 0
      }
    }

    //if the layer has a component, mount it
    const components = layers.map((layer) => {
      const LayerComponent = layer.component

      if (LayerComponent) {
        return (
          <div
            style={{
              display: layer.id == selectedLayer ? 'inline' : 'none'
            }}
            key={layer.id}
          >
            <LayerComponent
              layer={layer}
              onUpdate={this.props.onLayerUpdate}
            />
          </div>
        )
      }
    })
    
    return (
      <div className='second-drawer'>
        <div className='second-drawer-header' >
          <FontIcon className="fa fa-home" style={style.fontIcon}/> 
          {activeLayer.name}
        </div>

        {components}
      </div>
    )
  }
})

export default LayerContent