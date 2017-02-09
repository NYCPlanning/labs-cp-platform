import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';

import Checkbox from './Checkbox';

import './NestedSelect.scss';

const NestedSelect = React.createClass({

  propTypes: {
    onUpdate: PropTypes.func.isRequired,
    layers: PropTypes.array.isRequired,
  },

  handleToggle(address) {
    const layers = this.props.layers;
    // TODO write a recursive function to handle all of this

    // if top-level, toggle all grandchildren
    if (address.length === 1) {
      const layer = layers[address[0]];
      const checkedStatus = !layer.checked;

      layer.children.forEach((child) => {
        child.children.forEach((grandchild) => {
          grandchild.checked = checkedStatus;
        });
      });
    }

    // if middle-level, toggle all children
    if (address.length === 2) {
      const layer = layers[address[0]].children[address[1]];
      layer.children.forEach((child) => {
        child.checked = !layer.checked;
      });
    }

    // if bottom-level, toggle checked
    if (address.length === 3) {
      const layer = layers[address[0]].children[address[1]].children[address[2]];
      layer.checked = !layer.checked;
    }

    this.props.onUpdate(layers);
  },

  // recursive list item generator
  composeListItems(items, address) {
    const self = this;

    if (items) {
      return items.map((item, i) => {
        const newAddress = address.slice(0);
        newAddress.push(i);

        const checkbox = (
          <Checkbox
            value={item.name}
            checked={item.checked}
            indeterminate={item.indeterminate}
            onChange={self.handleToggle.bind(self, newAddress)}
          />
        );

        if (item.children) {
          const children = item.children ? this.composeListItems(item.children, newAddress) : null;

          return (
            <ListItem
              primaryText={item.name}
              key={`item${newAddress.join('')}`}
              leftCheckbox={checkbox}
              initiallyOpen
              nestedItems={children}
            />
          );
        }

        return (
          <ListItem
            primaryText={item.name}
            key={`item${newAddress.join('')}`}
            leftCheckbox={checkbox}
          />
        );
      });
    }

    return null;
  },

  render() {
    const layers = this.props.layers;
    const listItems = this.composeListItems(layers, []);

    return (

      <List className="nested-select">
        { listItems }
      </List>
    );
  },
});

export default NestedSelect;
