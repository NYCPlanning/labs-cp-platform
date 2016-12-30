import React, {PropTypes} from 'react'
import update from 'react/lib/update'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ListItem from './ListItem.jsx'

// This component keeps track of its own state for the order of the layers to implement drag and drop functionality
// Once an item is dropped, we then pass the new layer order up to Jane to update the main state


const Drawer = React.createClass({

  getInitialState() {
    return({
      layers: this.props.layers
    })
  },

  handleDrop() {
    //on drop pass the current state up to Jane
    this.props.onLayerChange(this.state.layers)
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
    let layers = this.state.layers.map((layer, i) => {
      return (
        <ListItem
          className={this.props.selectedLayer == layer.id ? 'list-item selected' : 'list-item'}
          layer={layer}
          onToggle={this.props.onLayerToggle}
          moveListItem={this.moveListItem}
          index={i}
          onDrop={this.handleDrop}
          key={layer.id}
          onClick={this.props.onLayerClick}
        />
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

export default DragDropContext(HTML5Backend)(Drawer)


