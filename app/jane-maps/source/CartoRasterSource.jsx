import React from 'react';
import PropTypes from 'prop-types';

class CartoRasterSource extends React.Component {

  static displayName = 'CartoRasterSource';

  componentWillMount() {
    this.map = this.props.map;

    if (this.props.isLoaded && !this.props.source.nocache) {
      return;
    }

    // fetch data if necessary, add layer to map
    if (!this.props.source.tiles) {
      this.fetchData(this.props.source.sql);
    }
  }

  componentWillReceiveProps(nextProps) {
    // compare sql

    if (!(nextProps.source.sql === this.props.source.sql)) {
      this.fetchData(nextProps.source.sql);
    }
  }

  componentWillUnmount() {
    if (this.props.source.nocache) {
      this.map.removeSource(this.props.source.id);
    }
  }

  fetchData() {
    const { carto_domain } = this.props.source.options;

    const mapConfig = {
      version: '1.3.0',
      layers: [{
        type: 'mapnik',
        options: {
          cartocss_version: '2.1.1',
          cartocss: this.props.source.options.cartocss,
          sql: this.props.source.options.sql,
        },
      }],
    };

    $.ajax({ // eslint-disable-line no-undef
      type: 'POST',
      data: JSON.stringify(mapConfig),
      url: `https://${carto_domain}/api/v1/map`,
      dataType: 'text',
      contentType: 'application/json',
      success: (data) => {
        data = JSON.parse(data);
        const layergroupid = data.layergroupid;
        const template = `https://${carto_domain}/api/v1/map/${layergroupid}/{z}/{x}/{y}.png`;
        this.addSource(template);
      },
    });
  }

  addSource(template) {
    if (this.map.getSource(this.props.source.id)) {
      this.map.removeSource(this.props.source.id);
    }

    this.map.addSource(this.props.source.id, {
      type: 'raster',
      tiles: [template],
    });

    this.props.onLoaded(this.map.getStyle().sources);
  }


  render() {
    return null;
  }
}

CartoRasterSource.propTypes = {
  map: PropTypes.shape({
    mapObject: PropTypes.object,
  }).isRequired,
  source: PropTypes.shape({
    options: PropTypes.object,
    tiles: PropTypes.array,
    id: PropTypes.string,
    sql: PropTypes.string,
    nocache: PropTypes.bool,
  }).isRequired,
  onLoaded: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
  nocache: PropTypes.bool,
};

CartoRasterSource.defaultProps = {
  isLoaded: false,
  nocache: false,
};

export default CartoRasterSource;
