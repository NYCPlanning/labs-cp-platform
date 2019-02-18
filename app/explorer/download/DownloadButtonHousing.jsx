import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, DropdownButton, MenuItem, Badge } from 'react-bootstrap';

import InfoIcon from '../../common/InfoIcon';
import carto from '../../helpers/carto';
import ga from '../../helpers/ga';
import db_tables from '../../config/db_tables';

class DownloadButton extends React.Component {
  logDownloadStat = (label, action) => {
    ga.event({
      category: 'download',
      action,
      label,
    });
  };

  render() {
    const { sql, layerID, counts, filtered } = this.props;

    return (
      <div>
        <ButtonGroup vertical>
          <DropdownButton
            title={<span>{'Developments (cleaned) '}
              <InfoIcon
                placement="left"
                text="Dataset cleaned by DCP that excludes ungeocoded records, duplicates, outliers, and withdrawn and suspended developments."
              />
              <Badge>{counts.total}</Badge></span>}
            id={`${layerID}-cleaned`}
          >
            <MenuItem
              href={carto.generateUrlString(sql, 'csv', 'housing-development_cleaned')}
              onClick={this.logDownloadStat('housing-development_cleaned', 'csv')}
              eventKey="1"
            >CSV</MenuItem>

            <MenuItem
              href={carto.generateUrlString(sql, 'geojson', 'housing-development_cleaned')}
              onClick={this.logDownloadStat('housing-development_cleaned', 'geojson')}
              eventKey="2"
            >GeoJSON</MenuItem>

            <MenuItem
              href={carto.generateUrlString(sql, 'shp', 'housing-development_cleaned')}
              onClick={this.logDownloadStat('housing-development_cleaned', 'shapefile')}
              eventKey="3"
            >Shapefile</MenuItem>
          </DropdownButton>

          { filtered &&
            <DropdownButton
              title={<span>{'Developments (cleaned, filtered) '}
                <Badge>{counts.filtered}</Badge></span>}
              id={`${layerID}-filtered`}
            >
              <MenuItem
                href={carto.filteredDownloadUrlString(sql, layerID, 'csv')}
                onClick={this.logDownloadStat('housing-development_filtered', 'csv')}
                eventKey="1"
              >CSV</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(sql, layerID, 'geojson')}
                onClick={this.logDownloadStat('housing-development_filtered', 'geojson')}
                eventKey="2"
              >GeoJSON</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(sql, layerID, 'shp')}
                onClick={this.logDownloadStat('housing-development_filtered', 'shapefile')}
                eventKey="3"
              >Shapefile</MenuItem>
            </DropdownButton>
          }
        </ButtonGroup>

        <ButtonGroup vertical style={{ marginTop: '10px' }}>
          <DropdownButton
            title={<span>{'Developments (raw) '}
              <InfoIcon
                placement="left"
                text="Full, raw dataset including ungeocoded records, duplicates, outliers, and withdrawn and suspended developments."
              />
              <Badge>{counts.raw}</Badge></span>}
            id={`${layerID}-raw`}
          >
            <MenuItem
              href={carto.filteredDownloadUrlString(`SELECT * FROM ${db_tables.housingdevdb}`, layerID, 'csv')}
              onClick={this.logDownloadStat('housing-development_raw', 'csv')}
              eventKey="1"
            >CSV</MenuItem>

            <MenuItem
              href={carto.filteredDownloadUrlString(`SELECT * FROM ${db_tables.housingdevdb}`, layerID, 'geojson')}
              onClick={this.logDownloadStat('housing-development_raw', 'geojson')}
              eventKey="2"
            >GeoJSON</MenuItem>

            <MenuItem
              href={carto.filteredDownloadUrlString(`SELECT * FROM ${db_tables.housingdevdb}`, layerID, 'shp')}
              onClick={this.logDownloadStat('housing-development_raw', 'shapefile')}
              eventKey="3"
            >Shapefile</MenuItem>
          </DropdownButton>
        </ButtonGroup>
      </div>
    );
  }
}

DownloadButton.propTypes = {
  sql: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
  layerID: PropTypes.string.isRequired,
  filtered: PropTypes.bool,
};

DownloadButton.defaultProps = {
  filtered: false,
};

export default DownloadButton;
