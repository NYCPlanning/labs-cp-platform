import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, DropdownButton, MenuItem, Badge } from 'react-bootstrap';

import InfoIcon from '../../common/InfoIcon';
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
    const { mapSql, tableSql, commitmentsSql, layerID, counts, tableFiltered, mapFiltered } = this.props;

    return (
      <div>
        <ButtonGroup vertical>
          <DropdownButton title={<span>{'Capital Projects (all) '}<Badge>{counts.table}</Badge></span>} id={`${layerID}-complete`}>
            <MenuItem
              href={carto.completeDownloadUrlString(tableSql, 'projects', 'csv')}
              onClick={() =>  this.logDownloadStat('capital-project_all', 'projects')}
              eventKey="1"
            >Project Level (csv)</MenuItem>

            <MenuItem
              href={carto.completeCommitmentsDownloadUrlString(commitmentsSql, 'commitments', 'csv')}
              onClick={() =>  this.logDownloadStat('capital-project_all', 'commitments')}
              eventKey="2"
            >
              Commitment Level (csv)
              <InfoIcon
                placement="left"
                text="Commitment level data represents capital commitments before aggregating to the project level"
              />
            </MenuItem>
          </DropdownButton>

          { tableFiltered &&
            <DropdownButton title={<span>{'Filtered: Capital Projects (all) '}<Badge>{counts.tableFiltered}</Badge></span>} id={`${layerID}-filtered`}>
              <MenuItem
                href={carto.filteredDownloadUrlString(tableSql, 'projects', 'csv')}
                onClick={() =>  this.logDownloadStat('capital-project_all_filterd', 'projects')}
                eventKey="1"
              >Project Level (csv)</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(commitmentsSql, 'commitments', 'csv')}
                onClick={() =>  this.logDownloadStat('capital-project_all_filterd', 'commitments')}
                eventKey="2"
              >
                Commitment Level (csv)
                <InfoIcon
                  placement="left"
                  text="Commitment level data represents capital commitments before aggregating to the project level"
                />
              </MenuItem>
            </DropdownButton>
          }
        </ButtonGroup>

        <ButtonGroup vertical style={{ marginTop: '10px' }}>
          <DropdownButton title={<span>{'Capital Projects (mapped) '}<Badge>{counts.map}</Badge></span>} id={`${layerID}-complete`}>
            <MenuItem
              href={carto.completeDownloadUrlStringPtsPoly(mapSql, layerID, 'csv')}
              onClick={() =>  this.logDownloadStat('capital-project_mapped', 'csv')}
              eventKey="1"
            >CSV</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlStringPtsPoly(mapSql, layerID, 'geojson')}
              onClick={() =>  this.logDownloadStat('capital-project_mapped', 'geojson')}
              eventKey="2"
            >GeoJSON</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlString(mapSql.points, layerID, 'shp')}
              onClick={() =>  this.logDownloadStat('capital-project_mapped', 'shapefile-points')}
              eventKey="3"
            >Shapefile (points)</MenuItem>

            <MenuItem
              href={carto.completeDownloadUrlString(mapSql.polygons, layerID, 'shp')}
              onClick={() =>  this.logDownloadStat('capital-project_mapped', 'shapefile-polygons')}
              eventKey="4"
            >Shapefile (polygons)</MenuItem>
          </DropdownButton>

          { mapFiltered &&
            <DropdownButton title={<span>{'Capital Projects (mapped, filtered) '}<Badge>{counts.mapFiltered}</Badge></span>} id={`${layerID}-filtered`}>
              <MenuItem
                href={carto.filteredDownloadUrlStringPtsPoly(mapSql, layerID, 'csv')}
                onClick={() =>  this.logDownloadStat('capital-project_mapped_filtered', 'csv')}
                eventKey="1"
              >CSV</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlStringPtsPoly(mapSql, layerID, 'geojson')}
                onClick={() =>  this.logDownloadStat('capital-project_mapped_filtered', 'geojson')}
                eventKey="2"
              >GeoJSON</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(mapSql.points, layerID, 'shp')}
                onClick={() =>  this.logDownloadStat('capital-project_mapped_filtered', 'shapefile-points')}
                eventKey="3"
              >Shapefile (points)</MenuItem>

              <MenuItem
                href={carto.filteredDownloadUrlString(mapSql.polygons, layerID, 'shp')}
                onClick={() =>  this.logDownloadStat('capital-project_mapped_filtered', 'shapefile-polygons')}
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
  tableSql: PropTypes.string.isRequired,
  mapSql: PropTypes.object.isRequired,
  commitmentsSql: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
  layerID: PropTypes.string.isRequired,
  tableFiltered: PropTypes.bool,
  mapFiltered: PropTypes.bool,
};

DownloadButton.defaultProps = {
  tableFiltered: false,
  mapFiltered: false,
};

export default DownloadButton;
