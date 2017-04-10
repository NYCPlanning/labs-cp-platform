import { defaultLayers } from './defaultLayers';

const colors = {
  getColor(value) {
    const colorObject = this.getColorObject();

    return colorObject.stops.filter(stop => stop[0] === value)[0][1];
  },

  getColorObject() {
  // generate a mapboxGL style categorical color object based on mode
  // if(this.props.mode=='all') {
    return {
      property: 'facdomain',
      type: 'categorical',
      stops: defaultLayers().map(layer => [
        layer.name,
        layer.color,
      ]),
    };
  },
};

export default colors;
