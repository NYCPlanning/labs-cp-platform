import { defaultLayers } from './defaultLayers';

module.exports = {
  allChecked() {
    return this.checkAllLayers(defaultLayers(), true);
  },

  allUnchecked() {
    return this.checkAllLayers(defaultLayers(), false);
  },

  partialChecked(selected) {
    return this.checkAllSelected(defaultLayers(), selected);
  },

  checkAllLayers(layers, checked = true) {
    return layers.map((l) => {
      l.checked = checked;
      if (l.children) { this.checkAllLayers(l.children, checked); }
      return l;
    });
  },

  checkAllSelected(layers, context) {
    return layers.map((l) => {
      const keys = Object.keys(context);
      if (keys.includes(l.name)) {
        l.checked = true;
        if (l.children && context[l.name] === null) {
          this.checkAllLayers(l.children, true);
        } else if (l.children) {
          this.checkAllSelected(l.children, context[l.name]);
        }
      }
      return l;
    });
  },
};
