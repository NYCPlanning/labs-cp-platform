import React from 'react';
import PropTypes from 'prop-types';
import DownloadButton from './download/DownloadButton';

class Download extends React.Component {
  activeLayers = () => this.props.layers.filter(layer => layer.enabled);
  activeLayerIDs = () => this.activeLayers().map(layer => layer.id);

  buttonTitleMap = {
    'capital-projects': 'Capital Projects',
    scaplan: 'SCA Capital Projects',
    'housing-development': 'Housing Development',
    'cb-budgetrequests': 'Budget Requests',
    'facilities-cp': 'Facilities',
  }

  render() {
    return (<div>
      {
        this.activeLayerIDs().map(layerID => (
          <DownloadButton
            layerID={layerID}
            title={this.buttonTitleMap[layerID]}
            sql=""
          />
        ))
      }
    </div>);
  }
}

Download.propTypes = {
  layers: PropTypes.array.isRequired,
};

Download.defaultProps = {

};

export default Download;
