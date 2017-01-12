import Component from './Component.jsx'
import ListItem from './ListItem.jsx'

module.exports = {
  id: 'pipeline',
  name: 'Housing Pipeline',
  icon: 'building',
  visible: true,
  interactivityMapLayers: ['pipeline-points'],
  component: Component,
  listItem: ListItem
}
