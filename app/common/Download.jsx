// Download.jsx - This component builds a download pane used in the explorer
import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import carto from '../helpers/carto';

const Download = ({ pointsSql, polygonsSql, filePrefix, onDownload }) => {
  const style = {
    size: { fontSize: '11px' },
  };

  return (
    <div>
      <h3>Complete Dataset</h3>
      <h4>Points</h4>

      <FlatButton
        label="CSV"
        href={carto.completeDownloadUrlString(pointsSql, filePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        href={carto.completeDownloadUrlString(pointsSql, filePrefix, 'geojson')}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(pointsSql, filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />

      <h4>Polygons</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(polygonsSql, filePrefix, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(polygonsSql, filePrefix, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(polygonsSql, filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />
      <Divider />

      <h3>Filtered Dataset</h3>
      <h4>Points</h4>

      <FlatButton
        label="CSV"
        href={carto.filteredDownloadUrlString(pointsSql, filePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        href={carto.filteredDownloadUrlString(pointsSql, filePrefix, 'geojson')}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(pointsSql, filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-filtered')}
      />

      <h4>Polygons</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(polygonsSql, filePrefix, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(polygonsSql, filePrefix, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(polygonsSql, filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-filtered')}
      />
    </div>
  );
};

Download.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  filePrefix: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
};

Download.defaultProps = {
  onDownload: () => {},
};

module.exports = Download;
