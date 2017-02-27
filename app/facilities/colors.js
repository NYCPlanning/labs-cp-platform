import { layerDefaults } from './layerDefaults';

const colors = {
  getColor(value) {
    const colorObject = this.getColorObject();

    return colorObject.stops.filter(stop => stop[0] === value)[0][1];
  },

  getColorObject() {
  // generate a mapboxGL style categorical color object based on mode
  // if(this.props.mode=='all') {
    return {
      property: 'domain',
      type: 'categorical',
      stops: layerDefaults().map(layer => [
        layer.name,
        layer.color,
      ]),
    };
  // } else {
  //   return {
  //     property: 'facilitygroup',
  //     type: 'categorical',
  //     stops: this.layerStructure[0].children.map(function(layer) {
  //       return [
  //         layer.name,
  //         layer.color
  //       ]
  //     })
  //   }
  // }
  },
};

export default colors;
