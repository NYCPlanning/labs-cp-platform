import React, {PropTypes} from 'react'
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import FontIcon from 'material-ui/FontIcon'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

const listItemSource = {
  beginDrag(props) {
    return {
      id: props.layer.id,
      index: props.index
    }
  }
}

const listItemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveListItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },

  drop(props, monitor, component) {
    props.onDrop()
  }
}

let ListItem = React.createClass({

  handleClick(layer, e) {
    if (e.target.type != 'checkbox') this.props.onClick(layer.id)
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

    const { text, isDragging, connectDragSource, connectDropTarget, layer, onToggle } = this.props;

    return connectDragSource(connectDropTarget(
      <div className={this.props.className} onClick={this.handleClick.bind(this, layer)}>
        
        { !this.props.expanded && (
          <OverlayTrigger 
            placement="right" 
            overlay={ <Tooltip id={layer.name}>{layer.name}</Tooltip>} 
          >
            <FontIcon className={'fa fa-' + layer.icon} style={style.fontIcon}/> 
          </OverlayTrigger>
        )}

        { this.props.expanded && (
          <FontIcon className={'fa fa-' + layer.icon} style={style.fontIcon}/> 
        )}

        {layer.name}

      </div>
    ))
  }
})

ListItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveListItem: PropTypes.func.isRequired
}

ListItem = DragSource('listItem', listItemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ListItem)

ListItem = DropTarget('listItem', listItemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ListItem)

export default ListItem