import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class DataCaveats extends React.Component {
  activeLayers = () => this.props.layers.filter(layer => layer.enabled);
  activeLayerIDs = () => this.activeLayers().map(layer => layer.id);

  render() {
    if (this.activeLayerIDs().includes('capital-projects') ||
        this.activeLayerIDs().includes('housing-development')) {
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip">Preliminary data for internal city planning purposes.</Tooltip>}
        >
          <div
            className="data-caveats label label-warning"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Draft Data
            <i
              className="fa fa-exclamation-triangle"
              style={{ paddingLeft: '5px' }}
              aria-hidden="true"
            />
          </div>
        </OverlayTrigger>
      );
    }

    return null;
  }
}

DataCaveats.propTypes = {
  layers: PropTypes.array.isRequired,
};

export default DataCaveats;
