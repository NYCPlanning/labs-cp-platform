import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import _ from 'lodash';

const LAYER_TYPES = ['fill', 'line', 'symbol', 'circle', 'fill-extrusion', 'raster', 'background'];

class MapLayer extends React.Component {

  static displayName = 'MapLayer';

  componentWillMount() {
    if (!this.props.janeLayerId) {
      console.error(`<MapLayer /> has to be a direct child of <JaneLayer />. Check layer with id ${this.props.id}`); // eslint-disable-line
    }

    this.props.registerRedrawCallback(this.redrawLayer);
  }

  componentDidMount() {
    this.addLayer(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      this.redrawLayer(nextProps);
    }
  }

  componentWillUnmount() {
    this.removeLayer();
  }

  addLayer(props) {
    if (this.layerExists()) {
      return;
    }

    const config = _.pick(props,
      'id',
      'type',
      'metadata',
      'ref',
      'source',
      'sourceLayer',
      'minzoom',
      'maxzoom',
      'filter',
      'layout',
      'paint',
    );

    if (config.sourceLayer) {
      config['source-layer'] = config.sourceLayer;
      delete config.sourceLayer;
    }

    this.props.map.addLayer(config, props.previousMapLayer);

    if (this.props.onClick) {
      this.props.map.__INTERNAL__hoverLayers[this.props.id] = true;
      this.props.map.on('click', this.onClick);
    }
  }

  removeLayer() {
    if (!this.layerExists()) {
      return;
    }

    this.props.map.removeLayer(this.props.id);

    if (this.props.onClick) {
      delete this.props.map.__INTERNAL__hoverLayers[this.props.id];
      this.props.map.off('click', this.onClick);
    }
  }

  redrawLayer = (props) => {
    if (!this.layerExists()) {
      return;
    }

    this.removeLayer();
    this.addLayer(props || this.props);
  };

  onClick = (event) => {
    const features = this.props.map.queryRenderedFeatures(event.point, { layers: [this.props.id] });
    const uniqueFeatures = _.uniq(features, feature => feature.id);

    if (uniqueFeatures.length > 0) {
      this.props.onClick(uniqueFeatures, event);
    }
  };

  layerExists() {
    return !!this.props.map.getLayer(this.props.id);
  }

  renderPopup() {
    const { map, id } = this.props;

    return React.Children.map(this.props.children, (child) => {
      if (!map || !child) {
        return null;
      }

      return React.cloneElement(child, { map, mapLayerId: id });
    });
  }

  render() {
    return (
      <div>
        { this.renderPopup() }
      </div>
    );
  }
}

MapLayer.propTypes = {
  map: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(LAYER_TYPES),
  metadata: PropTypes.object,
  ref: PropTypes.string,
  source: PropTypes.string,
  sourceLayer: PropTypes.string,
  minzoom: PropTypes.number,
  maxzoom: PropTypes.number,
  filter: PropTypes.array,
  layout: PropTypes.object,
  paint: PropTypes.object,
  janeLayerId: PropTypes.string,
  previousMapLayer: PropTypes.string,
  order: PropTypes.number,
  onClick: PropTypes.func,
  registerRedrawCallback: PropTypes.func.isRequired,
  popup: PropTypes.bool,
  children: PropTypes.any,
};

MapLayer.defaultProps = {
  map: {},
  registerRedrawCallback: () => null,
  previousMapLayer: null,
  janeLayerId: null,
  popup: null,
  children: null,
};

export default MapLayer;
