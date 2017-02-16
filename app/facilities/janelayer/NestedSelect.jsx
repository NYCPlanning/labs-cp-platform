import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';

import InfoIcon from '../../common/InfoIcon';
import Checkbox from './Checkbox';

import './NestedSelect.scss';

const NestedSelect = React.createClass({

  propTypes: {
    onUpdate: PropTypes.func.isRequired,
    layers: PropTypes.array.isRequired,
    expanded: PropTypes.bool,
    initiallyOpen: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      expanded: null,
      initiallyOpen: false,
    };
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

    this.props.onUpdate();
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

        const styles = [
          {
            background: item.color,
            padding: '10px 16px 10px 34px',
            marginBottom: '2px',

          },
          {
            background: '#ececec',
            padding: '10px 58px 10px 34px',
            marginBottom: '2px',
          },
          {
            fontSize: '12px',
            marginBottom: 0,
            padding: '3px 24px 3px 34px',
          },
        ];

        const style = styles[address.length];

        const listItemText = item.description ? <div><p>{item.name}</p><InfoIcon text={item.description} /></div> : item.name;

        if (item.children) {
          const children = item.children ? this.composeListItems(item.children, newAddress) : null;

          return (
            <ListItem
              primaryText={listItemText}
              style={style}
              key={`item${newAddress.join('')}`}
              leftCheckbox={checkbox}
              initiallyOpen={this.props.initiallyOpen}
              open={this.props.expanded}
              nestedListStyle={{ padding: 0 }}
              nestedItems={children}
            />
          );
        }

        return (
          <ListItem
            primaryText={listItemText}
            style={style}
            className="subgroup"
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

      <List
        className="nested-select"
      >
        { listItems }
      </List>
    );
  },
});

export default NestedSelect;
