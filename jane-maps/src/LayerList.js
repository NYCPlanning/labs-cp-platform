import React, {PropTypes} from 'react'
import update from 'react/lib/update'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import IconButton from 'material-ui/IconButton'


import ListItem from './ListItem.js'

// This component keeps track of its own state for the order of the layers to implement drag and drop functionality
// Once an item is dropped, we then pass the new layer order up to Jane to update the main state

const LayerList = React.createClass({

  getInitialState() {
    return({
      layers: this.props.layers
    })
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      layers: nextProps.layers
    })
  },

  handleDrop() {
    //on drop pass the current state up to Jane
    this.props.onLayerReorder(this.state.layers)
  },

  moveListItem(dragIndex, hoverIndex) {
    const { layers } = this.state
    const dragLayer = layers[dragIndex]

    this.setState(update(this.state, {
      layers: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragLayer]
        ]
      }
    }), this.props.update)
  },

  render() {
    const style = {
      fontIcon: {
        fontSize: '15px',
        margin: '7px 10px',
        height: '15px',
        width: '15px',
        color: '#5F5F5F',  
        left: 0
      }
    }

    let layers = this.state.layers.map((layer, i) => {
      let className = this.props.selectedLayer == layer.id ? 'list-item selected' : 'list-item'
      if(!layer.visible) className += ' disabled'

      if(layer.inList != false) {
        return (
          <ListItem
            className={className}
            expanded={this.props.expanded}
            layer={layer}
            moveListItem={this.moveListItem}
            index={i}
            onDrop={this.handleDrop}
            key={layer.id}
            onClick={this.props.onLayerClick}
          />
        )
      }
    })

    //reverse layers so the list reflects the map (first in array will be bottom on map)
    layers = layers.slice().reverse()

    return(
      <div className={'jane-drawer ' + (this.props.expanded ? 'expanded' : '') }>
        <div className={'jane-drawer-inner'}>
          <div className='drawer-header' >
            <IconButton 
              style={{
                width: 36,
                height: 36,
                padding: 0
              }}
              iconClassName={this.props.expanded ? 'fa fa-chevron-left': 'fa fa-list-ul'} 
              iconStyle={style.fontIcon} 
              onTouchTap={this.props.onToggleExpanded}
            />
            Layers
          </div>
          {layers}
        </div>
      </div>
    )
  }
})

export default DragDropContext(HTML5Backend)(LayerList)