import Component from './Component';
import ListItem from './ListItem';

module.exports = {
  id: 'facilities',
  name: 'Facilities DB',
  icon: 'university',
  visible: true,
  interactivityMapLayers: ['facilities-points'],
  component: Component,
  listItem: ListItem,
};
