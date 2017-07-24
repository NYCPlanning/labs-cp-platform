// Download.jsx - This component builds a download pane used in the explorer
import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import carto from '../helpers/carto';

const Download = ({ sql, filePrefix, onDownload }) => {
  const style = {
    size: { fontSize: '11px' },
  };

  return (
    <div>
      <h4>Complete Dataset</h4>

      <FlatButton
        label="CSV"
        href={carto.completeDownloadUrlString(sql, filePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        href={carto.completeDownloadUrlString(sql, filePrefix, 'geojson')}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.completeDownloadUrlString(sql, filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />

      <h4>Filtered Dataset</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(sql, filePrefix, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(sql, filePrefix, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={carto.filteredDownloadUrlString(sql, filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-filtered')}
      />
    </div>
  );
};

Download.propTypes = {
  sql: PropTypes.string.isRequired,
  filePrefix: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
};

Download.defaultProps = {
  onDownload: () => {},
};

export default Download;
