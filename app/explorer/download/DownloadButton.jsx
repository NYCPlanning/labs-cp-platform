import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, DropdownButton, MenuItem, Badge } from 'react-bootstrap';

import carto from '../../helpers/carto';
import ga from '../../helpers/ga';

class DownloadButton extends React.Component {
  logDownloadStat = (label, action) => {
    ga.event({
      category: 'download',
      action,
      label,
    });
  };

  render() {
    const { sql, layerID, counts, noun, filtered } = this.props;

    return (
      <div>
        <ButtonGroup vertical>
          <DropdownButton title={<span>{`${noun} `}<Badge>{counts.total}</Badge></span>} id={`${layerID}-complete`}>
            <MenuItem
              href={carto.completeDownloadUrlString(sql, layerID, 'csv')}
              onClick={() => this.logDownloadStat(layerID, 'csv')}
              eventKey="1"
            >CSV</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlString(sql, layerID, 'geojson')}
              onClick={() => this.logDownloadStat(layerID, 'geojson')}
              eventKey="2"
            >GeoJSON</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlString(sql, layerID, 'shp')}
              onClick={() => this.logDownloadStat(layerID, 'shapefile')}
              eventKey="3"
            >Shapefile</MenuItem>
          </DropdownButton>

          { filtered &&
            <DropdownButton title={<span>{`${noun} (filtered) `}<Badge>{counts.filtered}</Badge></span>} id={`${layerID}-filtered`}>
              <MenuItem
                href={carto.filteredDownloadUrlString(sql, layerID, 'csv')}
                onClick={() => this.logDownloadStat(layerID, 'csv')}
                eventKey="1"
              >CSV</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(sql, layerID, 'geojson')}
                onClick={() => this.logDownloadStat(layerID, 'geojson')}
                eventKey="2"
              >GeoJSON</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(sql, layerID, 'shp')}
                onClick={() => this.logDownloadStat(layerID, 'shapefile')}
                eventKey="3"
              >Shapefile</MenuItem>
            </DropdownButton>
          }
        </ButtonGroup>
      </div>
    );
  }
}

DownloadButton.propTypes = {
  sql: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
  layerID: PropTypes.string.isRequired,
  noun: PropTypes.string.isRequired,
  filtered: PropTypes.bool,
};

DownloadButton.defaultProps = {
  filtered: false,
};

export default DownloadButton;
