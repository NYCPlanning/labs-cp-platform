import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import numeral from 'numeral';
import cx from 'classnames';

const Item = (props) => {
  const d = props.feature.properties;

  return (
    <Link
      to={{
        pathname: `/capitalproject/${d.maprojid}`,
      }}
    >
      <div
        className={cx('capital-projects-list-item', { selected: props.selected })}
        style={{
          borderLeft: `5px solid ${d.totalspend > 0 ? '#d98127' : '#8B8C98'}`,
        }}
      >
        <div className={'title'}>{d.description}</div>
        <div className={'subtitle'}>Planned Commitments: ${numeral(d.totalcommit).format('0,0')}</div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.object.isRequired,
  }).isRequired,
  selected: PropTypes.bool,
};

Item.defaultProps = {
  selected: false,
};

export default Item;
