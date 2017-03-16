// Download.jsx - This component builds a download pane used in the explorer
import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import Carto from '../helpers/carto';

const date = moment().format('YYYY-MM-DD'); // eslint-disable-line no-undef

const Download = ({ sql, filePrefix, onDownload }) => {
  const filteredSql = Carto.transformSqlSelectAll(sql);
  const completeSql = Carto.transformSqlRemoveWhere(filteredSql);

  const allFilename = `${filePrefix}_all_${date}`;
  const filteredFilename = `${filePrefix}_filtered_${date}`;

  const style = {
    size: { fontSize: '11px' },
  };

  return (
    <div>
      <h4>Complete Dataset</h4>

      <FlatButton
        label="CSV"
        href={Carto.generateUrlString(completeSql, 'csv', allFilename)}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="GeoJSON"
        href={Carto.generateUrlString(completeSql, 'geojson', allFilename)}
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-complete')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={Carto.generateUrlString(completeSql, 'shp', allFilename)}
        icon={<FontIcon className="fa fa-file-archive-o" style={style.size} />}
        onClick={() => onDownload('shp-complete')}
      />

      <h4>Filtered Dataset</h4>

      <FlatButton
        label="CSV"
        labelStyle={style.size}
        href={Carto.generateUrlString(filteredSql, 'csv', filteredFilename)}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="GeoJSON"
        labelStyle={style.size}
        href={Carto.generateUrlString(filteredSql, 'geojson', filteredFilename)}
        icon={<FontIcon className="fa fa-file-code-o" style={style.size} />}
        onClick={() => onDownload('geojson-filtered')}
      />
      <FlatButton
        label="Shapefile"
        labelStyle={style.size}
        href={Carto.generateUrlString(filteredSql, 'shp', filteredFilename)}
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

module.exports = Download;
