import Component from './Component';
import ListItem from './ListItem';

module.exports = {
  id: 'pipeline',
  name: 'Housing Pipeline',
  icon: 'building',
  visible: true,
  interactivityMapLayers: ['pipeline-points'],
  component: Component,
  listItem: ListItem,
};
