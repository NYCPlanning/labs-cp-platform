import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import carto from '../../helpers/carto';
import ga from '../../helpers/ga';

class DownloadButton extends React.Component {
  logDownloadStat = (label) => {
    ga.event({
      category: 'download',
      action: 'csv',
      label,
    });
  };

  render() {
    const { sql, layerID, title } = this.props;

    return (
      <DropdownButton title={title} pullRight id="dropdown-size-medium">
        <MenuItem
          href={carto.completeDownloadUrlString(sql, layerID, 'csv')}
          onClick={this.logDownloadStat(layerID)}
          eventKey="1"
        >CSV</MenuItem>

        <MenuItem
          href={carto.completeDownloadUrlString(sql, layerID, 'shapefile')}
          onClick={this.logDownloadStat(layerID)}
          eventKey="2"
        >Shapefile</MenuItem>

        <MenuItem
          href={carto.completeDownloadUrlString(sql, layerID, 'geojson')}
          onClick={this.logDownloadStat(layerID)}
          eventKey="3"
        >GeoJSON</MenuItem>
      </DropdownButton>
    );
  }
}

DownloadButton.propTypes = {
  sql: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  layerID: PropTypes.string.isRequired,
};

export default DownloadButton;
