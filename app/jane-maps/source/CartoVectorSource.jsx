import React from 'react';
import PropTypes from 'prop-types';
import Carto from '../Carto';

class CartoVectorSource extends React.Component {

  static displayName = 'CartoVectorSource';

  componentWillMount() {
    this.map = this.props.map;

    if (this.props.isLoaded) {
      return;
    }

    // fetch data if necessary, add layer to map
    if (!this.props.source.tiles) {
      this.fetchData(this.props.source.options.sql, this.addSource);
    }
  }

  componentWillReceiveProps(nextProps) {
    // compare sql
    if (!(nextProps.source.options.sql === this.props.source.options.sql)) {
      this.fetchData(nextProps.source.options.sql, this.updateSource);
    }
  }

  componentWillUnmount() {
    if (this.props.source.nocache) {
      this.map.removeSource(this.props.source.id);
    }
  }

  fetchData = (sqlArray, cb) => {
    const mapConfig = {
      version: '1.3.0',
      layers: [],
    };

    sqlArray.forEach((sql) => {
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
        cb(template);
      });
  }

  addSource = (template) => {
    if (this.map.getSource(this.props.source.id)) {
      this.map.removeSource(this.props.source.id);
    }

    this.map.addSource(this.props.source.id, {
      type: 'vector',
      tiles: [template],
    });

    this.props.onLoaded(this.map.getStyle().sources);
  };

  updateSource = (template) => {
    const newStyle = this.map.getStyle();
    newStyle.sources[this.props.source.id].tiles = [template];
    this.map.setStyle(newStyle);
  };

  render() {
    return null;
  }
}

CartoVectorSource.propTypes = {
  map: PropTypes.shape({
    mapObject: PropTypes.object,
  }).isRequired,
  source: PropTypes.shape({
    options: PropTypes.object,
    tiles: PropTypes.array,
    id: PropTypes.string,
    nocache: PropTypes.bool,
  }).isRequired,
  onLoaded: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
  nocache: PropTypes.bool,
};

CartoVectorSource.defaultProps = {
  isLoaded: false,
  nocache: false,
};

export default CartoVectorSource;
