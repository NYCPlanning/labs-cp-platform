import Component from './Component.jsx'
import ListItem from './ListItem.jsx'

module.exports = {
  id: 'capital-projects',
  name: 'Capital Projects',
  icon: 'usd',
  interactivityMapLayers: ['capital-projects-points', 'capital-projects-polygons'],
  visible: true,
  component: Component,
  listItem: ListItem
}

