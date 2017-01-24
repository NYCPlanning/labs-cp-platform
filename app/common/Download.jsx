// Download.jsx - This component builds a download pane used in the explorer

import React from 'react';

import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import Carto from '../helpers/carto';

const Download = ({ sql }) => {
  const filteredSql = Carto.transformSqlSelectAll(sql);
  const completeSql = Carto.transformSqlRemoveWhere(filteredSql);

  return (
    <div>
      <Subheader>
        Complete Dataset
      </Subheader>

      <FlatButton
        label="CSV"
        href={Carto.generateUrlString(completeSql, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={{ fontSize: '14px' }} />}
      />
      <FlatButton
        label="GeoJSON"
        href={Carto.generateUrlString(completeSql, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={{ fontSize: '14px' }} />}
      />
      <FlatButton
        label="Shapefile"
        href={Carto.generateUrlString(completeSql, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={{ fontSize: '14px' }} />}
      />

      <Subheader>
        Filtered Dataset
      </Subheader>

      <FlatButton
        label="CSV"
        href={Carto.generateUrlString(filteredSql, 'csv')}
        icon={<FontIcon className="fa fa-file-excel-o" style={{ fontSize: '14px' }} />}
      />
      <FlatButton
        label="GeoJSON"
        href={Carto.generateUrlString(filteredSql, 'geojson')}
        icon={<FontIcon className="fa fa-file-code-o" style={{ fontSize: '14px' }} />}
      />
      <FlatButton
        label="Shapefile"
        href={Carto.generateUrlString(filteredSql, 'shp')}
        icon={<FontIcon className="fa fa-file-archive-o" style={{ fontSize: '14px' }} />}
      />
    </div>
  );
};

Download.propTypes = {
  sql: React.PropTypes.string,
};

module.exports = Download;
