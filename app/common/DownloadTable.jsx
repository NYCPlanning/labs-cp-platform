// Download.jsx - This component builds a download pane used in the explorer
import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';

import InfoIcon from '../common/InfoIcon';
import carto from '../helpers/carto';

const DownloadTable = ({ sql, commitmentsSql, filePrefix, commitmentsFilePrefix, onDownload }) => {
  const style = {
    size: { fontSize: '11px' },
    float: { pull: 'left' },
  };

  return (
    <div>
      <Subheader style={{ paddingLeft: 0 }}>
        Complete Dataset
        <InfoIcon text="Commitment level data represents capital commitments before aggregating to the project level" />
      </Subheader>
      <FlatButton
        label="Project Level"
        href={carto.completeDownloadUrlString(sql, filePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />
      <FlatButton
        label="Commitment Level"
        href={carto.completeDownloadUrlString(commitmentsSql, commitmentsFilePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-complete')}
      />

      <Subheader style={{ paddingLeft: 0 }}>
        Filtered Dataset
        <InfoIcon text="Commitment level data will correspond to projects in the current view" />
      </Subheader>
      <FlatButton
        label="Project Level"
        href={carto.filteredDownloadUrlString(sql, filePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
      <FlatButton
        label="Commitment Level"
        href={carto.filteredDownloadUrlString(commitmentsSql, commitmentsFilePrefix, 'csv')}
        download="text.csv"
        labelStyle={style.size}
        icon={<FontIcon className="fa fa-file-excel-o" style={style.size} />}
        onClick={() => onDownload('csv-filtered')}
      />
    </div>
  );
};

DownloadTable.propTypes = {
  sql: PropTypes.string.isRequired,
  commitmentsSql: PropTypes.string.isRequired,
  filePrefix: PropTypes.string.isRequired,
  commitmentsFilePrefix: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
};

DownloadTable.defaultProps = {
  onDownload: () => {},
};

module.exports = DownloadTable;
