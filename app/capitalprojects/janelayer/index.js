import Component from './Component';
import ListItem from './ListItem';

module.exports = {
  id: 'capital-projects',
  name: 'Capital Projects',
  icon: 'usd',
  interactivityMapLayers: ['capital-projects-points', 'capital-projects-polygons'],
  visible: true,
  component: Component,
  listItem: ListItem,
};

