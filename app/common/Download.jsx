// Download.jsx - This component builds a download pane used in the explorer
import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const Download = ({ store, filePrefix, onDownload }) => {
  const style = {
    size: { fontSize: '11px' },
  };

  return (
    <div>
      <h4>Complete Dataset</h4>

      <FlatButton
        label="CSV"
        href={store.completeDownloadUrlString(filePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        href={store.completeDownloadUrlString(filePrefix, 'geojson')}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={store.completeDownloadUrlString(filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />

      <h4>Filtered Dataset</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={store.filteredDownloadUrlString(filePrefix, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={store.filteredDownloadUrlString(filePrefix, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={store.filteredDownloadUrlString(filePrefix, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-filtered')}
      />
    </div>
  );
};

Download.propTypes = {
  store: PropTypes.object.isRequired,
  filePrefix: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
};

Download.defaultProps = {
  onDownload: () => {},
};

module.exports = Download;
