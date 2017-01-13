import React from 'react';
import Carto from '../Carto';

const CartoVectorSource = React.createClass({

  componentWillMount() {
    this.map = this.props.map.mapObject;
    // fetch data if necessary, add layer to map
    if (!this.props.source.tiles) {
      this.fetchData(this.props.source.options.sql);
    }
  },

  componentWillReceiveProps(nextProps) {
    // compare sql
    if (!(nextProps.source.options.sql == this.props.source.options.sql)) {
      this.fetchData(nextProps.source.options.sql);
    }
  },

  fetchData(sqlArray) {
    const self = this;

    const mapConfig = {
      version: '1.3.0',
      layers: [],
    };

    sqlArray.map((sql) => {
      mapConfig.layers.push({
        type: 'mapnik',
        options: {
          cartocss_version: '2.1.1',
          cartocss: '#layer { polygon-fill: #FFF; }',
          sql,
        },
      });
    });


    Carto.getVectorTileTemplate(mapConfig, this.props.source.options)
      .then((template) => {
        self.addSource(template);
      });
  },

  addSource(template) {
    if (this.map.getSource(this.props.source.id)) {
      this.map.removeSource(this.props.source.id);
    }

    this.map.addSource(this.props.source.id, {
      type: 'vector',
      tiles: [template],
    });

    this.props.onLoaded(this.map.getStyle().sources);
  },

  render() {
    return null;
  },
});

export default CartoVectorSource;
