// Download.jsx - Special download component for CPDB map view
import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import carto from '../helpers/carto';

const Download = ({ pointsSql, polygonsSql, pointsPrefix, polygonsPrefix, onDownload }) => {
  const style = {
    size: { fontSize: '11px' },
  };

  return (
    <div>
      <h3>Complete Dataset</h3>
      <h4>Points</h4>

      <FlatButton
        label="CSV"
        href={carto.completeDownloadUrlString(pointsSql, pointsPrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        href={carto.completeDownloadUrlString(pointsSql, pointsPrefix, 'geojson')}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(pointsSql, pointsPrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />

      <h4>Polygons</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(polygonsSql, polygonsPrefix, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(polygonsSql, polygonsPrefix, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(polygonsSql, polygonsPrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />
      <Divider />

      <h3>Filtered Dataset</h3>
      <h4>Points</h4>

      <FlatButton
        label="CSV"
        href={carto.filteredDownloadUrlString(pointsSql, pointsPrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        href={carto.filteredDownloadUrlString(pointsSql, pointsPrefix, 'geojson')}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(pointsSql, pointsPrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-filtered')}
      />

      <h4>Polygons</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(polygonsSql, polygonsPrefix, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(polygonsSql, polygonsPrefix, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(polygonsSql, polygonsPrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-filtered')}
      />
    </div>
  );
};

Download.propTypes = {
  pointsSql: PropTypes.string.isRequired,
  polygonsSql: PropTypes.string.isRequired,
  pointsPrefix: PropTypes.string.isRequired,
  polygonsPrefix: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
};

Download.defaultProps = {
  onDownload: () => {},
};

export default Download;
