import React from 'react';
import Numeral from 'numeral';

import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import './CountWidget.scss';

const CountWidget = (props) => {
  const totalCount = Numeral(props.totalCount).format('0,0');
  const selectedCount = Numeral(props.selectedCount).format('0,0');

  let countText = '';

  if (props.selectedCount === props.totalCount) {
    countText = (
      <span>Showing all <span className="bigNumber">{totalCount}</span> {props.units}</span>
    );
  } else {
    countText = (
      <span>
        <span className={`bigNumber ${selectedCount === '0' ? 'zero' : ''}`}>{selectedCount}</span> of <span className="bigNumber">{totalCount}</span> {props.units}
      </span>
    );
  }

  return (
    <div className="countWidget">
      <ListItem
        style={{
          padding: '12px 12px 12px 55px',
          backgroundColor: '#efefef',
        }}
        leftIcon={
          <FontIcon
            className="fa fa-filter"
            style={{ margin: '9px' }}
          />
        }
        rightIcon={
          <FontIcon
            className="fa fa-undo"
            hoverColor="green"
            style={{ margin: '9px', cursor: 'pointer' }}
            onClick={props.resetFilter()}
          />
        }
        disabled
      >
        {countText}
      </ListItem>
    </div>
  );
};

CountWidget.propTypes = {
  totalCount: React.PropTypes.number,
  selectedCount: React.PropTypes.number,
  units: React.PropTypes.string.isRequired,
  resetFilter: React.PropTypes.func.isRequired,
};

CountWidget.defaultProps = {
  totalCount: null,
  selectedCount: null,
};

module.exports = CountWidget;
