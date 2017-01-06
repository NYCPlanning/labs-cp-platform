import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';


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
        color: '#5F5F5F',
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
              context={this.props.context}
            />
          </div>
        )
      }
    })
    
    return (
      <div 
        className={'second-drawer ' + (this.props.offset ? 'offset' : '')}
        style={{
          transform: this.props.visible ? 'translate(0px, 0px)' : 'translate(-320px, 0px)'
        }}
      >
        {activeLayer && (<div className='drawer-header' >
          <FontIcon className={'fa fa-' + activeLayer.icon} style={style.fontIcon}/> 
          {activeLayer.name}
          <IconButton 
            iconClassName={'fa fa-times'} 
            style={{
              width: 36,
              height: 36,
              padding: 0,
              position: 'absolute',
              right: 0
            }}
            iconStyle={{
              fontSize: '15px',
              margin: '8px',
              height: '15px',
              width: '15px',
              float: 'right',
              color: '#5F5F5F'
            }}
            onTouchTap={this.props.onClose}
          /> 
        </div>)}

        {components}
      </div>
    )
  }
})

export default LayerContent