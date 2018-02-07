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
    const { sql, layerID, counts, filtered } = this.props;

    return (
      <div>
        <ButtonGroup vertical>
          <DropdownButton title={<span>{'Budget Requests (mapped) '}<Badge>{counts.total}</Badge></span>} id={`${layerID}-complete`}>
            <MenuItem
              href={carto.completeDownloadUrlStringPtsPoly(sql, layerID, 'csv')}
              onClick={this.logDownloadStat('budget-requests_full', 'csv')}
              eventKey="1"
            >CSV</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlStringPtsPoly(sql, layerID, 'geojson')}
              onClick={this.logDownloadStat('budget-requests_full', 'geojson')}
              eventKey="2"
            >GeoJSON</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlString(sql.points, layerID, 'shp')}
              onClick={this.logDownloadStat('budget-requests_full', 'shapefile-points')}
              eventKey="3"
            >Shapefile (points)</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlString(sql.polygons, layerID, 'shp')}
              onClick={this.logDownloadStat('budget-requests_full', 'shapefile-polygons')}
              eventKey="4"
            >Shapefile (polygons)</MenuItem>
          </DropdownButton>

          { filtered &&
            <DropdownButton title={<span>{'Budget Requests (mapped, filtered) '}<Badge>{counts.filtered}</Badge></span>} id={`${layerID}-filtered`}>
              <MenuItem
                href={carto.filteredDownloadUrlStringPtsPoly(sql, layerID, 'csv')}
                onClick={this.logDownloadStat('budget-requests_filtered', 'csv')}
                eventKey="1"
              >CSV</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlStringPtsPoly(sql, layerID, 'geojson')}
                onClick={this.logDownloadStat('budget-requests_filtered', 'geojson')}
                eventKey="2"
              >GeoJSON</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(sql.points, layerID, 'shp')}
                onClick={this.logDownloadStat('budget-requests_filtered', 'shapefile-points')}
                eventKey="3"
              >Shapefile (points)</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(sql.polygons, layerID, 'shp')}
                onClick={this.logDownloadStat('budget-requests_filtered', 'shapefile-polygons')}
                eventKey="4"
              >Shapefile (polygons)</MenuItem>
            </DropdownButton>
          }
        </ButtonGroup>
      </div>
    );
  }
}

DownloadButton.propTypes = {
  sql: PropTypes.object.isRequired,
  counts: PropTypes.object.isRequired,
  layerID: PropTypes.string.isRequired,
  filtered: PropTypes.bool,
};

DownloadButton.defaultProps = {
  filtered: false,
};

export default DownloadButton;
